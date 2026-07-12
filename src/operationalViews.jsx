import React, { useMemo, useState } from "react";
import { Button, Checkbox, Drawer, Input, Radio, Select, Switch, Table, Tabs, Tag } from "antd";
import {
  BarChart3,
  BedDouble,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Download,
  FileText,
  Info,
  ListChecks,
  MoreVertical,
  Plus,
  RefreshCw,
  Save,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  Users,
  Wrench
} from "lucide-react";

const toneByStatus = {
  "In house": "green", Arriving: "yellow", Confirmed: "blue", "Due out": "purple",
  Occupied: "green", Vacant: "blue", Reserved: "yellow", Blocked: "purple",
  Clean: "green", Dirty: "yellow", Inspected: "blue", Maintenance: "purple",
  Success: "green", Queued: "yellow", Pending: "yellow", Active: "green",
  Open: "blue", Resolved: "green", "On hold": "yellow", Closed: "purple",
  "In progress": "yellow", "Not started": "blue", Approved: "green", Draft: "blue"
};

function StatusTag({ value }) {
  return <Tag className={`status-tag ${toneByStatus[value] || "blue"}`}>{value}</Tag>;
}

function InlineStatus({ children, tone = "muted" }) {
  return <span className={`inline-status ${tone}`}>{children}</span>;
}

function WorkspaceTable({ columns, rows, emptyText = "No records match this view." }) {
  return <div className="table-frame operational-table"><Table className="pms-table" columns={columns} dataSource={rows} locale={{ emptyText }} pagination={false} size="small" /></div>;
}

function DatesHeader({ businessDates }) {
  return <div className="rate-grid-row rate-date-row"><div className="rate-grid-label"><ChevronLeft size={16} /><button>09/07/2026 <CalendarDays size={14} /></button><ChevronRight size={16} /></div>{businessDates.map((date) => <div className="rate-date" key={date.day}><span>{date.dow}</span><b>{date.day}</b><small>{date.month}</small></div>)}</div>;
}

function RateRestrictionGrid({ tab, businessDates }) {
  const isStopsell = tab === "Stopsells";
  const titles = {
    "Minimum Nights": "Minimum length of stay",
    "Maximum Nights": "Maximum length of stay",
    Stopsells: "Stop-sell control",
    COA: "Closed to arrival",
    COD: "Closed to departure"
  };
  const initial = businessDates.map((_, index) => isStopsell ? index === 2 || index === 6 : tab === "Minimum Nights" ? (index < 2 ? 2 : 1) : tab === "Maximum Nights" ? 7 : index === 4 || index === 7);
  const [values, setValues] = useState(initial);
  const numeric = tab === "Minimum Nights" || tab === "Maximum Nights";
  const rows = ["Superior King Room", "Superior Twin Room", "Deluxe King Room City View", "Executive Suite"];

  const updateValue = (row, index) => {
    setValues((current) => current.map((value, valueIndex) => valueIndex === index ? !value : value));
  };

  return <div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><DatesHeader businessDates={businessDates} />
    <div className="restriction-heading"><SlidersHorizontal size={15} /><strong>{titles[tab]}</strong><span>Click a date to update the local rule.</span></div>
    {rows.map((room, roomIndex) => <div className="rate-grid-row restriction-row" key={room}><div className="rate-grid-label"><BedDouble size={15} /><b>{room}</b></div>{businessDates.map((date, index) => numeric ? <button className="restriction-value" onClick={() => updateValue(roomIndex, index)} key={date.day}>{tab === "Minimum Nights" ? (values[index] ? 2 : 1) : values[index] ? 5 : 7}</button> : <button className={`restriction-toggle ${values[index] ? "active" : ""}`} onClick={() => updateValue(roomIndex, index)} key={date.day}>{values[index] ? "Active" : "Open"}</button>)}</div>)}
  </div></div>;
}

function RateDetailContent({ selected, tab }) {
  if (tab === "Channels") {
    return <WorkspaceTable columns={[{ title: "Business Source", dataIndex: "source" }, { title: "Rate Type", dataIndex: "rate" }, { title: "Status", dataIndex: "status", render: (value) => <StatusTag value={value} /> }]} rows={[{ key: "1", source: "Direct", rate: selected.plan.code, status: "Active" }, { key: "2", source: "Corporate", rate: selected.plan.code, status: "Active" }, { key: "3", source: "Travel Agent", rate: "Derived", status: "Pending" }]} />;
  }
  if (tab === "Restrictions") {
    return <div className="drawer-detail-list"><section><h3>Current controls</h3><p><span>Minimum nights</span><b>1 night</b></p><p><span>Maximum nights</span><b>7 nights</b></p><p><span>Stop-sell status</span><StatusTag value="Active" /></p><p><span>Arrival / departure</span><b>Open</b></p></section><section><h3>Selected date</h3><p><span>Date</span><b>{selected.date.day} {selected.date.month} 2026</b></p><p><span>Room availability</span><b>{selected.date.available} rooms</b></p></section></div>;
  }
  if (tab === "History") {
    return <div className="activity-timeline"><div><i className="green" /><span><b>Rate updated to SAR {selected.plan.rate.toFixed(2)}</b><small>Revenue Manager, 09 Jul 2026 11:40 AM</small></span></div><div><i className="blue" /><span><b>Derived rule recalculated</b><small>System, 09 Jul 2026 11:40 AM</small></span></div><div><i className="yellow" /><span><b>Rate plan reviewed</b><small>Revenue Manager, 08 Jul 2026 05:20 PM</small></span></div></div>;
  }
  return <div className="drawer-detail-list"><p><span>Rate Plan Code</span><b>{selected.plan.code}</b></p><p><span>Rate Plan Type</span><b>{selected.plan.type}</b></p><p><span>Base Plan</span><b>Room Only Flexible</b></p><p><span>Pricing Type</span><b>Per Room Per Night</b></p><p><span>Tax</span><b>Inclusive</b></p><p><span>Currency</span><b>SAR - Saudi Riyal</b></p><section><h3>Rate Summary</h3><p><span>Average Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Minimum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Maximum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p></section><section><h3>Last Updated</h3><p><span>User</span><b>Revenue Manager</b></p><p><span>Date & Time</span><b>09/07/2026 11:40 AM</b></p><p><span>Status</span><StatusTag value="Success" /></p></section></div>;
}

