// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import SearchComponent from '../../components/SearchComponent';
// import * as toasts from '../../components/toasts/index';

// jest.mock('../../components/toasts/index'); // Mocka o módulo de toasts

// describe('SearchComponent - testes básicos', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   test('mostra erro quando tenta buscar sem preencher CEP', async () => {
//     const notifyErrorMock = jest.spyOn(toasts, 'notifyError');

//     render(<SearchComponent userId="user123" token="token" />);

//     await userEvent.click(screen.getByRole('button', { name: /Buscar Restaurantes/i }));

//     expect(notifyErrorMock).toHaveBeenCalledWith('Por favor, insira o CEP.');
//   });
// });
