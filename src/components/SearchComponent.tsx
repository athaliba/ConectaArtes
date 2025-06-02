import React, { useState } from 'react';
import axios from 'axios';
import { FaMapMarkerAlt, FaStar, FaRegCommentDots } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import { addFavorito, removeFavorito, addHistorico, fetchFavoritos } from '../actions';
import { notifyError, notifySuccess } from '../components/toasts/index';

interface Restaurante {
  fsq_id: string;
  name: string;
  location: { address: string };
  categories: { name: string }[];
  distance: number;
  geocodes?: { main?: { latitude: number; longitude: number } };
}

interface Favorito {
  restaurantId: string;
}

interface SearchRestaurantsProps {
  userId: string;
  token: string;
}

const SearchRestaurants: React.FC<SearchRestaurantsProps> = ({ userId, token }) => {
  const [cep, setCep] = useState<string>('');
  const [restaurants, setRestaurants] = useState<Restaurante[]>([]);
  const [error, setError] = useState<string>('');
  const [cepError, setCepError] = useState<string>('');
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());

  const navigate = useNavigate();

  const apiKeyFoursquare = 'fsq3lB+7CQYRL4TDNQ0lkCOQ8Cb9fWpRXrYiWUSSvYlsysc=';
  const apiKeyGeocoding = 'AIzaSyBJaZFuZvi8axZBiwxYeEumv4gMP0ti54o';

  const validarCep = (inputCep: string) => {
    const cepRegex = /^[0-9]{8}$/;
    if (!cepRegex.test(inputCep)) {
      notifyError('O CEP deve conter apenas números e ter 8 dígitos.');
      return false;
    }
    setCepError('');
    return true;
  };

  const atualizarFavoritos = async () => {
    try {
      const favoritos: Favorito[] = await fetchFavoritos(userId, token);
      const favIds = new Set(favoritos.map((fav) => fav.restaurantId));
      setFavoriteIds(favIds);
    } catch (err) {
      console.error('Erro ao buscar favoritos:', err);
      notifyError('Erro ao carregar favoritos');
    }
  };

  const buscarRestaurantesPorCep = async () => {
    setError('');
    setRestaurants([]);

    if (!cep) {
      notifyError('Por favor, insira o CEP.');
      return;
    }

    if (!validarCep(cep)) return;

    try {
      const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${apiKeyGeocoding}`;
      const geocodingResponse = await axios.get(geocodingEndpoint);
      const data = geocodingResponse.data;

      if (data.status === 'OK' && data.results.length > 0) {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;

        try {
          await addHistorico({ cep, latitude, longitude, userId }, token);
        } catch (error) {
          console.error('Erro ao salvar histórico:', error);
        }

        await buscarRestaurantes(latitude, longitude);
        await atualizarFavoritos();
      } else {
        notifyError('Não foi possível encontrar as coordenadas para esse CEP.');
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas do CEP:', error);
      notifyError('Ocorreu um erro ao buscar o CEP.');
    }
  };

  const buscarRestaurantes = async (latitude: number, longitude: number) => {
    try {
      const endpoint = `https://api.foursquare.com/v3/places/search?ll=${latitude},${longitude}&radius=1000&limit=5&categories=13065`;
      const response = await axios.get(endpoint, {
        headers: { Authorization: apiKeyFoursquare },
      });

      if (response.data.results.length > 0) {
        setRestaurants(response.data.results);
        setError('');
      } else {
        setRestaurants([]);
        notifyError('Nenhum restaurante encontrado nas proximidades.');
      }
    } catch (error) {
      console.error('Erro ao buscar restaurantes:', error);
      notifyError('Ocorreu um erro ao buscar os restaurantes.');
    }
  };

  const toggleFavorite = async (restaurant: Restaurante) => {
    const isFav = favoriteIds.has(restaurant.fsq_id);

    try {
      if (isFav) {
        await removeFavorito(userId, restaurant.fsq_id, token);
        setFavoriteIds((prev) => {
          const newSet = new Set(prev);
          newSet.delete(restaurant.fsq_id);
          return newSet;
        });
        notifySuccess('Restaurante removido dos favoritos');
      } else {
        await addFavorito(
          {
            userId,
            restaurantId: restaurant.fsq_id,
            restaurantName: restaurant.name,
            restaurantLocation: restaurant.location.address,
          },
          token
        );
        setFavoriteIds((prev) => new Set(prev).add(restaurant.fsq_id));
        notifySuccess('Restaurante adicionado aos favoritos.');
      }
    } catch (error) {
      console.error('Erro ao alterar favorito:', error);
      notifyError('Erro ao alterar favorito');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-5">
      <h1 className="text-3xl font-bold mb-4">Buscar Restaurantes por CEP</h1>

      <div className="w-full max-w-md">
        <label htmlFor="cep" className="block text-lg mb-2">
          Digite o CEP:
        </label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Ex: 01001000"
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        />
        {cepError && <div className="text-red-500 text-sm mb-4">{cepError}</div>}

        <button
          onClick={buscarRestaurantesPorCep}
          className="w-full p-2 bg-red-700 text-white rounded-md hover:bg-red-600"
        >
          Buscar Restaurantes
        </button>
      </div>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      <div id="results" className="mt-6 w-full max-w-md">
        {restaurants.length > 0 ? (
          <div className="space-y-4">
            {restaurants.map((restaurant) => {
              const lat = restaurant.geocodes?.main?.latitude;
              const lng = restaurant.geocodes?.main?.longitude;
              const mapsUrl = lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : '#';
              const isFav = favoriteIds.has(restaurant.fsq_id);

              return (
                <div
                  key={restaurant.fsq_id}
                  className="group p-4 bg-white rounded-md shadow-md border-2 border-red-600 hover:shadow-lg transition-shadow flex justify-between items-center"
                >
                  <div>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xl font-semibold hover:underline"
                    >
                      {restaurant.name}
                    </a>
                    <p><strong>Endereço:</strong> {restaurant.location.address || 'Não disponível'}</p>
                    <p><strong>Categoria:</strong> {restaurant.categories ? restaurant.categories.map((cat) => cat.name).join(', ') : 'Não disponível'}</p>
                    <p><strong>Distância:</strong> {(restaurant.distance / 1000).toFixed(2)} km</p>
                  </div>

                  <div className="flex flex-col items-center gap-6">
                    <FaMapMarkerAlt
                      className="text-red-600 transition-transform duration-300 group-hover:scale-125 group-hover:-translate-y-1"
                      size={24}
                    />

                    <button
                      aria-label={isFav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                      onClick={() => toggleFavorite(restaurant)}
                      className="focus:outline-none"
                    >
                      <FaStar size={24} className={isFav ? 'text-yellow-400' : 'text-gray-400'} />
                    </button>

                    <button
                      aria-label="Comentar"
                      onClick={() =>
                        navigate(`/comentarios/${restaurant.fsq_id}`, {
                          state: { restaurantName: restaurant.name },
                        })
                      }
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="Comentar"
                    >
                      <FaRegCommentDots size={22} />
                    </button>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">Faça uma busca!</p>
        )}
      </div>
    </div>
  );
};

export default SearchRestaurants;
