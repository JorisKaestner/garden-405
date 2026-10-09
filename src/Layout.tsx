// Layout.tsx
// Defines the Navigation-Bar
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "./supabase/AuthContext";
import { supabase } from "./supabase/supabaseClient";

export default function Layout() {
  const user = useAuth();
  return (
    <>
      <nav className="site-nav">
        <NavLink to="/" end>Garden</NavLink>
        <NavLink to="/service-hours">Service Hours</NavLink>
        {user && (
          <button className="nav-signout" onClick={() => supabase.auth.signOut()}>
            Sign out
          </button>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}