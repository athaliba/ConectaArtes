import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';

// Mock do loginUser para controlar o retorno da chamada
jest.mock('../../actions/index', () => ({
  loginUser: jest.fn(),
}));

// Mock do notifyError para verificar se é chamado
jest.mock('../../components/toasts/index', () => ({
  notifyError: jest.fn(),
  notifySuccess: jest.fn(), // pode mockar o success tbm se quiser
}));

import { loginUser } from '../../actions/index';
import { notifyError } from '../../components/toasts/index';

describe('Login error tests', () => {
  test('chama notifyError ao falhar o login', async () => {
    const mockOnLoginSuccess = jest.fn();

    // Configura o mock para simular login falho
    (loginUser as jest.Mock).mockResolvedValue({
      success: false,
      message: 'Usuário ou senha incorretos',
    });

    render(<Login onLoginSuccess={mockOnLoginSuccess} />);

    await userEvent.type(screen.getByPlaceholderText(/e-mail ou nome de usuário/i), 'usuario_errado');
    await userEvent.type(screen.getByPlaceholderText(/senha/i), 'senha_errada');

    await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

    // Verifica se notifyError foi chamado com a mensagem correta
    expect(notifyError).toHaveBeenCalledWith('Usuário ou senha incorretos');

    // Garante que a função de sucesso não foi chamada
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();
  });
});