export function RatesView({ businessDates, rateGroups }) {
  const [tab, setTab] = useState("Rates");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({ plan: rateGroups[0].plans[0], date: businessDates[0] });
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTab, setDetailTab] = useState("Details");
  const [editing, setEditing] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [lastAction, setLastAction] = useState("All values shown are local controls for the selected property.");
  const groups = useMemo(() => rateGroups.map((group) => ({ ...group, plans: group.plans.filter((plan) => `${plan.name} ${plan.code}`.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.plans.length), [query, rateGroups]);
  const rateTabs = ["Inventory", "Rates", "Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"];
  const openDetail = (plan, date) => { setSelected({ plan, date }); setDetailTab("Details"); setDetailOpen(true); };
  const controls = <div className="rates-toolbar"><Select defaultValue="Room Only Flexible" options={[{ value: "Room Only Flexible", label: "Room Only Flexible" }, { value: "Room Only Non-Refundable", label: "Room Only Non-Refundable" }]} size="small" /><Input allowClear onChange={(event) => setQuery(event.target.value)} placeholder="Room type or rate plan" prefix={<Search size={15} />} value={query} /><Radio.Group defaultValue="Base Rates" optionType="button" options={["Base Rates", "Extra Adult Rates", "Extra Child Rates"]} size="small" /><Checkbox defaultChecked>Hide Derived Rate Plans</Checkbox><Checkbox defaultChecked>Rates Inclusive Tax</Checkbox><Button disabled={!dirty} className={dirty ? "primary-command" : ""} icon={<Save size={14} />} onClick={() => { setDirty(false); setLastAction("Rate changes saved locally at 11:48 AM."); }} size="small">Save</Button></div>;

  const inventory = <div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><DatesHeader businessDates={businessDates} />{rateGroups.map((group) => <React.Fragment key={group.name}><div className="rate-grid-row rate-group-row"><div className="rate-grid-label"><BedDouble size={16} /><b>{group.name}</b><span>{group.rooms}</span></div>{group.inventory.map((count, index) => <div key={index}>{count}</div>)}</div><div className="rate-grid-row inventory-detail-row"><div className="rate-grid-label"><span>Available rooms</span></div>{group.inventory.map((count, index) => <button onClick={() => setLastAction(`${group.name}: ${count} rooms available on ${businessDates[index].day} ${businessDates[index].month}.`)} key={index}>{count} available</button>)}</div></React.Fragment>)}<div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">Total available inventory <Info size={13} /></div>{businessDates.map((date) => <div key={date.day}>{date.available}</div>)}</div></div></div>;

  const rates = <div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><DatesHeader businessDates={businessDates} />{groups.map((group) => <React.Fragment key={group.name}><div className="rate-grid-row rate-group-row"><div className="rate-grid-label"><BedDouble size={16} /><b>{group.name}</b><span>{group.rooms}</span></div>{group.inventory.map((count, index) => <div key={index}>{count}</div>)}</div>{group.plans.map((plan) => <div className="rate-grid-row rate-plan-row" key={plan.code}><div className="rate-grid-label"><span>{plan.name}</span><button onClick={() => openDetail(plan, businessDates[0])} aria-label={`Open details for ${plan.name}`}><Info size={14} /></button></div>{businessDates.map((date) => { const key = `${plan.code}-${date.day}`; const isEditing = editing === key; return <button className={selected.plan.code === plan.code && selected.date.day === date.day ? "selected-rate" : ""} key={date.day} onClick={() => { setSelected({ plan, date }); setEditing(key); }}>{isEditing ? <Input autoFocus defaultValue={plan.rate.toFixed(2)} onBlur={() => { setEditing(null); setDirty(true); }} onPressEnter={() => { setEditing(null); setDirty(true); }} size="small" /> : plan.rate.toFixed(2)}</button>; })}</div>)}</React.Fragment>)}<div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">Sold rooms <Info size={13} /></div>{businessDates.map((date) => <div key={date.day}>{date.sold}</div>)}</div><div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">Available inventory</div>{businessDates.map((date) => <div key={date.day}>{date.available}</div>)}</div></div></div>;

  return <section className="rates-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={rateTabs.map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Upload size={14} />} onClick={() => setLastAction("Import queue opened for local rate records.")} size="small">Import</Button><Button icon={<Download size={14} />} onClick={() => setLastAction("Rate worksheet prepared for export.")} size="small">Export</Button></div></div>{tab === "Rates" && controls}{tab === "Inventory" && inventory}{tab === "Rates" && rates}{["Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"].includes(tab) && <RateRestrictionGrid tab={tab} businessDates={businessDates} />}<div className="surface-status"><CheckCircle2 size={14} />{lastAction}</div><Drawer className="rate-detail-drawer" onClose={() => setDetailOpen(false)} open={detailOpen} title={selected.plan.name} size={420}><Tabs activeKey={detailTab} onChange={setDetailTab} items={["Details", "Channels", "Restrictions", "History"].map((label) => ({ key: label, label, children: <RateDetailContent selected={selected} tab={label} /> }))} /></Drawer></section>;
}

const distributionLogRows = [
  { key: "1", location: "D", source: "Direct Rate Update", date: "09/07/2026", request: "11:40:06 AM", process: "11:40:34 AM", value: "704", user: "Revenue Manager", status: "Success" },
  { key: "2", location: "L", source: "Local Rate Review", date: "09/07/2026", request: "09:53:22 PM", process: "09:53:34 PM", value: "670", user: "System", status: "Success" },
  { key: "3", location: "A", source: "Availability Check", date: "08/07/2026", request: "04:07:52 PM", process: "04:22:30 PM", value: "653", user: "Revenue Manager", status: "Queued" },
  { key: "4", location: "O", source: "One Click Release", date: "08/07/2026", request: "02:53:49 PM", process: "02:54:11 PM", value: "933", user: "Front Desk", status: "Success" }
];

export function DistributionView() {
  const [tab, setTab] = useState("Distribution Log");
  const [notice, setNotice] = useState("Local property controls are current.");
  const [promotionOpen, setPromotionOpen] = useState(false);
  const logColumns = [{ title: "Location", dataIndex: "location", width: 90, render: (value) => <span className="source-letter">{value}</span> }, { title: "Activity", dataIndex: "source" }, { title: "Date", dataIndex: "date", width: 110 }, { title: "Requested", dataIndex: "request", width: 115 }, { title: "Processed", dataIndex: "process", width: 115 }, { title: "Value", dataIndex: "value", width: 80 }, { title: "User", dataIndex: "user", width: 140 }, { title: "Status", dataIndex: "status", width: 100, render: (value) => <StatusTag value={value} /> }];
  const rateRows = [{ key: "1", name: "Room Only Flexible", room: "Superior King Room", action: "Rate override", status: true, updated: "11:40 AM" }, { key: "2", name: "Room Only Flexible", room: "All rooms", action: "Availability release", status: true, updated: "09:53 PM" }, { key: "3", name: "Room Only Non-Refundable", room: "Executive Suite", action: "Stop-sell", status: false, updated: "08 Jul" }];
  const sourceRows = [{ key: "1", source: "Direct", segment: "Retail", payment: "Local payment", status: "Active" }, { key: "2", source: "Corporate", segment: "Contract", payment: "City ledger", status: "Active" }, { key: "3", source: "Travel Agent", segment: "Wholesale", payment: "Voucher", status: "Pending" }];
  const promotionRows = [{ key: "1", name: "Advance purchase", period: "01 Jul - 31 Aug", eligibility: "2 nights or more", status: "Active" }, { key: "2", name: "Weekend escape", period: "11 Jul - 31 Jul", eligibility: "Fri-Sat", status: "Active" }, { key: "3", name: "Long stay", period: "01 Aug - 31 Aug", eligibility: "7 nights or more", status: "Draft" }];
  const controls = <WorkspaceTable columns={[{ title: "Rate plan", dataIndex: "name" }, { title: "Room scope", dataIndex: "room" }, { title: "Control", dataIndex: "action" }, { title: "Enabled", dataIndex: "status", width: 110, render: (value, row) => <Switch defaultChecked={value} onChange={(checked) => setNotice(`${row.name} is now ${checked ? "enabled" : "disabled"} locally.`)} size="small" /> }, { title: "Last updated", dataIndex: "updated", width: 120 }, { title: "Action", width: 68, render: () => <button className="table-icon"><MoreVertical size={16} /></button> }]} rows={rateRows} />;
  const mappings = <WorkspaceTable columns={[{ title: "Business source", dataIndex: "source" }, { title: "Market segment", dataIndex: "segment" }, { title: "Settlement", dataIndex: "payment" }, { title: "Status", dataIndex: "status", render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.source} mapping selected for review.`)}>Review</Button> }]} rows={sourceRows} />;
  const promotions = <WorkspaceTable columns={[{ title: "Promotion", dataIndex: "name" }, { title: "Stay period", dataIndex: "period" }, { title: "Eligibility", dataIndex: "eligibility" }, { title: "Status", dataIndex: "status", render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.name} selected for editing.`)}>Edit</Button> }]} rows={promotionRows} />;
  return <section className="distribution-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={["Distribution Log", "Rate Controls", "Source Mapping", "Packages & Promotions"].map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Download size={14} />} onClick={() => setNotice("Current local distribution view prepared for export.")} size="small">Export</Button><Button icon={<RefreshCw size={14} />} onClick={() => setNotice("Local control status refreshed at 11:49 AM.")} size="small">Refresh</Button></div></div>{tab === "Distribution Log" && <WorkspaceTable columns={logColumns} rows={distributionLogRows} />}{tab === "Rate Controls" && controls}{tab === "Source Mapping" && mappings}{tab === "Packages & Promotions" && <>{<div className="surface-inline-actions"><span>Manage property-led packages and promotion rules.</span><Button icon={<Plus size={14} />} onClick={() => setPromotionOpen(true)} size="small">New Promotion</Button></div>}{promotions}</>}<div className="surface-status"><CheckCircle2 size={14} />{notice}</div><Drawer title="New Promotion" open={promotionOpen} onClose={() => setPromotionOpen(false)} size={420}><div className="drawer-form"><label>Promotion name<Input placeholder="e.g. Weekend escape" /></label><label>Stay period<Select defaultValue="July 2026" options={[{ value: "July 2026", label: "July 2026" }, { value: "August 2026", label: "August 2026" }]} /></label><label>Rate adjustment<Input placeholder="Amount or percentage" /></label><label>Eligibility<Input.TextArea rows={3} placeholder="Describe stay rules" /></label><div className="drawer-form-actions"><Button onClick={() => setPromotionOpen(false)}>Cancel</Button><Button className="primary-command" onClick={() => { setPromotionOpen(false); setNotice("Promotion saved locally as a draft."); }}>Save Draft</Button></div></div></Drawer></section>;
}

