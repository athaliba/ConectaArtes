import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../../components/Login';

describe('Login validation tests', () => {
  test('does not submit the form if fields are empty', async () => {
    const mockOnLoginSuccess = jest.fn();

    render(<Login onLoginSuccess={mockOnLoginSuccess} />);

    const submitButton = screen.getByRole('button', { name: /entrar/i });

    // Tenta clicar no botão sem preencher campos
    await userEvent.click(submitButton);

    // Espera que onLoginSuccess NÃO tenha sido chamado
    expect(mockOnLoginSuccess).not.toHaveBeenCalled();

    // Você também pode verificar se os inputs são inválidos
    const emailInput = screen.getByPlaceholderText(/e-mail ou nome de usuário/i);
    const passwordInput = screen.getByPlaceholderText(/senha/i);

    expect(emailInput).toBeInvalid();
    expect(passwordInput).toBeInvalid();
  });
});
