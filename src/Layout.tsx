// Layout.tsx
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="site-nav">
        <NavLink to="/" end>Garden</NavLink>
        <NavLink to="/service-hours">Service Hours</NavLink>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}