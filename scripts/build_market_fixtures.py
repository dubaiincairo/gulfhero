#!/usr/bin/env python3
"""Build privacy-safe Gulf Hero fixtures from an exported property revenue report.

The source report is read locally and is never copied into the repository. Guest
names, reservation/folio/invoice numbers, company names, tax identifiers, payment
remarks, and contact details are discarded. The generated file keeps only
operational patterns that are useful for the desktop PMS prototype.
"""

from __future__ import annotations

import csv
import datetime as dt
import json
import re
import sys
from collections import Counter
from pathlib import Path


BUSINESS_DATE = dt.date(2026, 7, 9)
DATE_SHIFT_DAYS = 182
MAX_RESERVATIONS = 96

FIRST_NAMES = [
    "Adam", "Alice", "Amelia", "Benjamin", "Charlotte", "Chloe", "Daniel", "David",
    "Eleanor", "Emily", "Emma", "Ethan", "Grace", "Hannah", "Henry", "Isabella",
    "Jack", "James", "Jessica", "Leo", "Lucy", "Matthew", "Mia", "Nathan",
    "Noah", "Oliver", "Olivia", "Samuel", "Sophie", "Thomas", "Victoria", "William",
]

LAST_NAMES = [
    "Adams", "Bennett", "Brooks", "Carter", "Clarke", "Collins", "Cooper", "Evans",
    "Foster", "Green", "Hall", "Harris", "Hayes", "Hill", "Howard", "Hughes",
    "King", "Lewis", "Marshall", "Mitchell", "Morgan", "Parker", "Price", "Reed",
    "Roberts", "Scott", "Taylor", "Turner", "Walker", "Ward", "Watson", "Wilson",
]

PAYMENT_COLUMNS = [
    ("mada", "SPAN CARD Net Payment (SAR)"),
    ("Visa", "VISA CARD Net Payment (SAR)"),
    ("Mastercard", "MASTER CARD Net Payment (SAR)"),
    ("Cash", "Cash Net Payment (SAR)"),
    ("Bank transfer", "Bank Transfer Net Payment (SAR)"),
    ("GCCNET", "GCCNET Net Payment (SAR)"),
    ("American Express", "American Express Net Payment (SAR)"),
    ("Other", "Other Payment Method (SAR)"),
]


def parse_date(value: str) -> dt.date | None:
    value = (value or "").strip()
    for pattern in ("%d/%m/%Y", "%m/%d/%Y", "%d-%m-%Y"):
        try:
            return dt.datetime.strptime(value, pattern).date()
        except ValueError:
            continue
    return None


def number(value: str) -> float:
    cleaned = re.sub(r"[^0-9.\-]", "", (value or "").replace(",", ""))
    if cleaned in {"", "-", ".", "-."}:
        return 0.0
    try:
        return round(float(cleaned), 2)
    except ValueError:
        return 0.0


def small_integer(value: str, fallback: int) -> int:
    try:
        parsed = int(float((value or "").replace(",", "")))
    except ValueError:
        return fallback
    return parsed if 0 <= parsed <= 10 else fallback


def contains_arabic(value: str) -> bool:
    return bool(re.search(r"[\u0600-\u06ff]", value or ""))


def normalize_room_type(value: str) -> str:
    value = re.sub(r"\s+", " ", (value or "").strip())
    replacements = {
        "Deluxe Junior Suite 2 Single Bed": "Deluxe Junior Suite Twin",
    }
    return replacements.get(value, value)


def normalize_rate(value: str) -> str:
    key = re.sub(r"\s+", " ", (value or "").strip()).lower()
    mapping = {
        "walk inn bb": "Walk-in Bed & Breakfast",
        "walk inn room only": "Walk-in Room Only",
        "wholesaler w dinner": "Wholesaler Dinner Package",
        "ota bb": "OTA Bed & Breakfast",
        "ota ro": "OTA Room Only",
        "nonrefundable ota": "OTA Non-Refundable",
        "corporate bb": "Corporate Bed & Breakfast",
    }
    return mapping.get(key, "Standard Property Rate")


def normalize_source(value: str, rate_type: str) -> str:
    source = (value or "").strip().lower()
    rate = (rate_type or "").lower()
    if source == "individual":
        return "Direct / Walk-in"
    if "booking.com" in source or "expedia" in source or "wfrlee" in source or "techit" in source:
        return "Online Booking"
    if "webbeds" in source or "wholesaler" in rate:
        return "Wholesaler"
    if contains_arabic(value) or "corporate" in rate:
        return "Corporate"
    return "Travel Agent"


