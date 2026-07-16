import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Checkbox,
  Drawer,
  Input,
  Radio,
  Select,
  Switch,
  Table,
  Tabs,
  Tag,
  Tooltip
} from "antd";
import {
  BarChart3,
  Bed,
  BedDouble,
  Bell,
  Building2,
  CalendarCheck,
  CalendarDays,
  CalendarPlus,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Cigarette,
  CigaretteOff,
  CircleDollarSign,
  ClipboardList,
  Crown,
  Download,
  Eye,
  FileText,
  GitBranch,
  Grid3X3,
  Globe2,
  Hand,
  Info,
  KeyRound,
  Landmark,
  Link2,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  Minus,
  MoreVertical,
  Network,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Star,
  Upload,
  UserRound,
  Users,
  Wrench,
  X
} from "lucide-react";
import {
  CashieringView as CashieringSurface,
  ConfigurationView as ConfigurationSurface,
  DistributionView as DistributionSurface,
  GuestView as GuestSurface,
  HousekeepingView as HousekeepingSurface,
  RatesView as RatesSurface,
  ReportsView as ReportsSurface
} from "./operationalViews";
import { PmsDatePicker, PmsDateRangePicker } from "./PmsDatePicker";
import { marketReservations, marketRoomInventory, reservationReferenceDate } from "./marketFixtures";
import { supabase, supabaseConfigured } from "./lib/supabase";

const reservations = marketReservations;
const propertyRoomNumbers = new Set(marketRoomInventory.map((room) => room.number));

function operationalDateWindow(startISO, count) {
  const start = new Date(`${startISO}T00:00:00Z`);
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(start.getTime() + index * 86400000);
    const iso = date.toISOString().slice(0, 10);
    const sold = new Set(reservations
      .filter((record) => propertyRoomNumbers.has(record.room) && record.arrivalISO <= iso && record.departureISO > iso)
      .map((record) => record.room)).size;
    return {
      iso,
      dow: date.toLocaleString("en-GB", { weekday: "short", timeZone: "UTC" }),
      day: String(date.getUTCDate()).padStart(2, "0"),
      month: date.toLocaleString("en-GB", { month: "short", timeZone: "UTC" }),
      sold,
      available: Math.max(marketRoomInventory.length - sold, 0),
      occupancy: Math.round((sold / marketRoomInventory.length) * 100)
    };
  });
}

const businessDates = operationalDateWindow(reservationReferenceDate, 10);
const stayDates = operationalDateWindow(reservationReferenceDate, 13);
const reservationReferenceDateInput = reservationReferenceDate.split("-").reverse().join("/");
const reservationCheckoutDateInput = new Date(new Date(`${reservationReferenceDate}T00:00:00Z`).getTime() + 2 * 86400000).toISOString().slice(0, 10).split("-").reverse().join("/");

const navigation = [
  { id: "dashboard", label: "Dashboard", icon: Grid3X3 },
  { id: "stay", label: "Stay View", icon: CalendarDays },
  { id: "rooms", label: "Room View", icon: BedDouble },
  { id: "reservations", label: "Reservations", icon: ClipboardList },
  { id: "rates", label: "Rates & Availability", icon: SlidersHorizontal },
  { id: "distribution", label: "Distribution", icon: RefreshCw },
  { id: "guests", label: "Guest & CRM", icon: Users },
  { id: "cashiering", label: "Cashiering", icon: CircleDollarSign },
  { id: "housekeeping", label: "Housekeeping", icon: Bed },
  { id: "reports", label: "Reports", icon: BarChart3 },
  { id: "configuration", label: "Configuration", icon: Settings }
];

