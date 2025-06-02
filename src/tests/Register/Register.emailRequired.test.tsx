// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Register from '../../components/Register';
// import { BrowserRouter } from 'react-router-dom';

// describe('Register email required validation', () => {
//   test('does not submit form if email is empty', async () => {
//     const mockOnRegisterSuccess = jest.fn();

//     render(
//       <BrowserRouter>
//         <Register />
//       </BrowserRouter>
//     );

//     // Preenche todos os campos menos o email
//     await userEvent.type(screen.getByPlaceholderText(/nome completo/i), 'Nome Teste');
//     await userEvent.type(screen.getByPlaceholderText(/nome de usuário/i), 'usuario123');
//     // email não preenche

//     await userEvent.type(screen.getByPlaceholderText(/senha/i), 'Senha123!');

//     const submitButton = screen.getByRole('button', { name: /registrar/i });

//     await userEvent.click(submitButton);

//     // Verifica que a função de sucesso NÃO foi chamada
//     expect(mockOnRegisterSuccess).not.toHaveBeenCalled();

//     // O input de email deve estar inválido
//     expect(screen.getByPlaceholderText(/e-mail/i)).toBeInvalid();
//   });
// });
