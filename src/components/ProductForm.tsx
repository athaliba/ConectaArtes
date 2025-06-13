import React, { useState } from 'react';
import { createProduct, getAuth } from '../actions';
import { notifySuccess, notifyError } from '../components/toasts';

const ProductForm = () => {
  const { token } = getAuth();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createProduct(
        { ...form, price: Number(form.price), stock: Number(form.stock) },
        token
      );
      notifySuccess('Produto cadastrado com sucesso!');
      setForm({ name: '', description: '', price: '', image: '', stock: 1 });
    } catch (err: any) {
      notifyError(err.message || 'Erro ao cadastrar produto');
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold text-[#8A0500] mb-6 text-center">Cadastrar Novo Produto</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Nome do produto"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="description"
          placeholder="Descrição"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="image"
          placeholder="URL da imagem"
          value={form.image}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Preço (R$)"
          value={form.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="stock"
          type="number"
          placeholder="Estoque"
          min="1"
          value={form.stock}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <button
          type="submit"
          className="w-full bg-[#8A0500] text-white py-2 rounded hover:bg-red-700 transition"
        >
          Cadastrar Produto
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