const guestRows = [
  { key: "1", name: "Omar Hassan", phone: "+966 50 303 9120", visits: 8, lastStay: "09 Jul 2026", status: "VIP", record: "R-30251" },
  { key: "2", name: "Salma Alomary", phone: "+966 55 290 1648", visits: 3, lastStay: "09 Jul 2026", status: "Active", record: "R-30243" },
  { key: "3", name: "Khalid Alharbi", phone: "+966 56 721 4490", visits: 4, lastStay: "08 Jul 2026", status: "Active", record: "R-30237" },
  { key: "4", name: "Noura Alsubaie", phone: "+966 53 992 2334", visits: 1, lastStay: "09 Jul 2026", status: "Active", record: "R-30219" }
];

export function GuestView({ onAdd, onOpenReservation }) {
  const [tab, setTab] = useState("Guest Database");
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState([{ key: "1", guest: "Omar Hassan", note: "Prefers a high floor and late checkout when possible.", owner: "Front Office", date: "09 Jul 10:15 AM" }, { key: "2", guest: "Salma Alomary", note: "Corporate billing profile confirmed.", owner: "Reservations", date: "08 Jul 03:20 PM" }]);
  const [notice, setNotice] = useState("Guest records are available for the current property.");
  const rows = guestRows.filter((row) => row.name.toLowerCase().includes(query.toLowerCase()) || row.phone.includes(query));
  const guests = <WorkspaceTable columns={[{ title: "Guest Name", dataIndex: "name", render: (name, row) => <button className="table-link" onClick={() => onOpenReservation(row)}>{name}</button> }, { title: "Mobile", dataIndex: "phone" }, { title: "Visits", dataIndex: "visits", width: 90 }, { title: "Last Stay", dataIndex: "lastStay", width: 110 }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.name} selected for profile review.`)}>View</Button> }]} rows={rows} />;
  const noteList = <WorkspaceTable columns={[{ title: "Guest", dataIndex: "guest" }, { title: "Note", dataIndex: "note" }, { title: "Added by", dataIndex: "owner", width: 130 }, { title: "Date", dataIndex: "date", width: 145 }, { title: "Action", width: 82, render: (_, row) => <Button size="small" onClick={() => setNotice(`Note for ${row.guest} selected.`)}>Review</Button> }]} rows={notes} />;
  const operations = <WorkspaceTable columns={[{ title: "Request", dataIndex: "request" }, { title: "Guest", dataIndex: "guest" }, { title: "Owner", dataIndex: "owner" }, { title: "Due", dataIndex: "due", width: 125 }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 95, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.request} marked for front desk follow-up.`)}>Follow up</Button> }]} rows={[{ key: "1", request: "Airport transfer", guest: "Omar Hassan", owner: "Concierge", due: "09 Jul 01:30 PM", status: "Open" }, { key: "2", request: "Late checkout", guest: "Khalid Alharbi", owner: "Front Office", due: "10 Jul 02:00 PM", status: "In progress" }]} />;
  const lostFound = <WorkspaceTable columns={[{ title: "Item", dataIndex: "item" }, { title: "Found in", dataIndex: "location" }, { title: "Logged by", dataIndex: "owner" }, { title: "Date", dataIndex: "date", width: 120 }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 95, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.item} marked for collection review.`)}>Update</Button> }]} rows={[{ key: "1", item: "Phone charger", location: "Room 203", owner: "Housekeeping", date: "08 Jul 2026", status: "Open" }, { key: "2", item: "Suit jacket", location: "Lobby", owner: "Security", date: "07 Jul 2026", status: "On hold" }]} />;
  const contents = { "Guest Database": guests, "Guest Notes": noteList, "Front Desk Operations": operations, "Lost and Found": lostFound };
  return <section className="guest-view"><div className="section-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={Object.keys(contents).map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div><Input allowClear onChange={(event) => setQuery(event.target.value)} prefix={<Search size={15} />} placeholder="Search guest" value={query} /><Button icon={<Plus size={14} />} onClick={() => tab === "Guest Notes" ? setNotes((current) => [{ key: String(current.length + 1), guest: "Omar Hassan", note: "New guest note ready for review.", owner: "Front Office", date: "Just now" }, ...current]) : onAdd()} size="small">{tab === "Guest Notes" ? "Add Note" : "Add Guest"}</Button></div></div>{contents[tab]}<div className="surface-status"><Users size={14} />{notice}</div></section>;
}

export function CashieringView({ onNewPayment, onOpenReservation }) {
  const [tab, setTab] = useState("Cashiering Center");
  const [notice, setNotice] = useState("Cashiering balances reflect the current business date.");
  const center = <WorkspaceTable columns={[{ title: "Guest / Folio", dataIndex: "guest", render: (value, row) => <button className="table-link" onClick={() => onOpenReservation(row)}>{value}</button> }, { title: "Room", dataIndex: "room", width: 90 }, { title: "Balance", dataIndex: "balance", width: 130, render: (value) => `SAR ${value}` }, { title: "Payment Status", dataIndex: "payment", width: 140, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => onOpenReservation(row)}>Open Folio</Button> }]} rows={[{ key: "1", guest: "Omar Hassan", room: "412", balance: "1,280.00", payment: "Pending" }, { key: "2", guest: "Khalid Alharbi", room: "214", balance: "540.00", payment: "Active" }, { key: "3", guest: "Noura Alsubaie", room: "118", balance: "200.00", payment: "Pending" }, { key: "4", guest: "Lina Rahman", room: "101", balance: "720.00", payment: "Active" }]} />;
  const drawer = <WorkspaceTable columns={[{ title: "Shift", dataIndex: "shift" }, { title: "Cashier", dataIndex: "cashier" }, { title: "Opened", dataIndex: "opened" }, { title: "Expected", dataIndex: "expected", align: "right" }, { title: "Status", dataIndex: "status", width: 115, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 100, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.shift} selected for cash count.`)}>Count Cash</Button> }]} rows={[{ key: "1", shift: "AM 09 Jul", cashier: "Sara Alotaibi", opened: "07:00 AM", expected: "SAR 6,280.00", status: "Open" }, { key: "2", shift: "PM 08 Jul", cashier: "Hadi Saleh", opened: "03:00 PM", expected: "SAR 9,460.00", status: "Closed" }]} />;
  const expenses = <WorkspaceTable columns={[{ title: "Voucher", dataIndex: "voucher" }, { title: "Description", dataIndex: "description" }, { title: "Owner", dataIndex: "owner" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.voucher} selected for approval.`)}>Review</Button> }]} rows={[{ key: "1", voucher: "EV-1842", description: "Guest taxi reimbursement", owner: "Front Office", amount: "SAR 85.00", status: "Approved" }, { key: "2", voucher: "EV-1845", description: "Lobby supplies", owner: "Housekeeping", amount: "SAR 120.00", status: "Pending" }]} />;
  const pos = <WorkspaceTable columns={[{ title: "Posting", dataIndex: "posting" }, { title: "Folio", dataIndex: "folio" }, { title: "Description", dataIndex: "description" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 95, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.posting} marked for folio review.`)}>Review</Button> }]} rows={[{ key: "1", posting: "POS-9001", folio: "F-9001", description: "Breakfast, Qty 2", amount: "SAR 120.00", status: "Success" }, { key: "2", posting: "POS-9005", folio: "F-9010", description: "Laundry", amount: "SAR 75.00", status: "Queued" }]} />;
  const tabs = { "Cashiering Center": center, "Cash Drawer": drawer, "Expense Voucher": expenses, POS: pos };
  return <section className="cashiering-view"><div className="cashiering-metrics"><MiniMetric label="Open Folios" value="46" detail="SAR 38,240.00 balance" tone="yellow" /><MiniMetric label="Cash Today" value="SAR 12,640" detail="18 recorded payments" tone="green" /><MiniMetric label="City Ledger" value="SAR 7,420" detail="5 routed folios" tone="purple" /><MiniMetric label="Pending Authorizations" value="03" detail="Requires review" tone="blue" /></div><div className="section-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={Object.keys(tabs).map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div><Button icon={<Plus size={14} />} onClick={onNewPayment} size="small">New Payment</Button><Button icon={<Download size={14} />} onClick={() => setNotice(`${tab} records prepared for export.`)} size="small">Export</Button></div></div>{tabs[tab]}<div className="surface-status"><CheckCircle2 size={14} />{notice}</div></section>;
}

