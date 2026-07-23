import { useAppSelector } from '../../app/hooks';
import { StatCard } from '../../components/StatCard';

export function DashboardPage() {
  const products = useAppSelector((state) => state.products);
  const sales = useAppSelector((state) => state.sales.history);
  const revenue = sales.reduce((total, sale) => total + sale.total, 0);
  const lowStock = products.filter((product) => product.stock <= product.minimumStock).length;

  return (
    <section>
      <h2>Dashboard</h2>
      <div className="stat-grid">
        <StatCard label="Sales Today" value={`$${revenue.toFixed(2)}`} hint={`${sales.length} completed sales`} />
        <StatCard label="Products" value={products.length} hint="Active catalog items" />
        <StatCard label="Low Stock" value={lowStock} hint="Need review" />
      </div>
      <div className="card">
        <h3>Recent Sales</h3>
        {sales.length === 0 ? <p>No sales yet.</p> : sales.slice(0, 5).map((sale) => <p key={sale.id}>{sale.id}: ${sale.total.toFixed(2)}</p>)}
      </div>
    </section>
  );
}
