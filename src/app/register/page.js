'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pass user data to the payment page
    localStorage.setItem('userDetails', JSON.stringify(formData));
    router.push('/payment');
  };

  return (
    <div className="container mt-5">
      <h1>Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone:</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Proceed to Payment</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
