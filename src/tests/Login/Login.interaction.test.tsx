// import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Login from '../../components/Login';

// jest.mock('../../actions/index', () => ({
//   loginUser: jest.fn(),
// }));

// import { loginUser } from '../../actions/index';

// describe('Login interaction tests', () => {
//   test('allows typing and successful submit', async () => {
//     const mockOnLoginSuccess = jest.fn();

//     (loginUser as jest.Mock).mockResolvedValue({
//       success: true,
//       token: 'fake-token',
//       userId: 'user-123',
//     });

//     render(<Login onLoginSuccess={mockOnLoginSuccess} />);

//     await userEvent.type(screen.getByPlaceholderText(/e-mail ou nome de usuário/i), 'usuario_teste');
//     await userEvent.type(screen.getByPlaceholderText(/senha/i), 'senha123');

//     await userEvent.click(screen.getByRole('button', { name: /entrar/i }));

//     expect(loginUser).toHaveBeenCalledWith('usuario_teste', 'senha123');

//     await waitFor(() => {
//       expect(mockOnLoginSuccess).toHaveBeenCalledWith('fake-token', 'user-123');
//     });

//     expect(screen.queryByText(/falha no login/i)).not.toBeInTheDocument();
//   });

//   test('submit button disabled during login request', async () => {
//     const mockOnLoginSuccess = jest.fn();

//     let resolvePromise: (value?: any) => void;
//     const loginPromise = new Promise((resolve) => {
//       resolvePromise = resolve;
//     });

//     (loginUser as jest.Mock).mockReturnValue(loginPromise);

//     render(<Login onLoginSuccess={mockOnLoginSuccess} />);

//     await userEvent.type(screen.getByPlaceholderText(/e-mail ou nome de usuário/i), 'usuario_teste');
//     await userEvent.type(screen.getByPlaceholderText(/senha/i), 'senha123');

//     userEvent.click(screen.getByRole('button', { name: /entrar/i }));

//     // Aqui busca o botão com texto "Entrando..."
//     await waitFor(() => {
//       expect(screen.getByRole('button', { name: /entrando.../i })).toBeDisabled();
//     });

//     resolvePromise!({ success: true, token: 'fake-token', userId: 'user-123' });

//     // Aqui espera o botão voltar a "Entrar"
//     await waitFor(() => expect(screen.getByRole('button', { name: /entrar/i })).not.toBeDisabled());
//   });
// });
