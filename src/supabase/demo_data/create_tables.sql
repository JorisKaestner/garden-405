-- Tables
create table if not exists plants (
  id text primary key,
  name text not null,
  icon text not null,
  "harvestWeeksMin" integer,
  "harvestWeeksMax" integer,
  "harvestMonth" text
);

create table if not exists gardeners (
  id text primary key,
  name text not null
);

create table if not exists beds (
  id text primary key,
  rows integer not null,
  cols integer not null,
  "left" text not null,
  "top" text not null,
  width text not null,
  height text not null
);

create table if not exists plots (
  id text primary key,
  "gardenId" text not null references beds(id),
  row integer not null,
  col integer not null,
  "plantId" text references plants(id),
  "customLabel" text,
  "plantedDate" date,
  "plantedBy" text references gardeners(id)
);

-- RLS
alter table plots enable row level security;
drop policy if exists "public read" on plots;
drop policy if exists "authenticated update" on plots;
create policy "public read" on plots for select using (true);
create policy "authenticated update" on plots for update to authenticated using (true);

alter table beds enable row level security;
drop policy if exists "public read" on beds;
create policy "public read" on beds for select using (true);

alter table plants enable row level security;
drop policy if exists "public read" on plants;
create policy "public read" on plants for select using (true);

alter table gardeners enable row level security;
drop policy if exists "authenticated read" on gardeners;
create policy "authenticated read" on gardeners for select to authenticated using (true);