const roomTypes = [
  { name: "Superior King Room", rooms: 10, base: "1/0", max: "2/1", rate: 575, inventory: [5, 7, 8, 8, 8, 9, 9, 9, 9, 9] },
  { name: "Superior Twin Room", rooms: 6, base: "1/0", max: "2/1", rate: 575, inventory: [4, 6, 6, 6, 6, 6, 6, 6, 6, 6] },
  { name: "Deluxe King Room City View", rooms: 6, base: "1/0", max: "4/4", rate: 690, inventory: [3, 4, 5, 5, 5, 6, 6, 6, 6, 6] },
  { name: "Junior Suite", rooms: 5, base: "1/0", max: "2/2", rate: 790, inventory: [2, 3, 4, 4, 5, 5, 5, 5, 5, 5] },
  { name: "Deluxe Junior Suite King Bed", rooms: 23, base: "1/0", max: "3/1", rate: 860, inventory: [17, 18, 19, 20, 20, 21, 22, 22, 23, 23] },
  { name: "Deluxe Junior Suite 2 Single Bed", rooms: 11, base: "1/0", max: "3/1", rate: 860, inventory: [7, 8, 9, 9, 10, 10, 11, 11, 11, 11] },
  { name: "Executive Suite", rooms: 6, base: "1/0", max: "6/2", rate: 980, inventory: [3, 4, 4, 5, 5, 5, 6, 6, 6, 6] },
  { name: "Presidential Suite City View", rooms: 6, base: "1/0", max: "4/4", rate: 1650, inventory: [3, 4, 4, 5, 5, 5, 6, 6, 6, 6] },
  { name: "Meeting Room", rooms: 1, base: "1/0", max: "2/0", rate: 950, inventory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { name: "Paymaster", rooms: 1, base: "1/0", max: "4/2", rate: 0, inventory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }
];

const roomTypeOptions = [{ value: "-Select-", label: "-Select-" }, ...roomTypes.map((roomType) => ({ value: roomType.name, label: roomType.name }))];
const ratePlanOptions = [{ value: "-Select-", label: "-Select-" }, { value: "Room Only Flexible", label: "Room Only Flexible" }, { value: "Room Only Non-Refundable", label: "Room Only Non-Refundable" }];

const statusToRoomState = { "In house": "Occupied", Arriving: "Reserved", Confirmed: "Reserved", "Due out": "Due Out" };

function roomCondition(record) {
  const roomSeed = Number(record.room) || 0;
  if (record.status === "Due out") return "Dirty";
  if (roomSeed % 11 === 0) return "Inspected";
  if (roomSeed % 7 === 0) return "Dirty";
  return "Clean";
}

const stayReferenceGroupDefinitions = [
  { name: "Superior King Room", rate: 375 },
  { name: "Superior Twin Room", rate: 325 },
  { name: "Deluxe King Room City View", rate: 365 },
  { name: "Junior Suite", rate: 300 },
  { name: "Deluxe Junior Suite King Bed", rate: 550 },
  { name: "Deluxe Junior Suite 2 Single Bed", rate: 550 },
  { name: "Executive Suite", rate: 850 },
  { name: "Presidential Suite City View", rate: 1150 },
  { name: "Meeting Room", rate: 1000 },
  { name: "Paymaster", rate: 100 },
  { name: "Default Unmapped Room", rate: null }
];

function stayDaysBetween(startISO, endISO) {
  return Math.round((new Date(`${endISO}T00:00:00Z`) - new Date(`${startISO}T00:00:00Z`)) / 86400000);
}

function stayBookingPresentation(record) {
  if (record.departureISO === reservationReferenceDate) return { status: "Due Out", tone: "due-out" };
  if (record.arrivalISO === reservationReferenceDate) return { status: "Checked In Today", tone: "in-house" };
  if (record.arrivalISO < reservationReferenceDate && record.departureISO > reservationReferenceDate) return { status: "In House", tone: "in-house" };
  if (record.departureISO < reservationReferenceDate) return { status: "Checked Out", tone: "checked-out" };
  return { status: "Arrival", tone: "arrival" };
}

function buildStayRoomGroups(records, dates) {
  const startISO = dates[0].iso;
  const endISO = new Date(new Date(`${dates.at(-1).iso}T00:00:00Z`).getTime() + 86400000).toISOString().slice(0, 10);
  return stayReferenceGroupDefinitions.map((definition) => {
    const inventoryRooms = marketRoomInventory.filter((record) => record.roomType === definition.name);
    const inventoryNumbers = new Set(inventoryRooms.map((room) => room.number));
    const availability = dates.map((date) => {
      const occupied = new Set(records
        .filter((record) => inventoryNumbers.has(record.room) && record.arrivalISO <= date.iso && record.departureISO > date.iso)
        .map((record) => record.room)).size;
      return Math.max(inventoryRooms.length - occupied, 0);
    });
    const rooms = inventoryRooms.map((room) => {
      const roomRecords = records.filter((record) => {
        if (record.room !== room.number) return false;
        return record.departureISO === startISO || (record.arrivalISO < endISO && record.departureISO > startISO);
      });
      const bookings = roomRecords.map((record) => {
        const presentation = stayBookingPresentation(record);
        if (record.departureISO === startISO) return { ...presentation, start: 0, length: 1, label: record.guest, reservationKey: record.recordKey || record.id };
        const start = Math.max(0, stayDaysBetween(startISO, record.arrivalISO));
        const departureOffset = Math.min(dates.length, stayDaysBetween(startISO, record.departureISO));
        return { ...presentation, start, length: Math.max(1, departureOffset - start), label: record.guest, reservationKey: record.recordKey || record.id };
      });
      const isDueOut = roomRecords.some((record) => record.departureISO === reservationReferenceDate);
      const isOccupied = roomRecords.some((record) => record.arrivalISO <= reservationReferenceDate && record.departureISO > reservationReferenceDate);
      const isReserved = roomRecords.some((record) => record.arrivalISO > reservationReferenceDate);
      const status = isDueOut ? "Due Out" : isOccupied ? "Occupied" : isReserved ? "Reserved" : "Vacant";
      return { number: room.number, condition: "Clean", status, bookings };
    });
    return { ...definition, availability, rooms };
  });
}

function stayStateCounts(groups) {
  const rooms = groups.flatMap((group) => group.rooms);
  return {
    All: rooms.length,
    Vacant: rooms.filter((room) => room.status === "Vacant").length,
    Occupied: rooms.filter((room) => room.status === "Occupied").length,
    Reserved: rooms.filter((room) => room.status === "Reserved").length,
    Blocked: 0,
    "Due Out": rooms.filter((room) => room.status === "Due Out").length,
    Dirty: rooms.filter((room) => room.condition === "Dirty").length
  };
}

const roomRows = [...reservations
  .filter((record) => ["In house", "Arriving", "Due out", "Confirmed"].includes(record.status))
  .reduce((rooms, record) => rooms.has(record.room) ? rooms : rooms.set(record.room, record), new Map())
  .values()]
  .slice(0, 52)
  .map((record) => ({
    number: record.room,
    type: record.roomType,
    guest: record.guest,
    status: statusToRoomState[record.status] || "Reserved",
    condition: roomCondition(record),
    note: record.status === "In house" ? `${record.nights}-night stay` : record.status === "Due out" ? "Departure today" : `${record.arrival} arrival`
  }));

const rateGroups = roomTypes.map((roomType, index) => ({
  name: roomType.name,
  rooms: roomType.rooms,
  inventory: roomType.inventory,
  plans: [
    { name: "Room Only Flexible", code: `ROF-${String(index + 1).padStart(2, "0")}`, rate: roomType.rate, type: "Base" },
    { name: "Room Only Non-Refundable", code: `RONR-${String(index + 1).padStart(2, "0")}`, rate: Math.round(roomType.rate * 0.88), type: "Derived" }
  ]
}));

const channelLogs = [
  { key: "1", location: "D", source: "Direct Rate Update", date: "09/07/2026", request: "11:40:06 AM", process: "11:40:34 AM", value: "704", user: "Revenue Manager", status: "Applied" },
  { key: "2", location: "L", source: "Local Rate Review", date: "09/07/2026", request: "09:53:22 PM", process: "09:53:34 PM", value: "670", user: "System", status: "Applied" },
  { key: "3", location: "A", source: "Availability Check", date: "08/07/2026", request: "04:07:52 PM", process: "04:22:30 PM", value: "653", user: "Revenue Manager", status: "Queued" },
  { key: "4", location: "O", source: "One Click Release", date: "08/07/2026", request: "02:53:49 PM", process: "02:54:11 PM", value: "933", user: "Front Desk", status: "Applied" }
];

const folioRows = [
  { key: "1", date: "09 Jul", reference: "GH-T-260701", particulars: "Room Charge", description: "Deluxe Junior Suite King Bed", user: "Night Audit", amount: "1,590.00" },
  { key: "2", date: "09 Jul", reference: "GH-T-260702", particulars: "Breakfast", description: "Two adult inclusions", user: "Front Desk", amount: "170.00" },
  { key: "3", date: "10 Jul", reference: "GH-T-260703", particulars: "Room Charge", description: "Deluxe Junior Suite King Bed", user: "Night Audit", amount: "1,590.00" }
];

const configRows = [
  { key: "1", name: "Administrator", description: "Full property access", status: true, updated: "09 Jul 2026" },
  { key: "2", name: "Front Office Manager", description: "Reservations, stay and rooms", status: true, updated: "08 Jul 2026" },
  { key: "3", name: "Housekeeping Manager", description: "Rooms, tasks and inspection", status: true, updated: "08 Jul 2026" },
  { key: "4", name: "Night Auditor", description: "Audit and financial review", status: true, updated: "07 Jul 2026" }
];

const reportGroups = [
  ["Front Office", ["Arrival Report", "Departure Report", "In-house Guest List", "Room Status"]],
  ["Revenue", ["Daily Revenue", "Source-wise Revenue", "Rate Type Summary", "Forecast"]],
  ["Audit", ["Audit Trail", "Void Transaction", "User Activity", "IP Report"]],
  ["Statistics", ["Monthly Occupancy", "Monthly Revenue", "Guest Folio List", "Hotel Availability"]]
];

const reservationTabs = ["Folio Operations", "Booking Details", "Guest Details", "Room Charges", "Credit Card", "Tasks", "Audit Trail"];
const statusOptions = ["All", "Vacant", "Occupied", "Reserved", "Blocked", "Due Out", "Dirty"];
const occupiedRoomCount = roomRows.filter((room) => room.status === "Occupied").length;
const reservedRoomCount = roomRows.filter((room) => room.status === "Reserved").length;
const dueOutRoomCount = roomRows.filter((room) => room.status === "Due Out").length;
const roomStateCounts = {
  All: 76,
  Vacant: Math.max(76 - occupiedRoomCount - reservedRoomCount - 1, 0),
  Occupied: occupiedRoomCount,
  Reserved: reservedRoomCount,
  Blocked: 1,
  "Due Out": dueOutRoomCount,
  Dirty: roomRows.filter((room) => room.condition === "Dirty").length
};
const roomConditionOptions = ["Clean", "Dirty", "Inspected", "Maintenance"];

const initialReservationLine = { roomType: "Superior King Room", ratePlan: "Room Only Flexible", adults: "2", children: "0" };

function formatShortPmsDate(value) {
  if (!value) return "—";
  const [day, month] = value.split("/");
  return `${day} ${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(month) - 1] || ""}`.trim();
}

function pmsDateKey(value) {
  if (!value) return "";
  const [day, month, year] = value.split("/").map(Number);
  if (!day || !month || !year) return "";
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function businessDateKey(date) {
  return date.iso;
}

function localInventoryImpact(records, roomType, date) {
  const targetDate = businessDateKey(date);
  return records.reduce((total, record) => {
    if (!record.localOnly || pmsDateKey(record.arrivalDate) > targetDate || pmsDateKey(record.departureDate) <= targetDate) return total;
    return total + (record.roomLines || []).filter((line) => line.roomType === roomType).length;
  }, 0);
}

function adjustedDatesForReservations(dates, records) {
  return dates.map((date) => {
    const heldRooms = records.reduce((total, record) => total + (record.localOnly && pmsDateKey(record.arrivalDate) <= businessDateKey(date) && pmsDateKey(record.departureDate) > businessDateKey(date) ? record.roomLines.length : 0), 0);
    return { ...date, available: Math.max(0, date.available - heldRooms), sold: date.sold + heldRooms };
  });
}

function adjustedRateGroupsForReservations(records) {
  return rateGroups.map((group) => ({
    ...group,
    inventory: group.inventory.map((count, index) => Math.max(0, count - localInventoryImpact(records, group.name, businessDates[index])))
  }));
}

function PmsWorkspace({ account, databaseMode, onLogout }) {
  const [module, setModule] = useState("dashboard");
  const [railOpen, setRailOpen] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTab, setSearchTab] = useState("Bookings");
  const [reservation, setReservation] = useState(null);
  const [reservationStage, setReservationStage] = useState("summary");
  const [reservationTab, setReservationTab] = useState("Folio Operations");
  const [nestedDrawer, setNestedDrawer] = useState(null);
  const [addReservationOpen, setAddReservationOpen] = useState(false);
  const [reservationSearchOpen, setReservationSearchOpen] = useState(false);
  const [assignRoomOpen, setAssignRoomOpen] = useState(false);
  const [configDrawer, setConfigDrawer] = useState(null);
  const [headerPanel, setHeaderPanel] = useState(null);
  const [announcementsOpen, setAnnouncementsOpen] = useState(false);
  const [reservationRecords, setReservationRecords] = useState(() => reservations);

  const adjustedBusinessDates = useMemo(() => adjustedDatesForReservations(businessDates, reservationRecords), [reservationRecords]);
  const adjustedStayDates = useMemo(() => adjustedDatesForReservations(stayDates, reservationRecords), [reservationRecords]);
  const adjustedRateGroups = useMemo(() => adjustedRateGroupsForReservations(reservationRecords), [reservationRecords]);

  useEffect(() => {
    const openCommandSearch = (event) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", openCommandSearch);
    return () => window.removeEventListener("keydown", openCommandSearch);
  }, []);

  const openReservation = (record) => {
    setReservation(record);
    setReservationStage("summary");
    setReservationTab("Folio Operations");
    setSearchOpen(false);
  };

  const closeReservation = () => {
    setReservation(null);
    setNestedDrawer(null);
    setReservationStage("summary");
  };

  const openReservationWorkspace = (nextTab = "Folio Operations", nextDrawer = null) => {
    setReservationTab(nextTab);
    setNestedDrawer(nextDrawer);
    setReservationStage("workspace");
  };

  const changeModule = (nextModule) => {
    setModule(nextModule);
    setSearchOpen(false);
    setReservationSearchOpen(false);
    setHeaderPanel(null);
  };

  const reserveLocally = (record) => {
    const highestId = reservationRecords.reduce((highest, current) => Math.max(highest, Number(current.id.replace(/\D/g, "")) || 0), 30200);
    const savedRecord = { ...record, id: `R-${highestId + 1}`, localOnly: true };
    setReservationRecords((current) => [savedRecord, ...current]);
    setAddReservationOpen(false);
    setModule("reservations");
    openReservation(savedRecord);
  };

  return (
    <div className="pms-app">
      <AppHeader
        globalSearch={globalSearch}
        onGlobalSearch={(value) => {
          setGlobalSearch(value);
          setSearchOpen(true);
        }}
        onSearchFocus={() => setSearchOpen(true)}
        onMenu={() => setRailOpen((open) => !open)}
        onAddReservation={() => setAddReservationOpen(true)}
        onNavigate={changeModule}
        onOpenHeaderPanel={(panel) => setHeaderPanel((current) => current === panel ? null : panel)}
        onOpenAnnouncements={() => {
          setHeaderPanel(null);
          setAnnouncementsOpen(true);
        }}
        account={account}
      />
      <div className={`pms-layout ${railOpen ? "rail-expanded" : "rail-collapsed"} ${module === "stay" ? "stay-focus-layout" : ""}`}>
        <SideNavigation active={module} databaseMode={databaseMode} expanded={railOpen} onChange={changeModule} />
        <main className={`pms-main ${module === "stay" ? "stay-focus-main" : ""}`}>
          {module !== "stay" && <ModuleHeader module={module} onAddReservation={() => setAddReservationOpen(true)} />}
          {module === "dashboard" && <Dashboard onOpenReservation={openReservation} onNavigate={changeModule} reservations={reservationRecords} />}
          {module === "reservations" && <ReservationsView onOpenReservation={openReservation} onSearch={() => setReservationSearchOpen(true)} reservations={reservationRecords} />}
          {module === "stay" && <StayView dates={adjustedStayDates} onAssignRoom={() => setAssignRoomOpen(true)} onOpenReservation={(record) => openReservation(record || reservationRecords[2])} reservations={reservationRecords} />}
          {module === "rooms" && <RoomView onOpenReservation={openReservation} reservations={reservationRecords} />}
          {module === "rates" && <RatesSurface businessDates={adjustedBusinessDates} rateGroups={adjustedRateGroups} />}
          {module === "distribution" && <DistributionSurface />}
          {module === "guests" && <GuestSurface roomRows={roomRows} />}
          {module === "cashiering" && <CashieringSurface />}
          {module === "housekeeping" && <HousekeepingSurface roomRows={roomRows} />}
          {module === "reports" && <ReportsSurface />}
          {module === "configuration" && <ConfigurationSurface onAdd={setConfigDrawer} />}
        </main>
      </div>

      {searchOpen && (
        <GlobalSearchOverlay
          query={globalSearch}
          tab={searchTab}
          onTab={setSearchTab}
          onClose={() => setSearchOpen(false)}
          onOpenReservation={openReservation}
          reservations={reservationRecords}
        />
      )}

      <ReservationSummaryDrawer
        onClose={closeReservation}
        onEdit={() => openReservationWorkspace()}
        onOpenWorkspace={openReservationWorkspace}
        open={Boolean(reservation) && reservationStage === "summary"}
        reservation={reservation}
      />
      <ReservationWorkspace
        onBack={() => {
          setNestedDrawer(null);
          setReservationStage("summary");
        }}
        onClose={closeReservation}
        reservation={reservation}
        tab={reservationTab}
        nestedDrawer={nestedDrawer}
        open={Boolean(reservation) && reservationStage === "workspace"}
        onTab={setReservationTab}
        onNestedDrawer={setNestedDrawer}
      />
      <AddReservationDrawer open={addReservationOpen} onClose={() => setAddReservationOpen(false)} onReserve={reserveLocally} />
      <ReservationSearchDrawer open={reservationSearchOpen} onClose={() => setReservationSearchOpen(false)} onOpenReservation={openReservation} reservations={reservationRecords} />
      <AssignRoomDrawer open={assignRoomOpen} onClose={() => setAssignRoomOpen(false)} />
      <EntityDrawer open={Boolean(configDrawer)} title={configDrawer?.title || "Add Record"} onClose={() => setConfigDrawer(null)} fields={["Name", "Description"]} action={configDrawer?.action || "Save"} />
      <HeaderPopover account={account} kind={headerPanel} onClose={() => setHeaderPanel(null)} onLogout={onLogout} onNavigate={changeModule} />
      <ProductAnnouncementsDrawer open={announcementsOpen} onClose={() => setAnnouncementsOpen(false)} />
    </div>
  );
}

function AppHeader({ account, globalSearch, onGlobalSearch, onSearchFocus, onMenu, onAddReservation, onNavigate, onOpenHeaderPanel, onOpenAnnouncements }) {
  return (
    <header className="app-header">
      <div className="property-cluster">
        <Tooltip title="Open PMS navigation">
          <button className="header-icon" onClick={onMenu} aria-label="Open PMS navigation"><Menu size={20} /></button>
        </Tooltip>
        <button className="property-switch" onClick={() => onOpenHeaderPanel("property")} aria-label="Open property context">
          <span>SwissBlue Hotel Jeddah</span>
          <strong>22888</strong>
          <ChevronDown size={14} />
        </button>
        <button className="property-sync" onClick={() => onOpenHeaderPanel("property")} aria-label="Switch property"><RefreshCw size={16} /></button>
      </div>
      <div className="header-search">
        <Search size={16} />
        <Input
          aria-label="Search reservations, guests and more"
          variant="borderless"
          onChange={(event) => onGlobalSearch(event.target.value)}
          onFocus={onSearchFocus}
          placeholder="Search reservations, guests and more"
          value={globalSearch}
        />
        <span className="search-shortcut">cmd K</span>
      </div>
      <div className="header-actions">
        <Tooltip title="Add reservation"><button className="header-icon" onClick={onAddReservation} aria-label="Add reservation"><CalendarPlus size={19} /></button></Tooltip>
        <Tooltip title="Stay view"><button className="header-icon" onClick={() => onNavigate("stay")} aria-label="Stay view"><CalendarCheck size={19} /></button></Tooltip>
        <Tooltip title="Reservations"><button className="header-icon" onClick={() => onNavigate("reservations")} aria-label="Reservations"><CalendarDays size={19} /></button></Tooltip>
        <Tooltip title="Rates"><button className="header-icon" onClick={() => onNavigate("rates")} aria-label="Rates"><CircleDollarSign size={19} /></button></Tooltip>
        <Tooltip title="Quick menu"><button className="header-icon" onClick={() => onOpenHeaderPanel("quick-menu")} aria-label="Quick menu"><Grid3X3 size={19} /></button></Tooltip>
        <span className="header-separator" />
        <Tooltip title="System alerts"><button className="header-icon notification-button" onClick={() => onOpenHeaderPanel("system-alerts")} aria-label="System alerts"><Bell size={19} /><b>1</b></button></Tooltip>
        <Tooltip title="Product announcements"><button className="header-icon notification-button" onClick={onOpenAnnouncements} aria-label="Product announcements"><Megaphone size={19} /><b>9+</b></button></Tooltip>
        <span className="header-separator" />
        <Tooltip title={account.name}><button className="profile-control" onClick={() => onOpenHeaderPanel("profile")} aria-label="User menu"><span className="profile-avatar">{account.initials}</span><ChevronDown size={14} /></button></Tooltip>
      </div>
    </header>
  );
}

const quickMenuItems = [
  { label: "Dashboard", icon: Grid3X3, module: "dashboard" },
  { label: "Guest Statistics", icon: Users, module: "guests" },
  { label: "Guest Portal", icon: Mail, module: "guests" },
  { label: "User Activity", icon: UserRound, module: "reports" },
  { label: "Innalytics", icon: BarChart3, module: "reports" },
  { label: "Reputation Management", icon: Star, module: "guests" },
  { label: "Centralized Guest", icon: Building2, module: "guests" },
  { label: "Revenue Management", icon: CircleDollarSign, module: "rates", badge: "NEW" }
];

function BrandMark({ compact = false }) {
  return <span className={`brand-monogram ${compact ? "compact" : ""}`} aria-hidden="true"><b>G</b><b>H</b></span>;
}

function BrandWordmark({ compact = false }) {
  return <div className={`brand-wordmark ${compact ? "compact" : ""}`}><b><span>Gulf</span><span>Hero</span></b><small>{compact ? "PMS" : "PROPERTY MANAGEMENT"}</small></div>;
}

function HeaderPopover({ account, kind, onClose, onLogout, onNavigate }) {
  if (!kind) return null;

  return (
    <div className={`header-popover-layer ${kind}`}>
      <button className="header-popover-scrim" onClick={onClose} aria-label="Close header menu" />
      {kind === "quick-menu" && <section className="header-popover quick-menu-popover" aria-label="Quick menu">
        <div className="header-popover-arrow" />
        <div className="quick-menu-grid">
          {[quickMenuItems.slice(0, 4), quickMenuItems.slice(4)].map((column, index) => <div className="quick-menu-column" key={index}>{column.map((item) => {
            const Icon = item.icon;
            return <button key={item.label} onClick={() => onNavigate(item.module)}><Icon size={20} /><span>{item.label}{item.badge && <b>{item.badge}</b>}</span></button>;
          })}</div>)}
        </div>
      </section>}
      {kind === "system-alerts" && <SystemAlertsPopover onNavigate={onNavigate} />}
      {kind === "property" && <PropertyContextPopover account={account} onNavigate={onNavigate} />}
      {kind === "profile" && <ProfilePopover account={account} onClose={onClose} onLogout={onLogout} onNavigate={onNavigate} />}
    </div>
  );
}

function PropertyContextPopover({ account, onNavigate }) {
  return <section className="header-popover property-context-popover" aria-label="Property context"><div className="header-popover-arrow" /><div className="property-context-heading"><Building2 size={19} /><div><strong>SwissBlue Hotel Jeddah</strong><span>Property 22888</span></div><StatusTag value="Active" /></div><div className="property-context-facts"><p><span>Your role</span><b>{account.role}</b></p><p><span>Property access</span><b>1 assigned property</b></p></div><div className="property-context-note"><ShieldCheck size={15} /><span>Your role and property permissions are active.</span></div><button className="property-context-action" onClick={() => onNavigate("configuration")}>Review property access <ChevronRight size={15} /></button></section>;
}

function SystemAlertsPopover({ onNavigate }) {
  const [tab, setTab] = useState("unmapped");
  const tabs = [
    { id: "unmapped", label: "Unmapped rate plans", icon: CircleDollarSign },
    { id: "overbookings", label: "Overbookings", icon: CalendarDays },
    { id: "channels", label: "Channels", icon: RefreshCw, badge: "1" }
  ];
  const content = {
    unmapped: [{ title: "Reservation GH-10218 needs a rate plan mapping", detail: "The reservation was received without a matching rate plan.", time: "09/07/2026 11:40 AM" }],
    overbookings: [{ title: "Executive Suite needs an inventory review", detail: "The selected stay dates are close to the available room threshold.", time: "09/07/2026 10:32 AM" }, { title: "Superior Twin Room needs an inventory review", detail: "Review the requested arrival dates before confirming additional stays.", time: "08/07/2026 02:18 AM" }],
    channels: [{ title: "Direct", state: "Enabled", tone: "enabled" }, { title: "Travel Agent", state: "Review", tone: "review" }, { title: "Corporate", state: "Enabled", tone: "enabled" }, { title: "Online Booking", state: "Review", tone: "review" }]
  };
  const current = content[tab];
  return <section className="header-popover system-alerts-popover" aria-label="System alerts"><div className="header-popover-arrow" /><div className="alert-tabs">{tabs.map((item) => {
    const Icon = item.icon;
    return <Tooltip key={item.id} title={item.label}><button className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)} aria-label={item.label}><Icon size={21} />{item.badge && <b>{item.badge}</b>}</button></Tooltip>;
  })}</div><div className="alert-popover-content"><div className="alert-popover-heading"><strong>{tabs.find((item) => item.id === tab).label}</strong><button onClick={() => onNavigate(tab === "channels" ? "distribution" : tab === "overbookings" ? "stay" : "rates")}>See all</button></div><div className="alert-card-list">{current.map((item) => <article className={`alert-card ${item.tone || ""}`} key={item.title}><i /><div><strong>{item.title}</strong>{item.detail && <p>{item.detail}</p>}{item.state && <span>{item.state}</span>}{item.time && <time>{item.time}</time>}</div></article>)}</div></div></section>;
}

