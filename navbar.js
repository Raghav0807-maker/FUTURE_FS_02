import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { useSelector } from 'react-redux';

const Navbar = ({ onCartClick, currentView }) => {
  const cartItemCount = useSelector(state => state.cart.totalQuantity);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4" href="/">
          <Package className="me-2" size={28} />
          ShopHub
        </a>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-light position-relative"
            onClick={onCartClick}
          >
            <ShoppingCart size={20} />
            {cartItemCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;