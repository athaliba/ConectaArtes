import React, { useEffect, useState } from 'react';
import { fetchProducts, addToCart, getAuth } from '../actions';
import { notifySuccess, notifyError } from './toasts';

const mockProducts = [
  {
    _id: '1',
    name: 'Pulseira Artesanal',
    description: 'Feita à mão com miçangas coloridas.',
    price: 25,
    image: '',
  },
  {
    _id: '2',
    name: 'Escultura em Madeira',
    description: 'Peça única esculpida por artesão local.',
    price: 120,
    image: '',
  },
  {
    _id: '3',
    name: 'Quadro Bordado',
    description: 'Arte decorativa feita com ponto cruz.',
    price: 80,
    image: '',
  },
];

const SearchComponent = () => {
  const { token } = getAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data.length ? data : mockProducts);
      } catch {
        setProducts(mockProducts); // fallback se erro no fetch
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleAdd = async (productId: string) => {
    try {
      await addToCart(productId, token);
      notifySuccess('Produto adicionado ao carrinho!');
    } catch (err: any) {
      notifyError(err.message || 'Erro ao adicionar ao carrinho');
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(busca.toLowerCase())
  );

  if (loading) {
    return (
      <div className="text-center mt-10 text-xl text-gray-700">Carregando catálogo...</div>
    );
  }

  return (
    <div className="p-4">
      <div className="max-w-md mx-auto mb-6">
        <input
          className="w-full border border-gray-300 rounded px-4 py-2 shadow focus:outline-none focus:ring focus:border-red-600"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div key={p._id} className="bg-white border rounded shadow p-4 flex flex-col items-center">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover mb-3 rounded"
              />
              <h3 className="font-bold text-lg text-center">{p.name}</h3>
              <p className="text-sm text-gray-600 text-center">{p.description}</p>
              <p className="font-semibold text-red-700 mt-2">R$ {p.price}</p>
              <button
                onClick={() => handleAdd(p._id)}
                className="mt-3 px-4 py-2 bg-[#8A0500] text-white rounded hover:bg-red-700 transition"
              >
                Comprar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