export function HousekeepingView({ roomRows, onAddTask }) {
  const [tab, setTab] = useState("House Status");
  const [notice, setNotice] = useState("Room conditions are aligned to the housekeeping worklist.");
  const [taskRows, setTaskRows] = useState([{ key: "1", task: "Inspect late checkout room", room: "203", assignee: "N. Ahmed", due: "11:30 AM", priority: "High", status: "In progress" }, { key: "2", task: "Replace AC filter", room: "512", assignee: "Engineering", due: "02:00 PM", priority: "Normal", status: "Open" }]);
  const house = <WorkspaceTable columns={[{ title: "Room", dataIndex: "number", width: 90 }, { title: "Room Type", dataIndex: "type" }, { title: "Occupancy", dataIndex: "status", width: 120, render: (value) => <StatusTag value={value} /> }, { title: "Condition", dataIndex: "condition", width: 130, render: (value) => <StatusTag value={value} /> }, { title: "Work Order / Task", dataIndex: "note" }, { title: "Action", width: 104, render: (_, row) => <Button size="small" onClick={() => setNotice(`Room ${row.number} marked for inspection review.`)}>Inspect</Button> }]} rows={roomRows} />;
  const maintenance = <WorkspaceTable columns={[{ title: "Room", dataIndex: "room", width: 90 }, { title: "Block reason", dataIndex: "reason" }, { title: "Opened", dataIndex: "opened", width: 120 }, { title: "Expected release", dataIndex: "release", width: 135 }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 98, render: (_, row) => <Button size="small" onClick={() => setNotice(`Maintenance block for room ${row.room} selected.`)}>Review</Button> }]} rows={[{ key: "1", room: "512", reason: "AC service", opened: "09 Jul 08:45", release: "09 Jul 04:00 PM", status: "In progress" }, { key: "2", room: "614", reason: "Bathroom repair", opened: "08 Jul 06:30", release: "10 Jul 12:00 PM", status: "Open" }]} />;
  const tasks = <WorkspaceTable columns={[{ title: "Task", dataIndex: "task" }, { title: "Room", dataIndex: "room", width: 80 }, { title: "Assigned to", dataIndex: "assignee" }, { title: "Due", dataIndex: "due", width: 110 }, { title: "Priority", dataIndex: "priority", width: 95, render: (value) => <InlineStatus tone={value === "High" ? "danger" : "muted"}>{value}</InlineStatus> }, { title: "Status", dataIndex: "status", width: 115, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => { setTaskRows((current) => current.map((task) => task.key === row.key ? { ...task, status: "Resolved" } : task)); setNotice(`${row.task} marked resolved.`); }}>Resolve</Button> }]} rows={taskRows} />;
  const tabs = { "House Status": house, "Maintenance Block": maintenance, "Work Order / Task": tasks };
  return <section className="housekeeping-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={Object.keys(tabs).map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Plus size={14} />} onClick={onAddTask} size="small">Add Task</Button><Button icon={<Download size={14} />} onClick={() => setNotice(`${tab} worklist prepared for export.`)} size="small">Export</Button></div></div><div className="house-summary"><MiniMetric label="Clean" value="49" detail="Ready for arrival" tone="green" /><MiniMetric label="Dirty" value="05" detail="Needs attention" tone="yellow" /><MiniMetric label="Inspected" value="18" detail="Supervisor cleared" tone="blue" /><MiniMetric label="Maintenance" value="04" detail="Blocked rooms" tone="purple" /></div>{tabs[tab]}<div className="surface-status"><ClipboardCheck size={14} />{notice}</div></section>;
}

