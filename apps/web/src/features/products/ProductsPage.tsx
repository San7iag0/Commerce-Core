import { FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addProduct } from './productsSlice';

export function ProductsPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(addProduct({
      name,
      sku: name.toUpperCase().replaceAll(' ', '-'),
      category: 'General',
      price: Number(price),
      cost: 0,
      stock: 0,
      minimumStock: 1
    }));
    setName('');
    setPrice('');
  }

  return (
    <section>
      <h2>Products</h2>
      <form className="inline-form card" onSubmit={handleSubmit}>
        <input placeholder="Product name" value={name} onChange={(event) => setName(event.target.value)} required />
        <input placeholder="Price" value={price} onChange={(event) => setPrice(event.target.value)} type="number" min="0" step="0.01" required />
        <button type="submit">Add Product</button>
      </form>
      <div className="card table-card">
        <table>
          <thead><tr><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Status</th></tr></thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td><td>{product.category}</td><td>${product.price.toFixed(2)}</td><td>{product.stock}</td><td>{product.isActive ? 'Active' : 'Inactive'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
