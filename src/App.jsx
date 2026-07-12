import React, { useMemo, useState } from "react";
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
  CircleDollarSign,
  ClipboardList,
  Download,
  Eye,
  FileText,
  Grid3X3,
  Info,
  KeyRound,
  LogOut,
  Mail,
  Megaphone,
  Menu,
  MoreVertical,
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

const businessDates = [
  { dow: "Thu", day: "09", month: "Jul", sold: 26, available: 49 },
  { dow: "Fri", day: "10", month: "Jul", sold: 9, available: 66 },
  { dow: "Sat", day: "11", month: "Jul", sold: 5, available: 70 },
  { dow: "Sun", day: "12", month: "Jul", sold: 4, available: 71 },
  { dow: "Mon", day: "13", month: "Jul", sold: 5, available: 70 },
  { dow: "Tue", day: "14", month: "Jul", sold: 4, available: 71 },
  { dow: "Wed", day: "15", month: "Jul", sold: 3, available: 72 },
  { dow: "Thu", day: "16", month: "Jul", sold: 4, available: 71 },
  { dow: "Fri", day: "17", month: "Jul", sold: 3, available: 72 },
  { dow: "Sat", day: "18", month: "Jul", sold: 3, available: 73 }
];

const stayDates = [
  ...businessDates,
  { dow: "Sun", day: "19", month: "Jul", sold: 3, available: 73 },
  { dow: "Mon", day: "20", month: "Jul", sold: 2, available: 74 }
];

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
  { name: "Superior Twin Room", rooms: 8, base: "1/0", max: "2/1", rate: 575, inventory: [4, 6, 6, 7, 6, 7, 8, 8, 8, 8] },
  { name: "Deluxe King Room City View", rooms: 6, base: "1/0", max: "4/4", rate: 690, inventory: [3, 4, 5, 5, 5, 6, 6, 6, 6, 6] },
  { name: "Junior Suite", rooms: 4, base: "1/0", max: "2/2", rate: 790, inventory: [2, 3, 3, 3, 4, 4, 4, 4, 4, 4] },
  { name: "Deluxe Junior Suite King Bed", rooms: 4, base: "1/0", max: "3/1", rate: 860, inventory: [2, 2, 3, 3, 3, 4, 4, 4, 4, 4] },
  { name: "Deluxe Junior Suite 2 Single Bed", rooms: 4, base: "1/0", max: "3/1", rate: 860, inventory: [1, 2, 3, 3, 3, 4, 4, 4, 4, 4] },
  { name: "Executive Suite", rooms: 3, base: "1/0", max: "6/2", rate: 980, inventory: [1, 2, 2, 3, 3, 3, 3, 3, 3, 3] },
  { name: "Presidential Suite City View", rooms: 2, base: "1/0", max: "4/4", rate: 1650, inventory: [1, 1, 2, 2, 2, 2, 2, 2, 2, 2] },
  { name: "Meeting Room", rooms: 1, base: "1/0", max: "2/0", rate: 950, inventory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
  { name: "Paymaster", rooms: 1, base: "1/0", max: "4/2", rate: 0, inventory: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] }
];

const roomTypeOptions = [{ value: "-Select-", label: "-Select-" }, ...roomTypes.map((roomType) => ({ value: roomType.name, label: roomType.name }))];
const ratePlanOptions = [{ value: "-Select-", label: "-Select-" }, { value: "Room Only Flexible", label: "Room Only Flexible" }, { value: "Room Only Non-Refundable", label: "Room Only Non-Refundable" }];

const reservations = [
  { id: "R-30251", guest: "Omar Hassan", room: "412", roomType: "Executive Suite", arrival: "09 Jul", departure: "12 Jul", nights: 3, status: "In house", balance: "1,280.00", source: "Direct", vip: true },
  { id: "R-30243", guest: "Salma Alomary", room: "305", roomType: "Deluxe King Room City View", arrival: "09 Jul", departure: "10 Jul", nights: 1, status: "Arriving", balance: "0.00", source: "Corporate", vip: false },
  { id: "R-30237", guest: "Khalid Alharbi", room: "214", roomType: "Superior Twin Room", arrival: "08 Jul", departure: "11 Jul", nights: 3, status: "In house", balance: "540.00", source: "Online Booking", vip: false },
  { id: "R-30219", guest: "Noura Alsubaie", room: "118", roomType: "Superior Twin Room", arrival: "09 Jul", departure: "13 Jul", nights: 4, status: "Confirmed", balance: "200.00", source: "Direct", vip: false },
  { id: "R-30198", guest: "Faris Aldossary", room: "203", roomType: "Junior Suite", arrival: "07 Jul", departure: "09 Jul", nights: 2, status: "Due out", balance: "0.00", source: "Travel Agent", vip: true },
  { id: "R-30179", guest: "Lina Rahman", room: "101", roomType: "Superior King Room", arrival: "06 Jul", departure: "10 Jul", nights: 4, status: "In house", balance: "720.00", source: "Direct", vip: false }
];

const stayRoomGroups = [
  {
    name: "Superior King Room",
    rooms: [
      { number: "101", condition: "Inspected", status: "Occupied", bookings: [{ start: 0, length: 2, label: "Lina Rahman", status: "In house", tone: "in-house", reservation: reservations[5] }] },
      { number: "102", condition: "Clean", status: "Reserved", bookings: [{ start: 3, length: 4, label: "Maya Patel", status: "Confirmed", tone: "confirmed", reservation: reservations[3] }] },
      { number: "105", condition: "Dirty", status: "Vacant", bookings: [] },
      { number: "111", condition: "Clean", status: "Reserved", bookings: [{ start: 7, length: 3, label: "Huda Khan", status: "Confirmed", tone: "confirmed", reservation: reservations[3] }] }
    ],
    availability: [5, 6, 7, 7, 7, 8, 8, 8, 9, 9, 9, 10],
    rate: 575
  },
  {
    name: "Superior Twin Room",
    rooms: [
      { number: "118", condition: "Inspected", status: "Reserved", bookings: [{ start: 0, length: 4, label: "Noura Alsubaie", status: "Confirmed", tone: "confirmed", reservation: reservations[3] }] },
      { number: "201", condition: "Clean", status: "Vacant", bookings: [] },
      { number: "214", condition: "Dirty", status: "Occupied", bookings: [{ start: 0, length: 2, label: "Khalid Alharbi", status: "In house", tone: "in-house", reservation: reservations[2] }] }
    ],
    availability: [4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8],
    rate: 575
  },
  {
    name: "Executive Suite",
    rooms: [
      { number: "412", condition: "Clean", status: "Occupied", bookings: [{ start: 0, length: 3, label: "Omar Hassan", status: "In house", tone: "in-house", reservation: reservations[0] }] },
      { number: "415", condition: "Inspected", status: "Vacant", bookings: [{ start: 5, length: 2, label: "S. Alharbi", status: "Confirmed", tone: "confirmed", reservation: reservations[1] }] }
    ],
    availability: [1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 3],
    rate: 980
  },
  {
    name: "Junior Suite",
    rooms: [
      { number: "203", condition: "Inspected", status: "Due Out", bookings: [{ start: 0, length: 1, label: "Faris Aldossary", status: "Due out", tone: "due-out", reservation: reservations[4] }] },
      { number: "204", condition: "Maintenance", status: "Blocked", bookings: [{ start: 0, length: 5, label: "Maintenance block", status: "Blocked", tone: "blocked" }] },
      { number: "207", condition: "Clean", status: "Vacant", bookings: [] }
    ],
    availability: [2, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4],
    rate: 790
  }
];

const roomRows = [
  { number: "101", type: "Superior King Room", guest: "Lina Rahman", status: "Occupied", condition: "Clean", note: "Stayover linen" },
  { number: "102", type: "Superior King Room", guest: "Available", status: "Vacant", condition: "Clean", note: "Ready" },
  { number: "118", type: "Superior Twin Room", guest: "Noura Alsubaie", status: "Reserved", condition: "Dirty", note: "Arrival 15:00" },
  { number: "203", type: "Junior Suite", guest: "Faris Aldossary", status: "Due out", condition: "Inspected", note: "Late checkout" },
  { number: "214", type: "Superior Twin Room", guest: "Khalid Alharbi", status: "Occupied", condition: "Dirty", note: "Maintenance" },
  { number: "305", type: "Deluxe King Room City View", guest: "Salma Alomary", status: "Reserved", condition: "Clean", note: "Arrival today" },
  { number: "412", type: "Executive Suite", guest: "Omar Hassan", status: "Occupied", condition: "Clean", note: "VIP stay" },
  { number: "415", type: "Executive Suite", guest: "Available", status: "Vacant", condition: "Clean", note: "Ready" },
  { number: "512", type: "Presidential Suite City View", guest: "Available", status: "Blocked", condition: "Maintenance", note: "AC service" },
  { number: "603", type: "Deluxe Junior Suite King Bed", guest: "Available", status: "Vacant", condition: "Dirty", note: "Deep clean" }
];

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
  { key: "1", date: "09 Jul", reference: "F-9001", particulars: "Room Charge", description: "Executive Suite", user: "Night Audit", amount: "800.00" },
  { key: "2", date: "09 Jul", reference: "F-9002", particulars: "Breakfast", description: "Qty 2", user: "Front Desk", amount: "120.00" },
  { key: "3", date: "10 Jul", reference: "F-9003", particulars: "Room Charge", description: "Executive Suite", user: "Night Audit", amount: "800.00" }
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