const reportGroups = [
  ["Front Office", ["Arrival Report", "Departure Report", "In-house Guest List", "Room Status"]],
  ["Revenue", ["Daily Revenue", "Source-wise Revenue", "Rate Type Summary", "Forecast"]],
  ["Audit", ["Audit Trail", "Void Transaction", "User Activity", "IP Report"]],
  ["Statistics", ["Monthly Occupancy", "Monthly Revenue", "Guest Folio List", "Hotel Availability"]]
];

function ReportResults({ report }) {
  const revenue = report.includes("Revenue") || report === "Forecast" || report === "Rate Type Summary";
  const audit = report.includes("Audit") || report === "Void Transaction" || report === "User Activity" || report === "IP Report";
  const rows = audit ? [{ key: "1", first: "09 Jul 11:40 AM", second: "Rate plan reviewed", third: "Revenue Manager", fourth: "Success" }, { key: "2", first: "09 Jul 10:24 AM", second: "Reservation workspace opened", third: "Front Office", fourth: "Success" }, { key: "3", first: "08 Jul 09:53 PM", second: "Availability review", third: "System", fourth: "Queued" }] : revenue ? [{ key: "1", first: "Room revenue", second: "SAR 41,820.00", third: "72.4%", fourth: "On target" }, { key: "2", first: "Ancillary revenue", second: "SAR 5,340.00", third: "9.2%", fourth: "On target" }, { key: "3", first: "Average daily rate", second: "SAR 577.59", third: "+2.4%", fourth: "On target" }] : [{ key: "1", first: "Omar Hassan", second: "Executive Suite", third: "412", fourth: "In house" }, { key: "2", first: "Salma Alomary", second: "Deluxe King Room City View", third: "305", fourth: "Arriving" }, { key: "3", first: "Khalid Alharbi", second: "Superior Twin Room", third: "214", fourth: "In house" }];
  const headers = audit ? ["Date / time", "Activity", "User", "Status"] : revenue ? ["Metric", "Value", "Variance", "Trend"] : ["Guest", "Room type", "Room", "Status"];
  return <div className="report-result"><div className="report-result-summary"><MiniMetric label="Report rows" value="03" detail="For selected date range" tone="blue" /><MiniMetric label={revenue ? "Revenue" : audit ? "Events" : "Occupancy"} value={revenue ? "SAR 47,160" : audit ? "03" : "34.2%"} detail="Current selection" tone="green" /><MiniMetric label="Generated" value="11:52" detail="09 Jul 2026" tone="yellow" /></div><WorkspaceTable columns={headers.map((title, index) => ({ title, dataIndex: ["first", "second", "third", "fourth"][index], render: index === 3 ? (value) => audit || !revenue ? <StatusTag value={value === "On target" ? "Active" : value} /> : value : undefined }))} rows={rows} /></div>;
}

