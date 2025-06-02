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
import Favorites from './components/Favorites';
import History from './components/History';
import AboutSection from './components/AboutSection';
import RestaurantComments from './components/RestaurantComments'; 

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
              <Route
                path="/login"
                element={<Login onLoginSuccess={handleLoginSuccess} />}
              />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          ) : (
            <>
              <Route
                path="/"
                element={
                  <SearchComponent
                    userId={userId!}
                    token={token}
                  />
                }
              />
              <Route
                path="/favoritos"
                element={<Favorites userId={userId!} token={token} />}
              />
              <Route
                path="/historico"
                element={<History token={token} />}
              />
              <Route
                path="/comentarios/:id"
                element={<RestaurantComments token={token} userId={userId!} />}
              />
              <Route path="/sobre" element={<AboutSection />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
