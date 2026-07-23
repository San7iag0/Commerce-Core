import { useAppSelector } from '../../app/hooks';
import { StatCard } from '../../components/StatCard';

export function ReportsPage() {
  const sales = useAppSelector((state) => state.sales.history);
  const products = useAppSelector((state) => state.products);
  const revenue = sales.reduce((total, sale) => total + sale.total, 0);
  const lowStock = products.filter((product) => product.stock <= product.minimumStock);
  const itemCounts = new Map<string, number>();
  sales.flatMap((sale) => sale.items).forEach((item) => itemCounts.set(item.productName, (itemCounts.get(item.productName) ?? 0) + item.quantity));
  const topSeller = [...itemCounts.entries()].sort((a, b) => b[1] - a[1])[0];

  return (
    <section>
      <h2>Reports</h2>
      <div className="stat-grid">
        <StatCard label="Revenue" value={`$${revenue.toFixed(2)}`} />
        <StatCard label="Sales Count" value={sales.length} />
        <StatCard label="Top Seller" value={topSeller ? `${topSeller[0]} (${topSeller[1]})` : 'No sales'} />
        <StatCard label="Low Stock Items" value={lowStock.length} />
      </div>
      <div className="card"><h3>Export roadmap</h3><p>Phase 1 establishes report calculations. Excel, PDF, and CSV exports can be wired next.</p></div>
    </section>
  );
}
