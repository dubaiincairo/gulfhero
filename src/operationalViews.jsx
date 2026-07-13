import React, { useMemo, useState } from "react";
import { Button, Checkbox, Drawer, Input, Modal, Radio, Select, Switch, Table, Tabs, Tag } from "antd";
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

function WorkspaceTable({ columns, rows, emptyText = "No records match this view.", rowKey = "key" }) {
  return <div className="table-frame operational-table"><Table className="pms-table" columns={columns} dataSource={rows} locale={{ emptyText }} pagination={false} rowKey={rowKey} size="small" /></div>;
}

function DatesHeader({ businessDates }) {
  return <div className="rate-grid-row rate-date-row"><div className="rate-grid-label"><ChevronLeft size={16} /><button>09/07/2026 <CalendarDays size={14} /></button><ChevronRight size={16} /></div>{businessDates.map((date) => <div className="rate-date" key={date.day}><span>{date.dow}</span><b>{date.day}</b><small>{date.month}</small></div>)}</div>;
}

function RateRestrictionGrid({ tab, businessDates, onChange }) {
  const isStopsell = tab === "Stopsells";
  const titles = {
    "Minimum Nights": "Minimum length of stay",
    "Maximum Nights": "Maximum length of stay",
    Stopsells: "Stop-sell control",
    COA: "Closed to arrival",
    COD: "Closed to departure"
  };
  const rows = ["Superior King Room", "Superior Twin Room", "Deluxe King Room City View", "Executive Suite"];
  const initial = () => rows.map(() => businessDates.map((_, index) => isStopsell ? index === 2 || index === 6 : tab === "Minimum Nights" ? index < 2 : tab === "Maximum Nights" ? false : index === 4 || index === 7));
  const [values, setValues] = useState(initial);
  const numeric = tab === "Minimum Nights" || tab === "Maximum Nights";

  const updateValue = (rowIndex, index) => {
    setValues((current) => current.map((row, currentRowIndex) => currentRowIndex === rowIndex ? row.map((value, valueIndex) => valueIndex === index ? !value : value) : row));
    onChange(`${tab} rule updated locally for ${rows[rowIndex]} on ${businessDates[index].day} ${businessDates[index].month}.`);
  };

  return <div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><DatesHeader businessDates={businessDates} />
    <div className="restriction-heading"><SlidersHorizontal size={15} /><strong>{titles[tab]}</strong><span>Click a date to update the local rule.</span></div>
    {rows.map((room, roomIndex) => <div className="rate-grid-row restriction-row" key={room}><div className="rate-grid-label"><BedDouble size={15} /><b>{room}</b></div>{businessDates.map((date, index) => numeric ? <button aria-label={`Update ${tab} for ${room} on ${date.day} ${date.month}`} className="restriction-value" onClick={() => updateValue(roomIndex, index)} key={date.day}>{tab === "Minimum Nights" ? (values[roomIndex][index] ? 2 : 1) : values[roomIndex][index] ? 5 : 7}</button> : <button aria-label={`Update ${tab} for ${room} on ${date.day} ${date.month}`} className={`restriction-toggle ${values[roomIndex][index] ? "active" : ""}`} onClick={() => updateValue(roomIndex, index)} key={date.day}>{values[roomIndex][index] ? "Active" : "Open"}</button>)}</div>)}
  </div></div>;
}

function RateDetailContent({ selected, tab, inclusiveTax }) {
  if (tab === "Channels") {
    return <WorkspaceTable columns={[{ title: "Business Source", dataIndex: "source" }, { title: "Rate Type", dataIndex: "rate" }, { title: "Status", dataIndex: "status", render: (value) => <StatusTag value={value} /> }]} rows={[{ key: "1", source: "Direct", rate: selected.plan.code, status: "Active" }, { key: "2", source: "Corporate", rate: selected.plan.code, status: "Active" }, { key: "3", source: "Travel Agent", rate: "Derived", status: "Pending" }]} />;
  }
  if (tab === "Restrictions") {
    return <div className="drawer-detail-list"><section><h3>Current controls</h3><p><span>Minimum nights</span><b>1 night</b></p><p><span>Maximum nights</span><b>7 nights</b></p><p><span>Stop-sell status</span><StatusTag value="Active" /></p><p><span>Arrival / departure</span><b>Open</b></p></section><section><h3>Selected date</h3><p><span>Date</span><b>{selected.date.day} {selected.date.month} 2026</b></p><p><span>Room availability</span><b>{selected.date.available} rooms</b></p></section></div>;
  }
  if (tab === "History") {
    return <div className="activity-timeline"><div><i className="green" /><span><b>Rate updated to SAR {selected.plan.rate.toFixed(2)}</b><small>Revenue Manager, 09 Jul 2026 11:40 AM</small></span></div><div><i className="blue" /><span><b>Derived rule recalculated</b><small>System, 09 Jul 2026 11:40 AM</small></span></div><div><i className="yellow" /><span><b>Rate plan reviewed</b><small>Revenue Manager, 08 Jul 2026 05:20 PM</small></span></div></div>;
  }
  return <div className="drawer-detail-list"><p><span>Rate Plan Code</span><b>{selected.plan.code}</b></p><p><span>Rate Plan Type</span><b>{selected.plan.type}</b></p><p><span>Base Plan</span><b>Room Only Flexible</b></p><p><span>Pricing Type</span><b>Per Room Per Night</b></p><p><span>Tax</span><b>{inclusiveTax ? "Inclusive" : "Exclusive"}</b></p><p><span>Currency</span><b>SAR - Saudi Riyal</b></p><section><h3>Rate Summary</h3><p><span>Average Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Minimum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Maximum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p></section><section><h3>Last Updated</h3><p><span>User</span><b>Revenue Manager</b></p><p><span>Date & Time</span><b>09/07/2026 11:40 AM</b></p><p><span>Status</span><StatusTag value="Success" /></p></section></div>;
}

