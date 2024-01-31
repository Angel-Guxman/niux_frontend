import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Cart from './Cart';
import { useCartStore } from '../stores/shop/cartStore';
import { GridLoader } from 'react-spinners';
import { useAuthStore } from '../stores/Auth/authStore';

const CartLayout = () => {
  const cart = useCartStore((state) => state.cart);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const delay = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(delay);
  }, []);

  const authStatus = useAuthStore((state) => state.status);
  const checkAuth = useAuthStore((state) => state.checkAuthStatus);

  if (authStatus === 'unauthorized' || authStatus === 'pending') {
    checkAuth();
    return <Navigate to="/login" />;
  }

  return loading ? (
    <div className="flex items-center justify-center h-screen">
      <GridLoader size={25} color="#b70df3" />
    </div>
  ) : cart.length === 0 ? (
    <div>
      <Navbar />
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Tu carrito está vacío</h1>
          <p className="mt-6 text-base leading-7 text-gray-600">¡Comienza a explorar nuestra tienda y agrega productos!</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/catalogue" className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
              Catálogo de Niux
            </Link>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <Cart />
  );
};

export default CartLayout;
