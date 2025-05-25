import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Register from '../../components/Register';
import { BrowserRouter } from 'react-router-dom';

describe('Register username required validation', () => {
  test('does not submit form if username is empty', async () => {
    const mockOnRegisterSuccess = jest.fn();

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    // Preenche todos os campos menos o nome de usuário
    await userEvent.type(screen.getByPlaceholderText(/nome completo/i), 'Nome Teste');
    // username não preenche
    await userEvent.type(screen.getByPlaceholderText(/e-mail/i), 'email@teste.com');
    await userEvent.type(screen.getByPlaceholderText(/senha/i), 'Senha123!');

    const submitButton = screen.getByRole('button', { name: /registrar/i });

    await userEvent.click(submitButton);

    // Verifica que a função de sucesso NÃO foi chamada
    expect(mockOnRegisterSuccess).not.toHaveBeenCalled();

    // O input de nome de usuário deve estar inválido
    expect(screen.getByPlaceholderText(/nome de usuário/i)).toBeInvalid();
  });
});