export function RatesView({ businessDates, rateGroups }) {
  const [tab, setTab] = useState("Rates");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({ plan: rateGroups[0].plans[0], date: businessDates[0] });
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTab, setDetailTab] = useState("Details");
  const [editing, setEditing] = useState(null);
  const [dirty, setDirty] = useState(false);
  const [ratePlanFilter, setRatePlanFilter] = useState("All rate plans");
  const [rateMode, setRateMode] = useState("Base Rates");
  const [hideDerived, setHideDerived] = useState(true);
  const [inclusiveTax, setInclusiveTax] = useState(true);
  const [rateValues, setRateValues] = useState(() => Object.fromEntries(rateGroups.flatMap((group) => group.plans.flatMap((plan) => businessDates.map((date) => [`${plan.code}-${date.day}`, plan.rate.toFixed(2)])))));
  const [lastAction, setLastAction] = useState("All values shown are local controls for the selected property.");
  const groups = useMemo(() => rateGroups.map((group) => ({ ...group, plans: group.plans.filter((plan) => `${plan.name} ${plan.code}`.toLowerCase().includes(query.toLowerCase()) && (ratePlanFilter === "All rate plans" || plan.name === ratePlanFilter) && (!hideDerived || plan.type !== "Derived")) })).filter((group) => group.plans.length), [hideDerived, query, rateGroups, ratePlanFilter]);
  const rateTabs = ["Inventory", "Rates", "Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"];
  const openDetail = (plan, date) => { setSelected({ plan, date }); setDetailTab("Details"); setDetailOpen(true); };
  const saveChanges = () => { setDirty(false); setLastAction(`${tab} changes saved locally for the selected property.`); };
  const changeRatePlanFilter = (value) => { setRatePlanFilter(value); if (value === "Room Only Non-Refundable") { setHideDerived(false); setLastAction("Non-refundable rate plans shown for local review."); } };
  const controls = <div className="rates-toolbar"><Select aria-label="Rate plan filter" onChange={changeRatePlanFilter} options={[{ value: "All rate plans", label: "All rate plans" }, { value: "Room Only Flexible", label: "Room Only Flexible" }, { value: "Room Only Non-Refundable", label: "Room Only Non-Refundable" }]} size="small" value={ratePlanFilter} /><Input allowClear onChange={(event) => setQuery(event.target.value)} placeholder="Room type or rate plan" prefix={<Search size={15} />} value={query} /><Radio.Group onChange={(event) => { setRateMode(event.target.value); setLastAction(`${event.target.value} selected for local review.`); }} optionType="button" options={["Base Rates", "Extra Adult Rates", "Extra Child Rates"]} size="small" value={rateMode} /><Checkbox checked={hideDerived} onChange={(event) => { setHideDerived(event.target.checked); setLastAction(`${event.target.checked ? "Derived rate plans hidden" : "All rate plans shown"} locally.`); }}>Hide Derived Rate Plans</Checkbox><Checkbox checked={inclusiveTax} onChange={(event) => { setInclusiveTax(event.target.checked); setLastAction(`Rates are now shown ${event.target.checked ? "inclusive" : "exclusive"} of tax.`); }}>Rates Inclusive Tax</Checkbox><Button disabled={!dirty} className={dirty ? "primary-command" : ""} icon={<Save size={14} />} onClick={saveChanges} size="small">Save</Button></div>;
  const restrictionControls = <div className="rates-toolbar restriction-toolbar"><span><SlidersHorizontal size={14} />{tab} local controls</span><span>Changes apply to this desktop prototype only.</span><Button disabled={!dirty} className={dirty ? "primary-command" : ""} icon={<Save size={14} />} onClick={saveChanges} size="small">Save</Button></div>;

  const inventory = <div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><DatesHeader businessDates={businessDates} />{rateGroups.map((group) => <React.Fragment key={group.name}><div className="rate-grid-row rate-group-row"><div className="rate-grid-label"><BedDouble size={16} /><b>{group.name}</b><span>{group.rooms}</span></div>{group.inventory.map((count, index) => <div key={index}>{count}</div>)}</div><div className="rate-grid-row inventory-detail-row"><div className="rate-grid-label"><span>Available rooms</span></div>{group.inventory.map((count, index) => <button onClick={() => setLastAction(`${group.name}: ${count} rooms available on ${businessDates[index].day} ${businessDates[index].month}.`)} key={index}>{count} available</button>)}</div></React.Fragment>)}<div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">Total available inventory <Info size={13} /></div>{businessDates.map((date) => <div key={date.day}>{date.available}</div>)}</div></div></div>;

  const rates = <div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><DatesHeader businessDates={businessDates} />{groups.map((group) => <React.Fragment key={group.name}><div className="rate-grid-row rate-group-row"><div className="rate-grid-label"><BedDouble size={16} /><b>{group.name}</b><span>{group.rooms}</span></div>{group.inventory.map((count, index) => <div key={index}>{count}</div>)}</div>{group.plans.map((plan) => <div className="rate-grid-row rate-plan-row" key={plan.code}><div className="rate-grid-label"><span>{plan.name}</span><button onClick={() => openDetail(plan, businessDates[0])} aria-label={`Open details for ${plan.name} in ${group.name}`}><Info size={14} /></button></div>{businessDates.map((date) => { const key = `${plan.code}-${date.day}`; const isEditing = editing === key; const label = `Edit ${plan.name} for ${group.name} on ${date.day} ${date.month}`; return isEditing ? <div className="rate-edit-cell" key={date.day}><Input aria-label={label} autoFocus onBlur={() => setEditing(null)} onChange={(event) => { setRateValues((current) => ({ ...current, [key]: event.target.value })); setDirty(true); }} onPressEnter={() => setEditing(null)} size="small" value={rateValues[key]} /></div> : <button aria-label={label} className={selected.plan.code === plan.code && selected.date.day === date.day ? "selected-rate" : ""} key={date.day} onClick={() => { setSelected({ plan, date }); setEditing(key); }}>{rateValues[key]}</button>; })}</div>)}</React.Fragment>)}<div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">Sold rooms <Info size={13} /></div>{businessDates.map((date) => <div key={date.day}>{date.sold}</div>)}</div><div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">Available inventory</div>{businessDates.map((date) => <div key={date.day}>{date.available}</div>)}</div></div></div>;

  return <section className="rates-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={rateTabs.map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Upload size={14} />} onClick={() => setLastAction("Import queue opened for local rate records.")} size="small">Import</Button><Button icon={<Download size={14} />} onClick={() => setLastAction("Rate worksheet prepared for export.")} size="small">Export</Button></div></div>{tab === "Rates" && controls}{["Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"].includes(tab) && restrictionControls}{tab === "Inventory" && inventory}{tab === "Rates" && rates}{["Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"].includes(tab) && <RateRestrictionGrid onChange={(message) => { setDirty(true); setLastAction(message); }} tab={tab} businessDates={businessDates} />}<div className="surface-status"><CheckCircle2 size={14} />{lastAction}</div><Drawer className="rate-detail-drawer" onClose={() => setDetailOpen(false)} open={detailOpen} title={selected.plan.name} size={420}><Tabs activeKey={detailTab} onChange={setDetailTab} items={["Details", "Channels", "Restrictions", "History"].map((label) => ({ key: label, label, children: <RateDetailContent inclusiveTax={inclusiveTax} selected={selected} tab={label} /> }))} /></Drawer></section>;
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

