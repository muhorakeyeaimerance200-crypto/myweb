import React, { useState } from 'react';

export default function ProductDashboard() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999, stock: 15 },
    { id: 2, name: 'Mouse', category: 'Accessories', price: 25, stock: 50 },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [editId, setEditId] = useState(null);

  function addProduct() {
    const newProduct = {
      id: Date.now(),
      name: name,
      category: category,
      price: Number(price),
      stock: Number(stock)
    };
    setProducts([...products, newProduct]);
    resetForm();
  }

  function updateProduct() {
    const updated = products.map(p => {
      if (p.id === editId) {
        return {
          id: editId,
          name: name,
          category: category,
          price: Number(price),
          stock: Number(stock)
        };
      }
      return p;
    });
    setProducts(updated);
    resetForm();
  }

  function deleteProduct(id) {
    setProducts(products.filter(p => p.id !== id));
  }

  function editProduct(product) {
    setName(product.name);
    setCategory(product.category);
    setPrice(product.price);
    setStock(product.stock);
    setEditId(product.id);
    setShowForm(true);
  }

  function resetForm() {
    setName('');
    setCategory('');
    setPrice('');
    setStock('');
    setEditId(null);
    setShowForm(false);
  }

  function handleSave() {
    if (editId) {
      updateProduct();
    } else {
      addProduct();
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Product Manager</h1>

      <button 
        onClick={() => setShowForm(!showForm)}
        style={{
          padding: '10px 20px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {showForm ? 'Cancel' : 'Add Product'}
      </button>

      {showForm && (
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          marginBottom: '20px',
          borderRadius: '4px',
          background: '#f9f9f9'
        }}>
          <h3>{editId ? 'Edit Product' : 'Add New Product'}</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Name:</label><br/>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Category:</label><br/>
            <input 
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Price:</label><br/>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Stock:</label><br/>
            <input 
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            />
          </div>

          <button 
            onClick={handleSave}
            style={{
              padding: '8px 16px',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              marginRight: '10px'
            }}
          >
            Save
          </button>

          <button 
            onClick={resetForm}
            style={{
              padding: '8px 16px',
              background: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Category</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Stock</th>
            <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.name}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.category}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>${product.price}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{product.stock}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                <button 
                  onClick={() => editProduct(product)}
                  style={{
                    padding: '5px 10px',
                    background: '#ffc107',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer',
                    marginRight: '5px'
                  }}
                >
                  Edit
                </button>
                <button 
                  onClick={() => deleteProduct(product.id)}
                  style={{
                    padding: '5px 10px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '3px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}