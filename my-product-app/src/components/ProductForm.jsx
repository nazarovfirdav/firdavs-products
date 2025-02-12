import { useState, useEffect } from 'react'

export default function ProductForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Drinks',
    quantity: '',
    description: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: '',
      price: '',
      category: 'Drinks',
      quantity: '',
      description: ''
    })
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
          className="form-select"
        >
          <option>Drinks</option>
          <option>Food</option>
          <option>Snacks</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          value={formData.quantity}
          onChange={(e) => setFormData(prev => ({ ...prev, quantity: Number(e.target.value) }))}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="form-control"
          rows="3"
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {initialData ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  )
}