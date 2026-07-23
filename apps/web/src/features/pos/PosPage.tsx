import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { adjustProductStock } from '../products/productsSlice';
import { addToCart, calculateCartTotals, changeCartQuantity, clearCart, completeSale, removeFromCart } from '../sales/salesSlice';

export function PosPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.filter((product) => product.isActive));
  const cart = useAppSelector((state) => state.sales.cart);
  const totals = useAppSelector((state) => calculateCartTotals(state.sales.cart, state.sales.taxRate));
  const cashier = useAppSelector((state) => state.auth.user?.name ?? 'Unknown');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(products.map((product) => product.category))], [products]);
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  function handleCheckout() {
    cart.forEach((item) => dispatch(adjustProductStock({ productId: item.productId, quantityDelta: -item.quantity })));
    dispatch(completeSale({ cashier, paymentMethod: 'CASH' }));
  }

  return (
    <section>
      <h2>POS</h2>
      <div className="pos-grid">
        <div className="card product-panel">
          <input placeholder="Search product" value={search} onChange={(event) => setSearch(event.target.value)} />
          <div className="category-row">
            {categories.map((item) => <button key={item} className={item === category ? 'selected' : ''} type="button" onClick={() => setCategory(item)}>{item}</button>)}
          </div>
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <button key={product.id} type="button" onClick={() => dispatch(addToCart({ productId: product.id, name: product.name, price: product.price }))}>
                <strong>{product.name}</strong>
                <span>${product.price.toFixed(2)}</span>
                <small>{product.stock} in stock</small>
              </button>
            ))}
          </div>
        </div>
        <aside className="card cart-panel">
          <h3>Cart</h3>
          {cart.length === 0 ? <p>No items selected.</p> : cart.map((item) => (
            <div className="cart-line" key={item.productId}>
              <div><strong>{item.name}</strong><span>${item.price.toFixed(2)}</span></div>
              <input type="number" min="1" value={item.quantity} onChange={(event) => dispatch(changeCartQuantity({ productId: item.productId, quantity: Number(event.target.value) }))} />
              <button type="button" onClick={() => dispatch(removeFromCart(item.productId))}>Remove</button>
            </div>
          ))}
          <dl className="totals"><dt>Subtotal</dt><dd>${totals.subtotal.toFixed(2)}</dd><dt>Tax</dt><dd>${totals.tax.toFixed(2)}</dd><dt>Total</dt><dd>${totals.total.toFixed(2)}</dd></dl>
          <div className="cart-actions"><button type="button" onClick={() => dispatch(clearCart())}>Cancel</button><button type="button" disabled={cart.length === 0} onClick={handleCheckout}>Pay Cash</button></div>
        </aside>
      </div>
    </section>
  );
}
