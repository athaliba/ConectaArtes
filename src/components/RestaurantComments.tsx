import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaEdit, FaTrash, FaCommentDots } from 'react-icons/fa';
import { notifySuccess, notifyError } from '../components/toasts';

interface Comment {
  _id: string;
  restaurantId: string;
  userId: string;
  content: string;
  createdAt: string;
}

interface Props {
  token: string;
  userId: string;
}

const RestaurantComments: React.FC<Props> = ({ token, userId }) => {
  const { id: restaurantId } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comentarios/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setComments(data);
    } catch (err) {
      console.error('Erro ao buscar comentários', err);
      notifyError('Erro ao carregar comentários');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!newComment.trim()) {
      notifyError('O comentário não pode estar vazio');
      return;
    }

    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `/api/comentarios/${editingId}`
      : '/api/comentarios';

    const payload = editingId
      ? { content: newComment }
      : { content: newComment, restaurantId };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        notifySuccess(editingId ? 'Comentário atualizado' : 'Comentário adicionado');
        setNewComment('');
        setEditingId(null);
        fetchComments();
      } else {
        notifyError('Erro ao salvar comentário');
      }
    } catch {
      notifyError('Erro de rede ao salvar comentário');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/comentarios/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        notifySuccess('Comentário removido');
        fetchComments();
      } else {
        notifyError('Erro ao remover comentário');
      }
    } catch {
      notifyError('Erro de rede ao remover comentário');
    }
  };

  const startEditing = (comment: Comment) => {
    setEditingId(comment._id);
    setNewComment(comment.content);
  };

  useEffect(() => {
    fetchComments();
  }, [restaurantId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-bold text-red-700 flex items-center gap-3 mb-6">
        <FaCommentDots size={28} />
        Comentários do Restaurante
      </h1>

      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 mb-8">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Escreva seu comentário aqui..."
          className="w-full border border-gray-300 rounded-md p-3 mb-4 resize-none"
          rows={4}
        />

        <button
          onClick={handleSubmit}
          className="bg-red-700 text-white px-6 py-2 rounded-md hover:bg-red-800 transition-colors font-semibold"
        >
          {editingId ? 'Atualizar Comentário' : 'Adicionar Comentário'}
        </button>
      </div>

      <div className="w-full max-w-2xl">
        {loading ? (
          <p className="text-center text-gray-500">Carregando comentários...</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum comentário ainda.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="bg-gray-100 p-4 rounded-md shadow-md flex justify-between items-start"
              >
                <div className="w-full">
                  {editingId === comment._id ? (
                    <>
                      <textarea
                        className="w-full border border-gray-300 rounded p-2 mb-2"
                        rows={3}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                      />
                      <button
                        onClick={handleSubmit}
                        className="bg-green-700 text-white px-4 py-1 rounded hover:bg-green-800 transition"
                      >
                        Salvar
                      </button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-700">{comment.content}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Criado em: {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </>
                  )}
                </div>

                {comment.userId === userId && editingId !== comment._id && (
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <button
                      onClick={() => startEditing(comment)}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm"
                    >
                      <FaTrash /> Remover
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RestaurantComments;
