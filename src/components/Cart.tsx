import React, { useEffect, useState } from 'react';
import { fetchCart, checkout, getAuth } from '../actions';

const Cart = () => {
  const { token, userId } = getAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const load = async () => {
      const data = await fetchCart(userId, token);
      setItems(data.products || []);
    };
    load();
  }, []);

  const handleCheckout = async () => {
    try {
      await checkout(token);
      alert('Compra concluída com sucesso!');
      setItems([]);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Carrinho</h2>
      {items.map((item: any) => (
        <div key={item.product._id} className="border-b py-2">
          <p className="font-semibold">{item.product.name}</p>
          <p>Qtd: {item.quantity}</p>
          <p>R$ {item.product.price}</p>
        </div>
      ))}
      {items.length > 0 && (
        <button onClick={handleCheckout} className="btn-primary mt-4">
          Finalizar Compra
        </button>
      )}
    </div>
  );
};

export default Cart;
