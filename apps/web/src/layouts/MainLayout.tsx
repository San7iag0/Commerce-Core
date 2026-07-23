import { NavLink, Outlet } from 'react-router-dom';
import { logout } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const navItems = [
  { to: '/app/dashboard', label: 'Dashboard' },
  { to: '/app/products', label: 'Products' },
  { to: '/app/inventory', label: 'Inventory' },
  { to: '/app/pos', label: 'POS' },
  { to: '/app/sales', label: 'Sales History' },
  { to: '/app/reports', label: 'Reports' },
  { to: '/app/settings', label: 'Settings' }
];

export function MainLayout() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const today = new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date());

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <h1>Commerce Core</h1>
        <nav>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="main-column">
        <header className="topbar">
          <div>
            <strong>{user?.name ?? 'Guest'}</strong>
            <span>{user?.role ?? 'No role'}</span>
          </div>
          <div className="topbar-actions">
            <span>{today}</span>
            <button type="button" onClick={() => dispatch(logout())}>Logout</button>
          </div>
        </header>
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
