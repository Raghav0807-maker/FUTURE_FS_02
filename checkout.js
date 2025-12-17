import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { orderAPI } from '../services/api';
import { CreditCard, CheckCircle } from 'lucide-react';

const Checkout = ({ onComplete }) => {
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector(state => state.cart);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
  });

  const shipping = 5.99;
  const tax = totalAmount * 0.1;
  const total = totalAmount + shipping + tax;

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.address || 
        !formData.city || !formData.zipCode || !formData.cardNumber) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        items: items.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: totalAmount,
        tax: tax,
        shipping: shipping,
        total: total,
      };

      await orderAPI.create(orderData);
      setOrderComplete(true);
      
      setTimeout(() => {
        dispatch(clearCart());
        onComplete();
      }, 3000);
    } catch (error) {
      alert('Order failed. Please try again.');
      console.error(error);
    }
  };

  if (orderComplete) {
    return (
      <div className="text-center py-5">
        <div className="card shadow-lg mx-auto" style={{maxWidth: '500px'}}>
          <div className="card-body p-5">
            <CheckCircle size={80} className="text-success mb-4" />
            <h2 className="text-success mb-3">Order Successful!</h2>
            <p className="text-muted mb-4">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="alert alert-info">
              <strong>Order Total:</strong> ${total.toFixed(2)}
            </div>
            <p className="small text-muted">Redirecting to products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h5 className="mb-0">Checkout Information</h5>
      </div>
      <div className="card-body">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
          />
        </div>
        <div className="row mb-3">
          <div className="col-8">
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
            />
          </div>
          <div className="col-4">
            <input
              type="text"
              className="form-control"
              placeholder="ZIP"
              value={formData.zipCode}
              onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            />
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control