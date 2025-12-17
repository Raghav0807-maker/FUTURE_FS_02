import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from './CartItem';
import { ShoppingCart } from 'lucide-react';

const Cart = ({ onCheckout, onContinueShopping }) => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);

  const shipping = 5.99;
  const tax = totalAmount * 0.1;
  const total = totalAmount + shipping + tax;

  return (
    <div className="row">
      <div className="col-lg-8 mb-4">
        <div className="card shadow-sm">
          <div className="card-header bg-white">
            <h4 className="mb-0">Shopping Cart ({totalQuantity} items)</h4>
          </div>
          <div className="card-body">
            {items.length === 0 ? (
              <div className="text-center py-5">
                <ShoppingCart size={64} className="text-muted mb-3" />
                <h5 className="text-muted">Your cart is empty</h5>
                <button
                  className="btn btn-primary mt-3"
                  onClick={onContinueShopping}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="list-group list-group-flush">
                {items.map(item => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {items.length > 0 && (
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-header bg-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax:</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total:</span>
                <span className="text-primary">${total.toFixed(2)}</span>
              </div>
              <button
                className="btn btn-success w-100 mt-3"
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;