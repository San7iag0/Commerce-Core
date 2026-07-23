import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { adjustProductStock } from '../products/productsSlice';
import { recordMovement } from './inventorySlice';
import type { InventoryMovementType } from '../../types/domain';

export function InventoryPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const movements = useAppSelector((state) => state.inventory);
  const [productId, setProductId] = useState(products[0]?.id ?? '');
  const [quantity, setQuantity] = useState('1');
  const [type, setType] = useState<InventoryMovementType>('ADJUSTMENT');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const signedQuantity = type === 'SALE' || type === 'LOSS' ? -Math.abs(Number(quantity)) : Math.abs(Number(quantity));
    dispatch(adjustProductStock({ productId, quantityDelta: signedQuantity }));
    dispatch(recordMovement({ productId, productName: product.name, type, quantity: signedQuantity, reason: 'Manual Phase 1 adjustment' }));
  }

  return (
    <section>
      <h2>Inventory</h2>
      <form className="inline-form card" onSubmit={handleSubmit}>
        <select value={productId} onChange={(event) => setProductId(event.target.value)}>
          {products.map((product) => <option key={product.id} value={product.id}>{product.name}</option>)}
        </select>
        <select value={type} onChange={(event) => setType(event.target.value as InventoryMovementType)}>
          <option>PURCHASE</option><option>SALE</option><option>ADJUSTMENT</option><option>LOSS</option><option>RETURN</option>
        </select>
        <input value={quantity} onChange={(event) => setQuantity(event.target.value)} type="number" min="1" />
        <button type="submit">Record Movement</button>
      </form>
      <div className="card table-card">
        <table>
          <thead><tr><th>Product</th><th>Current Stock</th><th>Minimum</th></tr></thead>
          <tbody>{products.map((product) => <tr key={product.id}><td>{product.name}</td><td>{product.stock}</td><td>{product.minimumStock}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="card">
        <h3>Movement History</h3>
        {movements.length === 0 ? <p>No movements recorded.</p> : movements.map((movement) => <p key={movement.id}>{movement.productName}: {movement.quantity} ({movement.type})</p>)}
      </div>
    </section>
  );
}