function ProfilePopover({ account, onClose, onLogout, onNavigate }) {
  const primaryActions = [
    { label: "Go to Frontoffice", icon: CalendarDays, module: "reservations" },
    { label: "Point of Sale", icon: CircleDollarSign, module: "cashiering" },
    { label: "Security Advisory", icon: ShieldCheck, module: "configuration" }
  ];
  return <section className="header-popover profile-popover" aria-label="User menu"><div className="header-popover-arrow" /><div className="profile-popover-user"><span>{account.initials}</span><div><b>{account.name}</b><small>{account.role}</small></div><KeyRound size={19} /></div><div className="profile-menu-list">{primaryActions.map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => onNavigate(item.module)}><Icon size={18} />{item.label}</button>; })}</div><div className="profile-help"><strong>NEED HELP?</strong><button onClick={onClose}><Building2 size={18} />Gulf Hero Academy</button><button onClick={onClose}><Info size={18} />Help Center</button></div><button className="profile-logout" onClick={onLogout}><LogOut size={18} />Logout</button></section>;
}

const announcements = [
  { date: "15 Jun 2026", title: "Clearer cash drawer accountability", body: "Cash drawer controls bring sessions, balances, and accountability together for the front desk and every operational department." },
  { date: "11 Jun 2026", title: "A simplified Stay View", body: "The Stay View has been refreshed to make room status, guest stays, and the next operational action easier to scan." },
  { date: "09 Jun 2026", title: "More consistent rate review", body: "Rate plan and inventory context now stay together so revenue teams can review the day with less switching between screens." }
];

function ProductAnnouncementsDrawer({ open, onClose }) {
  return <Drawer className="announcement-drawer" onClose={onClose} open={open} placement="right" title="What's new in Gulf Hero PMS" size={460}><div className="announcement-list">{announcements.map((item) => <article className="announcement-card" key={item.title}><time>{item.date}</time><h3>{item.title}</h3><p>{item.body}</p><button className="announcement-read">Read More</button><div className="announcement-feedback"><Tooltip title="Not useful"><button aria-label="Not useful"><X size={15} /></button></Tooltip><Tooltip title="Neutral"><button aria-label="Neutral"><Info size={15} /></button></Tooltip><Tooltip title="Useful"><button aria-label="Useful"><CheckCircle2 size={15} /></button></Tooltip></div></article>)}</div></Drawer>;
}

function SideNavigation({ active, databaseMode, expanded, onChange }) {
  return (
    <aside className="side-navigation" aria-label="PMS modules">
      <div className="nav-label">Operations</div>
      {navigation.slice(0, 4).map((item) => <NavigationItem key={item.id} item={item} active={active} expanded={expanded} onChange={onChange} />)}
      <div className="nav-label">Revenue</div>
      {navigation.slice(4, 6).map((item) => <NavigationItem key={item.id} item={item} active={active} expanded={expanded} onChange={onChange} />)}
      <div className="nav-label">Management</div>
      {navigation.slice(6).map((item) => <NavigationItem key={item.id} item={item} active={active} expanded={expanded} onChange={onChange} />)}
      <div className="nav-fill" />
      <div className="nav-footer">
        <div className="side-brand"><BrandMark compact />{expanded && <BrandWordmark compact />}</div>
        {expanded && <div className="nav-security"><ShieldCheck size={14} /><span>{databaseMode === "configured" ? "Secure property workspace" : "Property workspace ready"}</span></div>}
      </div>
    </aside>
  );
}

function NavigationItem({ item, active, expanded, onChange }) {
  const Icon = item.icon;
  return (
    <Tooltip title={expanded ? undefined : item.label} placement="right">
      <button className={`nav-item ${active === item.id ? "active" : ""}`} onClick={() => onChange(item.id)}>
        <Icon size={18} />
        {expanded && <span>{item.label}</span>}
      </button>
    </Tooltip>
  );
}

function ModuleHeader({ module, onAddReservation }) {
  const item = navigation.find((entry) => entry.id === module) || navigation[0];
  const labels = {
    dashboard: `Operational overview for ${stayDates[0].day} ${stayDates[0].month} 2026`,
    stay: "Plan occupancy and room allocation across the business date",
    rooms: "Live physical room status and housekeeping readiness",
    reservations: "Booking command center",
    rates: "Inventory, rate plans, restrictions and availability",
    distribution: "Channel activity and rate delivery",
    guests: "Guest and partner records",
    cashiering: "Folio balances and payment operations",
    housekeeping: "Room status, maintenance and tasks",
    reports: "Operational, revenue and audit reports",
    configuration: "Property setup, master data and permissions"
  };
  return (
    <div className="module-header">
      <div>
        <div className="breadcrumb">PMS <ChevronRight size={13} /> <span>{item.label}</span></div>
        <h1>{item.label}</h1>
        <p>{labels[module]}</p>
      </div>
      {module !== "configuration" && module !== "reports" && (
        <Button className="primary-command" icon={<Plus size={15} />} onClick={onAddReservation} size="small">Add Reservation</Button>
      )}
    </div>
  );
}