export function CashieringView() {
  const [tab, setTab] = useState("Cashiering Center");
  const [drawerTab, setDrawerTab] = useState("Drawers");
  const [notice, setNotice] = useState("Cashiering is a local review workspace for the current business date.");
  const [selectedLedgerKey, setSelectedLedgerKey] = useState(null);
  const [drawerSearch, setDrawerSearch] = useState("");
  const [drawerStatus, setDrawerStatus] = useState("All statuses");
  const [reportSearch, setReportSearch] = useState("");
  const [selectedDrawerKey, setSelectedDrawerKey] = useState(null);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [createDrawerOpen, setCreateDrawerOpen] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);
  const [drawerName, setDrawerName] = useState("");
  const [assignedUser, setAssignedUser] = useState("Sara Alotaibi");
  const [drawerRows, setDrawerRows] = useState([
    { key: "front-desk-main", name: "Front Desk Main", user: "Sara Alotaibi", balance: "SAR 6,280.00", opened: "09 Jul 2026, 07:00 AM", closed: "—", status: "Open" },
    { key: "evening-shift", name: "Evening Shift", user: "Hadi Saleh", balance: "SAR 9,460.00", opened: "08 Jul 2026, 03:00 PM", closed: "08 Jul 2026, 11:05 PM", status: "Closed" },
    { key: "lobby-desk", name: "Lobby Desk", user: "Front Office", balance: "SAR 2,180.00", opened: "08 Jul 2026, 11:00 AM", closed: "08 Jul 2026, 10:58 PM", status: "Closed" }
  ]);
  const [reportRows, setReportRows] = useState([
    { key: "report-1", drawer: "Front Desk Main", session: "09 Jul 2026, AM", expected: "SAR 6,280.00", actual: "SAR 6,280.00", received: "SAR 1,840.00", drop: "SAR 0.00", status: "Open" },
    { key: "report-2", drawer: "Evening Shift", session: "08 Jul 2026, PM", expected: "SAR 9,460.00", actual: "SAR 9,460.00", received: "SAR 2,210.00", drop: "SAR 6,500.00", status: "Closed" },
    { key: "report-3", drawer: "Lobby Desk", session: "08 Jul 2026, Day", expected: "SAR 2,180.00", actual: "SAR 2,180.00", received: "SAR 780.00", drop: "SAR 1,400.00", status: "Closed" }
  ]);

  const ledgerRows = [
    { key: "ledger-1", date: "09 Jul 2026", description: "F-9001 · Omar Hassan · Room 412", type: "Cash", user: "Sara Alotaibi", credit: "1,280.00", debit: "—", assigned: "1,280.00", unassigned: "—", balance: "1,280.00" },
    { key: "ledger-2", date: "09 Jul 2026", description: "F-9010 · Khalid Alharbi · Room 214", type: "Card", user: "Front Office", credit: "540.00", debit: "—", assigned: "540.00", unassigned: "—", balance: "540.00" },
    { key: "ledger-3", date: "09 Jul 2026", description: "F-9014 · Noura Alsubaie · Room 118", type: "Cash", user: "Sara Alotaibi", credit: "—", debit: "200.00", assigned: "—", unassigned: "200.00", balance: "200.00" },
    { key: "ledger-4", date: "08 Jul 2026", description: "F-8998 · Lina Rahman · Room 101", type: "City Ledger", user: "Hadi Saleh", credit: "720.00", debit: "—", assigned: "720.00", unassigned: "—", balance: "720.00" }
  ];
  const selectedLedger = ledgerRows.find((row) => row.key === selectedLedgerKey);
  const selectedDrawer = drawerRows.find((row) => row.key === selectedDrawerKey);
  const filteredDrawerRows = drawerRows.filter((row) => (drawerStatus === "All statuses" || row.status === drawerStatus) && `${row.name} ${row.user}`.toLowerCase().includes(drawerSearch.toLowerCase()));
  const filteredReportRows = reportRows.filter((row) => `${row.drawer} ${row.session} ${row.status}`.toLowerCase().includes(reportSearch.toLowerCase()));

  const selectLedger = (row) => {
    setSelectedLedgerKey(row.key);
    setNotice(`${row.description.split(" · ")[0]} selected. Local payment actions are now available for review.`);
  };
  const savePaymentPreview = () => {
    setPaymentOpen(false);
    setNotice(`Payment preview for ${selectedLedger.description.split(" · ")[0]} saved locally. No payment was posted.`);
  };
  const createDrawer = () => {
    const name = drawerName.trim();
    if (!name) return;
    const key = `local-drawer-${Date.now()}`;
    setDrawerRows((current) => [{ key, name, user: assignedUser, balance: "SAR 0.00", opened: "Created locally", closed: "—", status: "Open" }, ...current]);
    setReportRows((current) => [{ key: `local-report-${Date.now()}`, drawer: name, session: "Local draft session", expected: "SAR 0.00", actual: "—", received: "SAR 0.00", drop: "SAR 0.00", status: "Open" }, ...current]);
    setSelectedDrawerKey(key);
    setDrawerTab("Drawers");
    setCreateDrawerOpen(false);
    setDrawerName("");
    setNotice(`${name} was created as a local drawer session. No cash operation was performed.`);
  };

  const center = <>
    <div className="cashiering-context-bar">
      <label>City Ledger<Select aria-label="City ledger" defaultValue="All City Ledgers" options={[{ value: "All City Ledgers", label: "All City Ledgers" }, { value: "Corporate", label: "Corporate" }, { value: "Travel Agent", label: "Travel Agent" }]} size="small" /></label>
      <label>Basis<Select aria-label="Cashiering date basis" defaultValue="Posting Date" options={[{ value: "Posting Date", label: "Posting Date" }, { value: "Departure Date", label: "Departure Date" }]} onChange={(value) => setNotice(`${value} selected for local ledger review.`)} size="small" /></label>
      <label>Date range<Input aria-label="Cashiering date range" readOnly size="small" value="09/07/2026 to 09/07/2026" /></label>
      <Checkbox onChange={(event) => setNotice(`Pending ledger commission ${event.target.checked ? "shown" : "hidden"} locally.`)}>Pending ledger commission</Checkbox>
      <Checkbox onChange={(event) => setNotice(`Void records ${event.target.checked ? "shown" : "hidden"} locally.`)}>Display void</Checkbox>
    </div>
    <div className="cash-ledger-total-grid">
      <div><span>City Ledger Total</span><strong>SAR 7,420.00</strong></div><div><span>Unpaid Invoice</span><strong>SAR 2,740.00</strong></div><div><span>Unassigned Payments</span><strong>SAR 200.00</strong></div><div><span>Assigned Payments</span><strong>SAR 2,540.00</strong></div><div><span>Opening Balance</span><strong>SAR 22,680.00</strong></div><div><span>Closing Balance</span><strong>SAR 25,220.00</strong></div>
    </div>
    <WorkspaceTable columns={[{ title: "Date", dataIndex: "date", width: 110 }, { title: "Description", dataIndex: "description", render: (value, row) => <button aria-pressed={selectedLedgerKey === row.key} className={`table-link ${selectedLedgerKey === row.key ? "selected-table-link" : ""}`} onClick={() => selectLedger(row)}>{value}</button> }, { title: "Payment Type", dataIndex: "type", width: 118 }, { title: "User", dataIndex: "user", width: 125 }, { title: "Credit", dataIndex: "credit", align: "right", width: 95 }, { title: "Debit", dataIndex: "debit", align: "right", width: 95 }, { title: "Assigned", dataIndex: "assigned", align: "right", width: 95 }, { title: "Unassigned", dataIndex: "unassigned", align: "right", width: 105 }, { title: "Balance", dataIndex: "balance", align: "right", width: 100 }]} rows={ledgerRows} />
    <div className="cashiering-action-row"><span>{selectedLedger ? `${selectedLedger.description.split(" · ")[0]} selected for local review.` : "Select a ledger row to prepare local actions."}</span><div><Button disabled={!selectedLedger} onClick={() => setPaymentOpen(true)} size="small">Add New Payment</Button><Button disabled={!selectedLedger} onClick={() => setNotice(`Export preview prepared for ${selectedLedger.description.split(" · ")[0]}.`)} size="small">Export</Button><Button disabled={!selectedLedger} onClick={() => setNotice(`Email draft prepared for ${selectedLedger.description.split(" · ")[0]}; no message was sent.`)} size="small">Send Email</Button><Button disabled={!selectedLedger} onClick={() => setNotice(`Print preview prepared for ${selectedLedger.description.split(" · ")[0]}.`)} size="small">Print</Button></div></div>
  </>;

  const drawerWorkspace = <section className="cash-drawer-workspace">
    <div className="cash-drawer-heading"><div><p>Cashiering / Cash Drawer</p><h3>Cash Drawer</h3><span>Local session and reconciliation view for SwissBlue Hotel Jeddah.</span></div><div><Button onClick={() => setAuditOpen(true)} size="small">Audit Trail</Button><Button className="primary-command" icon={<Plus size={14} />} onClick={() => setCreateDrawerOpen(true)} size="small">Create Drawer</Button></div></div>
    <Tabs activeKey={drawerTab} className="pms-tabs cash-drawer-tabs" items={[{ key: "Drawers", label: "Drawers" }, { key: "Cashier Report", label: "Cashier Report" }]} onChange={setDrawerTab} size="small" />
    {drawerTab === "Drawers" ? <><div className="cash-drawer-filters"><Input allowClear aria-label="Search cash drawers" onChange={(event) => setDrawerSearch(event.target.value)} placeholder="Search drawer name or assigned user" prefix={<Search size={15} />} value={drawerSearch} /><Select aria-label="Cash drawer status" onChange={setDrawerStatus} options={[{ value: "All statuses", label: "All statuses" }, { value: "Open", label: "Open" }, { value: "Closed", label: "Closed" }]} size="small" value={drawerStatus} /><Button icon={<RefreshCw size={14} />} onClick={() => { setDrawerSearch(""); setDrawerStatus("All statuses"); setNotice("Cash Drawer filters were reset locally."); }} size="small">Reset</Button></div><WorkspaceTable columns={[{ title: "Drawer Name", dataIndex: "name", render: (value, row) => <button aria-pressed={selectedDrawerKey === row.key} className={`table-link ${selectedDrawerKey === row.key ? "selected-table-link" : ""}`} onClick={() => { setSelectedDrawerKey(row.key); setNotice(`${row.name} selected for local session review.`); }}>{value}</button> }, { title: "Assigned User", dataIndex: "user", width: 145 }, { title: "Balance", dataIndex: "balance", width: 125, align: "right" }, { title: "Last Opened", dataIndex: "opened", width: 170 }, { title: "Last Closed", dataIndex: "closed", width: 170 }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }, { title: "Actions", width: 104, render: (_, row) => <Button onClick={() => { setSelectedDrawerKey(row.key); setNotice(`${row.name} session opened for local review.`); }} size="small">View Session</Button> }]} rows={filteredDrawerRows} />{selectedDrawer && <div className="cash-drawer-session"><div><strong>{selectedDrawer.name}</strong><span>{selectedDrawer.user} · {selectedDrawer.balance} · {selectedDrawer.status} session</span></div><Button onClick={() => setNotice(`${selectedDrawer.name} session marked reviewed locally.`)} size="small">Mark Reviewed</Button></div>}</> : <><div className="cash-drawer-filters report"><Input allowClear aria-label="Search cashier reports" onChange={(event) => setReportSearch(event.target.value)} placeholder="Search drawer or session" prefix={<Search size={15} />} value={reportSearch} /><Input aria-label="Cashier report date range" readOnly size="small" value="08/07/2026 to 09/07/2026" /><Select aria-label="Cashier report scope" defaultValue="All Drawers" options={[{ value: "All Drawers", label: "All Drawers" }, { value: "Front Desk Main", label: "Front Desk Main" }, { value: "Evening Shift", label: "Evening Shift" }]} size="small" /><Button icon={<RefreshCw size={14} />} onClick={() => { setReportSearch(""); setNotice("Cashier Report filters were reset locally."); }} size="small">Reset</Button><Button icon={<Download size={14} />} onClick={() => setNotice("Cashier Report export preview prepared locally.")} size="small">Export</Button></div><WorkspaceTable columns={[{ title: "Drawer", dataIndex: "drawer" }, { title: "Session", dataIndex: "session", width: 150 }, { title: "Expected", dataIndex: "expected", align: "right", width: 120 }, { title: "Actual", dataIndex: "actual", align: "right", width: 120 }, { title: "Received", dataIndex: "received", align: "right", width: 120 }, { title: "Cash Drop", dataIndex: "drop", align: "right", width: 120 }, { title: "Status", dataIndex: "status", width: 102, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 92, render: (_, row) => <Button onClick={() => setNotice(`${row.drawer} ${row.session} report selected for local review.`)} size="small">Review</Button> }]} rows={filteredReportRows} /><p className="cash-drawer-report-caption">Expected, actual, received, and cash-drop values are static local review fixtures.</p></>}
  </section>;

  const expenses = <WorkspaceTable columns={[{ title: "Voucher", dataIndex: "voucher" }, { title: "Description", dataIndex: "description" }, { title: "Owner", dataIndex: "owner" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.voucher} selected for local approval review.`)}>Review</Button> }]} rows={[{ key: "1", voucher: "EV-1842", description: "Guest taxi reimbursement", owner: "Front Office", amount: "SAR 85.00", status: "Approved" }, { key: "2", voucher: "EV-1845", description: "Lobby supplies", owner: "Housekeeping", amount: "SAR 120.00", status: "Pending" }]} />;
  const pos = <WorkspaceTable columns={[{ title: "Posting", dataIndex: "posting" }, { title: "Folio", dataIndex: "folio" }, { title: "Description", dataIndex: "description" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 95, render: (_, row) => <Button size="small" onClick={() => setNotice(`${row.posting} marked for local folio review.`)}>Review</Button> }]} rows={[{ key: "1", posting: "POS-9001", folio: "F-9001", description: "Breakfast, Qty 2", amount: "SAR 120.00", status: "Success" }, { key: "2", posting: "POS-9005", folio: "F-9010", description: "Laundry", amount: "SAR 75.00", status: "Queued" }]} />;
  const tabs = { "Cashiering Center": center, "Cash Drawer": drawerWorkspace, "Expense Voucher": expenses, POS: pos };

  return <section className="cashiering-view"><div className="cashiering-metrics"><MiniMetric label="Open Folios" value="46" detail="SAR 38,240.00 balance" tone="yellow" /><MiniMetric label="Cash Today" value="SAR 12,640" detail="18 local review entries" tone="green" /><MiniMetric label="City Ledger" value="SAR 7,420" detail="5 routed folios" tone="purple" /><MiniMetric label="Pending Authorizations" value="03" detail="Requires review" tone="blue" /></div><div className="section-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={Object.keys(tabs).map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div><Button icon={<Download size={14} />} onClick={() => setNotice(`${tab} export preview prepared locally.`)} size="small">Export</Button></div></div>{tabs[tab]}<div className="surface-status"><CheckCircle2 size={14} />{notice}</div><Modal className="cashiering-modal" footer={null} onCancel={() => setPaymentOpen(false)} open={paymentOpen} title="Add New Payment"><div className="cashiering-modal-note">Local preview only. Saving does not post, charge, or connect to a payment system.</div><div className="cashiering-modal-form"><label>Selected folio<Input readOnly value={selectedLedger?.description.split(" · ")[0] || ""} /></label><label>Mode of payment<Select defaultValue="Cash" options={[{ value: "Cash", label: "Cash" }, { value: "Card", label: "Card" }, { value: "City Ledger", label: "City Ledger" }]} /></label><label>Amount<Input defaultValue={selectedLedger?.balance || ""} prefix="SAR" /></label><label>Remark<Input placeholder="Optional local note" /></label></div><div className="drawer-form-actions"><Button onClick={() => setPaymentOpen(false)}>Cancel</Button><Button className="primary-command" onClick={savePaymentPreview}>Save Local Preview</Button></div></Modal><Modal className="cashiering-modal" footer={null} onCancel={() => setCreateDrawerOpen(false)} open={createDrawerOpen} title="Create Drawer"><div className="cashiering-modal-note">Creates a temporary local drawer session only. No cash entry or external connection is made.</div><div className="cashiering-modal-form"><label>Drawer Name<Input aria-label="Drawer Name" autoFocus onChange={(event) => setDrawerName(event.target.value)} placeholder="e.g. Front Desk Evening" value={drawerName} /></label><label>Assigned User<Select aria-label="Assigned User" onChange={setAssignedUser} options={[{ value: "Sara Alotaibi", label: "Sara Alotaibi" }, { value: "Hadi Saleh", label: "Hadi Saleh" }, { value: "Front Office", label: "Front Office" }]} value={assignedUser} /></label></div><div className="drawer-form-actions"><Button onClick={() => { setCreateDrawerOpen(false); setDrawerName(""); }}>Cancel</Button><Button className="primary-command" disabled={!drawerName.trim()} onClick={createDrawer}>Create Drawer</Button></div></Modal><Drawer className="cashiering-audit-drawer" onClose={() => setAuditOpen(false)} open={auditOpen} placement="right" size={400} title="Cash Drawer Audit Trail"><div className="activity-timeline"><div><i className="green" /><span><b>Front Desk Main opened</b><small>09 Jul 2026, 07:00 AM · Local review fixture</small></span></div><div><i className="blue" /><span><b>Cashier Report prepared</b><small>08 Jul 2026, 11:05 PM · No export sent</small></span></div><div><i className="yellow" /><span><b>Evening Shift closed</b><small>08 Jul 2026, 11:05 PM · Local review fixture</small></span></div></div><div className="drawer-form-actions"><Button onClick={() => setAuditOpen(false)}>Close</Button></div></Drawer></section>;
}

export function HousekeepingView({ roomRows, onAddTask }) {
  const [tab, setTab] = useState("House Status");
  const [notice, setNotice] = useState("Room conditions are aligned to the housekeeping worklist.");
  const [taskRows, setTaskRows] = useState([{ key: "1", task: "Inspect late checkout room", room: "203", assignee: "N. Ahmed", due: "11:30 AM", priority: "High", status: "In progress" }, { key: "2", task: "Replace AC filter", room: "512", assignee: "Engineering", due: "02:00 PM", priority: "Normal", status: "Open" }]);
  const house = <WorkspaceTable columns={[{ title: "Room", dataIndex: "number", width: 90 }, { title: "Room Type", dataIndex: "type" }, { title: "Occupancy", dataIndex: "status", width: 120, render: (value) => <StatusTag value={value} /> }, { title: "Condition", dataIndex: "condition", width: 130, render: (value) => <StatusTag value={value} /> }, { title: "Work Order / Task", dataIndex: "note" }, { title: "Action", width: 104, render: (_, row) => <Button size="small" onClick={() => setNotice(`Room ${row.number} marked for inspection review.`)}>Inspect</Button> }]} rowKey="number" rows={roomRows} />;
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
  Documents: { description: "Manage locally generated registration, folio and operational document templates.", tabs: ["Registration Card", "Folio", "Letters", "Audit Trail"], add: "Document", rows: [{ key: "1", name: "Registration Card", description: "Standard A4 template", status: true, updated: "08 Jul 2026" }, { key: "2", name: "Guest Folio", description: "Detailed folio template", status: true, updated: "08 Jul 2026" }] },
  "Booking Engine": { description: "Configure a local-only visual booking experience.", tabs: ["Booking Engine Summary", "Settings", "Analytics & Tracking", "Customization", "Preferences"], add: "Preference", rows: [] }
};

const configurationGroups = {
  "Property Setup": ["Hotel Profile", "Rooms & Rates"],
  Master: ["Taxes & Payments", "Guest Setup"],
  Settings: ["General Settings", "Notifications", "Documents"],
  "Booking Engine": ["Booking Engine"],
  "User Management": ["User Management"]
};

const bookingEngineTabs = ["Booking Engine Summary", "Settings", "Analytics & Tracking", "Customization", "Preferences"];
const bookingEngineRooms = [
  "Superior King Room",
  "Superior Twin Room",
  "Deluxe King Room City View",
  "Junior Suite"
];

function BookingEnginePreview({ open, onClose }) {
  const [selectedRoom, setSelectedRoom] = useState("");
  const [searched, setSearched] = useState(false);
  return <Drawer className="booking-preview-drawer" open={open} onClose={onClose} size="large" closable={false}>
    <div className="booking-preview-shell">
      <header className="drawer-page-header"><div><button aria-label="Close booking preview" onClick={onClose}><ChevronLeft size={17} /></button><span><h2>Desktop booking preview</h2><small>Visual prototype only</small></span></div><InlineStatus tone="muted">No live endpoint</InlineStatus></header>
      <div className="booking-preview-body">
        <div className="booking-preview-hero"><span>SWISSBLUE HOTEL JEDDAH</span><h3>Your stay, thoughtfully arranged.</h3><p>A local desktop preview for configuration review. It never opens checkout or payment.</p></div>
        <div className="booking-preview-search"><label>Check in<Input defaultValue="09 Jul 2026" readOnly /></label><label>Check out<Input defaultValue="10 Jul 2026" readOnly /></label><Button className="primary-command" size="small" onClick={() => setSearched(true)}>Search rooms</Button></div>
        <section className="booking-preview-section"><div className="booking-preview-section-heading"><div><h3>Available room types</h3><p>{searched ? "Local room-type preview refreshed." : "Configured from the local prototype property."}</p></div><InlineStatus tone="muted">4 shown</InlineStatus></div>{bookingEngineRooms.map((room, index) => <article className={`booking-preview-room ${selectedRoom === room ? "selected" : ""}`} key={room}><div><b>{room}</b><small>{index === 0 ? "Room Only Flexible" : "Configured room type"}</small></div><Button size="small" type={selectedRoom === room ? "primary" : "default"} onClick={() => setSelectedRoom(room)}>{selectedRoom === room ? "Selected" : "Select"}</Button></article>)}</section>
        <div className="booking-preview-stop"><Info size={15} /><span>Selection stops here. This preview intentionally has no reservation, checkout, payment, or external connection.</span></div>
      </div>
    </div>
  </Drawer>;
}

function BookingEngineWorkspace() {
  const [tab, setTab] = useState("Booking Engine Summary");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [notice, setNotice] = useState("All Booking Engine controls are local presentation state.");
  const [settings, setSettings] = useState({ payAtHotel: true, discount: true, packagesLocked: false, terms: true });
  const toggle = (key, label) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
    setNotice(`${label} ${settings[key] ? "disabled" : "enabled"} locally.`);
  };
  const save = (label = "Booking Engine settings") => setNotice(`${label} saved to this prototype session only.`);
  const summary = <div className="booking-summary-grid">
    <section className="booking-overview-card"><div><InlineStatus tone="muted">Booking Engine Summary</InlineStatus><h3>Overview of Your Booking Engine</h3><p>Review the locally configured direct-booking experience for SwissBlue Hotel Jeddah.</p></div><div className="booking-action-row"><Button className="primary-command" onClick={() => setPreviewOpen(true)} size="small">Preview desktop flow</Button><Button onClick={() => setNotice("The booking engine address is shown for visual review only.")} size="small">Show booking link</Button></div></section>
    <section className="booking-link-card"><span>BOOKING ENGINE LINK</span><b>Hotel website integration path</b><p>Use this visual configuration view to review placement guidance. It does not open or connect to an external site.</p><div><Info size={14} />No live booking endpoint configured</div></section>
    <section className="booking-stat-row"><MiniMetric label="Room types" value="10" detail="Property configuration" tone="green" /><MiniMetric label="Rate plans" value="02" detail="Room Only Flexible / Non-Refundable" tone="blue" /><MiniMetric label="Preview mode" value="On" detail="Desktop prototype" tone="yellow" /></section>
    <section className="booking-guide-card"><div><h3>What is My Booking Engine?</h3><p>A branded direct-booking experience configured from the PMS. This prototype is limited to desktop visual design and local interaction.</p></div><div><h3>Where Can I Find My Booking Engine?</h3><p>Review the integration guidance and preview locally before any future web implementation is approved.</p></div></section>
  </div>;
  const settingsPanel = <div className="booking-settings-grid"><section className="booking-setting-card"><div><h3>Guarantee Setting</h3><p>Default reservation guarantee for the desktop prototype.</p></div><label>Default Reservation Guarantee<Select defaultValue="Pay at Hotel" options={[{ value: "Pay at Hotel", label: "Pay at Hotel" }, { value: "Guarantee Required", label: "Guarantee Required" }]} /></label><label>Incomplete booking handling<Select defaultValue="Hold locally" options={[{ value: "Hold locally", label: "Hold locally" }, { value: "Release after review", label: "Release after review" }]} /></label></section><section className="booking-setting-card"><div><h3>Competitive Advantage</h3><p>Visible value messages are illustrative only; they do not affect availability or pricing.</p></div><div className="booking-switch-row"><span><b>Pay at Hotel</b><small>Show a local prototype preference</small></span><Switch checked={settings.payAtHotel} onChange={() => toggle("payAtHotel", "Pay at Hotel")} /></div><div className="booking-switch-row"><span><b>Direct Booking Discount</b><small>Show the configuration treatment only</small></span><Switch checked={settings.discount} onChange={() => toggle("discount", "Direct Booking Discount")} /></div><Button icon={<Save size={14} />} onClick={() => save("Guarantee and advantage preferences")} size="small">Save preferences</Button></section></div>;
  const analytics = <div className="booking-settings-grid"><section className="booking-setting-card"><div><h3>Analytics & Tracking</h3><p>Prepare the desktop configuration anatomy without placing or calling external tracking code.</p></div><label>Tracking provider<Select defaultValue="Not connected" options={[{ value: "Not connected", label: "Not connected" }, { value: "Future provider review", label: "Future provider review" }]} /></label><label>Measurement ID<Input placeholder="Not configured" readOnly /></label></section><section className="booking-setting-card"><div><h3>Preview events</h3><p>Event labels remain on-device demonstration data.</p></div><div className="booking-event-list"><span><CheckCircle2 size={14} />Landing page viewed</span><span><CheckCircle2 size={14} />Room type selected</span><span><CheckCircle2 size={14} />Booking intent recorded locally</span></div><Button icon={<Save size={14} />} onClick={() => save("Tracking configuration")} size="small">Save tracking settings</Button></section></div>;
  const customization = <div className="booking-settings-grid"><section className="booking-setting-card"><div><h3>Theme Setting</h3><p>Desktop theme controls reflect the PMS visual language.</p></div><label>Theme Color<div className="booking-color-row"><span className="booking-color-swatch" /><Input defaultValue="#F8B505" /></div></label><label>Header style<Select defaultValue="Property name and compact search" options={[{ value: "Property name and compact search", label: "Property name and compact search" }, { value: "Image-led header", label: "Image-led header" }]} /></label></section><section className="booking-setting-card"><div><h3>Room presentation</h3><p>Use configured property room types without attaching availability to a live service.</p></div><div className="booking-room-list">{bookingEngineRooms.map((room) => <span key={room}><CheckCircle2 size={14} />{room}</span>)}</div><Button className="primary-command" onClick={() => setPreviewOpen(true)} size="small">Preview customization</Button></section></div>;
  const preferences = <div className="booking-settings-grid"><section className="booking-setting-card"><div><h3>Preferences</h3><p>Control how the visual booking surface presents local options.</p></div><div className="booking-switch-row"><span><b>Keep packages locked by default</b><small>Display preference only</small></span><Switch checked={settings.packagesLocked} onChange={() => toggle("packagesLocked", "Package lock")} /></div><div className="booking-switch-row"><span><b>Require Hotel Policy & Terms acceptance</b><small>Prototype disclosure preference</small></span><Switch checked={settings.terms} onChange={() => toggle("terms", "Terms acceptance")} /></div><Button icon={<Save size={14} />} onClick={() => save("Booking Engine preferences")} size="small">Save preferences</Button></section><section className="booking-setting-card booking-safe-card"><ShieldCheck size={20} /><div><h3>Prototype safety boundary</h3><p>No guest data, payment capture, live booking endpoint, checkout flow, marketplace, or external connection is available in this module.</p></div></section></div>;
  const tabContent = tab === "Booking Engine Summary" ? summary : tab === "Settings" ? settingsPanel : tab === "Analytics & Tracking" ? analytics : tab === "Customization" ? customization : preferences;
  return <><div className="booking-engine-workspace"><div className="config-heading"><div><div className="configuration-context"><InlineStatus tone="muted">Booking Engine</InlineStatus></div><h2>Booking Engine</h2><p>Configure a visual desktop booking experience for SwissBlue Hotel Jeddah.</p></div><Button className="primary-command" onClick={() => setPreviewOpen(true)} size="small">Open local preview</Button></div><Tabs activeKey={tab} onChange={setTab} className="config-tabs" items={bookingEngineTabs.map((label) => ({ key: label, label }))} size="small" />{tabContent}<div className="surface-status"><ShieldCheck size={14} />{notice}</div></div><BookingEnginePreview open={previewOpen} onClose={() => setPreviewOpen(false)} /></>;
}

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
  const isBookingEngine = section === "Booking Engine";
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
  return <section className="configuration-view"><aside className="configuration-nav">{Object.entries(configurationGroups).map(([label, sections]) => <div className="configuration-group" key={label}><button className={group === label ? "active" : ""} onClick={() => { setGroup(label); selectSection(sections[0]); }}>{label}<ChevronRight size={14} /></button>{group === label && <div className="configuration-subnav">{sections.map((item) => <button className={section === item ? "selected" : ""} key={item} onClick={() => selectSection(item)}>{item}</button>)}</div>}</div>)}</aside><div className="configuration-canvas">{isBookingEngine ? <BookingEngineWorkspace /> : <><div className="config-heading"><div><div className="configuration-context"><InlineStatus tone="muted">{group}</InlineStatus></div><h2>{pageTitle}</h2><p>{current.description}</p></div><Button icon={<Plus size={14} />} onClick={() => onAdd({ title: `Add ${addLabel}`, action: `Save ${addLabel}` })} size="small">Add {addLabel}</Button></div><Tabs activeKey={tab} onChange={setTab} className="config-tabs" items={current.tabs.map((label) => ({ key: label, label }))} size="small" /><div className="configuration-context"><Input className="config-search" prefix={<Search size={15} />} placeholder={isRoomTypeTable ? "Search Room Type" : isRatePlanTable ? "Search Rate Plan" : isRateTypeTable ? "Search Rate Type" : `Search ${section}`} /><InlineStatus tone="muted">{tab}</InlineStatus></div><WorkspaceTable columns={columns} rows={rows.map((row) => ({ ...row, key: `${section}-${tab}-${row.key}` }))} /><div className="surface-status"><ShieldCheck size={14} />{notice}</div></>}</div></section>;
}

export function MiniMetric({ label, value, detail, tone }) {
  return <article className="mini-metric"><span className={tone} /><div><small>{label}</small><strong>{value}</strong><em>{detail}</em></div></article>;
}