export function ReportsView() {
  const [activeGroup, setActiveGroup] = useState("Front Office");
  const [activeReport, setActiveReport] = useState("Arrival Report");
  const [generated, setGenerated] = useState(false);
  const [notice, setNotice] = useState("");
  return <section className="reports-view"><div className="report-catalog">{reportGroups.map(([group, items]) => <div key={group}><button className={activeGroup === group ? "active-report-group" : ""} onClick={() => { setActiveGroup(group); setActiveReport(items[0]); setGenerated(false); }}><FileText size={15} />{group}<ChevronRight size={14} /></button>{activeGroup === group && <div>{items.map((item) => <button className={activeReport === item ? "active" : ""} key={item} onClick={() => { setActiveReport(item); setGenerated(false); }}>{item}</button>)}</div>}</div>)}</div><div className="report-canvas"><div className="report-heading"><div><h2>{activeReport}</h2><p>Set the date range and output fields, then generate a desktop preview.</p></div><Button icon={<Download size={14} />} onClick={() => setNotice(`${activeReport} prepared for export.`)} disabled={!generated} size="small">Export</Button></div><div className="report-filters"><label>From<Input defaultValue="09/07/2026" /></label><label>To<Input defaultValue="09/07/2026" /></label><label>Room Type<Select defaultValue="All room types" options={[{ value: "All room types", label: "All room types" }, { value: "Superior King Room", label: "Superior King Room" }, { value: "Executive Suite", label: "Executive Suite" }]} /></label><Button className="primary-command" icon={<BarChart3 size={14} />} onClick={() => { setGenerated(true); setNotice(`${activeReport} generated at 11:52 AM.`); }} size="small">Run Report</Button></div>{generated ? <ReportResults report={activeReport} /> : <div className="report-empty"><BarChart3 size={28} /><strong>Ready to generate</strong><span>Choose filters then run this report to preview the result table.</span></div>}{notice && <div className="surface-status"><CheckCircle2 size={14} />{notice}</div>}</div></section>;
}

