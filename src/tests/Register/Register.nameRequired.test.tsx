// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Register from '../../components/Register';
// import { BrowserRouter } from 'react-router-dom';

// describe('Register name required validation', () => {
//   test('does not submit form if name is empty', async () => {
//     const mockOnRegisterSuccess = jest.fn();

//     render(
//       <BrowserRouter>
//         <Register />
//       </BrowserRouter>
//     );

//     // Não preenche o campo nome completo
//     // Preenche os outros campos
//     await userEvent.type(screen.getByPlaceholderText(/nome de usuário/i), 'usuario123');
//     await userEvent.type(screen.getByPlaceholderText(/e-mail/i), 'email@teste.com');
//     await userEvent.type(screen.getByPlaceholderText(/senha/i), 'Senha123!');

//     const submitButton = screen.getByRole('button', { name: /registrar/i });

//     await userEvent.click(submitButton);

//     // Verifica que a função de sucesso NÃO foi chamada
//     expect(mockOnRegisterSuccess).not.toHaveBeenCalled();

//     // O input do nome completo deve estar inválido
//     expect(screen.getByPlaceholderText(/nome completo/i)).toBeInvalid();
//   });
// });
