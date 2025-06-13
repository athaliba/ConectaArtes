import React from 'react';

const Sobre = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-8">
      <h1 className="text-3xl font-bold text-[#8A0500] mb-4">Sobre o ConectaArtes</h1>

      <p className="mb-4 text-gray-700">
        O <strong>ConectaArtes</strong> é uma plataforma web desenvolvida com o objetivo de conectar
        <strong> artesãos locais</strong> a clientes de todo o Brasil. Através do sistema, artesãos podem cadastrar
        seus produtos, enquanto clientes têm acesso a um catálogo completo para comprar com segurança e praticidade.
      </p>

      <h2 className="text-2xl font-semibold text-[#8A0500] mt-6 mb-2">Funcionalidades</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Cadastro de usuários artesãos</li>
        <li>Catálogo de produtos com imagens e descrição</li>
        <li>Busca e filtros por nome</li>
        <li>Carrinho de compras e checkout simulado</li>
        <li>Design responsivo e intuitivo</li>
      </ul>

      <h2 className="text-2xl font-semibold text-[#8A0500] mt-6 mb-2">Tecnologias Utilizadas</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li><strong>Frontend:</strong> React.js + Tailwind CSS + Vite</li>
        <li><strong>Backend:</strong> Node.js + Express + MongoDB Atlas</li>
        <li><strong>Autenticação:</strong> JWT (JSON Web Token)</li>
        {/* <li><strong>Deploy:</strong> GitHub + Vercel / Render</li> */}
      </ul>

      <h2 className="text-2xl font-semibold text-[#8A0500] mt-6 mb-2">Equipe de Desenvolvimento</h2>
      <ul className="list-disc ml-6 text-gray-700">
        <li>Bianca Andrade</li>
        <li>João Vitor Cardoso</li>
        <li>Pedro Lima</li>
        <li>Rafael Athaliba</li>
      </ul>

      <p className="mt-6 text-sm text-gray-600 italic">
        Projeto desenvolvido como parte da disciplina de Desenvolvimento de Software com Alta Qualidade – SENAI.
      </p>
    </div>
  );
};

export default Sobre;
