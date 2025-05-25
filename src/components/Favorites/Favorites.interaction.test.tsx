import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Favorites from '../Favorites';

jest.mock('../../actions/index', () => ({
  fetchFavoritos: jest.fn(),
  removeFavorito: jest.fn(),
}));

import { fetchFavoritos, removeFavorito } from '../../actions/index';

describe('Favorites - Interação', () => {
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

  beforeEach(() => {
    (fetchFavoritos as jest.Mock).mockClear();
    (removeFavorito as jest.Mock).mockClear();
  });

  test('remove favorito ao clicar no botão', async () => {
    // Mock do fetchFavoritos para retornar os favoritos
    (fetchFavoritos as jest.Mock).mockResolvedValue(mockFavorites);
    // Mock do removeFavorito para resolver com sucesso
    (removeFavorito as jest.Mock).mockResolvedValue({ success: true });

    render(<Favorites userId="user123" token="token" />);

    // Espera os restaurantes carregarem
    for (const fav of mockFavorites) {
      await screen.findByText(fav.restaurantName);
    }

    // Pega o botão "Remover" do primeiro favorito
    const btnRemove = screen.getAllByRole('button', { name: /remover/i })[0];

    // Clica para remover
    userEvent.click(btnRemove);

    // Espera que a função removeFavorito tenha sido chamada com os parâmetros corretos
    await waitFor(() => {
      expect(removeFavorito).toHaveBeenCalledWith('user123', 'r1', 'token');
    });

    // Verifica se botão fica desabilitado após clique
    expect(btnRemove).toBeDisabled();
  });
});
