import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

describe('Header component - renderização básica', () => {
  test('exibe botões LOGIN e REGISTRAR quando não está logado', () => {
    render(
      <MemoryRouter>
        <Header isLoggedIn={false} onLogout={jest.fn()} />
      </MemoryRouter>
    );
    
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /registrar/i })).toBeInTheDocument();

    expect(screen.queryByRole('button', { name: /home/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /sair/i })).not.toBeInTheDocument();
  });

  test('exibe botões de menu e SAIR quando está logado', () => {
    render(
      <MemoryRouter>
        <Header isLoggedIn={true} onLogout={jest.fn()} />
      </MemoryRouter>
    );

    ['home', 'favoritos', 'histórico', 'sobre', 'sair'].forEach((btn) => {
      expect(screen.getByRole('button', { name: new RegExp(btn, 'i') })).toBeInTheDocument();
    });

    expect(screen.queryByRole('button', { name: /login/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /registrar/i })).not.toBeInTheDocument();
  });
});