def synthetic_name(index: int) -> str:
    first = FIRST_NAMES[index % len(FIRST_NAMES)]
    last = LAST_NAMES[(index * 7 + 19 + index // len(FIRST_NAMES)) % len(LAST_NAMES)]
    return f"{first} {last}"


def status_for(arrival: dt.date, departure: dt.date) -> str:
    if departure == BUSINESS_DATE:
        return "Due out"
    if arrival == BUSINESS_DATE:
        return "Arriving"
    if arrival < BUSINESS_DATE < departure:
        return "In house"
    if arrival > BUSINESS_DATE:
        return "Confirmed"
    return "Checked out"


def date_label(value: dt.date) -> str:
    return value.strftime("%d %b")


def money_label(value: float) -> str:
    return f"{value:,.2f}"


def build_rows(source_path: Path) -> tuple[list[dict], list[dict]]:
    with source_path.open(encoding="utf-8-sig", newline="") as handle:
        source_rows = list(csv.DictReader(handle))

    valid_rows = []
    for source_index, row in enumerate(source_rows):
        arrival = parse_date(row.get("Arrival", ""))
        departure = parse_date(row.get("Dept.", ""))
        room_match = re.match(r"^(\d+)\s*-\s*(.+)$", (row.get("Room") or "").strip())
        if not arrival or not departure or not room_match:
            continue
        room_type = normalize_room_type(room_match.group(2))
        if room_type.lower() in {"paymaster", "meeting room"}:
            continue
        arrival += dt.timedelta(days=DATE_SHIFT_DAYS)
        departure += dt.timedelta(days=DATE_SHIFT_DAYS)
        if departure <= arrival:
            departure = arrival + dt.timedelta(days=max(small_integer(row.get("Nights", ""), 1), 1))
        if not (BUSINESS_DATE - dt.timedelta(days=7) <= arrival <= BUSINESS_DATE + dt.timedelta(days=22)):
            continue

        total = max(number(row.get("Total (SAR) (Inclusive of Tax)", "")), 0)
        tax = max(number(row.get("VAT15% (SAR)", "")) + number(row.get("municipality 2.5% (SAR)", "")), 0)
        payment_values = [(label, number(row.get(column, ""))) for label, column in PAYMENT_COLUMNS]
        payment_values = [(label, value) for label, value in payment_values if abs(value) > 0.005]
        paid = sum(value for _, value in payment_values)
        payment_method = max(payment_values, key=lambda item: abs(item[1]))[0] if payment_values else "Unpaid"

        valid_rows.append({
            "_source_index": source_index,
            "arrival_date": arrival,
            "departure_date": departure,
            "room": room_match.group(1),
            "roomType": room_type,
            "rateType": normalize_rate(row.get("Rate Type", "")),
            "source": normalize_source(row.get("Source", ""), row.get("Rate Type", "")),
            "adults": small_integer(row.get("Adult", ""), 2),
            "children": small_integer(row.get("Child", ""), 0),
            "total_value": total,
            "tax_value": tax,
            "paid_value": paid,
            "paymentMethod": payment_method,
        })

    priority = {"In house": 0, "Arriving": 1, "Due out": 2, "Confirmed": 3, "Checked out": 4}
    valid_rows.sort(key=lambda item: (
        priority[status_for(item["arrival_date"], item["departure_date"])],
        abs((item["arrival_date"] - BUSINESS_DATE).days),
        item["room"],
        item["_source_index"],
    ))

    # Keep one active assignment per room, then fill with arrivals, departures,
    # and future reservations. This removes overlapping report rows without
    # inventing additional room occupancy.
    selected = []
    occupied_rooms = set()
    deferred = []
    for row in valid_rows:
        state = status_for(row["arrival_date"], row["departure_date"])
        if state in {"In house", "Arriving"} and row["room"] in occupied_rooms:
            deferred.append(row)
            continue
        if state in {"In house", "Arriving"}:
            occupied_rooms.add(row["room"])
        selected.append(row)
        if len(selected) == MAX_RESERVATIONS:
            break
    if len(selected) < MAX_RESERVATIONS:
        selected.extend(deferred[: MAX_RESERVATIONS - len(selected)])

    reservations = []
    for index, row in enumerate(selected):
        arrival = row.pop("arrival_date")
        departure = row.pop("departure_date")
        row.pop("_source_index")
        total = row.pop("total_value")
        tax = row.pop("tax_value")
        paid = row.pop("paid_value")
        balance = max(total - paid, 0)
        nights = max((departure - arrival).days, 1)
        reservations.append({
            "id": f"GH-R-2607-{index + 1:04d}",
            "guest": synthetic_name(index),
            **row,
            "arrival": date_label(arrival),
            "departure": date_label(departure),
            "arrivalISO": arrival.isoformat(),
            "departureISO": departure.isoformat(),
            "nights": nights,
            "status": status_for(arrival, departure),
            "total": money_label(total),
            "tax": money_label(tax),
            "paid": money_label(paid),
            "balance": money_label(balance),
            "vip": total >= 2500 or "Presidential" in row["roomType"],
        })

    return reservations, source_rows


def build_summary(source_rows: list[dict], reservations: list[dict]) -> dict:
    def sum_column(column: str) -> float:
        return round(sum(number(row.get(column, "")) for row in source_rows), 2)

    source_mix = Counter(row["source"] for row in reservations)
    rate_mix = Counter(row["rateType"] for row in reservations)
    room_mix = Counter(row["roomType"] for row in reservations)
    status_mix = Counter(row["status"] for row in reservations)
    return {
        "sourceRowsReviewed": len(source_rows),
        "sanitizedReservations": len(reservations),
        "businessDate": BUSINESS_DATE.isoformat(),
        "sourceMix": dict(source_mix.most_common()),
        "rateMix": dict(rate_mix.most_common()),
        "roomMix": dict(room_mix.most_common()),
        "statusMix": dict(status_mix.most_common()),
        "revenue": {
            "gross": money_label(sum_column("Total (SAR) (Inclusive of Tax)")),
            "roomCharges": money_label(sum_column("All Room Charges  (SAR) (Exclusive of Tax)")),
            "breakfast": money_label(sum_column("Breakfast Revenue (SAR) (Exclusive of Tax)")),
            "dinner": money_label(sum_column("Dinner Revenue (SAR) (Exclusive of Tax)")),
            "transportation": money_label(sum_column("Transportation (SAR) (Exclusive of Tax)")),
            "vat": money_label(sum_column("VAT15% (SAR)")),
            "municipalityFee": money_label(sum_column("municipality 2.5% (SAR)")),
        },
        "payments": {
            "mada": money_label(sum_column("SPAN CARD Net Payment (SAR)")),
            "visa": money_label(sum_column("VISA CARD Net Payment (SAR)")),
            "mastercard": money_label(sum_column("MASTER CARD Net Payment (SAR)")),
            "cash": money_label(sum_column("Cash Net Payment (SAR)")),
            "bankTransfer": money_label(sum_column("Bank Transfer Net Payment (SAR)")),
            "gccnet": money_label(sum_column("GCCNET Net Payment (SAR)")),
            "americanExpress": money_label(sum_column("American Express Net Payment (SAR)")),
        },
    }


def build_room_inventory(source_rows: list[dict]) -> list[dict]:
    """Return only room numbers and normalized room types from the source report."""
    rooms: dict[str, str] = {}
    for row in source_rows:
        room_match = re.match(r"^(\d+)\s*-\s*(.+)$", (row.get("Room") or "").strip())
        if not room_match:
            continue
        room_type = normalize_room_type(room_match.group(2))
        if room_type.lower() in {"paymaster", "meeting room"}:
            continue
        rooms.setdefault(room_match.group(1), room_type)
    return [
        {"number": number, "roomType": rooms[number]}
        for number in sorted(rooms, key=lambda value: (int(value), value))
    ]


def write_module(target_path: Path, reservations: list[dict], room_inventory: list[dict], summary: dict) -> None:
    payload = (
        "// Generated from a local property revenue export. All guest identities and source identifiers\n"
        "// are synthetic; company names, tax IDs, folio numbers, and payment remarks are excluded.\n\n"
        f"export const marketReservations = {json.dumps(reservations, indent=2, ensure_ascii=True)};\n\n"
        f"export const marketRoomInventory = {json.dumps(room_inventory, indent=2, ensure_ascii=True)};\n\n"
        f"export const marketSummary = {json.dumps(summary, indent=2, ensure_ascii=True)};\n"
    )
    target_path.write_text(payload, encoding="utf-8")


def main() -> int:
    if len(sys.argv) != 3:
        print("Usage: build_market_fixtures.py SOURCE.csv TARGET.js", file=sys.stderr)
        return 2
    source_path = Path(sys.argv[1]).expanduser().resolve()
    target_path = Path(sys.argv[2]).expanduser().resolve()
    reservations, source_rows = build_rows(source_path)
    room_inventory = build_room_inventory(source_rows)
    summary = build_summary(source_rows, reservations)
    write_module(target_path, reservations, room_inventory, summary)
    print(json.dumps({
        "source_rows_reviewed": len(source_rows),
        "sanitized_reservations_written": len(reservations),
        "verified_rooms_written": len(room_inventory),
        "visible_status_mix": summary["statusMix"],
        "visible_room_types": len(summary["roomMix"]),
    }))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
