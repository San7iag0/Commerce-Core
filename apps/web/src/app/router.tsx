import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import { store } from './store';
import { MainLayout } from '../layouts/MainLayout';
import { LoginPage } from '../features/auth/LoginPage';
import { DashboardPage } from '../features/dashboard/DashboardPage';
import { ProductsPage } from '../features/products/ProductsPage';
import { InventoryPage } from '../features/inventory/InventoryPage';
import { PosPage } from '../features/pos/PosPage';
import { SalesPage } from '../features/sales/SalesPage';
import { ReportsPage } from '../features/reports/ReportsPage';
import { SettingsPage } from '../features/settings/SettingsPage';

function protectedLoader() {
  if (!store.getState().auth.isAuthenticated) {
    return redirect('/login');
  }
  return null;
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/app/dashboard" replace /> },
  { path: '/login', element: <LoginPage /> },
  {
    path: '/app',
    element: <MainLayout />,
    loader: protectedLoader,
    children: [
      { index: true, element: <Navigate to="dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'inventory', element: <InventoryPage /> },
      { path: 'pos', element: <PosPage /> },
      { path: 'sales', element: <SalesPage /> },
      { path: 'reports', element: <ReportsPage /> },
      { path: 'settings', element: <SettingsPage /> }
    ]
  }
]);
