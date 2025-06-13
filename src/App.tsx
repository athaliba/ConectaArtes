import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './styles/main.css';

import ToastContainer from './components/toasts/ToastProvider';
import { notifySuccess } from './components/toasts';

import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

import SearchComponent from './components/SearchComponent';
import ProductForm from './components/ProductForm';
import Cart from './components/Cart';
import Sobre from './components/Sobre';

function App() {
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedUserId = localStorage.getItem('userId');

    if (savedToken && savedUserId) {
      setToken(savedToken);
      setUserId(savedUserId);
    }

    setLoadingAuth(false);
  }, []);

  const handleLoginSuccess = (newToken: string, newUserId: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('userId', newUserId);
    setToken(newToken);
    setUserId(newUserId);
  };

  const handleLogout = () => {
    notifySuccess('Você foi deslogado com sucesso!');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setToken(null);
    setUserId(null);
  };

  if (loadingAuth) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Carregando autenticação...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Header onLogout={handleLogout} isLoggedIn={!!token} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          {!token ? (
            <>
              <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route path="/" element={<SearchComponent token={token} userId={userId!} />} />
              <Route path="/cadastro-produto" element={<ProductForm token={token} />} />
              <Route path="/carrinho" element={<Cart token={token} userId={userId!} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
              <Route path="/sobre" element={<Sobre />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
