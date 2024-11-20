'use client';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const router = useRouter();

  const handleStartRegistration = () => {
    router.push('/register'); // Redirect to the registration form
  };

  return (
    <div className="container mt-5 text-center">
      <h1>Welcome to the Payment Integration App</h1>
      <p className="mt-3">
        This app demonstrates a complete flow of user registration followed by a secure payment gateway integration.
      </p>
     
    </div>
  );
};

export default HomePage;
