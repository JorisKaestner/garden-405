-- Demo data
insert into beds (id, rows, cols, "left", "top", width, height) values
  ('bog',        5,  5, '32.9%', '44%',   '21%',   '17.5%'),
  ('strawberry', 5,  5, '62%',   '64.9%', '20.5%', '17.2%'),
  ('sunflower',  5,  5, '33.1%', '64.9%', '20.5%', '17.0%'),
  ('vegetable',  5,  5, '62%',   '44%',   '21%',   '17.5%'),
  ('berry',      11, 2, '17%',   '44.2%', '8.9%',  '38%'),
  ('fence',      3,  12,'33.2%', '87.1%', '49.5%', '8.9%'),
  ('compost',    1,  1, '76.3%', '5.2%',  '6.4%',  '4.5%'),
  ('raised1',    5,  2, '76%',   '25.6%', '6.7%',  '13.3%')
on conflict (id) do nothing;

insert into plants (id, name, icon, "harvestWeeksMin", "harvestWeeksMax") values
  ('tomato', 'Tomato', '🍅', 18, 27, null),
  ('carrot', 'Carrot', '🥕', 7, 16, null),
  ('other', 'Other', '🌱', null, null)
on conflict (id) do nothing;

insert into gardeners (id, name) values
  ('demo1', 'Alex'),
  ('demo2', 'Sam')
on conflict (id) do nothing;

insert into plots (id, "gardenId", row, col)
select b.id || '-' || r.n || '-' || c.n, b.id, r.n, c.n
from beds b
cross join generate_series(0, b.rows - 1) as r(n)
cross join generate_series(0, b.cols - 1) as c(n)
on conflict (id) do nothing;