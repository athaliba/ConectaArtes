// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Register from '../../components/Register';
// import { BrowserRouter } from 'react-router-dom';

// describe('Register validation tests', () => {
//   test('does not submit the form if fields are empty', async () => {
//     const mockOnRegisterSuccess = jest.fn();

//     render(
//       <BrowserRouter>
//         <Register />
//       </BrowserRouter>
//     );

//     const submitButton = screen.getByRole('button', { name: /registrar/i });

//     // Tenta clicar no botão sem preencher campos
//     await userEvent.click(submitButton);

//     // Verifica que a função de sucesso NÃO foi chamada
//     expect(mockOnRegisterSuccess).not.toHaveBeenCalled();

//     // Você pode validar se os inputs são inválidos (HTML5 validation)
//     expect(screen.getByPlaceholderText(/nome completo/i)).toBeInvalid();
//     expect(screen.getByPlaceholderText(/nome de usuário/i)).toBeInvalid();
//     expect(screen.getByPlaceholderText(/e-mail/i)).toBeInvalid();
//     expect(screen.getByPlaceholderText(/senha/i)).toBeInvalid();
//   });
// });
