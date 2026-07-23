import { useAppSelector } from '../../app/hooks';

export function SalesPage() {
  const sales = useAppSelector((state) => state.sales.history);

  return (
    <section>
      <h2>Sales History</h2>
      <div className="card table-card">
        <table>
          <thead><tr><th>Date</th><th>Cashier</th><th>Items</th><th>Payment</th><th>Total</th></tr></thead>
          <tbody>
            {sales.map((sale) => (
              <tr key={sale.id}>
                <td>{new Date(sale.createdAt).toLocaleString()}</td><td>{sale.cashier}</td><td>{sale.items.length}</td><td>{sale.paymentMethod}</td><td>${sale.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {sales.length === 0 ? <p>No sales completed yet.</p> : null}
      </div>
    </section>
  );
}
