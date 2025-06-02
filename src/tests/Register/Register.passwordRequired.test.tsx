// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Register from '../../components/Register';
// import { BrowserRouter } from 'react-router-dom';

// describe('Register password required validation', () => {
//   test('does not submit form if password is empty', async () => {
//     const mockOnRegisterSuccess = jest.fn();

//     render(
//       <BrowserRouter>
//         <Register />
//       </BrowserRouter>
//     );

//     // Preenche todos os campos menos a senha
//     await userEvent.type(screen.getByPlaceholderText(/nome completo/i), 'Nome Teste');
//     await userEvent.type(screen.getByPlaceholderText(/nome de usuário/i), 'usuario123');
//     await userEvent.type(screen.getByPlaceholderText(/e-mail/i), 'email@teste.com');
//     // senha não preenche

//     const submitButton = screen.getByRole('button', { name: /registrar/i });

//     await userEvent.click(submitButton);

//     // Verifica que a função de sucesso NÃO foi chamada
//     expect(mockOnRegisterSuccess).not.toHaveBeenCalled();

//     // O input de senha deve estar inválido
//     expect(screen.getByPlaceholderText(/senha/i)).toBeInvalid();
//   });
// });