const roomTypeConfigRows = [
  { key: "1", name: "Superior King Room", base: "1/0", max: "2/1", status: true, updated: "09 Jul 2026" },
  { key: "2", name: "Superior Twin Room", base: "1/0", max: "2/1", status: true, updated: "09 Jul 2026" },
  { key: "3", name: "Deluxe King Room City View", base: "1/0", max: "4/4", status: true, updated: "09 Jul 2026" },
  { key: "4", name: "Junior Suite", base: "1/0", max: "2/2", status: true, updated: "09 Jul 2026" },
  { key: "5", name: "Deluxe Junior Suite King Bed", base: "1/0", max: "3/1", status: true, updated: "09 Jul 2026" },
  { key: "6", name: "Deluxe Junior Suite 2 Single Bed", base: "1/0", max: "3/1", status: true, updated: "09 Jul 2026" },
  { key: "7", name: "Executive Suite", base: "1/0", max: "6/2", status: true, updated: "09 Jul 2026" },
  { key: "8", name: "Presidential Suite City View", base: "1/0", max: "4/4", status: true, updated: "09 Jul 2026" },
  { key: "9", name: "Meeting Room", base: "1/0", max: "2/0", status: true, updated: "09 Jul 2026" },
  { key: "10", name: "Paymaster", base: "1/0", max: "4/2", status: true, updated: "09 Jul 2026" }
];

const rateTypeConfigRows = [
  { key: "flexible", name: "Room Only Flexible", description: "Base room-only rate with flexible cancellation terms", status: true, updated: "09 Jul 2026" },
  { key: "non-refundable", name: "Room Only Non-Refundable", description: "Derived room-only rate with non-refundable terms", status: true, updated: "09 Jul 2026" }
];

const ratePlanConfigRows = roomTypeConfigRows.flatMap((roomType, index) => [
  { key: `${roomType.key}-flexible`, roomType: roomType.name, name: "Room Only Flexible", code: `ROF-${String(index + 1).padStart(2, "0")}`, status: true, updated: "09 Jul 2026" },
  { key: `${roomType.key}-non-refundable`, roomType: roomType.name, name: "Room Only Non-Refundable", code: `RONR-${String(index + 1).padStart(2, "0")}`, status: true, updated: "09 Jul 2026" }
]);

const configurationSections = {
  "User Management": { description: "Manage users, roles, security preferences and device activity.", tabs: ["Users", "User Role", "Blocked Users", "Device Activity", "User Activity", "Security Preferences"], add: "User", rows: [{ key: "1", name: "Sara Alotaibi", description: "Front Office Manager", status: true, updated: "09 Jul 2026" }, { key: "2", name: "Night Auditor", description: "Financial review and night audit", status: true, updated: "08 Jul 2026" }, { key: "3", name: "Housekeeping Manager", description: "Rooms, tasks and inspection", status: true, updated: "08 Jul 2026" }] },
  "Hotel Profile": { description: "Maintain property identity, operating dates and contact details.", tabs: ["Property", "Addresses", "Business Day", "Audit Trail"], add: "Property Record", rows: [{ key: "1", name: "SwissBlue Hotel Jeddah", description: "Primary property profile", status: true, updated: "09 Jul 2026" }, { key: "2", name: "Business day", description: "09 Jul 2026, open", status: true, updated: "09 Jul 2026" }] },
  "Rooms & Rates": { description: "Define how your rooms look, feel, and operate - from smart amenities to flexible occupancy settings, all in one seamless space.", tabs: ["Room Type", "Rate Type", "Rate Plan", "Tax"], add: "Room Type", rows: roomTypeConfigRows },
  "Taxes & Payments": { description: "Configure tax profiles, payment modes and folio posting rules.", tabs: ["Taxes", "Payment Modes", "Folio Rules", "Audit Trail"], add: "Payment Mode", rows: [{ key: "1", name: "VAT 15%", description: "Inclusive room tax", status: true, updated: "09 Jul 2026" }, { key: "2", name: "Cash", description: "Front desk cash payment", status: true, updated: "08 Jul 2026" }] },
  "Guest Setup": { description: "Manage guest classifications, preference lists and identity rules.", tabs: ["Guest Types", "Preferences", "Identity Types", "Audit Trail"], add: "Guest Type", rows: [{ key: "1", name: "VIP", description: "Priority service handling", status: true, updated: "07 Jul 2026" }, { key: "2", name: "Corporate", description: "Company billing profile", status: true, updated: "07 Jul 2026" }] },
  "General Settings": { description: "Control operational defaults, check-in policies and local display preferences.", tabs: ["Operations", "Reservation Rules", "Localization", "Audit Trail"], add: "Setting", rows: [{ key: "1", name: "Check-in time", description: "03:00 PM", status: true, updated: "09 Jul 2026" }, { key: "2", name: "Check-out time", description: "12:00 PM", status: true, updated: "09 Jul 2026" }] },
  Notifications: { description: "Define operational alerts and team notification preferences.", tabs: ["Operational Alerts", "Email Templates", "Escalation Rules"], add: "Notification", rows: [{ key: "1", name: "Due out reminder", description: "Front desk at 11:00 AM", status: true, updated: "09 Jul 2026" }, { key: "2", name: "Maintenance escalation", description: "Engineering after 30 min", status: true, updated: "08 Jul 2026" }] },
  Documents: { description: "Manage locally generated registration, folio and operational document templates.", tabs: ["Registration Card", "Folio", "Letters", "Audit Trail"], add: "Document", rows: [{ key: "1", name: "Registration Card", description: "Standard A4 template", status: true, updated: "08 Jul 2026" }, { key: "2", name: "Guest Folio", description: "Detailed folio template", status: true, updated: "08 Jul 2026" }] }
};

