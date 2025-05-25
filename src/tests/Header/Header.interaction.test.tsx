import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Header interaction tests', () => {
  beforeEach(() => {
    mockedNavigate.mockClear();
  });

  test('clicar no logo chama navigate com "/"', async () => {
    render(
      <MemoryRouter>
        <Header isLoggedIn={false} onLogout={jest.fn()} />
      </MemoryRouter>
    );

    const logo = screen.getByAltText(/logo/i);
    await userEvent.click(logo);

    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  test('clicar nos botões do menu navega para as rotas corretas (usuário logado)', async () => {
    render(
      <MemoryRouter>
        <Header isLoggedIn={true} onLogout={jest.fn()} />
      </MemoryRouter>
    );

    const routes = {
      home: '/',
      favoritos: '/favoritos',
      histórico: '/historico',
      sobre: '/sobre',
    };

    for (const [name, route] of Object.entries(routes)) {
      const button = screen.getByRole('button', { name: new RegExp(name, 'i') });
      await userEvent.click(button);
      expect(mockedNavigate).toHaveBeenCalledWith(route);
      mockedNavigate.mockClear();
    }
  });

  test('clicar em SAIR chama onLogout e navega para /login', async () => {
    const mockLogout = jest.fn();

    render(
      <MemoryRouter>
        <Header isLoggedIn={true} onLogout={mockLogout} />
      </MemoryRouter>
    );

    const sairBtn = screen.getByRole('button', { name: /sair/i });
    await userEvent.click(sairBtn);

    expect(mockLogout).toHaveBeenCalled();
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });
});
