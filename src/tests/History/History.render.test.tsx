import { render, screen, waitFor } from '@testing-library/react';
import History from '../../components/History';

jest.mock('../../actions/index', () => ({
  fetchHistorico: jest.fn(),
}));

import { fetchHistorico } from '../../actions/index';

describe('History component - renderização básica', () => {
  beforeEach(() => {
    (fetchHistorico as jest.Mock).mockClear();
  });

  test('exibe mensagem de carregamento inicial', () => {
    (fetchHistorico as jest.Mock).mockReturnValue(new Promise(() => {})); // Promise pendente
    render(<History token="fake-token" />);
    expect(screen.getByText(/carregando histórico/i)).toBeInTheDocument();
  });

  test('exibe mensagem quando histórico está vazio', async () => {
    (fetchHistorico as jest.Mock).mockResolvedValue([]);
    render(<History token="fake-token" />);
    await waitFor(() => {
      expect(screen.getByText(/você não realizou buscas ainda/i)).toBeInTheDocument();
    });
  });

  test('exibe mensagem de erro quando fetch falha', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {}); // suprime erros esperados

    (fetchHistorico as jest.Mock).mockRejectedValue(new Error('Erro de rede'));
    render(<History token="fake-token" />);
    await waitFor(() => {
      expect(screen.getByText(/erro ao buscar histórico/i)).toBeInTheDocument();
    });

    (console.error as jest.Mock).mockRestore(); // restaura depois
  });

  test('exibe histórico quando dados são carregados', async () => {
    const mockData = [
      { _id: '1', cep: '12345-678', latitude: 0, longitude: 0, searchedAt: new Date().toISOString() },
      { _id: '2', cep: '98765-432', latitude: 0, longitude: 0, searchedAt: new Date().toISOString() },
    ];
    (fetchHistorico as jest.Mock).mockResolvedValue(mockData);

    render(<History token="fake-token" />);

    for (const entry of mockData) {
      await waitFor(() => {
        expect(screen.getByText(new RegExp(entry.cep))).toBeInTheDocument();
      });
    }
  });
});