const configurationGroups = {
  "Property Setup": ["Hotel Profile", "Rooms & Rates"],
  Master: ["Taxes & Payments", "Guest Setup"],
  Settings: ["General Settings", "Notifications", "Documents"],
  "User Management": ["User Management"]
};

export function ConfigurationView({ onAdd }) {
  const [group, setGroup] = useState("Property Setup");
  const [section, setSection] = useState("Rooms & Rates");
  const [tab, setTab] = useState("Room Type");
  const [enabled, setEnabled] = useState({});
  const [notice, setNotice] = useState("Configuration changes are local to the selected property.");
  const current = configurationSections[section];
  const isRoomTypeTable = section === "Rooms & Rates" && tab === "Room Type";
  const isRatePlanTable = section === "Rooms & Rates" && tab === "Rate Plan";
  const isRateTypeTable = section === "Rooms & Rates" && tab === "Rate Type";
  const pageTitle = section === "Rooms & Rates" ? tab : section;
  const addLabel = isRatePlanTable ? "Rate Plan" : isRateTypeTable ? "Rate Type" : current.add;
  const rows = isRatePlanTable ? ratePlanConfigRows : isRateTypeTable ? rateTypeConfigRows : current.rows;
  const statusColumn = { title: "Status", dataIndex: "status", width: 100, render: (value, row) => <Switch checked={enabled[row.key] ?? value} onChange={(checked) => { setEnabled((currentEnabled) => ({ ...currentEnabled, [row.key]: checked })); setNotice(`${row.name} is now ${checked ? "enabled" : "disabled"}.`); }} size="small" /> };
  const actionColumn = { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.name} selected for editing.`)}>Edit</Button> };
  const columns = isRoomTypeTable
    ? [statusColumn, { title: "Room Type", dataIndex: "name" }, { title: "Base (A/C)", dataIndex: "base", width: 150 }, { title: "Max (A/C)", dataIndex: "max", width: 150 }, actionColumn]
    : isRatePlanTable
      ? [statusColumn, { title: "Room Type", dataIndex: "roomType" }, { title: "Rate Plan", dataIndex: "name" }, { title: "Code", dataIndex: "code", width: 100 }, { title: "Last Updated", dataIndex: "updated", width: 130 }, actionColumn]
      : [statusColumn, { title: isRateTypeTable ? "Rate Type" : section === "User Management" ? "Name / Role" : "Record", dataIndex: "name" }, { title: "Description", dataIndex: "description" }, { title: "Last Updated", dataIndex: "updated", width: 130 }, actionColumn];
  const selectSection = (nextSection) => {
    setSection(nextSection);
    setTab(configurationSections[nextSection].tabs[0]);
  };
  return <section className="configuration-view"><aside className="configuration-nav">{Object.entries(configurationGroups).map(([label, sections]) => <div className="configuration-group" key={label}><button className={group === label ? "active" : ""} onClick={() => { setGroup(label); selectSection(sections[0]); }}>{label}<ChevronRight size={14} /></button>{group === label && <div className="configuration-subnav">{sections.map((item) => <button className={section === item ? "selected" : ""} key={item} onClick={() => selectSection(item)}>{item}</button>)}</div>}</div>)}</aside><div className="configuration-canvas"><div className="config-heading"><div><div className="configuration-context"><InlineStatus tone="muted">{group}</InlineStatus></div><h2>{pageTitle}</h2><p>{current.description}</p></div><Button icon={<Plus size={14} />} onClick={() => onAdd({ title: `Add ${addLabel}`, action: `Save ${addLabel}` })} size="small">Add {addLabel}</Button></div><Tabs activeKey={tab} onChange={setTab} className="config-tabs" items={current.tabs.map((label) => ({ key: label, label }))} size="small" /><div className="configuration-context"><Input className="config-search" prefix={<Search size={15} />} placeholder={isRoomTypeTable ? "Search Room Type" : isRatePlanTable ? "Search Rate Plan" : isRateTypeTable ? "Search Rate Type" : `Search ${section}`} /><InlineStatus tone="muted">{tab}</InlineStatus></div><WorkspaceTable columns={columns} rows={rows.map((row) => ({ ...row, key: `${section}-${tab}-${row.key}` }))} /><div className="surface-status"><ShieldCheck size={14} />{notice}</div></div></section>;
}

export function MiniMetric({ label, value, detail, tone }) {
  return <article className="mini-metric"><span className={tone} /><div><small>{label}</small><strong>{value}</strong><em>{detail}</em></div></article>;
}
