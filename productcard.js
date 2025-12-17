import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        className="card-img-top"
        alt={product.name}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <span className="badge bg-secondary mb-2 align-self-start">
          {product.category}
        </span>
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text text-muted small">{product.description}</p>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="fs-4 fw-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-muted small">
              Stock: {product.stock}
            </span>
          </div>
          <button
            className="btn btn-primary w-100"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;