function Dashboard({ onOpenReservation, onNavigate, reservations }) {
  const arrivals = reservations.filter((record) => record.status === "Arriving");
  const departures = reservations.filter((record) => record.status === "Due out");
  const inHouse = reservations.filter((record) => record.status === "In house");
  const inHouseAdults = inHouse.reduce((total, record) => total + record.adults, 0);
  const inHouseChildren = inHouse.reduce((total, record) => total + record.children, 0);
  const occupancyDates = businessDates.map((date) => {
    const iso = date.iso;
    const sold = new Set(reservations.filter((record) => record.arrivalISO <= iso && record.departureISO > iso).map((record) => record.room)).size;
    return { ...date, sold, available: Math.max(76 - sold, 0) };
  });
  const metrics = [
    ["Arrivals", String(arrivals.length).padStart(2, "0"), `${arrivals.filter((record) => Number(record.balance.replace(/,/g, "")) > 0).length} with balance`, CalendarPlus, "yellow", "reservations"],
    ["Departures", String(departures.length).padStart(2, "0"), `${departures.filter((record) => Number(record.balance.replace(/,/g, "")) > 0).length} folios to settle`, CalendarDays, "purple", "reservations"],
    ["Guest in house", String(inHouse.length).padStart(2, "0"), `${inHouseAdults} adults, ${inHouseChildren} children`, Users, "blue", "stay"],
    ["Room status", "76", `${roomStateCounts.Vacant} vacant, ${roomStateCounts.Dirty} dirty`, BedDouble, "green", "rooms"]
  ];
  return (
    <section className="dashboard-view">
      <div className="metric-grid">
        {metrics.map(([label, value, detail, Icon, tone, target]) => (
          <button className="metric-tile" onClick={() => onNavigate(target)} key={label}>
            <div className={`metric-icon ${tone}`}><Icon size={20} /></div>
            <div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div>
            <ChevronRight size={17} />
          </button>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="dashboard-panel arrivals-panel">
          <div className="panel-title"><div><h2>Today&apos;s desk</h2><p>Arrivals, departures and priority stays</p></div><button onClick={() => onNavigate("reservations")}>Open reservations <ChevronRight size={15} /></button></div>
          <div className="arrival-list">
            {[...arrivals, ...departures, ...inHouse].slice(0, 4).map((reservation) => (
              <button className="arrival-row" key={reservation.recordKey || reservation.id} onClick={() => onOpenReservation(reservation)}>
                <span className={`arrival-avatar ${reservation.vip ? "vip" : ""}`}>{reservation.guest.split(" ").map((part) => part[0]).join("")}</span>
                <span className="arrival-copy"><strong>{reservation.guest}</strong><small>{reservation.roomType} - {reservation.room}</small></span>
                <span className="arrival-time"><b>{reservation.status}</b><small>{reservation.arrival} to {reservation.departure}</small></span>
                <ChevronRight size={16} />
              </button>
            ))}
          </div>
        </section>
        <section className="dashboard-panel occupancy-panel">
          <div className="panel-title"><div><h2>Occupancy outlook</h2><p>Next 10 business days</p></div><span className="positive-change">+4.2%</span></div>
          <div className="occupancy-chart">
            {occupancyDates.map((date) => <div className="chart-column" key={date.day}><div className="chart-track"><span style={{ height: `${Math.max(13, Math.round((date.sold / 76) * 100))}%` }} /></div><b>{date.sold}</b><small>{date.dow}</small></div>)}
          </div>
        </section>
      </div>
      <div className="dashboard-grid lower">
        <section className="dashboard-panel room-summary-panel">
          <div className="panel-title"><div><h2>Room readiness</h2><p>Physical state by floor</p></div><button onClick={() => onNavigate("rooms")}>Room View <ChevronRight size={15} /></button></div>
          <div className="readiness-grid">
            {[["Clean", 49, "success"], ["Dirty", 5, "danger"], ["Inspected", 18, "info"], ["Maintenance", 4, "warning"]].map(([label, value, tone]) => <div className="readiness-item" key={label}><span className={tone} /><b>{value}</b><small>{label}</small></div>)}
          </div>
        </section>
        <section className="dashboard-panel activity-panel">
          <div className="panel-title"><div><h2>Activity</h2><p>Recent property changes</p></div></div>
          <ul className="activity-list"><li><i className="success" /><span><strong>Rate review completed</strong><small>Room Only Flexible updated successfully</small></span><time>8 min</time></li><li><i className="yellow" /><span><strong>Room 214 flagged</strong><small>Maintenance task created by housekeeping</small></span><time>24 min</time></li><li><i className="info" /><span><strong>New reservation received</strong><small>Direct booking for Superior King Room</small></span><time>39 min</time></li></ul>
        </section>
      </div>
    </section>
  );
}

function ReservationsView({ onOpenReservation, onSearch, reservations }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [mode, setMode] = useState("cards");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [visibleLimit, setVisibleLimit] = useState(48);
  const visibleRows = useMemo(() => reservations.filter((record) => {
    const statusMatches = activeFilter === "All" || record.status === activeFilter;
    const queryMatches = `${record.guest} ${record.id} ${record.room}`.toLowerCase().includes(query.toLowerCase());
    return statusMatches && queryMatches;
  }), [activeFilter, query, reservations]);
  const displayedRows = visibleRows.slice(0, visibleLimit);
  useEffect(() => setVisibleLimit(48), [activeFilter, mode, query]);
  const columns = [
    { title: "Guest Name", dataIndex: "guest", render: (name, record) => <button className="table-link" onClick={() => onOpenReservation(record)}>{name}</button> },
    { title: "Res. No.", dataIndex: "id", width: 105 },
    { title: "Arrival", dataIndex: "arrival", width: 100 },
    { title: "Departure", dataIndex: "departure", width: 100 },
    { title: "Rate Type", dataIndex: "rateType", width: 170 },
    { title: "Room Details", dataIndex: "roomType", render: (type, record) => `${record.room} - ${type}` },
    { title: "Status", dataIndex: "status", width: 105, render: (status) => <StatusTag value={status} /> },
    { title: "Balance", dataIndex: "balance", width: 105, render: (balance) => `SAR ${balance}` }
  ];
  const filters = [["All", "All reservations", reservations.length], ["Arriving", "Arriving", reservations.filter((record) => record.status === "Arriving").length], ["Confirmed", "Confirmed", reservations.filter((record) => record.status === "Confirmed").length], ["In house", "In house", reservations.filter((record) => record.status === "In house").length], ["Due out", "Due out", reservations.filter((record) => record.status === "Due out").length], ["Checked out", "Checked out", reservations.filter((record) => record.status === "Checked out").length]];
  return (
    <section className="reservations-view">
      <div className="view-tabs-toolbar reservation-primary-toolbar">
        <Tabs activeKey={activeFilter} aria-label="Reservation status" className="pms-tabs reservation-status-tabs" items={filters.map(([key, label, count]) => ({ key, label: <span>{label}<b>{count}</b></span> }))} onChange={setActiveFilter} size="small" />
        <div className="toolbar-actions"><button className={`view-toggle ${mode === "cards" ? "active" : ""}`} onClick={() => setMode("cards")} aria-label="Card view"><Grid3X3 size={16} /></button><button className={`view-toggle ${mode === "table" ? "active" : ""}`} onClick={() => setMode("table")} aria-label="List view"><ClipboardList size={16} /></button><Button icon={<Users size={14} />} onClick={() => setNotice("Selected reservations are ready to be grouped.")} size="small">Make Group</Button><Button icon={<Settings size={14} />} onClick={() => setNotice("Column settings are available in the table view.")} size="small">Manage Columns</Button><Button icon={<Download size={14} />} onClick={() => setNotice(`${visibleRows.length} visible reservations prepared for export.`)} size="small">Export</Button></div>
      </div>
      <div className="reservation-query-toolbar"><Input allowClear aria-label="Filter visible reservations" onChange={(event) => setQuery(event.target.value)} placeholder="Search visible reservations by guest, number or room" prefix={<Search size={15} />} value={query} /><span><b>{visibleRows.length}</b> {visibleRows.length === 1 ? "result" : "results"} in {filters.find(([key]) => key === activeFilter)?.[1].toLowerCase()}</span><Button icon={<SlidersHorizontal size={14} />} onClick={onSearch} size="small">Advanced search</Button></div>
      {mode === "cards" ? <div className="reservation-cards">{displayedRows.map((record) => <ReservationCard key={record.recordKey || record.id} reservation={record} onClick={() => onOpenReservation(record)} />)}</div> : <div className="table-frame"><Table className="pms-table" columns={columns} dataSource={displayedRows} pagination={false} rowKey={(record) => record.recordKey || record.id} size="small" /></div>}
      {displayedRows.length < visibleRows.length && <div className="reservation-load-more"><span>Showing {displayedRows.length} of {visibleRows.length}</span><Button onClick={() => setVisibleLimit((limit) => Math.min(limit + 48, visibleRows.length))}>Load 48 more</Button></div>}
      {notice && <div className="surface-status"><CheckCircle2 size={14} />{notice}</div>}
    </section>
  );
}

function ReservationCard({ reservation, onClick }) {
  return (
    <button className="reservation-card" onClick={onClick}>
      <div className="reservation-card-top"><span className={`guest-avatar ${reservation.vip ? "vip" : ""}`}>{reservation.guest.split(" ").map((part) => part[0]).join("")}</span><span><strong>{reservation.guest}</strong><small>{reservation.id} - {reservation.source}</small></span><MoreVertical size={17} /></div>
      <div className="reservation-stay" aria-label={`${reservation.arrival} arrival, ${reservation.nights} nights, ${reservation.departure} departure`}>
        <div className="reservation-stay-endpoint arrival"><small>Arrival</small><span>{reservation.arrival}</span></div>
        <b className="reservation-night-count"><span>{reservation.nights}</span><small>Nights</small></b>
        <div className="reservation-stay-endpoint departure"><small>Departure</small><span>{reservation.departure}</span></div>
      </div>
      <div className="reservation-meta"><span><BedDouble size={14} /> {reservation.room} / {reservation.roomType}</span><StatusTag value={reservation.status} /></div>
      <div className="reservation-card-footer"><span>Balance</span><strong>SAR {reservation.balance}</strong></div>
    </button>
  );
}

function StayView({ dates, onAssignRoom, onOpenReservation, reservations }) {
  const [activeStatus, setActiveStatus] = useState("All");
  const [ratePlan, setRatePlan] = useState("Corporate BB");
  const [roomTypeFilter, setRoomTypeFilter] = useState("All");
  const [infoOpen, setInfoOpen] = useState(false);
  const stayRoomGroups = useMemo(() => buildStayRoomGroups(reservations, dates), [dates, reservations]);
  const stayRoomStateCounts = useMemo(() => stayStateCounts(stayRoomGroups), [stayRoomGroups]);
  const [expandedGroups, setExpandedGroups] = useState(() => new Set([stayRoomGroups[0]?.name]));
  const reservationByKey = useMemo(() => new Map(reservations.map((record) => [record.recordKey || record.id, record])), [reservations]);
  const visibleGroups = stayRoomGroups
    .filter((group) => roomTypeFilter === "All" || group.name === roomTypeFilter)
    .map((group) => ({ ...group, rooms: activeStatus === "All" ? group.rooms : group.rooms.filter((room) => room.status === activeStatus || room.condition === activeStatus) }))
    .filter((group) => activeStatus === "All" || group.rooms.length);
  const allVisibleExpanded = visibleGroups.length > 0 && visibleGroups.every((group) => expandedGroups.has(group.name));
  const selectStatus = (status) => {
    setActiveStatus(status);
    const matches = stayRoomGroups.filter((group) => status === "All" || group.rooms.some((room) => room.status === status || room.condition === status));
    setExpandedGroups(new Set(status === "All" ? matches.slice(0, 1).map((group) => group.name) : matches.map((group) => group.name)));
  };
  const toggleGroup = (groupName) => setExpandedGroups((current) => {
    const next = new Set(current);
    if (next.has(groupName)) next.delete(groupName);
    else next.add(groupName);
    return next;
  });
  const toggleAllGroups = () => setExpandedGroups(allVisibleExpanded ? new Set() : new Set(visibleGroups.map((group) => group.name)));
  const changeRoomType = (value) => {
    setRoomTypeFilter(value);
    if (value !== "All") setExpandedGroups(new Set([value]));
  };
  const ratePlanOptionsForStay = [
    { value: "Corporate BB", label: "Corporate BB" },
    { value: "Room Only Flexible", label: "Room Only Flexible" },
    { value: "Room Only Non-Refundable", label: "Room Only Non-Refundable" }
  ];

  return (
    <section className="stay-view">
      <div className="stay-board">
        <div className="stay-toolbar">
          <div className="stay-date-control"><PmsDatePicker aria-label="Stay View business date" defaultValue={reservationReferenceDateInput} size="small" /></div>
          <div className="status-pills" aria-label="Stay View room filters">{statusOptions.map((status) => <button aria-pressed={activeStatus === status} className={activeStatus === status ? "active" : ""} onClick={() => selectStatus(status)} key={status}><span>{status}</span><b>{stayRoomStateCounts[status]}</b></button>)}</div>
          <div className="stay-toolbar-actions">
            <Select aria-label="Stay View rate plan" onChange={setRatePlan} options={ratePlanOptionsForStay} size="small" value={ratePlan} />
            <Button onClick={onAssignRoom} size="small">Assign Room</Button>
            <button aria-expanded={infoOpen} aria-label="Open Stay View indicators" className={`stay-info-button ${infoOpen ? "active" : ""}`} onClick={() => setInfoOpen((open) => !open)} type="button"><Info size={17} /></button>
          </div>
        </div>
        {infoOpen && <StayInfoPopover onClose={() => setInfoOpen(false)} />}
        <div className="stay-grid-frame"><div className="stay-grid" style={{ "--stay-columns": dates.length }}>
          <div className="stay-row stay-dates">
            <div className="stay-room-label stay-grid-controls">
              <button aria-label={allVisibleExpanded ? "Fold all room types" : "Expand all room types"} className="stay-collapse-all" onClick={toggleAllGroups} type="button">{allVisibleExpanded ? <Minus size={16} /> : <Plus size={16} />}</button>
              <Select aria-label="Filter Stay View by room type" onChange={changeRoomType} options={[{ value: "All", label: "Room Type" }, ...stayReferenceGroupDefinitions.map((group) => ({ value: group.name, label: group.name }))]} size="small" value={roomTypeFilter} />
              <button aria-label="Previous date window" className="stay-window-nav" disabled type="button"><ChevronLeft size={17} /></button>
            </div>
            {dates.map((date, index) => <div className={`stay-date ${index === 0 ? "today" : ""}`} key={date.day}><span>{date.dow}</span><b>{date.day} {date.month}</b>{index === dates.length - 1 && <button aria-label="Next date window" className="stay-window-nav next" disabled type="button"><ChevronRight size={17} /></button>}</div>)}
          </div>
          {visibleGroups.length ? visibleGroups.map((group) => <StayRoomGroup dates={dates} expanded={expandedGroups.has(group.name)} group={group} key={group.name} onOpenReservation={(booking) => { const record = reservationByKey.get(booking.reservationKey); if (record) onOpenReservation(record); }} onToggle={toggleGroup} ratePlan={ratePlan} />) : <div className="stay-empty"><Search size={20} /><b>No rooms match this filter</b><span>Choose another room state to return to the occupancy board.</span></div>}
          <div className="stay-board-spacer" />
          <div className="stay-row stay-summary inventory-summary"><div className="stay-room-label">Available Inventory <Info size={13} /></div>{dates.map((date) => <div key={date.day}><b>{date.available}</b></div>)}</div>
          <div className="stay-row stay-summary occupancy"><div className="stay-room-label">Occupancy (%)</div>{dates.map((date) => <div key={date.day}><span className="occupancy-track"><i style={{ width: `${date.occupancy}%` }} /></span><b>{date.occupancy}%</b></div>)}</div>
        </div></div>
      </div>
      {reservations.some((record) => record.localOnly && record.room === "Unassigned") && <div className="surface-status"><CheckCircle2 size={14} />Local reservations are held against room-type availability until a room is assigned.</div>}
    </section>
  );
}

function StayRoomGroup({ dates, expanded, group, onOpenReservation, onToggle, ratePlan }) {
  const sourceRate = roomTypes.find((roomType) => roomType.name === (group.inventoryName || group.name))?.rate;
  const rate = ratePlan === "Corporate BB" ? group.rate : ratePlan === "Room Only Non-Refundable" ? Math.round((sourceRate || group.rate || 0) * 0.88) : sourceRate || group.rate;
  return <>
    <div className="stay-row room-group-line"><button aria-expanded={expanded} className="stay-room-label stay-group-toggle" onClick={() => onToggle(group.name)} type="button">{expanded ? <Minus size={16} /> : <Plus size={16} />}<b>{group.name}</b></button>{dates.map((date, index) => <div className="stay-group-summary-cell" key={date.day}><b>{group.availability[index]}</b><small>{rate === null || rate === undefined ? "N/A" : rate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</small></div>)}</div>
    {expanded && group.rooms.map((room) => <div className="stay-row room-line" key={room.number}><div className="stay-room-label"><b>{room.number}</b><span className="stay-room-indicators"><i title="No Smoking"><CigaretteOff size={12} /></i><i className="clean" title="Clean"><BedDouble size={12} /></i></span></div>{dates.map((date) => <div className="stay-cell" key={`${room.number}-${date.day}`} />)}{room.bookings.map((booking, bookingIndex) => <button aria-label={`${booking.label}, ${booking.status}`} className={`booking-strip ${booking.tone}`} key={`${room.number}-${booking.reservationKey}-${bookingIndex}`} onClick={(event) => { event.stopPropagation(); onOpenReservation(booking); }} style={{ gridColumn: `${booking.start + 2} / span ${booking.length}` }} type="button"><span className="booking-source"><Building2 size={11} /></span><span className="booking-label">{booking.label}</span></button>)}</div>)}
  </>;
}

function StayInfoPopover({ onClose }) {
  const bookingStatuses = [["Checked In Today", "#d90000"], ["Checked Out", "#1010b8"], ["Due Out", "#aa6b2c"], ["Arrival", "#009b16"], ["Maintenance Block", "#1514b8"], ["In House", "#d90000"], ["Dayuse Reservation", "#1bc700"], ["Dayuse", "#a70000"]];
  const bookingIndicators = [[Crown, "Group Owner", "gold"], [Users, "Group Booking", "rose"], [CircleDollarSign, "Payment Pending", "rose"], [Hand, "Stop Room Move", "orange"], [UserRound, "Single Lady", "purple"], [Star, "VIP Guest", "orange"], [GitBranch, "Split Reservation", "mint"]];
  const roomIndicators = [[CigaretteOff, "No Smoking", "slate"], [Cigarette, "Smoking", "slate"], [BedDouble, "Dirty", "rose"], [CheckCircle2, "Clean", "sage"], [Link2, "Connected Rooms", "blue"], [ClipboardList, "Work Order", "slate"]];
  const otherIndicators = [["", "Unassigned Room", "blue-dot"], ["", "Inventory", "sand-dot"], ["", "Unconfirmed Booking", "red-dot"]];
  return <><button aria-label="Close Stay View indicators" className="stay-info-scrim" onClick={onClose} type="button" /><aside aria-label="Stay View indicators" className="stay-info-popover" role="dialog"><StayInfoSection title="Booking Status">{bookingStatuses.map(([label, color]) => <span className="stay-info-status" key={label}><i style={{ background: color }} />{label}</span>)}</StayInfoSection><StayInfoSection title="Booking Indicators">{bookingIndicators.map(([Icon, label, tone]) => <span key={label}><i className={`stay-indicator-icon ${tone}`}><Icon size={13} /></i>{label}</span>)}</StayInfoSection><StayInfoSection title="Room Indicators">{roomIndicators.map(([Icon, label, tone]) => <span key={label}><i className={`stay-indicator-icon ${tone}`}><Icon size={13} /></i>{label}</span>)}</StayInfoSection><StayInfoSection title="Other">{otherIndicators.map(([icon, label, tone]) => <span key={label}><i className={`stay-indicator-icon ${tone}`}>{icon}</i>{label}</span>)}</StayInfoSection></aside></>;
}

function StayInfoSection({ children, title }) {
  return <section className="stay-info-section"><h3>{title}</h3><div>{children}</div></section>;
}

function RoomView({ onOpenReservation, reservations }) {
  const [filter, setFilter] = useState("All");
  const [dateIndex, setDateIndex] = useState(0);
  const [rooms, setRooms] = useState(roomRows);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const filteredRooms = filter === "All" ? rooms : rooms.filter((room) => room.status === filter || room.condition === filter);
  const date = businessDates[dateIndex];
  const dateLabel = date.iso.split("-").reverse().join("/");
  const updateRoom = (nextRoom) => {
    setRooms((current) => current.map((room) => room.number === nextRoom.number ? nextRoom : room));
    setSelectedRoom(nextRoom);
  };

  return (
    <section className="room-view">
      <div className="room-toolbar room-control-toolbar">
        <div className="room-date-control" aria-label={`Business date ${dateLabel}`}>
          <button aria-label="Previous business date" disabled={dateIndex === 0} onClick={() => setDateIndex((index) => Math.max(0, index - 1))}><ChevronLeft size={16} /></button>
          <span><CalendarDays size={15} />{dateLabel}</span>
          <button aria-label="Next business date" disabled={dateIndex === businessDates.length - 1} onClick={() => setDateIndex((index) => Math.min(businessDates.length - 1, index + 1))}><ChevronRight size={16} /></button>
        </div>
        <div className="room-state-filters" aria-label="Room state filters">
          {statusOptions.map((status) => <button aria-pressed={filter === status} className={`room-filter ${filter === status ? "active" : ""}`} onClick={() => setFilter(status)} key={status}><span>{status}</span><b>{roomStateCounts[status]}</b></button>)}
        </div>
      </div>
      <div className="room-board">{filteredRooms.map((room) => <RoomStateCard key={room.number} onOpen={() => setSelectedRoom(room)} room={room} />)}</div>
      {selectedRoom && <RoomDetailDrawer key={selectedRoom.number} onClose={() => setSelectedRoom(null)} onOpenReservation={onOpenReservation} onSave={updateRoom} reservations={reservations} room={selectedRoom} />}
    </section>
  );
}

function RoomStateCard({ onOpen, room }) {
  return <button aria-label={`Open room ${room.number} details`} className={`room-card status-${room.status.toLowerCase().replace(" ", "-")}`} onClick={onOpen}><div className="room-card-header"><strong>{room.number}</strong><StatusTag value={room.status} /></div><p>{room.type}</p><b>{room.guest}</b><small><span className={`condition-dot ${room.condition.toLowerCase()}`} />{room.condition}<i />{room.note}<ChevronRight size={14} /></small></button>;
}

function RoomDetailDrawer({ onClose, onOpenReservation, onSave, reservations, room }) {
  const [tab, setTab] = useState("Overview");
  const [condition, setCondition] = useState(room.condition);
  const [note, setNote] = useState(room.note);
  const [saved, setSaved] = useState(false);
  const reservation = reservations.find((record) => record.room === room.number && ["In house", "Arriving", "Due out", "Confirmed"].includes(record.status));
  const saveRoomStatus = () => {
    onSave({ ...room, condition, note });
    setSaved(true);
  };

  return <Drawer className="room-detail-drawer" onClose={onClose} open placement="right" size={460} title={`Room ${room.number}`}><div className="room-detail-summary"><div><span>{room.type}</span><b>{room.guest}</b></div><StatusTag value={room.status} /></div><Tabs activeKey={tab} className="pms-tabs room-detail-tabs" items={[{ key: "Overview", label: "Overview" }, { key: "Housekeeping", label: "Housekeeping" }, { key: "Stay", label: "Stay" }]} onChange={setTab} size="small" />{tab === "Overview" ? <RoomOverview hasReservation={Boolean(reservation)} onOpenReservation={() => onOpenReservation(reservation)} onShowHousekeeping={() => setTab("Housekeeping")} room={room} /> : tab === "Housekeeping" ? <RoomHousekeeping condition={condition} note={note} onChangeCondition={setCondition} onChangeNote={setNote} onSave={saveRoomStatus} saved={saved} /> : <RoomStay hasReservation={Boolean(reservation)} onOpenReservation={() => onOpenReservation(reservation)} onShowHousekeeping={() => setTab("Housekeeping")} reservation={reservation} room={room} />}</Drawer>;
}

function RoomOverview({ hasReservation, onOpenReservation, onShowHousekeeping, room }) {
  return <div className="room-detail-body"><div className="room-detail-facts"><p><span>Occupancy status</span><StatusTag value={room.status} /></p><p><span>Room condition</span><b>{room.condition}</b></p><p><span>Operational note</span><b>{room.note}</b></p><p><span>Business date</span><b>{reservationReferenceDateInput}</b></p></div><div className="room-detail-callout"><Wrench size={16} /><span>Room-state actions follow the current property workflow.</span></div><div className="room-detail-actions">{hasReservation && <Button icon={<ClipboardList size={14} />} onClick={onOpenReservation}>Open stay</Button>}<Button className="primary-command" icon={<CheckCircle2 size={14} />} onClick={onShowHousekeeping}>Review housekeeping</Button></div></div>;
}

function RoomHousekeeping({ condition, note, onChangeCondition, onChangeNote, onSave, saved }) {
  return <div className="room-detail-body"><label className="room-detail-field">Room condition<Select onChange={onChangeCondition} options={roomConditionOptions.map((value) => ({ value, label: value }))} value={condition} /></label><label className="room-detail-field">Operational note<Input onChange={(event) => onChangeNote(event.target.value)} value={note} /></label><div className="room-detail-callout"><BedDouble size={16} /><span>Updates are recorded against the current room status.</span></div>{saved && <div className="surface-status"><CheckCircle2 size={14} />Room status updated.</div>}<div className="room-detail-actions"><Button onClick={() => { onChangeCondition(roomConditionOptions[0]); onChangeNote("Ready for front desk"); }}>Mark clean</Button><Button className="primary-command" icon={<CheckCircle2 size={14} />} onClick={onSave}>{saved ? "Saved" : "Save room status"}</Button></div></div>;
}

function RoomStay({ hasReservation, onOpenReservation, onShowHousekeeping, reservation }) {
  return <div className="room-detail-body">{hasReservation ? <><div className="room-detail-facts"><p><span>Reservation</span><b>{reservation.id}</b></p><p><span>Stay dates</span><b>{reservation.arrival} to {reservation.departure}</b></p><p><span>Reservation status</span><StatusTag value={reservation.status} /></p></div><div className="room-detail-actions"><Button className="primary-command" icon={<ClipboardList size={14} />} onClick={onOpenReservation}>Open reservation</Button></div></> : <><div className="room-empty-state"><BedDouble size={22} /><strong>Available for assignment</strong><span>Use housekeeping to review the physical room state before a future assignment.</span></div><div className="room-detail-actions"><Button className="primary-command" icon={<Wrench size={14} />} onClick={onShowHousekeeping}>Review housekeeping</Button></div></>}</div>;
}

function RatesView() {
  const [tab, setTab] = useState("Rates");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({ plan: rateGroups[0].plans[0], date: businessDates[0] });
  const [detailOpen, setDetailOpen] = useState(false);
  const groups = useMemo(() => rateGroups.map((group) => ({ ...group, plans: group.plans.filter((plan) => `${plan.name} ${plan.code}`.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.plans.length), [query]);
  return <section className="rates-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={["Inventory", "Rates", "Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"].map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Upload size={14} />} size="small">Import</Button><Button icon={<Download size={14} />} size="small">Export</Button></div></div><div className="rates-toolbar"><Select defaultValue="OTA Common Plan" options={[{ value: "OTA Common Plan", label: "OTA Common Plan" }, { value: "Direct Channel Plan", label: "Direct Channel Plan" }]} size="small" /><Input allowClear onChange={(event) => setQuery(event.target.value)} placeholder="Room type or rate plan" prefix={<Search size={15} />} value={query} /><Radio.Group defaultValue="Base Rates" optionType="button" options={["Base Rates", "Extra Adult Rates", "Extra Child Rates"]} size="small" /><Checkbox defaultChecked>Hide Derived Rate Plans</Checkbox><Checkbox defaultChecked>Rates Inclusive Tax</Checkbox><Button disabled icon={<Save size={14} />} size="small">Save</Button></div><div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><div className="rate-grid-row rate-date-row"><div className="rate-grid-label"><ChevronLeft size={16} /><PmsDatePicker aria-label="Rates start date" defaultValue={reservationReferenceDateInput} size="small" /><ChevronRight size={16} /></div>{businessDates.map((date) => <div className="rate-date" key={date.day}><span>{date.dow}</span><b>{date.day}</b><small>{date.month}</small></div>)}</div>{groups.map((group) => <React.Fragment key={group.name}><div className="rate-grid-row rate-group-row"><div className="rate-grid-label"><BedDouble size={16} /><b>{group.name}</b><span>{group.rooms}</span></div>{group.inventory.map((count, index) => <div key={index}>{count}</div>)}</div>{group.plans.map((plan) => <div className="rate-grid-row rate-plan-row" key={plan.code}><div className="rate-grid-label"><span>{plan.name}</span><button onClick={() => { setSelected({ plan, date: businessDates[0] }); setDetailOpen(true); }} aria-label={`Open details for ${plan.name}`}><Info size={14} /></button></div>{businessDates.map((date) => <button className={selected.plan.code === plan.code && selected.date.day === date.day ? "selected-rate" : ""} key={date.day} onClick={() => setSelected({ plan, date })}>{plan.rate.toFixed(2)}</button>)}</div>)}</React.Fragment>)}<RateSummary label="Sold Rooms" values={businessDates.map((date) => date.sold)} /><RateSummary label="Available Inventory" values={businessDates.map((date) => date.available)} /><RateSummary label="Total Rooms" values={businessDates.map(() => 76)} /></div></div><Drawer className="rate-detail-drawer" onClose={() => setDetailOpen(false)} open={detailOpen} title={selected.plan.name} size={390}><Tabs defaultActiveKey="Details" items={["Details", "Channels", "Restrictions", "History"].map((label) => ({ key: label, label, children: label === "Details" ? <RateDetailContent selected={selected} /> : <EmptyPanel label={label} /> }))} /></Drawer></section>;
}

function RateSummary({ label, values }) { return <div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">{label}<Info size={13} /></div>{values.map((value, index) => <div key={index}>{value}</div>)}</div>; }

function RateDetailContent({ selected }) { return <div className="drawer-detail-list"><p><span>Rate Plan Code</span><b>{selected.plan.code}</b></p><p><span>Rate Plan Type</span><b>{selected.plan.type}</b></p><p><span>Base Plan</span><b>OTA Common Plan</b></p><p><span>Pricing Type</span><b>Per Room Per Night</b></p><p><span>Tax</span><b>Inclusive</b></p><p><span>Currency</span><b>SAR - Saudi Riyal</b></p><section><h3>Rate Summary</h3><p><span>Average Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Minimum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Maximum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p></section><section><h3>Last Updated</h3><p><span>User</span><b>Revenue Manager</b></p><p><span>Date & Time</span><b>09/07/2026 11:40 AM</b></p><p><span>Status</span><StatusTag value="Success" /></p></section></div>; }

function DistributionView() {
  const [tab, setTab] = useState("Distribution Log");
  const columns = [{ title: "Location", dataIndex: "location", width: 90, render: (value) => <b className="source-letter">{value}</b> }, { title: "Activity", dataIndex: "source", width: 160 }, { title: "For Date", dataIndex: "date", width: 120 }, { title: "Request Time", dataIndex: "request", width: 130 }, { title: "Process Time", dataIndex: "process", width: 130 }, { title: "Updated Value", dataIndex: "value", width: 120 }, { title: "User", dataIndex: "user" }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "View", width: 70, render: () => <button className="table-icon"><Eye size={15} /></button> }];
  return <section className="distribution-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={["Distribution Log", "Rate Controls", "Source Mapping", "Packages & Promotions"].map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Download size={14} />} size="small">Export</Button><Button icon={<RefreshCw size={14} />} size="small">Refresh</Button></div></div>{tab === "Distribution Log" ? <div className="table-frame"><div className="table-toolbar"><Input prefix={<Search size={15} />} placeholder="Search activity" /><span><i className="online-dot" />Property controls active</span></div><Table className="pms-table" columns={columns} dataSource={channelLogs} pagination={false} size="small" /></div> : <DistributionState tab={tab} />}</section>;
}

function DistributionState({ tab }) { const content = { "Rate Controls": ["Property rate controls", "Review active rate plans", "Manage stop-sell flags", "Review release warnings"], "Source Mapping": ["Business source mapping", "Corporate", "Travel agent", "Direct booking"], "Packages & Promotions": ["Packages and promotions", "Last minute", "Advance purchase", "Minimum stay"] }[tab]; return <div className="state-panel"><div><h2>{content[0]}</h2><p>Review and manage the selected distribution area.</p></div><div className="channel-state-list">{content.slice(1).map((item, index) => <div key={item}><span className={`channel-symbol symbol-${index}`}>{item[0]}</span><strong>{item}</strong><StatusTag value={index === 3 ? "Pending" : "Active"} /><ChevronRight size={16} /></div>)}</div></div>; }

function GuestView({ onAdd, onOpenReservation }) {
  const [query, setQuery] = useState("");
  const guests = reservations.map((record, index) => ({ key: record.id, name: record.guest, phone: "Not stored", visits: index + 1, status: record.vip ? "VIP" : "Active", lastStay: record.departure, record }));
  const rows = guests.filter((guest) => guest.name.toLowerCase().includes(query.toLowerCase()));
  const columns = [{ title: "Guest Name", dataIndex: "name", render: (name, row) => <button className="table-link" onClick={() => onOpenReservation(row.record)}>{name}</button> }, { title: "Mobile", dataIndex: "phone" }, { title: "Visits", dataIndex: "visits", width: 90 }, { title: "Last Stay", dataIndex: "lastStay", width: 110 }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 80, render: () => <button className="table-icon"><MoreVertical size={16} /></button> }];
  return <section className="guest-view"><div className="section-toolbar"><div className="sub-navigation"><button className="selected">Guest Database</button><button>Guest Notes</button><button>Front Desk Operations</button><button>Lost and Found</button></div><div><Input allowClear onChange={(event) => setQuery(event.target.value)} prefix={<Search size={15} />} placeholder="Search guest" value={query} /><Button icon={<Plus size={14} />} onClick={onAdd} size="small">Add Guest</Button></div></div><div className="table-frame"><Table className="pms-table" columns={columns} dataSource={rows} pagination={false} size="small" /></div></section>;
}

function CashieringView({ onNewPayment, onOpenReservation }) {
  const columns = [{ title: "Guest / Folio", dataIndex: "guest", render: (value, row) => <button className="table-link" onClick={() => onOpenReservation(row)}>{value}</button> }, { title: "Room", dataIndex: "room", width: 90 }, { title: "Balance", dataIndex: "balance", width: 130, render: (value) => `SAR ${value}` }, { title: "Payment Status", dataIndex: "payment", width: 140, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 80, render: () => <button className="table-icon"><MoreVertical size={16} /></button> }];
  return <section className="cashiering-view"><div className="cashiering-metrics"><MiniMetric label="Open Folios" value="46" detail="SAR 38,240.00 balance" tone="yellow" /><MiniMetric label="Cash Today" value="SAR 12,640" detail="18 recorded payments" tone="green" /><MiniMetric label="City Ledger" value="SAR 7,420" detail="5 routed folios" tone="purple" /><MiniMetric label="Pending Authorizations" value="03" detail="Requires review" tone="blue" /></div><div className="section-toolbar"><div className="sub-navigation"><button className="selected">Cashiering Center</button><button>Cash Drawer</button><button>Expense Voucher</button><button>POS</button></div><div><Button icon={<Plus size={14} />} onClick={onNewPayment} size="small">New Payment</Button><Button icon={<Download size={14} />} size="small">Export</Button></div></div><div className="table-frame"><Table className="pms-table" columns={columns} dataSource={reservations} pagination={false} size="small" /></div></section>;
}

function HousekeepingView({ onAddTask }) {
  const [tab, setTab] = useState("House Status");
  const columns = [{ title: "Room", dataIndex: "number", width: 90 }, { title: "Room Type", dataIndex: "type" }, { title: "Occupancy", dataIndex: "status", width: 120, render: (value) => <StatusTag value={value} /> }, { title: "Condition", dataIndex: "condition", width: 130, render: (value) => <StatusTag value={value} /> }, { title: "Work Order / Task", dataIndex: "note" }, { title: "Action", width: 80, render: () => <button className="table-icon"><MoreVertical size={16} /></button> }];
  return <section className="housekeeping-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={["House Status", "Maintenance Block", "Work Order / Task"].map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Plus size={14} />} onClick={onAddTask} size="small">Add Task</Button><Button icon={<Download size={14} />} size="small">Export</Button></div></div><div className="house-summary"><MiniMetric label="Clean" value="49" detail="Ready for arrival" tone="green" /><MiniMetric label="Dirty" value="05" detail="Needs attention" tone="yellow" /><MiniMetric label="Inspected" value="18" detail="Supervisor cleared" tone="blue" /><MiniMetric label="Maintenance" value="04" detail="Blocked rooms" tone="purple" /></div><div className="table-frame"><Table className="pms-table" columns={columns} dataSource={roomRows} pagination={false} size="small" /></div></section>;
}

function ReportsView() { const [activeGroup, setActiveGroup] = useState("Front Office"); const [activeReport, setActiveReport] = useState("Arrival Report"); return <section className="reports-view"><div className="report-catalog">{reportGroups.map(([group, items]) => <div key={group}><button className={activeGroup === group ? "active-report-group" : ""} onClick={() => { setActiveGroup(group); setActiveReport(items[0]); }}><FileText size={15} />{group}<ChevronRight size={14} /></button>{activeGroup === group && <div>{items.map((item) => <button className={activeReport === item ? "active" : ""} key={item} onClick={() => setActiveReport(item)}>{item}</button>)}</div>}</div>)}</div><div className="report-canvas"><div className="report-heading"><div><h2>{activeReport}</h2><p>Configure the reporting period and output before running the report.</p></div><Button icon={<Download size={14} />} size="small">Export</Button></div><div className="report-filters"><label>From<PmsDatePicker aria-label="Report from date" defaultValue="09/07/2026" /></label><label>To<PmsDatePicker aria-label="Report to date" defaultValue="09/07/2026" /></label><label>Room Type<Select defaultValue="All room types" options={[{ value: "All room types", label: "All room types" }, { value: "Superior King", label: "Superior King" }]} /></label><Button className="primary-command" icon={<BarChart3 size={14} />} size="small">Run Report</Button></div><div className="report-empty"><BarChart3 size={28} /><strong>Ready to generate</strong><span>Choose filters then run this report to preview the result table.</span></div></div></section>; }

function ConfigurationView({ onAdd }) {
  const [section, setSection] = useState("User Management");
  const sections = ["User Management", "Hotel Profile", "Rooms & Rates", "Taxes & Payments", "Guest Setup", "General Settings", "Notifications", "Documents"];
  const columns = [{ title: "Status", dataIndex: "status", width: 100, render: (value) => <Switch checked={value} size="small" /> }, { title: "Role Name", dataIndex: "name" }, { title: "Description", dataIndex: "description" }, { title: "Last Updated", dataIndex: "updated", width: 130 }, { title: "Action", width: 80, render: () => <button className="table-icon"><MoreVertical size={16} /></button> }];
  return <section className="configuration-view"><aside className="configuration-nav">{sections.map((item) => <button className={section === item ? "active" : ""} key={item} onClick={() => setSection(item)}>{item}<ChevronRight size={14} /></button>)}</aside><div className="configuration-canvas"><div className="config-heading"><div><h2>{section}</h2><p>{section === "User Management" ? "Manage users, roles, security preferences and device activity." : "Manage property master data and workflow settings."}</p></div><Button icon={<Plus size={14} />} onClick={onAdd} size="small">Add {section === "User Management" ? "User Role" : "Record"}</Button></div><Tabs defaultActiveKey="User Role" className="config-tabs" items={(section === "User Management" ? ["Users", "User Role", "Blocked Users", "Device Activity", "User Activity", "Security Preferences"] : ["Overview", "Setup", "Audit Trail"]).map((label) => ({ key: label, label }))} size="small" /><Input className="config-search" prefix={<Search size={15} />} placeholder={`Search ${section}`} /><Table className="pms-table" columns={columns} dataSource={configRows} pagination={false} size="small" /></div></section>;
}

function GlobalSearchOverlay({ query, tab, onTab, onClose, onOpenReservation, reservations }) {
  const matchingRecords = reservations.filter((record) => `${record.id} ${record.guest} ${record.roomType} ${record.room}`.toLowerCase().includes(query.toLowerCase()));
  const results = query ? matchingRecords : reservations;
  const items = { Bookings: results.slice(0, 6), Guest: results.slice(0, 4), "Business Source": results.slice(0, 2), "Travel Agent": results.slice(2, 4), Company: results.slice(3, 6) };
  return <div className="search-overlay"><button className="search-overlay-scrim" aria-label="Close search" onClick={onClose} /><section className="search-popover"><div className="search-popover-head"><div><Search size={17} /><strong>{query ? `Results for "${query}"` : "Search PMS records"}</strong></div><button onClick={onClose} aria-label="Close search"><X size={17} /></button></div><Tabs activeKey={tab} className="search-tabs" items={Object.keys(items).map((label) => ({ key: label, label: <span>{label}<b>{items[label].length}</b></span> }))} onChange={onTab} size="small" /><div className="search-result-list">{items[tab].map((record) => <button key={`${tab}-${record.recordKey || record.id}`} onClick={() => onOpenReservation(record)}><span className="guest-avatar small">{record.guest.split(" ").map((part) => part[0]).join("")}</span><span><strong>{record.guest}</strong><small>{record.id} - {record.roomType}</small></span><span className="search-stay">{record.arrival} to {record.departure}<small>{record.room} - {record.status}</small></span><ChevronRight size={16} /></button>)}</div><button className="search-view-all">View all {tab.toLowerCase()}<ChevronRight size={16} /></button></section></div>;
}

function ReservationSummaryDrawer({ open, reservation, onClose, onEdit, onOpenWorkspace }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [notice, setNotice] = useState("");

  if (!reservation) return null;

  const moreActions = [
    { label: "Check-out", icon: LogOut, action: () => setNotice("Check-out is available from the reservation workspace.") },
    { label: "Add Payment", icon: CircleDollarSign, action: () => onOpenWorkspace("Folio Operations", "payment") },
    { label: "Amend Stay", icon: CalendarDays, action: () => onOpenWorkspace("Booking Details") },
    { label: "Room Move", icon: BedDouble, action: () => setNotice("Room Move is ready for review in the reservation workspace.") },
    { label: "Exchange Room", icon: RefreshCw, action: () => setNotice("Exchange Room is ready for review in the reservation workspace.") },
    { label: "Stop Room Move", icon: X, action: () => setNotice("No active room move is selected for this reservation.") },
    { label: "Inclusion List", icon: ClipboardList, action: () => onOpenWorkspace("Room Charges") },
    { label: "Void Reservation", icon: X, destructive: true, action: () => setNotice("Void Reservation requires an authorised workflow.") }
  ];
  const printActions = [
    { label: "Print Confirmation", icon: FileText, action: () => setNotice("Reservation confirmation prepared for print.") },
    { label: "Send Confirmation", icon: Mail, action: () => setNotice("Reservation confirmation prepared for delivery.") }
  ];
  const menu = activeMenu === "more" ? moreActions : activeMenu === "print" ? printActions : [];
  const configuredRate = reservation.nights * (reservation.roomType.includes("Executive") ? 980 : reservation.roomType.includes("Presidential") ? 1650 : 575);
  const total = Number(String(reservation.total || configuredRate).replace(/,/g, ""));
  const balance = Number(String(reservation.balance || "0").replace(/,/g, ""));
  const paid = Math.max(total - balance, 0);
  const pax = (reservation.roomLines || []).reduce((totals, line) => ({ adults: totals.adults + (Number(line.adults) || 0), children: totals.children + (Number(line.children) || 0) }), { adults: 0, children: 0 });

  const runAction = (action) => {
    setActiveMenu(null);
    action();
  };

  return (
    <Drawer className="reservation-summary-drawer" closable={false} onClose={onClose} open={open} placement="right" size={456}>
      <div className="reservation-summary-shell">
        <div className="reservation-summary-topbar">
          <strong>Reservation Detail</strong>
          <Tooltip title="Close reservation detail"><button aria-label="Close reservation detail" onClick={onClose}><X size={19} /></button></Tooltip>
        </div>
        <div className="reservation-summary-guest">
          <span className={`guest-avatar large ${reservation.vip ? "vip" : ""}`}>{reservation.guest.split(" ").map((part) => part[0]).join("")}</span>
          <div><strong>{reservation.guest}</strong><small>{reservation.id} - {reservation.source}</small></div>
          <StatusTag value={reservation.status} />
        </div>
        <div className="summary-action-row">
          <Button onClick={onEdit} size="small">Edit Reservation</Button>
          <div className="summary-action-menu">
            <Button icon={<MoreVertical size={15} />} onClick={() => setActiveMenu((current) => current === "more" ? null : "more")} size="small">More Options</Button>
            {activeMenu === "more" && <SummaryActionMenu actions={menu} onAction={runAction} />}
          </div>
          <div className="summary-action-menu">
            <Button icon={<FileText size={14} />} onClick={() => setActiveMenu((current) => current === "print" ? null : "print")} size="small">Print / Send</Button>
            {activeMenu === "print" && <SummaryActionMenu actions={menu} onAction={runAction} />}
          </div>
        </div>
        <div className="summary-facts">
          <SummaryFact label="Folio No" value="Excluded from demo import" />
          <SummaryFact label="Status" value={reservation.status} />
          <SummaryFact label="Arrival Date" value={`${reservation.arrival} 03:00 PM`} />
          <SummaryFact label="Departure Date" value={`${reservation.departure} 12:00 PM`} />
          <SummaryFact label="Booking Date" value="Not provided in report" />
          <SummaryFact label="Room Type" value={reservation.roomType} />
          <SummaryFact label="Room Number" value={reservation.room} />
          <SummaryFact label="Rate Plan" value={reservation.rateType} />
          <SummaryFact label="Pax" value={`${pax.adults || 2} Adults / ${pax.children || 0} Children`} />
          <SummaryFact label="Avg. Daily Rate" value={`SAR ${(Number(reservation.roomCharge || total) / reservation.nights).toFixed(2)}`} />
        </div>
        <div className="summary-financials">
          <div><span>Total</span><b>SAR {total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</b></div>
          <div><span>Paid</span><b>SAR {paid.toLocaleString("en-US", { minimumFractionDigits: 2 })}</b></div>
          <div><span>Balance</span><b>SAR {reservation.balance}</b></div>
        </div>
        {notice && <div className="summary-notice"><Info size={14} />{notice}</div>}
      </div>
    </Drawer>
  );
}

function SummaryFact({ label, value }) {
  return <div><span>{label}</span><b>{value}</b></div>;
}

function SummaryActionMenu({ actions, onAction }) {
  return <div className="summary-popover-menu" role="menu">
    {actions.map(({ label, icon: Icon, destructive, action }) => <button className={destructive ? "destructive" : ""} key={label} onClick={() => onAction(action)} role="menuitem"><Icon size={15} />{label}</button>)}
  </div>;
}

function ReservationWorkspace({ open, reservation, tab, nestedDrawer, onBack, onClose, onTab, onNestedDrawer }) {
  if (!reservation) return null;
  const summary = <div className="reservation-workspace-summary"><button onClick={onBack} className="back-workspace" aria-label="Back to reservation detail"><ChevronLeft size={18} /></button><span className="guest-avatar large">{reservation.guest.split(" ").map((part) => part[0]).join("")}</span><div><strong>{reservation.guest}</strong><small>{reservation.id} - {reservation.status}</small></div><div><span>Arrival</span><b>{reservation.arrival}</b></div><div><span>Departure</span><b>{reservation.departure}</b></div><div><span>Nights</span><b>{reservation.nights}</b></div><div><span>Room / Room Type</span><b>{reservation.room} / {reservation.roomType}</b></div><div className="workspace-summary-actions"><Button onClick={onBack} size="small">Reservation Detail</Button><Button onClick={onClose} size="small">Close</Button></div></div>;
  return <Drawer className="reservation-workspace-drawer" closable={false} onClose={onBack} open={open} placement="right" rootClassName="reservation-workspace-root" size="100vw">{summary}<Tabs activeKey={tab} className="reservation-workspace-tabs" items={reservationTabs.map((label) => ({ key: label, label }))} onChange={onTab} size="small" />{tab === "Folio Operations" && <FolioOperations reservation={reservation} onOpenDrawer={onNestedDrawer} />}{tab === "Booking Details" && <BookingDetails reservation={reservation} />}{tab === "Guest Details" && <GuestDetails reservation={reservation} />}{tab === "Room Charges" && <RoomCharges onOpenDrawer={onNestedDrawer} />}{tab === "Credit Card" && <CreditCardView onOpenDrawer={onNestedDrawer} />}{tab === "Tasks" && <TasksView onOpenDrawer={() => onNestedDrawer("task")} />}{tab === "Audit Trail" && <AuditTrail />}{nestedDrawer && <NestedReservationDrawer kind={nestedDrawer} onClose={() => onNestedDrawer(null)} />}</Drawer>;
}

function FolioOperations({ reservation, onOpenDrawer }) { const [visibility, setVisibility] = useState("Unposted"); const columns = [{ title: "Day", dataIndex: "date", width: 110 }, { title: "Ref No.", dataIndex: "reference", width: 110 }, { title: "Particulars", dataIndex: "particulars", width: 160 }, { title: "Description", dataIndex: "description" }, { title: "User", dataIndex: "user", width: 140 }, { title: "Amount", dataIndex: "amount", width: 110, align: "right", render: (value) => `SAR ${value}` }]; return <div className="folio-workspace"><div className="folio-summary"><div><span>Room / Folio</span><b>{reservation.room} - {reservation.guest}</b></div><div><span>Total</span><b>SAR {reservation.total}</b></div><div><span>Balance</span><b>SAR {reservation.balance}</b></div></div><div className="folio-actions"><Button onClick={() => onOpenDrawer("payment")} size="small">Add Payment</Button><Button onClick={() => onOpenDrawer("charge")} size="small">Add Charges</Button><Button onClick={() => onOpenDrawer("discount")} size="small">Apply Discount</Button><Button onClick={() => onOpenDrawer("folio")} size="small">Folio Operations</Button><Button icon={<MoreVertical size={15} />} onClick={() => onOpenDrawer("folio")} size="small">More</Button><span className="folio-spacer" /><Checkbox checked={visibility === "Unposted"} onChange={() => setVisibility("Unposted")}>Unposted</Checkbox><Checkbox checked={visibility === "Posted"} onChange={() => setVisibility("Posted")}>Posted</Checkbox></div><Table className="pms-table" columns={columns} dataSource={folioRows} pagination={false} size="small" /><div className="surface-status"><CheckCircle2 size={14} />Showing {visibility.toLowerCase()} folio entries for this stay.</div></div>; }

function BookingDetails({ reservation }) { const [saved, setSaved] = useState(false); return <div className="reservation-form-grid"><FormSection title="Billing Information" fields={["Bill To", "Type", "Payment Mode", "Registration No.", "Reservation Type"]} values={{ "Bill To": "Guest", Type: "Individual", "Payment Mode": reservation.paymentMethod, "Registration No.": reservation.id, "Reservation Type": "Guaranteed" }} /><FormSection title="Source Information" fields={["Market Segment", "Business Source", "Rate Type", "Voucher No.", "Commission Plan", "Plan Value", "Company", "Sales Person"]} values={{ "Market Segment": reservation.source === "Corporate" ? "Corporate" : "Retail", "Business Source": reservation.source, "Rate Type": reservation.rateType, "Voucher No.": "", "Commission Plan": "Standard", "Plan Value": "0.00", Company: "Not assigned", "Sales Person": "Front Desk" }} /><FormSection title="Preferences" fields={["Check-out Note", "Suppress Rate on GR Card", "Include Guest Preferences"]} toggles /><div className="form-save-row"><Button className="primary-command" icon={saved ? <CheckCircle2 size={14} /> : <Save size={14} />} onClick={() => setSaved(true)} size="small">{saved ? "Saved" : "Save"}</Button></div></div>; }
function GuestDetails({ reservation }) { return <div className="reservation-form-grid guest-details-grid"><FormSection title="Guest" fields={["Name", "Phone", "Mobile", "Email", "Gender", "Guest Type", "VIP Status", "Address", "Zip", "Country", "State", "City", "Nationality", "Company"]} values={{ Name: reservation.guest, Phone: "Not provided", Mobile: "Not provided", Email: "Not provided", Gender: "Not provided", "Guest Type": reservation.vip ? "VIP" : "Regular", "VIP Status": reservation.vip ? "Gold" : "Active", Address: "Not provided", Zip: "—", Country: "Guest profile", State: "—", City: "—", Nationality: "Not provided", Company: "Not assigned" }} /><FormSection title="Identity Information" fields={["ID Number", "ID Type", "ID Version No.", "Issuing Country", "Issuing City", "Expiry Date"]} values={{ "ID Number": "Not provided", "ID Type": "Not provided", "ID Version No.": "—", "Issuing Country": "—", "Issuing City": "—", "Expiry Date": "—" }} /><FormSection title="Other Information" fields={["Birth Date", "Birth City", "Birth Country", "Spouse Birth Date", "Wedding Anniversary", "Purpose of Visit"]} values={{ "Birth Date": "Not provided", "Birth City": "—", "Birth Country": "—", "Spouse Birth Date": "", "Wedding Anniversary": "", "Purpose of Visit": reservation.source === "Corporate" ? "Business" : "Leisure" }} /></div>; }
function FormSection({ title, fields, toggles, values = {} }) { return <section className="form-section"><h3>{title}</h3><div>{fields.map((field) => { const isDate = field.includes("Date") || field === "Check-in" || field === "Check-out"; return <label key={field}>{field}{toggles ? <Switch defaultChecked={field === "Include Guest Preferences"} size="small" /> : isDate ? <PmsDatePicker aria-label={field} defaultValue={values[field]?.includes("/") ? values[field] : undefined} placeholder="Select date" size="small" /> : field.includes("Type") || field.includes("Country") || field.includes("Source") || field.includes("Company") || field.includes("Plan") || field.includes("Mode") || field === "Gender" || field === "Nationality" || field === "City" || field === "State" ? <Select defaultValue={values[field] || "-Select-"} options={[{ value: "-Select-", label: "-Select-" }, { value: values[field] || "Standard", label: values[field] || "Standard" }, { value: "Standard", label: "Standard" }]} size="small" /> : <Input defaultValue={values[field] || ""} size="small" />}</label>; })}</div></section>; }
function RoomCharges({ onOpenDrawer }) { const [group, setGroup] = useState("All charges"); const rows = [{ key: "1", date: "09 Jul", type: "Room Charge", description: "Executive Suite", amount: "SAR 800.00", tax: "SAR 120.00", status: "Posted" }, { key: "2", date: "09 Jul", type: "Breakfast", description: "Qty 2", amount: "SAR 104.35", tax: "SAR 15.65", status: "Posted" }, { key: "3", date: "10 Jul", type: "Room Charge", description: "Executive Suite", amount: "SAR 800.00", tax: "SAR 120.00", status: "Unposted" }, { key: "4", date: "10 Jul", type: "Late checkout", description: "Pending approval", amount: "SAR 250.00", tax: "SAR 37.50", status: "Pending" }]; const visibleRows = group === "All charges" ? rows : rows.filter((row) => row.status === group); return <div className="folio-workspace"><div className="folio-summary"><div><span>Total room charges</span><b>SAR 1,704.35</b></div><div><span>Taxes</span><b>SAR 255.65</b></div><div><span>Pending adjustments</span><b>SAR 287.50</b></div></div><div className="folio-actions"><Select value={group} onChange={setGroup} options={[{ value: "All charges", label: "All charges" }, { value: "Posted", label: "Posted" }, { value: "Unposted", label: "Unposted" }, { value: "Pending", label: "Pending" }]} size="small" /><span className="folio-spacer" /><Button onClick={() => onOpenDrawer("charge")} size="small">Add Charge</Button><Button onClick={() => onOpenDrawer("discount")} size="small">Add Adjustment</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Date", dataIndex: "date", width: 100 }, { title: "Charge", dataIndex: "type", width: 140 }, { title: "Description", dataIndex: "description" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Tax", dataIndex: "tax", width: 120, align: "right" }, { title: "Status", dataIndex: "status", width: 100, render: (value) => <StatusTag value={value === "Posted" ? "Success" : value} /> }]} dataSource={visibleRows} pagination={false} size="small" /></div></div>; }
function CreditCardView({ onOpenDrawer }) { const [filter, setFilter] = useState("All"); const rows = [{ key: "1", card: "Visa ending 4021", reference: "AUTH-9F028", amount: "SAR 1,280.00", date: "09 Jul 10:15 AM", status: "Active" }, { key: "2", card: "Mastercard ending 8850", reference: "AUTH-41AB2", amount: "SAR 500.00", date: "08 Jul 03:40 PM", status: "Success" }, { key: "3", card: "Visa ending 4021", reference: "AUTH-VOID", amount: "SAR 0.00", date: "08 Jul 03:42 PM", status: "Void" }]; const visible = filter === "All" ? rows : rows.filter((row) => row.status === filter); return <div className="folio-workspace"><div className="folio-summary"><div><span>Authorization held</span><b>SAR 1,280.00</b></div><div><span>Recorded cards</span><b>02</b></div><div><span>Last verification</span><b>09 Jul, 10:15 AM</b></div></div><div className="folio-actions"><Select value={filter} onChange={setFilter} options={[{ value: "All", label: "All authorizations" }, { value: "Active", label: "Active" }, { value: "Success", label: "Captured" }, { value: "Void", label: "Voided" }]} size="small" /><span className="folio-spacer" /><Button icon={<ShieldCheck size={14} />} onClick={() => onOpenDrawer("card")} size="small">Record Authorization</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Card reference", dataIndex: "card" }, { title: "Authorization", dataIndex: "reference" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Recorded", dataIndex: "date", width: 145 }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }]} dataSource={visible} pagination={false} size="small" /></div></div>; }
function TasksView({ onOpenDrawer }) { const [filter, setFilter] = useState("Open"); const [tasks, setTasks] = useState([{ key: "1", task: "Confirm airport transfer", department: "Concierge", due: "09 Jul 01:30 PM", status: "Open" }, { key: "2", task: "Prepare welcome amenities", department: "Housekeeping", due: "09 Jul 02:00 PM", status: "In progress" }, { key: "3", task: "Verify late checkout request", department: "Front Office", due: "10 Jul 11:00 AM", status: "Resolved" }]); const visible = filter === "All" ? tasks : tasks.filter((task) => task.status === filter); return <div className="tasks-workspace"><div className="workspace-list-toolbar"><Select value={filter} onChange={setFilter} options={[{ value: "All", label: "All tasks" }, { value: "Open", label: "Open" }, { value: "In progress", label: "In progress" }, { value: "Resolved", label: "Resolved" }]} size="small" /><span>3 operational tasks linked to this stay</span><Button icon={<Plus size={14} />} onClick={onOpenDrawer} size="small">Add Task</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Task", dataIndex: "task" }, { title: "Department", dataIndex: "department", width: 150 }, { title: "Due", dataIndex: "due", width: 140 }, { title: "Status", dataIndex: "status", width: 120, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setTasks((current) => current.map((task) => task.key === row.key ? { ...task, status: "Resolved" } : task))}>Resolve</Button> }]} dataSource={visible} pagination={false} size="small" /></div></div>; }
function AuditTrail() { const rows = [{ key: "1", date: "09/07/2026 11:40 AM", log: "Rate plan reviewed from reservation workspace", user: "Revenue Manager", ip: "***.***.***.***" }, { key: "2", date: "09/07/2026 10:24 AM", log: "Reservation workspace opened", user: "Front Office", ip: "***.***.***.***" }, { key: "3", date: "09/07/2026 10:15 AM", log: "Payment authorization recorded", user: "Front Office", ip: "***.***.***.***" }, { key: "4", date: "08/07/2026 03:40 PM", log: "Booking source verified", user: "Reservations", ip: "***.***.***.***" }]; return <div className="folio-workspace"><div className="folio-actions"><Input prefix={<Search size={14} />} placeholder="Search audit trail" /><span className="folio-spacer" /><Button icon={<Download size={14} />} size="small">Export</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Date/Time", dataIndex: "date", width: 170 }, { title: "Activity", dataIndex: "log" }, { title: "User", dataIndex: "user", width: 150 }, { title: "IP", dataIndex: "ip", width: 130 }]} dataSource={rows} pagination={false} size="small" /></div></div>; }

function NestedReservationDrawer({ kind, onClose }) { const [saved, setSaved] = useState(false); const content = { payment: ["Add Payment", ["Date", "Folio", "Amount", "Mode of Payment", "Other Payment Method", "Remark (Optional)"], "Save Payment"], charge: ["Add Charge", ["Date", "Folio", "Charge", "Add as Inclusion", "Quantity", "Amount", "Discount", "Comment"], "Add Charge"], discount: ["Apply Discount", ["Date", "Discount Type", "Folio", "Amount", "Comment"], "Apply Discount"], folio: ["Folio Operations", ["Bill To", "Registration No.", "Guest Name on Folio", "POS Posting Type", "Show tax on printed folio", "Generate invoice number on checkout"], "Save Folio"], task: ["Add Task", ["Unit / Room", "Category", "Priority", "Description", "Due Date", "Due Time", "Assign To", "Reservation / Folio"], "Save Task"], card: ["Record Authorization", ["Card Reference", "Authorization Code", "Amount", "Expiry Date", "Remark (Optional)"], "Record Authorization"] }[kind]; const save = () => { setSaved(true); window.setTimeout(onClose, 400); }; return <Drawer className="nested-form-drawer" onClose={onClose} open placement="right" title={content[0]} size={440}><div className="drawer-form">{content[1].map((field) => <label key={field}>{field}{field.includes("Show") || field.includes("Generate") || field.includes("Inclusion") ? <Checkbox /> : field.includes("Date") ? <PmsDatePicker aria-label={field} placeholder="Select date" /> : field.includes("Description") || field.includes("Comment") || field.includes("Remark") ? <Input.TextArea rows={3} /> : field.includes("Type") || field.includes("Folio") || field.includes("Mode") || field.includes("Category") || field.includes("Priority") || field.includes("Assign") || field.includes("Unit") || field.includes("Card") ? <Select defaultValue="-Select-" options={[{ value: "-Select-", label: "-Select-" }, { value: "Standard", label: "Standard" }]} /> : <Input />}</label>)}{saved && <div className="surface-status"><CheckCircle2 size={14} />Reservation updated successfully.</div>}<div className="drawer-form-actions"><Button onClick={onClose}>Cancel</Button><Button className="primary-command" onClick={save}>{saved ? "Saved" : content[2]}</Button></div></div></Drawer>; }

function AddReservationDrawer({ open, onClose, onReserve }) {
  const [roomLines, setRoomLines] = useState(() => [{ ...initialReservationLine }]);
  const [stay, setStay] = useState({ checkIn: reservationReferenceDateInput, checkOut: reservationCheckoutDateInput, guest: "New Guest", source: "Direct" });
  const [discount, setDiscount] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash / Bank");
  const [saved, setSaved] = useState("");
  const [guideOpen, setGuideOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    setRoomLines([{ ...initialReservationLine }]);
    setStay({ checkIn: reservationReferenceDateInput, checkOut: reservationCheckoutDateInput, guest: "New Guest", source: "Direct" });
    setDiscount(false);
    setPaymentMode("Cash / Bank");
    setSaved("");
    setGuideOpen(false);
  }, [open]);

  const nights = Math.max(1, Math.round((Date.parse(stay.checkOut.split("/").reverse().join("-")) - Date.parse(stay.checkIn.split("/").reverse().join("-"))) / 86400000) || 1);
  const roomCharge = roomLines.reduce((total, line) => {
    const selectedRoomType = roomTypes.find((roomType) => roomType.name === line.roomType);
    const rate = selectedRoomType ? selectedRoomType.rate * (line.ratePlan === "Room Only Non-Refundable" ? 0.88 : 1) : 0;
    return total + rate * nights;
  }, 0) * (discount ? 0.9 : 1);
  const tax = roomCharge * 0.15;
  const dueAmount = roomCharge + tax;
  const stayIsValid = pmsDateKey(stay.checkOut) > pmsDateKey(stay.checkIn);
  const updateRoomLine = (index, field, value) => setRoomLines((current) => current.map((line, lineIndex) => lineIndex === index ? { ...line, [field]: value } : line));

  const roomLine = (line, index) => {
    const selectedRoomType = roomTypes.find((roomType) => roomType.name === line.roomType);
    const rate = selectedRoomType ? selectedRoomType.rate * (line.ratePlan === "Room Only Non-Refundable" ? 0.88 : 1) : 0;
    return (
    <div className="room-rate-grid data" key={index}>
      <Select aria-label={`Room type ${index + 1}`} onChange={(value) => updateRoomLine(index, "roomType", value)} options={roomTypeOptions} size="small" value={line.roomType} />
      <Select aria-label={`Rate plan ${index + 1}`} onChange={(value) => updateRoomLine(index, "ratePlan", value)} options={ratePlanOptions} size="small" value={line.ratePlan} />
      <Select aria-label={`Room assignment ${index + 1}`} disabled options={[{ value: "Unassigned", label: "Unassigned" }]} size="small" value="Unassigned" />
      <Input aria-label={`Adults ${index + 1}`} inputMode="numeric" onChange={(event) => updateRoomLine(index, "adults", event.target.value)} value={line.adults} size="small" />
      <Input aria-label={`Children ${index + 1}`} inputMode="numeric" onChange={(event) => updateRoomLine(index, "children", event.target.value)} value={line.children} size="small" />
      <Input aria-label={`Rate ${index + 1}`} readOnly value={rate.toFixed(2)} size="small" />
    </div>
    );
  };

  const completeBooking = (status) => {
    if (saved || !stayIsValid) return;
    setSaved(status);
    window.setTimeout(() => onReserve({
      guest: stay.guest.trim() || "New Guest",
      room: "Unassigned",
      roomType: roomLines[0].roomType,
      roomLines,
      ratePlan: roomLines[0].ratePlan,
      arrival: formatShortPmsDate(stay.checkIn),
      arrivalDate: stay.checkIn,
      departure: formatShortPmsDate(stay.checkOut),
      departureDate: stay.checkOut,
      nights,
      status,
      roomCharge: roomCharge.toFixed(2),
      total: dueAmount.toFixed(2),
      balance: dueAmount.toFixed(2),
      source: stay.source,
      vip: false
    }), 380);
  };

  if (!open) return null;

  return (
    <Drawer className="add-reservation-drawer" closable={false} onClose={onClose} open={open} placement="right" rootClassName="add-reservation-root" size="min(1120px, 94vw)">
      <div className="drawer-page-header">
        <div><button onClick={onClose} aria-label="Close Add Reservation"><ChevronLeft size={18} /></button><h2>Add Reservation</h2></div>
        <Button icon={<CircleHelpIcon />} onClick={() => setGuideOpen((current) => !current)} size="small">Reservation Guide</Button>
      </div>
      <div className="add-reservation-layout">
        {guideOpen && <div className="reservation-guide-callout"><Info size={16} /><span><b>Reservation workflow guide</b>Review stay dates, select an available room, confirm guest and billing details, then use Reserve to prepare the stay record.</span><button onClick={() => setGuideOpen(false)} aria-label="Close reservation guide"><X size={15} /></button></div>}
        <section className="add-reservation-form">
          <section className="form-section"><h3>Stay Details</h3><div><label>Check-in<PmsDatePicker aria-label="Check-in" onChange={(value) => setStay((current) => ({ ...current, checkIn: value }))} value={stay.checkIn} size="small" /></label><label>Check-out<PmsDatePicker aria-label="Check-out" onChange={(value) => setStay((current) => ({ ...current, checkOut: value }))} value={stay.checkOut} size="small" /></label><label>Nights<Input aria-label="Nights" readOnly value={String(nights)} size="small" /></label><label>Room(s)<Input aria-label="Room count" readOnly value={String(roomLines.length)} size="small" /></label><label>Reservation Type<Select aria-label="Reservation type" options={[{ value: "Confirm Booking", label: "Confirm Booking" }]} size="small" value="Confirm Booking" /></label><label>Booking Source<Select aria-label="Booking source" onChange={(value) => setStay((current) => ({ ...current, source: value }))} options={[{ value: "Direct", label: "Direct" }, { value: "Corporate", label: "Corporate" }, { value: "Travel Agent", label: "Travel Agent" }, { value: "Online Booking", label: "Online Booking" }]} size="small" value={stay.source} /></label><label>Business Source<Select aria-label="Business source" options={[{ value: "-Select-", label: "-Select-" }]} size="small" value="-Select-" /></label><label>Market Segment<Select aria-label="Market segment" options={[{ value: "-Select-", label: "-Select-" }]} size="small" value="-Select-" /></label><label>Sales Person<Select aria-label="Sales person" options={[{ value: "-Select-", label: "-Select-" }]} size="small" value="-Select-" /></label></div></section>
          <div className="booking-options"><Checkbox disabled>Contract</Checkbox><Checkbox>Book All Available Rooms</Checkbox><Checkbox>Quick Group Booking</Checkbox><Checkbox>Complimentary Room</Checkbox></div>
          <section className="form-section room-rate-section">
            <h3>Rate Offered</h3>
            <div className="room-rate-grid"><span>Room Type</span><span>Rate Type</span><span>Room</span><span>Adult</span><span>Child</span><span>Rate (SAR)</span></div>
            {roomLines.map(roomLine)}
            <Button icon={<Plus size={14} />} disabled={roomLines.length >= 3} onClick={() => setRoomLines((current) => [...current, { ...initialReservationLine }])} size="small">Add Room</Button>
            <Button onClick={() => setDiscount((current) => !current)} size="small">{discount ? "Discount Applied" : "Add Discount"}</Button>
            {discount && <div className="discount-note">10% reservation discount applied to the room charge.</div>}
          </section>
          <section className="form-section"><h3>Guest Information</h3><div><label>Existing Guest<Select aria-label="Existing guest" options={[{ value: "-Select-", label: "-Select-" }]} size="small" value="-Select-" /></label><label>Full Name<Input aria-label="Full name" onChange={(event) => setStay((current) => ({ ...current, guest: event.target.value }))} value={stay.guest} size="small" /></label><label>Mobile<Input aria-label="Mobile" defaultValue="+966 " size="small" /></label><label>Email<Input aria-label="Email" size="small" /></label><label>Address<Input aria-label="Address" size="small" /></label><label>Zip<Input aria-label="Zip" size="small" /></label><label>Country<Select aria-label="Country" options={[{ value: "Saudi Arabia", label: "Saudi Arabia" }]} size="small" value="Saudi Arabia" /></label><label>State<Input aria-label="State" defaultValue="Makkah" size="small" /></label><label>City<Input aria-label="City" defaultValue="Jeddah" size="small" /></label></div></section>
          <section className="form-section other-information"><h3>Other Information</h3><div className="booking-options vertical"><Checkbox>Email Booking Vouchers</Checkbox><Checkbox>Send email at Check-out</Checkbox><Checkbox defaultChecked>Access To Guest Portal</Checkbox><Checkbox>Suppress Rate on Registration Card</Checkbox></div></section>
        </section>
        <aside className="billing-rail">
          <div className="billing-rail-heading"><span>Billing Summary</span><b>Confirm Booking</b></div>
          <div className="billing-stay"><span>Check-in<b>{stay.checkIn}</b></span><ChevronRight size={14} /><span>Check-out<b>{stay.checkOut}</b></span></div>
          <div className="billing-totals"><span>Room Charges<b>SAR {roomCharge.toFixed(2)}</b></span><span>Taxes (VAT)<b>SAR {tax.toFixed(2)}</b></span><strong>Due Amount<b>SAR {dueAmount.toFixed(2)}</b></strong></div>
          <label className="billing-field">Bill To<Select defaultValue="Guest" options={[{ value: "Guest", label: "Guest" }, { value: "Company", label: "Company" }, { value: "Travel Agent", label: "Travel Agent" }]} size="small" /></label>
          <section className="payment-mode-panel"><div><span>Payment Preference</span><Checkbox defaultChecked /></div><Radio.Group value={paymentMode} onChange={(event) => setPaymentMode(event.target.value)}><Radio value="Cash / Bank">Cash / Bank</Radio><Radio value="City Ledger">City Ledger</Radio></Radio.Group><Select defaultValue={paymentMode === "City Ledger" ? "City Ledger" : "Cash"} options={[{ value: "Cash", label: "Cash" }, { value: "Bank", label: "Bank" }, { value: "City Ledger", label: "City Ledger" }]} size="small" /><small>Prototype only. No payment is captured.</small></section>
        </aside>
      </div>
      <div className="drawer-page-footer">{saved ? <span className="drawer-saved"><CheckCircle2 size={14} />Reservation {saved === "In house" ? "checked in" : "prepared"}</span> : <span className="drawer-preview-note">{stayIsValid ? "Review stay, guest and billing details before reserving" : "Check-out must be after check-in before reserving"}</span>}<Button onClick={onClose}>Cancel</Button><span /><Button disabled={Boolean(saved) || !stayIsValid} onClick={() => completeBooking("In house")}>Check-In</Button><Button className="primary-command" disabled={Boolean(saved) || !stayIsValid} onClick={() => completeBooking("Confirmed")}>{saved ? "Prepared" : "Reserve"}</Button></div>
    </Drawer>
  );
}

function CircleHelpIcon() { return <Info size={14} />; }
function ReservationSearchDrawer({ open, onClose, onOpenReservation, reservations }) {
  const selectOptions = [{ value: "-Select-", label: "-Select-" }, { value: "Direct", label: "Direct" }, { value: "Corporate", label: "Corporate" }];
  return <Drawer className="reservation-search-drawer" onClose={onClose} open={open} placement="right" title="Search" size={440}><div className="drawer-form"><label className="drawer-filter-toggle"><Checkbox defaultChecked /> Reservation Date</label><PmsDateRangePicker aria-label="Reservation date range" defaultValue={[reservationReferenceDateInput, reservationReferenceDateInput]} /><label className="drawer-filter-toggle"><Checkbox /> Arrival</label><PmsDateRangePicker allowEmpty={[true, true]} aria-label="Arrival date range" disabled placeholder={["Start date", "End date"]} /><label>Business Source<Select defaultValue="-Select-" options={selectOptions} /></label><label>Travel Agent<Select defaultValue="-Select-" options={selectOptions} /></label><label>Company<Select defaultValue="-Select-" options={selectOptions} /></label><label>Room Type<Select defaultValue="-Select-" options={selectOptions} /></label><div className="reservation-search-pair"><label>Status<Select defaultValue="Active" options={[{ value: "Active", label: "Active" }, { value: "Cancelled", label: "Cancelled" }]} /></label><label>Res. Type<Select defaultValue="-Select-" options={selectOptions} /></label></div><div className="reservation-search-checks"><Checkbox>Show Unassigned Rooms</Checkbox><Checkbox>Without Deposit</Checkbox><Checkbox>CC Authorized</Checkbox><Checkbox>Show Failed/Incomplete Bookings</Checkbox></div><div className="drawer-form-actions"><Button onClick={onClose}>Reset</Button><Button className="primary-command" onClick={() => { onClose(); onOpenReservation(reservations[0]); }}>Search</Button></div></div></Drawer>;
}
function AssignRoomDrawer({ open, onClose }) {
  const arrivalRecord = reservations.find((record) => record.status === "Arriving") || reservations[0];
  const roomChoices = roomRows.filter((room) => room.type === arrivalRecord.roomType).slice(0, 2);
  const [selectedDate, setSelectedDate] = useState(stayDates[0].day);
  const [selectedRoom, setSelectedRoom] = useState(arrivalRecord.room);
  const [step, setStep] = useState("dates");
  const [assigned, setAssigned] = useState(false);
  const hasArrivalToAssign = selectedDate === stayDates[0].day;

  const closeDrawer = () => {
    setStep("dates");
    setAssigned(false);
    onClose();
  };

  return <Drawer className="assign-room-drawer" onClose={closeDrawer} open={open} placement="right" title="Assign Room" size={480}><div className="assign-room-intro"><strong>Choose an arrival date</strong><span>Review unassigned arrivals before selecting an available room.</span></div><label className="assign-date-input">Arrival date<PmsDatePicker aria-label="Arrival date" defaultValue={reservationReferenceDateInput} onChange={(value) => { setSelectedDate(value.slice(0, 2)); setAssigned(false); }} /></label><div className="assign-date-strip">{stayDates.slice(0, 7).map((date) => <button aria-pressed={selectedDate === date.day} className={selectedDate === date.day ? "active" : ""} key={date.day} onClick={() => { setSelectedDate(date.day); setAssigned(false); }}><small>{date.dow}</small><b>{date.day}</b><small>{date.month}</small></button>)}</div>{step === "dates" ? <div className="assign-empty"><BedDouble size={26} /><strong>Ready to review arrivals</strong><span>Select a day above, then continue to view reservations that need a room.</span></div> : hasArrivalToAssign ? <div className="assign-worklist"><div className="assign-reservation"><span className="guest-avatar vip">{arrivalRecord.guest.split(" ").map((part) => part[0]).join("")}</span><div><b>{arrivalRecord.guest}</b><small>{arrivalRecord.id} - {arrivalRecord.roomType}, {arrivalRecord.arrival} to {arrivalRecord.departure}</small></div><StatusTag value={assigned ? "Success" : arrivalRecord.status} /></div><div className="assign-options">{roomChoices.map((room) => <label key={room.number}><input checked={selectedRoom === room.number} onChange={() => setSelectedRoom(room.number)} type="radio" name="room" /> <span><b>{room.number}</b><small>{room.type} - {room.condition}</small></span></label>)}</div>{assigned && <div className="surface-status"><CheckCircle2 size={14} />Room {selectedRoom} is assigned for this arrival.</div>}</div> : <div className="assign-empty"><BedDouble size={26} /><strong>No unassigned reservations</strong><span>All arrivals for {selectedDate} {stayDates.find((date) => date.day === selectedDate)?.month || stayDates[0].month} already have a room assignment.</span></div>}<div className="drawer-form-actions assign-room-actions">{step === "dates" ? <><Button onClick={closeDrawer}>Cancel</Button><Button className="primary-command" onClick={() => setStep("rooms")}>Next</Button></> : <><Button onClick={() => setStep("dates")}>Back</Button><Button className="primary-command" disabled={!hasArrivalToAssign || assigned} onClick={() => setAssigned(true)}>{assigned ? `Assigned to ${selectedRoom}` : `Assign Room ${selectedRoom}`}</Button></>}</div></Drawer>;
}
function EntityDrawer({ open, title, fields, action, onClose }) { const [saved, setSaved] = useState(false); const save = () => { setSaved(true); window.setTimeout(onClose, 350); }; return <Drawer className="entity-drawer" onClose={onClose} open={open} placement="right" title={title} size={440}><div className="drawer-form">{fields.map((field) => <label key={field}>{field}{field.includes("Type") || field.includes("Role") || field.includes("Folio") || field.includes("Payment") || field.includes("Priority") || field.includes("Category") || field.includes("Assign") || field.includes("Nationality") ? <Select defaultValue="-Select-" options={[{ value: "-Select-", label: "-Select-" }, { value: "Standard", label: "Standard" }]} /> : field.includes("Date") ? <PmsDatePicker aria-label={field} placeholder="Select date" /> : field.includes("Description") || field.includes("Remark") ? <Input.TextArea rows={3} /> : <Input />}</label>)}{saved && <div className="surface-status"><CheckCircle2 size={14} />Changes saved.</div>}<div className="drawer-form-actions"><Button onClick={onClose}>Cancel</Button><Button className="primary-command" onClick={save}>{saved ? "Saved" : action}</Button></div></div></Drawer>; }
function QuickActivityDrawer({ kind, onClose }) { if (!kind) return null; const priorityStay = reservations[0]; const content = { Notifications: [{ title: `Room ${priorityStay.room} requires review`, detail: "Housekeeping created a high-priority task", time: "24 min" }, { title: `${reservations.filter((record) => record.status === "Arriving").length} arrivals scheduled today`, detail: "Front office room assignment review is open", time: "36 min" }, { title: "Rate review completed", detail: "Corporate Bed & Breakfast was reviewed by Revenue Manager", time: "1 hr" }], Messages: [{ title: "Front Office", detail: `Departure review for ${reservations.find((record) => record.status === "Due out")?.id || priorityStay.id} is ready.`, time: "Now" }, { title: "Housekeeping", detail: `Room ${roomRows.find((room) => room.condition === "Dirty")?.number || priorityStay.room} readiness is under review.`, time: "14 min" }, { title: "Night Audit", detail: "Yesterday's audit pack is ready for review.", time: "1 hr" }], Profile: [{ title: "Abdalla Elfouly", detail: "PMS Owner", time: "Active" }, { title: "Current property", detail: "SwissBlue Hotel Jeddah (22888)", time: "Switch property" }, { title: "Security", detail: "Role-based access policy active", time: "Secure" }] }[kind]; return <Drawer className="quick-activity-drawer" onClose={onClose} open placement="right" title={kind} size={390}><div className="quick-activity-list">{content.map((item) => <button key={item.title} onClick={onClose}><i className={kind === "Notifications" ? "yellow" : kind === "Messages" ? "blue" : "green"} /><span><b>{item.title}</b><small>{item.detail}</small></span><em>{item.time}</em></button>)}</div><div className="drawer-form-actions"><Button onClick={onClose}>Close</Button></div></Drawer>; }

function MiniMetric({ label, value, detail, tone }) { return <article className="mini-metric"><span className={tone} /><div><small>{label}</small><strong>{value}</strong><em>{detail}</em></div></article>; }
function StatusTag({ value }) { const tone = { "In house": "green", Arriving: "yellow", Confirmed: "blue", "Due out": "purple", "Checked out": "slate", Occupied: "green", Vacant: "blue", Reserved: "yellow", Blocked: "purple", Clean: "green", Dirty: "yellow", Inspected: "blue", Maintenance: "purple", Success: "green", Queued: "yellow", Connected: "green", Pending: "yellow", VIP: "purple", Active: "green" }[value] || "blue"; return <Tag className={`status-tag ${tone}`}>{value}</Tag>; }
function EmptyPanel({ label }) { return <div className="empty-workspace compact"><FileText size={23} /><strong>{label}</strong><span>No additional information is available for this record.</span></div>; }

const prototypeAccount = {
  email: "abdalla.elfouly@gulfhero.sa",
  password: "GulfHero@2026",
  propertyCode: "22888"
};

const trustGroups = [
  { title: "Global distribution", icon: Globe2, items: ["Google Hotels", "Booking.com", "Expedia Group", "Agoda", "Airbnb", "Almosafer"] },
  { title: "Marketing & analytics", icon: BarChart3, items: ["Meta Business Manager", "Google Analytics", "Google Search Console", "Google Hotel Ads", "Semrush", "Intercom"] },
  { title: "Saudi governance", icon: Landmark, items: ["Saudi Vision 2030", "ZATCA", "SDAIA · Data Privacy", "SDAIA · AI Ethics 2.0", "SAMA", "Mada"] },
  { title: "International standards", icon: Network, items: ["HTNG", "PCI Security Standards Council", "UN Tourism · GCET", "Sustainable Hospitality Alliance", "ACM / IEEE Software Ethics", "USALI"] }
];

function LoginPage({ onPreview }) {
  const [email, setEmail] = useState(prototypeAccount.email);
  const [password, setPassword] = useState("");
  const [propertyCode, setPropertyCode] = useState(prototypeAccount.propertyCode);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async (event) => {
    event.preventDefault();
    setError("");
    if (!supabaseConfigured || !supabase) {
      const matchesAccount = email.trim().toLowerCase() === prototypeAccount.email && password === prototypeAccount.password && propertyCode.trim() === prototypeAccount.propertyCode;
      if (matchesAccount) onPreview();
      else setError("The username, password, or property code is incorrect.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) setError(authError.message);
  };

  return <main className="login-shell">
    <section className="login-brand-rail">
      <div className="login-property"><Building2 size={20} /><div><small>ACTIVE PROPERTY</small><span>SwissBlue Hotel Jeddah</span><b>Property code <strong>22888</strong></b></div></div>
      <section className="login-trust" aria-labelledby="trust-title">
        <div className="login-trust-heading"><span>TRUST &amp; COMPLIANCE</span><h2 id="trust-title">Designed for responsible hospitality operations</h2><p>A standards-alignment framework for distribution, analytics, Saudi governance, privacy and ethical software.</p></div>
        <div className="trust-groups">{trustGroups.map((group) => <article className="trust-group" key={group.title}><h3>{group.title}</h3><div>{group.items.map((item) => <span className="trust-mark" key={item} title={item}><group.icon aria-hidden="true" size={14} /><b>{item}</b></span>)}</div></article>)}</div>
        <p className="trust-disclaimer"><ShieldCheck size={13} /> Standards awareness for product design; no certification or live connection is implied.</p>
      </section>
      <div className="login-brand-lockup"><BrandMark /><BrandWordmark /></div>
    </section>
    <section className="login-content">
      <form className="login-card" onSubmit={signIn}>
        <div className="login-heading"><span className="login-kicker">PROPERTY MANAGEMENT SYSTEM</span><h1>Welcome back, Abdalla</h1><p>Sign in to manage SwissBlue Hotel Jeddah.</p></div>
        <label>Username<Input autoComplete="username" onChange={(event) => setEmail(event.target.value)} placeholder="abdalla.elfouly@gulfhero.sa" required type="email" value={email} /></label>
        <label>Password<Input.Password autoComplete="current-password" onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" required value={password} /></label>
        <label>Property code<Input inputMode="numeric" maxLength={10} onChange={(event) => setPropertyCode(event.target.value)} placeholder="22888" required value={propertyCode} /></label>
        {error && <div className="login-error" role="alert">{error}</div>}
        <Button className="login-submit" htmlType="submit" loading={loading} type="primary">Sign in</Button>
        <div className={`login-database-status ${supabaseConfigured ? "ready" : "setup"}`}><ShieldCheck size={15} /><span>{supabaseConfigured ? "Secure sign-in is available for this property workspace." : "Local prototype access · Abdalla Elfouly · Group Owner"}</span></div>
        {!supabaseConfigured && <Button className="login-preview" htmlType="button" onClick={onPreview} type="text">Continue without signing in</Button>}
        <p className="login-privacy">Authorized team members only. Workspace activity is protected by role-based access.</p>
      </form>
    </section>
  </main>;
}

function App() {
  const [authReady, setAuthReady] = useState(!supabaseConfigured);
  const [previewMode, setPreviewMode] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    if (!supabase) return undefined;
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setAuthReady(true);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!active) return;
      setSession(nextSession);
      if (nextSession) setPreviewMode(false);
      setAuthReady(true);
    });
    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    setPreviewMode(false);
    setSession(null);
    if (supabase) await supabase.auth.signOut();
  };

  if (!authReady) return <main className="login-shell login-loading"><span>Preparing secure sign-in…</span></main>;
  if (!session && !previewMode) return <LoginPage onPreview={() => setPreviewMode(true)} />;

  return <PmsWorkspace
    account={{ name: "Abdalla Elfouly", initials: "AE", role: "Group Owner", email: session?.user?.email || prototypeAccount.email }}
    databaseMode={supabaseConfigured ? "configured" : "setup"}
    onLogout={logout}
  />;
}

export default App;
