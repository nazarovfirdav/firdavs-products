import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductTable from './ProductTable'

export default function Dashboard({ setIsLoggedIn }) {
  const [products, setProducts] = useState([])
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const savedProducts = localStorage.getItem('products')
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  const saveProducts = (newProducts) => {
    setProducts(newProducts)
    localStorage.setItem('products', JSON.stringify(newProducts))
  }

  const addProduct = (product) => {
    const newProducts = [...products, { ...product, id: products.length + 1 }]
    saveProducts(newProducts)
  }

  const deleteProduct = (id) => {
    const newProducts = products.filter(product => product.id !== id)
    saveProducts(newProducts)
  }

  const editProduct = (product) => {
    const newProducts = products.map(p => p.id === product.id ? product : p)
    saveProducts(newProducts)
    setEditingProduct(null)
  }

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('isLoggedIn')
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Product Management</h1>
        <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <ProductForm 
            onSubmit={editingProduct ? editProduct : addProduct}
            initialData={editingProduct}
          />
        </div>
        <div className="col-md-8">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control mb-3"
          />
          <ProductTable 
            products={filteredProducts}
            onDelete={deleteProduct}
            onEdit={setEditingProduct}
          />
        </div>
      </div>
    </div>
  )
}