function App() {
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
  const [guestDrawerOpen, setGuestDrawerOpen] = useState(false);
  const [cashDrawerOpen, setCashDrawerOpen] = useState(false);
  const [configDrawer, setConfigDrawer] = useState(null);
  const [taskDrawerOpen, setTaskDrawerOpen] = useState(false);
  const [headerPanel, setHeaderPanel] = useState(null);
  const [announcementsOpen, setAnnouncementsOpen] = useState(false);

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
      />
      <div className={`pms-layout ${railOpen ? "rail-expanded" : "rail-collapsed"}`}>
        <SideNavigation active={module} expanded={railOpen} onChange={changeModule} />
        <main className="pms-main">
          <ModuleHeader module={module} onAddReservation={() => setAddReservationOpen(true)} />
          {module === "dashboard" && <Dashboard onOpenReservation={() => openReservation(reservations[0])} onNavigate={changeModule} />}
          {module === "reservations" && <ReservationsView onOpenReservation={openReservation} onSearch={() => setReservationSearchOpen(true)} />}
          {module === "stay" && <StayView onAssignRoom={() => setAssignRoomOpen(true)} onOpenReservation={(record) => openReservation(record || reservations[2])} />}
          {module === "rooms" && <RoomView onOpenReservation={() => openReservation(reservations[0])} />}
          {module === "rates" && <RatesSurface businessDates={businessDates} rateGroups={rateGroups} />}
          {module === "distribution" && <DistributionSurface />}
          {module === "guests" && <GuestSurface onAdd={() => setGuestDrawerOpen(true)} onOpenReservation={() => openReservation(reservations[0])} />}
          {module === "cashiering" && <CashieringSurface onNewPayment={() => setCashDrawerOpen(true)} onOpenReservation={() => openReservation(reservations[0])} />}
          {module === "housekeeping" && <HousekeepingSurface roomRows={roomRows} onAddTask={() => setTaskDrawerOpen(true)} />}
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
          onOpenReservation={() => openReservation(reservations[0])}
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
      <AddReservationDrawer open={addReservationOpen} onClose={() => setAddReservationOpen(false)} onReserve={(record) => { setAddReservationOpen(false); setModule("reservations"); openReservation(record); }} />
      <ReservationSearchDrawer open={reservationSearchOpen} onClose={() => setReservationSearchOpen(false)} onOpenReservation={openReservation} />
      <AssignRoomDrawer open={assignRoomOpen} onClose={() => setAssignRoomOpen(false)} />
      <EntityDrawer open={guestDrawerOpen} title="Add Guest" onClose={() => setGuestDrawerOpen(false)} fields={["Full Name", "Mobile", "Email", "Nationality", "Guest Type"]} action="Add Guest" />
      <EntityDrawer open={cashDrawerOpen} title="New Payment" onClose={() => setCashDrawerOpen(false)} fields={["Date", "Folio", "Amount", "Mode of Payment", "Remark"]} action="Add Payment" />
      <EntityDrawer open={Boolean(configDrawer)} title={configDrawer?.title || "Add Record"} onClose={() => setConfigDrawer(null)} fields={["Name", "Description"]} action={configDrawer?.action || "Save"} />
      <EntityDrawer open={taskDrawerOpen} title="Add Task" onClose={() => setTaskDrawerOpen(false)} fields={["Unit / Room", "Category", "Priority", "Description", "Due Date", "Assign To"]} action="Save Task" />
      <HeaderPopover kind={headerPanel} onClose={() => setHeaderPanel(null)} onNavigate={changeModule} />
      <ProductAnnouncementsDrawer open={announcementsOpen} onClose={() => setAnnouncementsOpen(false)} />
    </div>
  );
}

