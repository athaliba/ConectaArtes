import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Arte.png';

interface HeaderProps {
  onLogout: () => void;
  isLoggedIn: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLogout, isLoggedIn }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#8A0500] flex justify-between items-center p-4 shadow-md w-full font-[Inter]">
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-20 p-2 cursor-pointer"
          onClick={() => navigate('/')}
        />
      </div>

      <nav className="w-full flex items-center justify-end gap-6">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate('/')}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-300 transition-colors"
            >
              HOME
            </button>

            <button
              onClick={() => navigate('/cadastro-produto')}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-300 transition-colors"
            >
              CADASTRAR PRODUTO
            </button>

            <button
              onClick={() => navigate('/carrinho')}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-300 transition-colors"
            >
              CARRINHO
            </button>

            <button
              onClick={() => navigate('/sobre')}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-300 transition-colors"
            >
              SOBRE
            </button>

            <button
              onClick={() => {
                onLogout();
                navigate('/login');
              }}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-600 transition-colors"
            >
              SAIR
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/login')}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-300 transition-colors"
            >
              LOGIN
            </button>
            <button
              onClick={() => navigate('/register')}
              className="text-white text-xl font-bold cursor-pointer hover:text-red-300 transition-colors"
            >
              REGISTRAR
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
