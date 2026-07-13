-- Gulf Hero PMS foundation. All browser-facing data is constrained by membership RLS.
create extension if not exists pgcrypto;

create table public.properties (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  timezone text not null default 'Asia/Riyadh',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_members (
  property_id uuid not null references public.properties(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner', 'manager', 'front_desk', 'housekeeping', 'accounting')),
  created_at timestamptz not null default now(),
  primary key (property_id, user_id)
);

create table public.room_types (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  name text not null,
  base_rate_cents integer not null check (base_rate_cents >= 0),
  max_adults smallint not null check (max_adults > 0),
  max_children smallint not null default 0 check (max_children >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (property_id, name)
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  room_type_id uuid not null references public.room_types(id) on delete restrict,
  number text not null,
  status text not null default 'vacant' check (status in ('vacant', 'occupied', 'reserved', 'blocked', 'due_out')),
  condition text not null default 'clean' check (condition in ('clean', 'dirty', 'inspected', 'maintenance')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (property_id, number)
);

create table public.guests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  display_name text not null,
  is_fixture boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  confirmation_number text not null,
  guest_id uuid not null references public.guests(id) on delete restrict,
  room_id uuid references public.rooms(id) on delete set null,
  arrival_date date not null,
  departure_date date not null,
  status text not null check (status in ('confirmed', 'arriving', 'in_house', 'due_out', 'checked_out', 'blocked', 'cancelled')),
  source text not null,
  vip boolean not null default false,
  balance_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (departure_date > arrival_date),
  unique (property_id, confirmation_number)
);

create table public.folios (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  reservation_id uuid not null unique references public.reservations(id) on delete cascade,
  balance_cents integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.folio_entries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  folio_id uuid not null references public.folios(id) on delete cascade,
  posted_on date not null,
  reference text not null,
  particulars text not null,
  description text,
  amount_cents integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (folio_id, reference)
);

create index property_members_user_property_idx on public.property_members (user_id, property_id);
create index room_types_property_idx on public.room_types (property_id);
create index rooms_property_idx on public.rooms (property_id);
create index guests_property_idx on public.guests (property_id);
create index reservations_property_idx on public.reservations (property_id);
create index folios_property_idx on public.folios (property_id);
create index folio_entries_property_idx on public.folio_entries (property_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger properties_set_updated_at before update on public.properties for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger room_types_set_updated_at before update on public.room_types for each row execute function public.set_updated_at();
create trigger rooms_set_updated_at before update on public.rooms for each row execute function public.set_updated_at();
create trigger guests_set_updated_at before update on public.guests for each row execute function public.set_updated_at();
create trigger reservations_set_updated_at before update on public.reservations for each row execute function public.set_updated_at();
create trigger folios_set_updated_at before update on public.folios for each row execute function public.set_updated_at();
create trigger folio_entries_set_updated_at before update on public.folio_entries for each row execute function public.set_updated_at();

alter table public.properties enable row level security;
alter table public.profiles enable row level security;
alter table public.property_members enable row level security;
alter table public.room_types enable row level security;
alter table public.rooms enable row level security;
alter table public.guests enable row level security;
alter table public.reservations enable row level security;
alter table public.folios enable row level security;
alter table public.folio_entries enable row level security;

create policy "profiles select own" on public.profiles for select to authenticated using (id = (select auth.uid()));
create policy "profiles insert own" on public.profiles for insert to authenticated with check (id = (select auth.uid()));
create policy "profiles update own" on public.profiles for update to authenticated using (id = (select auth.uid())) with check (id = (select auth.uid()));
create policy "members select own" on public.property_members for select to authenticated using (user_id = (select auth.uid()));

create policy "properties select member" on public.properties for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = properties.id and member.user_id = (select auth.uid())));
create policy "room types select member" on public.room_types for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = room_types.property_id and member.user_id = (select auth.uid())));
create policy "rooms select member" on public.rooms for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = rooms.property_id and member.user_id = (select auth.uid())));
create policy "guests select member" on public.guests for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = guests.property_id and member.user_id = (select auth.uid())));
create policy "reservations select member" on public.reservations for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = reservations.property_id and member.user_id = (select auth.uid())));
create policy "folios select member" on public.folios for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = folios.property_id and member.user_id = (select auth.uid())));
create policy "folio entries select member" on public.folio_entries for select to authenticated using (exists (select 1 from public.property_members member where member.property_id = folio_entries.property_id and member.user_id = (select auth.uid())));

grant select, insert, update on public.profiles to authenticated;
grant select on public.property_members, public.properties, public.room_types, public.rooms, public.guests, public.reservations, public.folios, public.folio_entries to authenticated;