function AppHeader({ globalSearch, onGlobalSearch, onSearchFocus, onMenu, onAddReservation, onNavigate, onOpenHeaderPanel, onOpenAnnouncements }) {
  return (
    <header className="app-header">
      <div className="property-cluster">
        <Tooltip title="Open PMS navigation">
          <button className="header-icon" onClick={onMenu} aria-label="Open PMS navigation"><Menu size={20} /></button>
        </Tooltip>
        <div className="product-mark">GH</div>
        <div className="product-name">Gulf Hero PMS</div>
        <div className="property-divider" />
        <div className="property-switch">
          <span>SwissBlue Hotel Jeddah</span>
          <strong>22888</strong>
          <ChevronDown size={14} />
        </div>
        <button className="property-sync" aria-label="Switch property"><RefreshCw size={16} /></button>
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
        <Tooltip title="User menu"><button className="profile-control" onClick={() => onOpenHeaderPanel("profile")} aria-label="User menu"><span className="profile-avatar">A</span><ChevronDown size={14} /></button></Tooltip>
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
  { label: "Revenue Management Preview", icon: CircleDollarSign, module: "rates", badge: "NEW" }
];

function HeaderPopover({ kind, onClose, onNavigate }) {
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
      {kind === "profile" && <ProfilePopover onClose={onClose} onNavigate={onNavigate} />}
    </div>
  );
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

function ProfilePopover({ onClose, onNavigate }) {
  const primaryActions = [
    { label: "Go to Frontoffice", icon: CalendarDays, module: "reservations" },
    { label: "Point of Sale", icon: CircleDollarSign, module: "cashiering" },
    { label: "Security Advisory", icon: ShieldCheck, module: "configuration" }
  ];
  return <section className="header-popover profile-popover" aria-label="User menu"><div className="header-popover-arrow" /><div className="profile-popover-user"><span>A</span><b>admin</b><KeyRound size={19} /></div><div className="profile-menu-list">{primaryActions.map((item) => { const Icon = item.icon; return <button key={item.label} onClick={() => onNavigate(item.module)}><Icon size={18} />{item.label}</button>; })}</div><div className="profile-help"><strong>NEED HELP?</strong><button onClick={onClose}><Building2 size={18} />Gulf Hero Academy</button><button onClick={onClose}><Info size={18} />Help Center</button></div><button className="profile-logout" onClick={onClose}><LogOut size={18} />Logout</button></section>;
}

const announcements = [
  { date: "15 Jun 2026", title: "Clearer cash drawer accountability", body: "Cash drawer controls bring sessions, balances, and accountability together for the front desk and every operational department." },
  { date: "11 Jun 2026", title: "A simplified Stay View", body: "The Stay View has been refreshed to make room status, guest stays, and the next operational action easier to scan." },
  { date: "09 Jun 2026", title: "More consistent rate review", body: "Rate plan and inventory context now stay together so revenue teams can review the day with less switching between screens." }
];

function ProductAnnouncementsDrawer({ open, onClose }) {
  return <Drawer className="announcement-drawer" onClose={onClose} open={open} placement="right" title="What's new in Gulf Hero PMS" size={460}><div className="announcement-list">{announcements.map((item) => <article className="announcement-card" key={item.title}><time>{item.date}</time><h3>{item.title}</h3><p>{item.body}</p><button className="announcement-read">Read More</button><div className="announcement-feedback"><Tooltip title="Not useful"><button aria-label="Not useful"><X size={15} /></button></Tooltip><Tooltip title="Neutral"><button aria-label="Neutral"><Info size={15} /></button></Tooltip><Tooltip title="Useful"><button aria-label="Useful"><CheckCircle2 size={15} /></button></Tooltip></div></article>)}</div></Drawer>;
}

function SideNavigation({ active, expanded, onChange }) {
  return (
    <aside className="side-navigation" aria-label="PMS modules">
      <div className="nav-label">Operations</div>
      {navigation.slice(0, 4).map((item) => <NavigationItem key={item.id} item={item} active={active} expanded={expanded} onChange={onChange} />)}
      <div className="nav-label">Revenue</div>
      {navigation.slice(4, 6).map((item) => <NavigationItem key={item.id} item={item} active={active} expanded={expanded} onChange={onChange} />)}
      <div className="nav-label">Management</div>
      {navigation.slice(6).map((item) => <NavigationItem key={item.id} item={item} active={active} expanded={expanded} onChange={onChange} />)}
      <div className="nav-fill" />
      <div className="nav-footer"><ShieldCheck size={17} />{expanded && <span>Property secure</span>}</div>
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
    dashboard: "Operational overview for 09 Jul 2026",
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

function Dashboard({ onOpenReservation, onNavigate }) {
  const metrics = [
    ["Arrivals", "08", "2 pending", CalendarPlus, "yellow", "reservations"],
    ["Departures", "05", "1 due out", CalendarDays, "purple", "reservations"],
    ["Guest in house", "46", "39 adults, 7 children", Users, "blue", "stay"],
    ["Room status", "76", "49 vacant, 5 dirty", BedDouble, "green", "rooms"]
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
            {reservations.slice(0, 4).map((reservation) => (
              <button className="arrival-row" key={reservation.id} onClick={() => onOpenReservation(reservation)}>
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
            {businessDates.map((date) => <div className="chart-column" key={date.day}><div className="chart-track"><span style={{ height: `${Math.max(13, Math.round((date.sold / 76) * 100))}%` }} /></div><b>{date.sold}</b><small>{date.dow}</small></div>)}
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
          <div className="panel-title"><div><h2>Activity</h2><p>Recent property changes</p></div><button><MoreVertical size={18} /></button></div>
          <ul className="activity-list"><li><i className="success" /><span><strong>Rate review completed</strong><small>Room Only Flexible updated successfully</small></span><time>8 min</time></li><li><i className="yellow" /><span><strong>Room 214 flagged</strong><small>Maintenance task created by housekeeping</small></span><time>24 min</time></li><li><i className="info" /><span><strong>New reservation received</strong><small>Direct booking for Superior King Room</small></span><time>39 min</time></li></ul>
        </section>
      </div>
    </section>
  );
}

function ReservationsView({ onOpenReservation, onSearch }) {
  const [tab, setTab] = useState("Reservations");
  const [mode, setMode] = useState("cards");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [notice, setNotice] = useState("");
  const visibleRows = useMemo(() => reservations.filter((record) => {
    const tabMatches = tab === "Reservations" || (tab === "Arrivals" && record.arrival === "09 Jul") || (tab === "Departures" && ["09 Jul", "10 Jul"].includes(record.departure)) || (tab === "In-house" && record.status === "In house");
    const statusMatches = statusFilter === "All" || record.status === statusFilter;
    const queryMatches = `${record.guest} ${record.id} ${record.room}`.toLowerCase().includes(query.toLowerCase());
    return tabMatches && statusMatches && queryMatches;
  }), [query, statusFilter, tab]);
  const columns = [
    { title: "Guest Name", dataIndex: "guest", render: (name, record) => <button className="table-link" onClick={() => onOpenReservation(record)}>{name}</button> },
    { title: "Res. No.", dataIndex: "id", width: 105 },
    { title: "Booking Date", dataIndex: "arrival", width: 120 },
    { title: "Arrival", dataIndex: "arrival", width: 100 },
    { title: "Departure", dataIndex: "departure", width: 100 },
    { title: "Room Details", dataIndex: "roomType", render: (type, record) => `${record.room} - ${type}` },
    { title: "Status", dataIndex: "status", width: 105, render: (status) => <StatusTag value={status} /> },
    { title: "Balance", dataIndex: "balance", width: 105, render: (balance) => `SAR ${balance}` }
  ];
  const tabs = [["Reservations", 18], ["Arrivals", 8], ["Departures", 5], ["In-house", 46]];
  return (
    <section className="reservations-view">
      <div className="view-tabs-toolbar">
        <Tabs activeKey={tab} className="pms-tabs" items={tabs.map(([label, count]) => ({ key: label, label: <span>{label}<b>{count}</b></span> }))} onChange={(nextTab) => { setTab(nextTab); setStatusFilter("All"); }} size="small" />
        <div className="toolbar-actions"><button className={`view-toggle ${mode === "cards" ? "active" : ""}`} onClick={() => setMode("cards")} aria-label="Card view"><Grid3X3 size={16} /></button><button className={`view-toggle ${mode === "table" ? "active" : ""}`} onClick={() => setMode("table")} aria-label="List view"><ClipboardList size={16} /></button><Button icon={<Users size={14} />} onClick={() => setNotice("Selected reservations are ready to be grouped.")} size="small">Make Group</Button><Button icon={<Settings size={14} />} onClick={() => setNotice("Column settings are available in the table view.")} size="small">Manage Columns</Button><Button icon={<Download size={14} />} onClick={() => setNotice(`${visibleRows.length} visible reservations prepared for export.`)} size="small">Export</Button><Button icon={<Search size={14} />} onClick={onSearch} size="small">Search</Button></div>
      </div>
      <div className="context-toolbar"><div className="status-filters">{["All", "Confirmed", "In house", "Due out"].map((filter) => <button className={statusFilter === filter ? "selected" : ""} onClick={() => setStatusFilter(filter)} key={filter}>{filter}</button>)}</div><Input allowClear onChange={(event) => setQuery(event.target.value)} placeholder="Search reservation, guest or room" prefix={<Search size={15} />} value={query} /></div>
      {mode === "cards" ? <div className="reservation-cards">{visibleRows.map((record) => <ReservationCard key={record.id} reservation={record} onClick={() => onOpenReservation(record)} />)}</div> : <div className="table-frame"><Table className="pms-table" columns={columns} dataSource={visibleRows} pagination={false} size="small" /></div>}
      {notice && <div className="surface-status"><CheckCircle2 size={14} />{notice}</div>}
    </section>
  );
}

function ReservationCard({ reservation, onClick }) {
  return (
    <button className="reservation-card" onClick={onClick}>
      <div className="reservation-card-top"><span className={`guest-avatar ${reservation.vip ? "vip" : ""}`}>{reservation.guest.split(" ").map((part) => part[0]).join("")}</span><span><strong>{reservation.guest}</strong><small>{reservation.id} - {reservation.source}</small></span><MoreVertical size={17} /></div>
      <div className="reservation-stay"><div><span>{reservation.arrival}</span><small>Arrival</small></div><b>{reservation.nights}<small>Nights</small></b><div><span>{reservation.departure}</span><small>Departure</small></div></div>
      <div className="reservation-meta"><span><BedDouble size={14} /> {reservation.room} / {reservation.roomType}</span><StatusTag value={reservation.status} /></div>
      <div className="reservation-card-footer"><span>Balance</span><strong>SAR {reservation.balance}</strong></div>
    </button>
  );
}

function StayView({ onAssignRoom, onOpenReservation }) {
  const [activeStatus, setActiveStatus] = useState("All");
  const [ratePlan, setRatePlan] = useState("Room Only Flexible");
  const [expandedGroups, setExpandedGroups] = useState(() => new Set(stayRoomGroups.map((group) => group.name)));
  const visibleGroups = stayRoomGroups.map((group) => ({ ...group, rooms: activeStatus === "All" ? group.rooms : group.rooms.filter((room) => room.status === activeStatus) })).filter((group) => group.rooms.length);
  const toggleGroup = (groupName) => setExpandedGroups((current) => {
    const next = new Set(current);
    if (next.has(groupName)) next.delete(groupName);
    else next.add(groupName);
    return next;
  });

  return (
    <section className="stay-view">
      <div className="stay-toolbar"><Input value="09/07/2026" readOnly prefix={<CalendarDays size={15} />} /><div className="status-pills">{statusOptions.map((status, index) => <button className={activeStatus === status ? "active" : ""} onClick={() => setActiveStatus(status)} key={status}>{status}<b>{[76, 49, 18, 5, 2, 5, 5][index]}</b></button>)}</div><Select onChange={setRatePlan} options={ratePlanOptions.slice(1)} size="small" value={ratePlan} /><Button icon={<BedDouble size={14} />} onClick={onAssignRoom} size="small">Assign Room</Button></div>
      <div className="stay-grid-frame"><div className="stay-grid" style={{ "--stay-columns": stayDates.length }}><div className="stay-row stay-dates"><div className="stay-room-label"><ChevronLeft size={16} /><button>09/07/2026 <CalendarDays size={14} /></button><ChevronRight size={16} /></div>{stayDates.map((date) => <div className="stay-date" key={date.day}><span>{date.dow}</span><b>{date.day}</b><small>{date.month}</small></div>)}</div>{visibleGroups.map((group) => <StayRoomGroup dates={stayDates} expanded={expandedGroups.has(group.name)} group={group} key={group.name} onOpenReservation={onOpenReservation} onToggle={toggleGroup} ratePlan={ratePlan} />)}<div className="stay-row stay-summary"><div className="stay-room-label">Available Inventory <Info size={13} /></div>{stayDates.map((date) => <div key={date.day}>{date.available}</div>)}</div><div className="stay-row stay-summary occupancy"><div className="stay-room-label">Occupancy %</div>{stayDates.map((date) => <div key={date.day}>{Math.round((date.sold / 76) * 100)}%</div>)}</div></div></div>
      <div className="stay-legend"><span><i className="booking-confirmed" /> Confirmed</span><span><i className="booking-occupied" /> Checked in</span><span><i className="booking-dueout" /> Due out</span><span><i className="booking-blocked" /> Maintenance block</span></div>
    </section>
  );
}

function StayRoomGroup({ dates, expanded, group, onOpenReservation, onToggle, ratePlan }) {
  const rate = ratePlan === "Room Only Non-Refundable" ? Math.round(group.rate * 0.88) : group.rate;
  return <>{<div className="stay-row room-group-line"><button aria-expanded={expanded} className="stay-room-label stay-group-toggle" onClick={() => onToggle(group.name)}><ChevronDown className={expanded ? "expanded" : ""} size={15} /><span><b>{group.name}</b><small>{group.rooms.length} rooms</small></span></button>{dates.map((date, index) => <div className="stay-group-summary-cell" key={date.day}><b>{group.availability[index]}</b><small>SAR {rate}</small></div>)}</div>}{expanded && group.rooms.map((room) => <div className="stay-row room-line" key={room.number}><div className="stay-room-label"><b>{room.number}</b><span>{room.condition}</span><small>{room.status}</small></div>{dates.map((date) => <div className="stay-cell" key={`${room.number}-${date.day}`} />)}{room.bookings.map((booking) => <button aria-label={`${booking.label}, ${booking.status}`} className={`booking-strip ${booking.tone}`} disabled={!booking.reservation} key={`${room.number}-${booking.label}`} onClick={() => onOpenReservation(booking.reservation)} style={{ gridColumn: `${booking.start + 2} / span ${booking.length}` }}><span>{booking.label}</span><small>{booking.status}</small></button>)}</div>)}</>;
}

function RoomView({ onOpenReservation }) {
  const [filter, setFilter] = useState("All");
  const filteredRooms = filter === "All" ? roomRows : roomRows.filter((room) => room.status === filter || room.condition === filter);
  return (
    <section className="room-view"><div className="room-toolbar"><Input value="09/07/2026" readOnly prefix={<CalendarDays size={15} />} />{statusOptions.map((status) => <button className={`room-filter ${filter === status ? "active" : ""}`} onClick={() => setFilter(status)} key={status}>{status}</button>)}</div><div className="room-board">{filteredRooms.map((room) => <button className={`room-card status-${room.status.toLowerCase().replace(" ", "-")}`} key={room.number} onClick={room.guest === "Available" ? undefined : onOpenReservation}><div><strong>{room.number}</strong><StatusTag value={room.status} /></div><p>{room.type}</p><b>{room.guest}</b><small><span className={`condition-dot ${room.condition.toLowerCase()}`} />{room.condition} - {room.note}</small></button>)}</div></section>
  );
}

function RatesView() {
  const [tab, setTab] = useState("Rates");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState({ plan: rateGroups[0].plans[0], date: businessDates[0] });
  const [detailOpen, setDetailOpen] = useState(false);
  const groups = useMemo(() => rateGroups.map((group) => ({ ...group, plans: group.plans.filter((plan) => `${plan.name} ${plan.code}`.toLowerCase().includes(query.toLowerCase())) })).filter((group) => group.plans.length), [query]);
  return <section className="rates-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={["Inventory", "Rates", "Minimum Nights", "Maximum Nights", "Stopsells", "COA", "COD"].map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Upload size={14} />} size="small">Import</Button><Button icon={<Download size={14} />} size="small">Export</Button></div></div><div className="rates-toolbar"><Select defaultValue="OTA Common Plan" options={[{ value: "OTA Common Plan", label: "OTA Common Plan" }, { value: "Direct Channel Plan", label: "Direct Channel Plan" }]} size="small" /><Input allowClear onChange={(event) => setQuery(event.target.value)} placeholder="Room type or rate plan" prefix={<Search size={15} />} value={query} /><Radio.Group defaultValue="Base Rates" optionType="button" options={["Base Rates", "Extra Adult Rates", "Extra Child Rates"]} size="small" /><Checkbox defaultChecked>Hide Derived Rate Plans</Checkbox><Checkbox defaultChecked>Rates Inclusive Tax</Checkbox><Button disabled icon={<Save size={14} />} size="small">Save</Button></div><div className="rate-grid-frame"><div className="rate-grid" style={{ "--date-count": businessDates.length }}><div className="rate-grid-row rate-date-row"><div className="rate-grid-label"><ChevronLeft size={16} /><button>09/07/2026 <CalendarDays size={14} /></button><ChevronRight size={16} /></div>{businessDates.map((date) => <div className="rate-date" key={date.day}><span>{date.dow}</span><b>{date.day}</b><small>{date.month}</small></div>)}</div>{groups.map((group) => <React.Fragment key={group.name}><div className="rate-grid-row rate-group-row"><div className="rate-grid-label"><BedDouble size={16} /><b>{group.name}</b><span>{group.rooms}</span></div>{group.inventory.map((count, index) => <div key={index}>{count}</div>)}</div>{group.plans.map((plan) => <div className="rate-grid-row rate-plan-row" key={plan.code}><div className="rate-grid-label"><span>{plan.name}</span><button onClick={() => { setSelected({ plan, date: businessDates[0] }); setDetailOpen(true); }} aria-label={`Open details for ${plan.name}`}><Info size={14} /></button></div>{businessDates.map((date) => <button className={selected.plan.code === plan.code && selected.date.day === date.day ? "selected-rate" : ""} key={date.day} onClick={() => setSelected({ plan, date })}>{plan.rate.toFixed(2)}</button>)}</div>)}</React.Fragment>)}<RateSummary label="Sold Rooms" values={businessDates.map((date) => date.sold)} /><RateSummary label="Available Inventory" values={businessDates.map((date) => date.available)} /><RateSummary label="Total Rooms" values={businessDates.map(() => 76)} /></div></div><Drawer className="rate-detail-drawer" onClose={() => setDetailOpen(false)} open={detailOpen} title={selected.plan.name} size={390}><Tabs defaultActiveKey="Details" items={["Details", "Channels", "Restrictions", "History"].map((label) => ({ key: label, label, children: label === "Details" ? <RateDetailContent selected={selected} /> : <EmptyPanel label={label} /> }))} /></Drawer></section>;
}

function RateSummary({ label, values }) { return <div className="rate-grid-row rate-summary-row"><div className="rate-grid-label">{label}<Info size={13} /></div>{values.map((value, index) => <div key={index}>{value}</div>)}</div>; }

function RateDetailContent({ selected }) { return <div className="drawer-detail-list"><p><span>Rate Plan Code</span><b>{selected.plan.code}</b></p><p><span>Rate Plan Type</span><b>{selected.plan.type}</b></p><p><span>Base Plan</span><b>OTA Common Plan</b></p><p><span>Pricing Type</span><b>Per Room Per Night</b></p><p><span>Tax</span><b>Inclusive</b></p><p><span>Currency</span><b>SAR - Saudi Riyal</b></p><section><h3>Rate Summary</h3><p><span>Average Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Minimum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p><p><span>Maximum Rate</span><b>{selected.plan.rate.toFixed(2)} SAR</b></p></section><section><h3>Last Updated</h3><p><span>User</span><b>Revenue Manager</b></p><p><span>Date & Time</span><b>09/07/2026 11:40 AM</b></p><p><span>Status</span><StatusTag value="Success" /></p></section></div>; }

function DistributionView() {
  const [tab, setTab] = useState("Distribution Log");
  const columns = [{ title: "Location", dataIndex: "location", width: 90, render: (value) => <b className="source-letter">{value}</b> }, { title: "Activity", dataIndex: "source", width: 160 }, { title: "For Date", dataIndex: "date", width: 120 }, { title: "Request Time", dataIndex: "request", width: 130 }, { title: "Process Time", dataIndex: "process", width: 130 }, { title: "Updated Value", dataIndex: "value", width: 120 }, { title: "User", dataIndex: "user" }, { title: "Status", dataIndex: "status", width: 110, render: (value) => <StatusTag value={value} /> }, { title: "View", width: 70, render: () => <button className="table-icon"><Eye size={15} /></button> }];
  return <section className="distribution-view"><div className="view-tabs-toolbar"><Tabs activeKey={tab} className="pms-tabs" items={["Distribution Log", "Rate Controls", "Source Mapping", "Packages & Promotions"].map((label) => ({ key: label, label }))} onChange={setTab} size="small" /><div className="toolbar-actions"><Button icon={<Download size={14} />} size="small">Export</Button><Button icon={<RefreshCw size={14} />} size="small">Refresh</Button></div></div>{tab === "Distribution Log" ? <div className="table-frame"><div className="table-toolbar"><Input prefix={<Search size={15} />} placeholder="Search activity" /><span><i className="online-dot" />Local controls only</span></div><Table className="pms-table" columns={columns} dataSource={channelLogs} pagination={false} size="small" /></div> : <DistributionState tab={tab} />}</section>;
}

function DistributionState({ tab }) { const content = { "Rate Controls": ["Local rate controls", "Review active rate plans", "Manage stop-sell flags", "Review release warnings"], "Source Mapping": ["Business source mapping", "Corporate", "Travel agent", "Direct booking"], "Packages & Promotions": ["Packages and promotions", "Last minute", "Advance purchase", "Minimum stay"] }[tab]; return <div className="state-panel"><div><h2>{content[0]}</h2><p>Review and manage the selected local distribution area.</p></div><div className="channel-state-list">{content.slice(1).map((item, index) => <div key={item}><span className={`channel-symbol symbol-${index}`}>{item[0]}</span><strong>{item}</strong><StatusTag value={index === 3 ? "Pending" : "Local"} /><ChevronRight size={16} /></div>)}</div></div>; }

function GuestView({ onAdd, onOpenReservation }) {
  const [query, setQuery] = useState("");
  const guests = reservations.map((record, index) => ({ key: record.id, name: record.guest, phone: `+966 5${20000000 + index * 237}`, visits: index + 1, status: index === 2 ? "VIP" : "Active", lastStay: record.departure, record }));
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

function ReportsView() { const [activeGroup, setActiveGroup] = useState("Front Office"); const [activeReport, setActiveReport] = useState("Arrival Report"); return <section className="reports-view"><div className="report-catalog">{reportGroups.map(([group, items]) => <div key={group}><button className={activeGroup === group ? "active-report-group" : ""} onClick={() => { setActiveGroup(group); setActiveReport(items[0]); }}><FileText size={15} />{group}<ChevronRight size={14} /></button>{activeGroup === group && <div>{items.map((item) => <button className={activeReport === item ? "active" : ""} key={item} onClick={() => setActiveReport(item)}>{item}</button>)}</div>}</div>)}</div><div className="report-canvas"><div className="report-heading"><div><h2>{activeReport}</h2><p>Configure the reporting period and output before running the report.</p></div><Button icon={<Download size={14} />} size="small">Export</Button></div><div className="report-filters"><label>From<Input value="09/07/2026" readOnly /></label><label>To<Input value="09/07/2026" readOnly /></label><label>Room Type<Select defaultValue="All room types" options={[{ value: "All room types", label: "All room types" }, { value: "Superior King", label: "Superior King" }]} /></label><Button className="primary-command" icon={<BarChart3 size={14} />} size="small">Run Report</Button></div><div className="report-empty"><BarChart3 size={28} /><strong>Ready to generate</strong><span>Choose filters then run this report to preview the result table.</span></div></div></section>; }

function ConfigurationView({ onAdd }) {
  const [section, setSection] = useState("User Management");
  const sections = ["User Management", "Hotel Profile", "Rooms & Rates", "Taxes & Payments", "Guest Setup", "General Settings", "Notifications", "Documents"];
  const columns = [{ title: "Status", dataIndex: "status", width: 100, render: (value) => <Switch checked={value} size="small" /> }, { title: "Role Name", dataIndex: "name" }, { title: "Description", dataIndex: "description" }, { title: "Last Updated", dataIndex: "updated", width: 130 }, { title: "Action", width: 80, render: () => <button className="table-icon"><MoreVertical size={16} /></button> }];
  return <section className="configuration-view"><aside className="configuration-nav">{sections.map((item) => <button className={section === item ? "active" : ""} key={item} onClick={() => setSection(item)}>{item}<ChevronRight size={14} /></button>)}</aside><div className="configuration-canvas"><div className="config-heading"><div><h2>{section}</h2><p>{section === "User Management" ? "Manage users, roles, security preferences and device activity." : "Manage property master data and workflow settings."}</p></div><Button icon={<Plus size={14} />} onClick={onAdd} size="small">Add {section === "User Management" ? "User Role" : "Record"}</Button></div><Tabs defaultActiveKey="User Role" className="config-tabs" items={(section === "User Management" ? ["Users", "User Role", "Blocked Users", "Device Activity", "User Activity", "Security Preferences"] : ["Overview", "Setup", "Audit Trail"]).map((label) => ({ key: label, label }))} size="small" /><Input className="config-search" prefix={<Search size={15} />} placeholder={`Search ${section}`} /><Table className="pms-table" columns={columns} dataSource={configRows} pagination={false} size="small" /></div></section>;
}

function GlobalSearchOverlay({ query, tab, onTab, onClose, onOpenReservation }) {
  const items = { Bookings: reservations.slice(0, 3), Guest: reservations.slice(1, 4), "Business Source": reservations.slice(0, 2), "Travel Agent": reservations.slice(2, 4), Company: reservations.slice(3, 6) };
  return <div className="search-overlay"><button className="search-overlay-scrim" aria-label="Close search" onClick={onClose} /><section className="search-popover"><div className="search-popover-head"><div><Search size={17} /><strong>{query ? `Results for "${query}"` : "Search PMS records"}</strong></div><button onClick={onClose} aria-label="Close search"><X size={17} /></button></div><Tabs activeKey={tab} className="search-tabs" items={Object.keys(items).map((label, index) => ({ key: label, label: <span>{label}<b>{index === 0 ? 6 : index === 1 ? 29 : index === 4 ? 4 : 0}</b></span> }))} onChange={onTab} size="small" /><div className="search-result-list">{items[tab].map((record) => <button key={`${tab}-${record.id}`} onClick={onOpenReservation}><span className="guest-avatar small">{record.guest.split(" ").map((part) => part[0]).join("")}</span><span><strong>{record.guest}</strong><small>{record.id} - {record.roomType}</small></span><span className="search-stay">{record.arrival} to {record.departure}<small>{record.room} - {record.status}</small></span><ChevronRight size={16} /></button>)}</div><button className="search-view-all">View all {tab.toLowerCase()}<ChevronRight size={16} /></button></section></div>;
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
  const total = reservation.nights * (reservation.roomType.includes("Executive") ? 980 : reservation.roomType.includes("Presidential") ? 1650 : 575);
  const balance = Number(reservation.balance.replace(/,/g, ""));
  const paid = Math.max(total - balance, 0);

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
          <SummaryFact label="Folio No" value={`F-${reservation.id.slice(-4)}`} />
          <SummaryFact label="Status" value={reservation.status} />
          <SummaryFact label="Arrival Date" value={`${reservation.arrival} 03:00 PM`} />
          <SummaryFact label="Departure Date" value={`${reservation.departure} 12:00 PM`} />
          <SummaryFact label="Booking Date" value="08 Jul 2026" />
          <SummaryFact label="Room Type" value={reservation.roomType} />
          <SummaryFact label="Room Number" value={reservation.room} />
          <SummaryFact label="Rate Plan" value="Room Only Flexible" />
          <SummaryFact label="Pax" value="2 Adults / 0 Children" />
          <SummaryFact label="Avg. Daily Rate" value={`SAR ${(total / reservation.nights).toFixed(2)}`} />
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
  return <Drawer className="reservation-workspace-drawer" closable={false} onClose={onBack} open={open} placement="right" rootClassName="reservation-workspace-root" size="100vw">{summary}<Tabs activeKey={tab} className="reservation-workspace-tabs" items={reservationTabs.map((label) => ({ key: label, label }))} onChange={onTab} size="small" />{tab === "Folio Operations" && <FolioOperations reservation={reservation} onOpenDrawer={onNestedDrawer} />}{tab === "Booking Details" && <BookingDetails />}{tab === "Guest Details" && <GuestDetails />}{tab === "Room Charges" && <RoomCharges onOpenDrawer={onNestedDrawer} />}{tab === "Credit Card" && <CreditCardView onOpenDrawer={onNestedDrawer} />}{tab === "Tasks" && <TasksView onOpenDrawer={() => onNestedDrawer("task")} />}{tab === "Audit Trail" && <AuditTrail />}{nestedDrawer && <NestedReservationDrawer kind={nestedDrawer} onClose={() => onNestedDrawer(null)} />}</Drawer>;
}

function FolioOperations({ reservation, onOpenDrawer }) { const [visibility, setVisibility] = useState("Unposted"); const columns = [{ title: "Day", dataIndex: "date", width: 110 }, { title: "Ref No.", dataIndex: "reference", width: 110 }, { title: "Particulars", dataIndex: "particulars", width: 160 }, { title: "Description", dataIndex: "description" }, { title: "User", dataIndex: "user", width: 140 }, { title: "Amount", dataIndex: "amount", width: 110, align: "right", render: (value) => `SAR ${value}` }]; return <div className="folio-workspace"><div className="folio-summary"><div><span>Room / Folio</span><b>{reservation.room} - {reservation.guest}</b></div><div><span>Total</span><b>SAR 2,000.00</b></div><div><span>Balance</span><b>SAR {reservation.balance}</b></div></div><div className="folio-actions"><Button onClick={() => onOpenDrawer("payment")} size="small">Add Payment</Button><Button onClick={() => onOpenDrawer("charge")} size="small">Add Charges</Button><Button onClick={() => onOpenDrawer("discount")} size="small">Apply Discount</Button><Button onClick={() => onOpenDrawer("folio")} size="small">Folio Operations</Button><Button icon={<MoreVertical size={15} />} onClick={() => onOpenDrawer("folio")} size="small">More</Button><span className="folio-spacer" /><Checkbox checked={visibility === "Unposted"} onChange={() => setVisibility("Unposted")}>Unposted</Checkbox><Checkbox checked={visibility === "Posted"} onChange={() => setVisibility("Posted")}>Posted</Checkbox></div><Table className="pms-table" columns={columns} dataSource={folioRows} pagination={false} size="small" /><div className="surface-status"><CheckCircle2 size={14} />Showing {visibility.toLowerCase()} folio entries for this stay.</div></div>; }

function BookingDetails() { const [saved, setSaved] = useState(false); return <div className="reservation-form-grid"><FormSection title="Billing Information" fields={["Bill To", "Type", "Payment Mode", "Registration No.", "Reservation Type"]} values={{ "Bill To": "Guest", Type: "Individual", "Payment Mode": "Cash", "Registration No.": "REG-30251", "Reservation Type": "Guaranteed" }} /><FormSection title="Source Information" fields={["Market Segment", "Business Source", "Travel Agent", "Voucher No.", "Commission Plan", "Plan Value", "Company", "Sales Person"]} values={{ "Market Segment": "Retail", "Business Source": "Direct", "Travel Agent": "-Select-", "Voucher No.": "", "Commission Plan": "Standard", "Plan Value": "0.00", Company: "-Select-", "Sales Person": "Front Desk" }} /><FormSection title="Preferences" fields={["Check-out Note", "Suppress Rate on GR Card", "Include Guest Preferences"]} toggles /><div className="form-save-row"><Button className="primary-command" icon={saved ? <CheckCircle2 size={14} /> : <Save size={14} />} onClick={() => setSaved(true)} size="small">{saved ? "Saved" : "Save"}</Button></div></div>; }
function GuestDetails() { return <div className="reservation-form-grid guest-details-grid"><FormSection title="Guest" fields={["Name", "Phone", "Mobile", "Email", "Gender", "Guest Type", "VIP Status", "Address", "Zip", "Country", "State", "City", "Nationality", "Company"]} values={{ Name: "Omar Hassan", Phone: "+966 12 648 9933", Mobile: "+966 50 303 9120", Email: "omar.hassan@example.com", Gender: "Male", "Guest Type": "VIP", "VIP Status": "Gold", Address: "Al Hamra District", Zip: "21432", Country: "Saudi Arabia", State: "Makkah", City: "Jeddah", Nationality: "Saudi", Company: "-Select-" }} /><FormSection title="Identity Information" fields={["ID Number", "ID Type", "ID Version No.", "Issuing Country", "Issuing City", "Expiry Date"]} values={{ "ID Number": "10******84", "ID Type": "National ID", "ID Version No.": "1", "Issuing Country": "Saudi Arabia", "Issuing City": "Jeddah", "Expiry Date": "18/06/2031" }} /><FormSection title="Other Information" fields={["Birth Date", "Birth City", "Birth Country", "Spouse Birth Date", "Wedding Anniversary", "Purpose of Visit"]} values={{ "Birth Date": "11/02/1988", "Birth City": "Jeddah", "Birth Country": "Saudi Arabia", "Spouse Birth Date": "", "Wedding Anniversary": "", "Purpose of Visit": "Business" }} /></div>; }
function FormSection({ title, fields, toggles, values = {} }) { return <section className="form-section"><h3>{title}</h3><div>{fields.map((field) => <label key={field}>{field}{toggles ? <Switch defaultChecked={field === "Include Guest Preferences"} size="small" /> : field.includes("Type") || field.includes("Country") || field.includes("Source") || field.includes("Company") || field.includes("Plan") || field.includes("Mode") || field === "Gender" || field === "Nationality" || field === "City" || field === "State" ? <Select defaultValue={values[field] || "-Select-"} options={[{ value: "-Select-", label: "-Select-" }, { value: values[field] || "Standard", label: values[field] || "Standard" }, { value: "Standard", label: "Standard" }]} size="small" /> : <Input defaultValue={values[field] || ""} size="small" />}</label>)}</div></section>; }
function RoomCharges({ onOpenDrawer }) { const [group, setGroup] = useState("All charges"); const rows = [{ key: "1", date: "09 Jul", type: "Room Charge", description: "Executive Suite", amount: "SAR 800.00", tax: "SAR 120.00", status: "Posted" }, { key: "2", date: "09 Jul", type: "Breakfast", description: "Qty 2", amount: "SAR 104.35", tax: "SAR 15.65", status: "Posted" }, { key: "3", date: "10 Jul", type: "Room Charge", description: "Executive Suite", amount: "SAR 800.00", tax: "SAR 120.00", status: "Unposted" }, { key: "4", date: "10 Jul", type: "Late checkout", description: "Pending approval", amount: "SAR 250.00", tax: "SAR 37.50", status: "Pending" }]; const visibleRows = group === "All charges" ? rows : rows.filter((row) => row.status === group); return <div className="folio-workspace"><div className="folio-summary"><div><span>Total room charges</span><b>SAR 1,704.35</b></div><div><span>Taxes</span><b>SAR 255.65</b></div><div><span>Pending adjustments</span><b>SAR 287.50</b></div></div><div className="folio-actions"><Select value={group} onChange={setGroup} options={[{ value: "All charges", label: "All charges" }, { value: "Posted", label: "Posted" }, { value: "Unposted", label: "Unposted" }, { value: "Pending", label: "Pending" }]} size="small" /><span className="folio-spacer" /><Button onClick={() => onOpenDrawer("charge")} size="small">Add Charge</Button><Button onClick={() => onOpenDrawer("discount")} size="small">Add Adjustment</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Date", dataIndex: "date", width: 100 }, { title: "Charge", dataIndex: "type", width: 140 }, { title: "Description", dataIndex: "description" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Tax", dataIndex: "tax", width: 120, align: "right" }, { title: "Status", dataIndex: "status", width: 100, render: (value) => <StatusTag value={value === "Posted" ? "Success" : value} /> }]} dataSource={visibleRows} pagination={false} size="small" /></div></div>; }
function CreditCardView({ onOpenDrawer }) { const [filter, setFilter] = useState("All"); const rows = [{ key: "1", card: "Visa ending 4021", reference: "AUTH-9F028", amount: "SAR 1,280.00", date: "09 Jul 10:15 AM", status: "Active" }, { key: "2", card: "Mastercard ending 8850", reference: "AUTH-41AB2", amount: "SAR 500.00", date: "08 Jul 03:40 PM", status: "Success" }, { key: "3", card: "Visa ending 4021", reference: "AUTH-VOID", amount: "SAR 0.00", date: "08 Jul 03:42 PM", status: "Void" }]; const visible = filter === "All" ? rows : rows.filter((row) => row.status === filter); return <div className="folio-workspace"><div className="folio-summary"><div><span>Authorization held</span><b>SAR 1,280.00</b></div><div><span>Recorded cards</span><b>02</b></div><div><span>Last verification</span><b>09 Jul, 10:15 AM</b></div></div><div className="folio-actions"><Select value={filter} onChange={setFilter} options={[{ value: "All", label: "All authorizations" }, { value: "Active", label: "Active" }, { value: "Success", label: "Captured" }, { value: "Void", label: "Voided" }]} size="small" /><span className="folio-spacer" /><Button icon={<ShieldCheck size={14} />} onClick={() => onOpenDrawer("card")} size="small">Record Authorization</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Card reference", dataIndex: "card" }, { title: "Authorization", dataIndex: "reference" }, { title: "Amount", dataIndex: "amount", width: 130, align: "right" }, { title: "Recorded", dataIndex: "date", width: 145 }, { title: "Status", dataIndex: "status", width: 105, render: (value) => <StatusTag value={value} /> }]} dataSource={visible} pagination={false} size="small" /></div></div>; }
function TasksView({ onOpenDrawer }) { const [filter, setFilter] = useState("Open"); const [tasks, setTasks] = useState([{ key: "1", task: "Confirm airport transfer", department: "Concierge", due: "09 Jul 01:30 PM", status: "Open" }, { key: "2", task: "Prepare welcome amenities", department: "Housekeeping", due: "09 Jul 02:00 PM", status: "In progress" }, { key: "3", task: "Verify late checkout request", department: "Front Office", due: "10 Jul 11:00 AM", status: "Resolved" }]); const visible = filter === "All" ? tasks : tasks.filter((task) => task.status === filter); return <div className="tasks-workspace"><div className="workspace-list-toolbar"><Select value={filter} onChange={setFilter} options={[{ value: "All", label: "All tasks" }, { value: "Open", label: "Open" }, { value: "In progress", label: "In progress" }, { value: "Resolved", label: "Resolved" }]} size="small" /><span>3 operational tasks linked to this stay</span><Button icon={<Plus size={14} />} onClick={onOpenDrawer} size="small">Add Task</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Task", dataIndex: "task" }, { title: "Department", dataIndex: "department", width: 150 }, { title: "Due", dataIndex: "due", width: 140 }, { title: "Status", dataIndex: "status", width: 120, render: (value) => <StatusTag value={value} /> }, { title: "Action", width: 90, render: (_, row) => <Button size="small" onClick={() => setTasks((current) => current.map((task) => task.key === row.key ? { ...task, status: "Resolved" } : task))}>Resolve</Button> }]} dataSource={visible} pagination={false} size="small" /></div></div>; }
function AuditTrail() { const rows = [{ key: "1", date: "09/07/2026 11:40 AM", log: "Rate plan reviewed from reservation workspace", user: "Revenue Manager", ip: "***.***.***.***" }, { key: "2", date: "09/07/2026 10:24 AM", log: "Reservation workspace opened", user: "Front Office", ip: "***.***.***.***" }, { key: "3", date: "09/07/2026 10:15 AM", log: "Payment authorization recorded", user: "Front Office", ip: "***.***.***.***" }, { key: "4", date: "08/07/2026 03:40 PM", log: "Booking source verified", user: "Reservations", ip: "***.***.***.***" }]; return <div className="folio-workspace"><div className="folio-actions"><Input prefix={<Search size={14} />} placeholder="Search audit trail" /><span className="folio-spacer" /><Button icon={<Download size={14} />} size="small">Export</Button></div><div className="table-frame"><Table className="pms-table" columns={[{ title: "Date/Time", dataIndex: "date", width: 170 }, { title: "Activity", dataIndex: "log" }, { title: "User", dataIndex: "user", width: 150 }, { title: "IP", dataIndex: "ip", width: 130 }]} dataSource={rows} pagination={false} size="small" /></div></div>; }

function NestedReservationDrawer({ kind, onClose }) { const [saved, setSaved] = useState(false); const content = { payment: ["Add Payment", ["Date", "Folio", "Amount", "Mode of Payment", "Other Payment Method", "Remark (Optional)"], "Save Payment"], charge: ["Add Charge", ["Date", "Folio", "Charge", "Add as Inclusion", "Quantity", "Amount", "Discount", "Comment"], "Add Charge"], discount: ["Apply Discount", ["Date", "Discount Type", "Folio", "Amount", "Comment"], "Apply Discount"], folio: ["Folio Operations", ["Bill To", "Registration No.", "Guest Name on Folio", "POS Posting Type", "Show tax on printed folio", "Generate invoice number on checkout"], "Save Folio"], task: ["Add Task", ["Unit / Room", "Category", "Priority", "Description", "Due Date", "Due Time", "Assign To", "Reservation / Folio"], "Save Task"], card: ["Record Authorization", ["Card Reference", "Authorization Code", "Amount", "Expiry Date", "Remark (Optional)"], "Record Authorization"] }[kind]; const save = () => { setSaved(true); window.setTimeout(onClose, 400); }; return <Drawer className="nested-form-drawer" onClose={onClose} open placement="right" title={content[0]} size={440}><div className="drawer-form">{content[1].map((field) => <label key={field}>{field}{field.includes("Show") || field.includes("Generate") || field.includes("Inclusion") ? <Checkbox /> : field.includes("Description") || field.includes("Comment") || field.includes("Remark") ? <Input.TextArea rows={3} /> : field.includes("Type") || field.includes("Folio") || field.includes("Mode") || field.includes("Category") || field.includes("Priority") || field.includes("Assign") || field.includes("Unit") || field.includes("Card") ? <Select defaultValue="-Select-" options={[{ value: "-Select-", label: "-Select-" }, { value: "Standard", label: "Standard" }]} /> : <Input />}</label>)}{saved && <div className="surface-status"><CheckCircle2 size={14} />Saved locally to this reservation.</div>}<div className="drawer-form-actions"><Button onClick={onClose}>Cancel</Button><Button className="primary-command" onClick={save}>{saved ? "Saved" : content[2]}</Button></div></div></Drawer>; }

function AddReservationDrawer({ open, onClose, onReserve }) {
  const [roomCount, setRoomCount] = useState(1);
  const [discount, setDiscount] = useState(false);
  const [paymentMode, setPaymentMode] = useState("Cash / Bank");
  const [saved, setSaved] = useState("");

  const roomLine = (index) => (
    <div className="room-rate-grid data" key={index}>
      <Select defaultValue={index === 0 ? "Superior King Room" : "-Select-"} options={roomTypeOptions} size="small" />
      <Select defaultValue={index === 0 ? "Room Only Flexible" : "-Select-"} options={ratePlanOptions} size="small" />
      <Select defaultValue={index === 0 ? "305" : "Unassigned"} options={[{ value: "Unassigned", label: "Unassigned" }, { value: "305", label: "305" }, { value: "415", label: "415" }]} size="small" />
      <Input defaultValue="2" size="small" />
      <Input defaultValue="0" size="small" />
      <Input defaultValue={index === 0 ? "575.00" : "0.00"} size="small" />
    </div>
  );

  const completeBooking = (status) => {
    setSaved(status);
    window.setTimeout(() => onReserve({
      id: "R-30262",
      guest: "New Guest",
      room: "305",
      roomType: "Superior King Room",
      arrival: "09 Jul",
      departure: "11 Jul",
      nights: 2,
      status,
      balance: discount ? "1,040.00" : "1,155.18",
      source: "Direct",
      vip: false
    }), 380);
  };

  return (
    <Drawer className="add-reservation-drawer" closable={false} onClose={onClose} open={open} placement="right" rootClassName="add-reservation-root" size="min(1120px, 94vw)">
      <div className="drawer-page-header">
        <div><button onClick={onClose} aria-label="Close Add Reservation"><ChevronLeft size={18} /></button><h2>Add Reservation</h2></div>
        <Button icon={<CircleHelpIcon />} size="small">Reservation Guide</Button>
      </div>
      <div className="add-reservation-layout">
        <section className="add-reservation-form">
          <FormSection title="Stay Details" fields={["Check-in", "Check-out", "Nights", "Room(s)", "Reservation Type", "Booking Source", "Business Source", "Market Segment", "Sales Person"]} values={{ "Check-in": "09/07/2026", "Check-out": "11/07/2026", Nights: "2", "Room(s)": String(roomCount), "Reservation Type": "Confirm Booking", "Booking Source": "Direct", "Business Source": "-Select-", "Market Segment": "-Select-", "Sales Person": "-Select-" }} />
          <div className="booking-options"><Checkbox disabled>Contract</Checkbox><Checkbox>Book All Available Rooms</Checkbox><Checkbox>Quick Group Booking</Checkbox><Checkbox>Complimentary Room</Checkbox></div>
          <section className="form-section room-rate-section">
            <h3>Rate Offered</h3>
            <div className="room-rate-grid"><span>Room Type</span><span>Rate Type</span><span>Room</span><span>Adult</span><span>Child</span><span>Rate (SAR)</span></div>
            {Array.from({ length: roomCount }, (_, index) => roomLine(index))}
            <Button icon={<Plus size={14} />} disabled={roomCount >= 3} onClick={() => setRoomCount((count) => count + 1)} size="small">Add Room</Button>
            <Button onClick={() => setDiscount((current) => !current)} size="small">{discount ? "Discount Applied" : "Add Discount"}</Button>
            {discount && <div className="discount-note">10% reservation discount applied to the room charge.</div>}
          </section>
          <FormSection title="Guest Information" fields={["Existing Guest", "Full Name", "Mobile", "Email", "Address", "Zip", "Country", "State", "City"]} values={{ "Existing Guest": "-Select-", "Full Name": "New Guest", Mobile: "+966 ", Email: "", Address: "", Zip: "", Country: "Saudi Arabia", State: "Makkah", City: "Jeddah" }} />
          <section className="form-section other-information"><h3>Other Information</h3><div className="booking-options vertical"><Checkbox>Email Booking Vouchers</Checkbox><Checkbox>Send email at Check-out</Checkbox><Checkbox defaultChecked>Access To Guest Portal</Checkbox><Checkbox>Suppress Rate on Registration Card</Checkbox></div></section>
        </section>
        <aside className="billing-rail">
          <div className="billing-rail-heading"><span>Billing Summary</span><b>Confirm Booking</b></div>
          <div className="billing-stay"><span>Check-in<b>09/07/2026</b></span><ChevronRight size={14} /><span>Check-out<b>11/07/2026</b></span></div>
          <div className="billing-totals"><span>Room Charges<b>SAR {discount ? "1,040.00" : "1,155.18"}</b></span><span>Taxes<b>SAR {discount ? "156.00" : "173.28"}</b></span><strong>Due Amount<b>SAR {discount ? "1,196.00" : "1,328.46"}</b></strong></div>
          <label className="billing-field">Bill To<Select defaultValue="Guest" options={[{ value: "Guest", label: "Guest" }, { value: "Company", label: "Company" }, { value: "Travel Agent", label: "Travel Agent" }]} size="small" /></label>
          <section className="payment-mode-panel"><div><span>Payment Mode</span><Checkbox defaultChecked /></div><Radio.Group value={paymentMode} onChange={(event) => setPaymentMode(event.target.value)}><Radio value="Cash / Bank">Cash / Bank</Radio><Radio value="City Ledger">City Ledger</Radio></Radio.Group><Select defaultValue={paymentMode === "City Ledger" ? "City Ledger" : "Cash"} options={[{ value: "Cash", label: "Cash" }, { value: "Bank", label: "Bank" }, { value: "City Ledger", label: "City Ledger" }]} size="small" /></section>
        </aside>
      </div>
      <div className="drawer-page-footer">{saved && <span className="drawer-saved"><CheckCircle2 size={14} />Reservation {saved === "In house" ? "checked in" : "created"}</span>}<Button onClick={onClose}>Cancel</Button><span /><Button onClick={() => completeBooking("In house")}>Check-In</Button><Button className="primary-command" onClick={() => completeBooking("Confirmed")}>{saved ? "Created" : "Reserve"}</Button></div>
    </Drawer>
  );
}

function CircleHelpIcon() { return <Info size={14} />; }
function ReservationSearchDrawer({ open, onClose, onOpenReservation }) {
  const selectOptions = [{ value: "-Select-", label: "-Select-" }, { value: "Direct", label: "Direct" }, { value: "Corporate", label: "Corporate" }];
  return <Drawer className="reservation-search-drawer" onClose={onClose} open={open} placement="right" title="Search" size={440}><div className="drawer-form"><label className="drawer-filter-toggle"><Checkbox defaultChecked /> Reservation Date</label><div className="date-range-fields"><Input value="09/07/2026" readOnly /><span>to</span><Input value="09/07/2026" readOnly /></div><label className="drawer-filter-toggle"><Checkbox /> Arrival</label><div className="date-range-fields disabled"><Input disabled placeholder="Start date" /><span>to</span><Input disabled placeholder="End date" /></div><label>Business Source<Select defaultValue="-Select-" options={selectOptions} /></label><label>Travel Agent<Select defaultValue="-Select-" options={selectOptions} /></label><label>Company<Select defaultValue="-Select-" options={selectOptions} /></label><label>Room Type<Select defaultValue="-Select-" options={selectOptions} /></label><div className="reservation-search-pair"><label>Status<Select defaultValue="Active" options={[{ value: "Active", label: "Active" }, { value: "Cancelled", label: "Cancelled" }]} /></label><label>Res. Type<Select defaultValue="-Select-" options={selectOptions} /></label></div><div className="reservation-search-checks"><Checkbox>Show Unassigned Rooms</Checkbox><Checkbox>Without Deposit</Checkbox><Checkbox>CC Authorized</Checkbox><Checkbox>Show Failed/Incomplete Bookings</Checkbox></div><div className="drawer-form-actions"><Button onClick={onClose}>Reset</Button><Button className="primary-command" onClick={() => { onClose(); onOpenReservation(reservations[0]); }}>Search</Button></div></div></Drawer>;
}
function AssignRoomDrawer({ open, onClose }) {
  const [selectedDate, setSelectedDate] = useState("09");
  const [selectedRoom, setSelectedRoom] = useState("118");
  const [step, setStep] = useState("dates");
  const [assigned, setAssigned] = useState(false);
  const hasArrivalToAssign = selectedDate === "09";

  const closeDrawer = () => {
    setStep("dates");
    setAssigned(false);
    onClose();
  };

  return <Drawer className="assign-room-drawer" onClose={closeDrawer} open={open} placement="right" title="Assign Room" size={480}><div className="assign-room-intro"><strong>Choose an arrival date</strong><span>Review unassigned arrivals before selecting an available room.</span></div><label className="assign-date-input">Arrival date<Input readOnly value="09/07/2026" prefix={<CalendarDays size={15} />} /></label><div className="assign-date-strip">{stayDates.slice(0, 7).map((date) => <button aria-pressed={selectedDate === date.day} className={selectedDate === date.day ? "active" : ""} key={date.day} onClick={() => { setSelectedDate(date.day); setAssigned(false); }}><small>{date.dow}</small><b>{date.day}</b><small>{date.month}</small></button>)}</div>{step === "dates" ? <div className="assign-empty"><BedDouble size={26} /><strong>Ready to review arrivals</strong><span>Select a day above, then continue to view reservations that need a room.</span></div> : hasArrivalToAssign ? <div className="assign-worklist"><div className="assign-reservation"><span className="guest-avatar vip">NA</span><div><b>Noura Alsubaie</b><small>R-30219 - Superior Twin Room, 09 Jul to 13 Jul</small></div><StatusTag value={assigned ? "Success" : "Confirmed"} /></div><div className="assign-options"><label><input checked={selectedRoom === "118"} onChange={() => setSelectedRoom("118")} type="radio" name="room" /> <span><b>118</b><small>Superior Twin Room - Clean and ready</small></span></label><label><input checked={selectedRoom === "214"} onChange={() => setSelectedRoom("214")} type="radio" name="room" /> <span><b>214</b><small>Superior Twin Room - Available after inspection</small></span></label></div>{assigned && <div className="surface-status"><CheckCircle2 size={14} />Room {selectedRoom} is assigned for this arrival.</div>}</div> : <div className="assign-empty"><BedDouble size={26} /><strong>No unassigned reservations</strong><span>All arrivals for {selectedDate} Jul already have a room assignment.</span></div>}<div className="drawer-form-actions assign-room-actions">{step === "dates" ? <><Button onClick={closeDrawer}>Cancel</Button><Button className="primary-command" onClick={() => setStep("rooms")}>Next</Button></> : <><Button onClick={() => setStep("dates")}>Back</Button><Button className="primary-command" disabled={!hasArrivalToAssign || assigned} onClick={() => setAssigned(true)}>{assigned ? `Assigned to ${selectedRoom}` : `Assign Room ${selectedRoom}`}</Button></>}</div></Drawer>;
}
function EntityDrawer({ open, title, fields, action, onClose }) { const [saved, setSaved] = useState(false); const save = () => { setSaved(true); window.setTimeout(onClose, 350); }; return <Drawer className="entity-drawer" onClose={onClose} open={open} placement="right" title={title} size={440}><div className="drawer-form">{fields.map((field) => <label key={field}>{field}{field.includes("Type") || field.includes("Role") || field.includes("Folio") || field.includes("Payment") || field.includes("Date") || field.includes("Priority") || field.includes("Category") || field.includes("Assign") || field.includes("Nationality") ? <Select defaultValue="-Select-" options={[{ value: "-Select-", label: "-Select-" }, { value: "Standard", label: "Standard" }]} /> : field.includes("Description") || field.includes("Remark") ? <Input.TextArea rows={3} /> : <Input />}</label>)}{saved && <div className="surface-status"><CheckCircle2 size={14} />Saved locally.</div>}<div className="drawer-form-actions"><Button onClick={onClose}>Cancel</Button><Button className="primary-command" onClick={save}>{saved ? "Saved" : action}</Button></div></div></Drawer>; }
function QuickActivityDrawer({ kind, onClose }) { if (!kind) return null; const content = { Notifications: [{ title: "Room 214 requires maintenance", detail: "Housekeeping created a high-priority task", time: "24 min" }, { title: "2 arrivals pending room assignment", detail: "Front office action needed before 03:00 PM", time: "36 min" }, { title: "Rate review completed", detail: "Corporate BB was reviewed by Revenue Manager", time: "1 hr" }], Messages: [{ title: "Front Office", detail: "Late checkout request for R-30237 needs review.", time: "Now" }, { title: "Housekeeping", detail: "Room 512 maintenance block remains open.", time: "14 min" }, { title: "Night Audit", detail: "Yesterday's audit pack is ready for review.", time: "1 hr" }], Profile: [{ title: "Sara Alotaibi", detail: "Front Office Manager", time: "Active" }, { title: "Current property", detail: "SwissBlue Hotel Jeddah (22888)", time: "Switch property" }, { title: "Security", detail: "Last sign-in recorded today at 07:03 AM", time: "Secure" }] }[kind]; return <Drawer className="quick-activity-drawer" onClose={onClose} open placement="right" title={kind} size={390}><div className="quick-activity-list">{content.map((item) => <button key={item.title} onClick={onClose}><i className={kind === "Notifications" ? "yellow" : kind === "Messages" ? "blue" : "green"} /><span><b>{item.title}</b><small>{item.detail}</small></span><em>{item.time}</em></button>)}</div><div className="drawer-form-actions"><Button onClick={onClose}>Close</Button></div></Drawer>; }

function MiniMetric({ label, value, detail, tone }) { return <article className="mini-metric"><span className={tone} /><div><small>{label}</small><strong>{value}</strong><em>{detail}</em></div></article>; }
function StatusTag({ value }) { const tone = { "In house": "green", Arriving: "yellow", Confirmed: "blue", "Due out": "purple", Occupied: "green", Vacant: "blue", Reserved: "yellow", Blocked: "purple", Clean: "green", Dirty: "yellow", Inspected: "blue", Maintenance: "purple", Success: "green", Queued: "yellow", Connected: "green", Pending: "yellow", VIP: "purple", Active: "green" }[value] || "blue"; return <Tag className={`status-tag ${tone}`}>{value}</Tag>; }
function EmptyPanel({ label }) { return <div className="empty-workspace compact"><FileText size={23} /><strong>{label}</strong><span>There is no additional information in this prototype state.</span></div>; }

export default App;
