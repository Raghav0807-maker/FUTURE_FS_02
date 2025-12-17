import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategory, setSearchTerm } from '../redux/productSlice';
import ProductCard from './ProductCard';
import { Package } from 'lucide-react';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items, loading, error, selectedCategory, searchTerm } = useSelector(
    state => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, search: searchTerm }));
  }, [dispatch, selectedCategory, searchTerm]);

  const categories = ['All', 'Electronics', 'Accessories'];

  if (loading) {
    return <div className="text-center py-5"><div className="spinner-border"></div></div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <div className="row mb-4">
        <div className="col-md-8 mb-3 mb-md-0">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row g-4">
        {items.map(product => (
          <div key={product.id} className="col-md-6 col-lg-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-5">
          <Package size={64} className="text-muted mb-3" />
          <h4 className="text-muted">No products found</h4>
        </div>
      )}
    </>
  );
};

export default ProductList;