import { render, screen } from '@testing-library/react';
import Favorites from '../Favorites';

jest.mock('../../actions/index', () => ({
  fetchFavoritos: jest.fn(),
  removeFavorito: jest.fn(),
}));

import { fetchFavoritos } from '../../actions/index';

describe('Favorites - Renderização', () => {
  beforeEach(() => {
    (fetchFavoritos as jest.Mock).mockClear();
  });

  test('exibe mensagem de carregamento', () => {
    (fetchFavoritos as jest.Mock).mockReturnValue(new Promise(() => {})); // Promise pendente
    render(<Favorites userId="user123" token="token" />);
    expect(screen.getByText(/carregando favoritos/i)).toBeInTheDocument();
  });

  test('exibe mensagem quando lista de favoritos está vazia', async () => {
    (fetchFavoritos as jest.Mock).mockResolvedValue([]);
    render(<Favorites userId="user123" token="token" />);
    const emptyMsg = await screen.findByText(/você não tem restaurantes favoritos/i);
    expect(emptyMsg).toBeInTheDocument();
  });

  test('exibe lista de favoritos quando há dados', async () => {
    const mockFavorites = [
      {
        _id: 'fav1',
        restaurantId: 'r1',
        restaurantName: 'Restaurante 1',
        restaurantLocation: 'Local 1',
        addedAt: new Date().toISOString(),
      },
      {
        _id: 'fav2',
        restaurantId: 'r2',
        restaurantName: 'Restaurante 2',
        restaurantLocation: 'Local 2',
        addedAt: new Date().toISOString(),
      },
    ];

    (fetchFavoritos as jest.Mock).mockResolvedValue(mockFavorites);
    render(<Favorites userId="user123" token="token" />);

    for (const fav of mockFavorites) {
      const restaurant = await screen.findByText(fav.restaurantName);
      expect(restaurant).toBeInTheDocument();
    }
  });
});
