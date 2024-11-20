'use client';
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Load Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentStatus, setPaymentStatus] = useState('');
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const storedDetails = localStorage.getItem('userDetails');
    if (storedDetails) {
      setUserDetails(JSON.parse(storedDetails));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const res = await fetch('/api/payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: 5000, // Payment amount in cents (e.g., $50.00)
      }),
    });

    const { clientSecret, error } = await res.json();

    if (error) {
      setPaymentStatus(`Error: ${error}`);
      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setPaymentStatus(`Payment failed: ${stripeError.message}`);
    } else if (paymentIntent.status === 'succeeded') {
      setPaymentStatus('Payment successful! Thank you.');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Payment Page</h1>
      {userDetails && (
        <div className="mb-3">
          <h4>User Details:</h4>
          <p><strong>Name:</strong> {userDetails.name}</p>
          <p><strong>Email:</strong> {userDetails.email}</p>
          <p><strong>Phone:</strong> {userDetails.phone}</p>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe} className="btn btn-primary mt-3">
          Pay $50
        </button>
      </form>
      {paymentStatus && <p>{paymentStatus}</p>}
    </div>
  );
};

const PaymentPage = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default PaymentPage;
