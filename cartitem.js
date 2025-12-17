import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col-md-2">
          <img
            src={item.image}
            alt={item.name}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-4">
          <h6 className="mb-1">{item.name}</h6>
          <small className="text-muted">{item.category}</small>
        </div>
        <div className="col-md-2 text-center">
          <span className="fw-bold">${item.price.toFixed(2)}</span>
        </div>
        <div className="col-md-3">
          <div className="input-group input-group-sm">
            <button
              className="btn btn-outline-secondary"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
            >
              <Minus size={16} />
            </button>
            <input
              type="text"
              className="form-control text-center"
              value={item.quantity}
              readOnly
            />
            <button
              className="btn btn-outline-secondary"
              onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="col-md-1 text-end">
          <button
            className="btn btn-sm btn-outline-danger"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;