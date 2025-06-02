import React, { useState, useEffect } from 'react';
import Header from '../../../RankEat-NovoFormulario/src/components/Header';
import Footer from '../../../RankEat-NovoFormulario/src/components/Footer';
import { Edit2, Trash2 } from 'lucide-react';

const styles = {
  pageWrapper: `bg-[#f5f5f5] min-h-screen flex flex-col`,
  contentContainer: `flex-grow max-w-4xl mx-auto mt-10 mb-10 space-y-10`,
  panel: `bg-white rounded-lg shadow-lg p-6`,
  sectionTitle: `text-2xl font-bold text-[#8A0500] mb-4`,
  recordContainer: `flex flex-col space-y-4`,
  recordItem: `flex justify-between items-center border border-gray-300 rounded-md bg-white p-3`,
  leftSide: `flex items-center`,
  titleText: `text-lg text-gray-800`,
  stars: `text-yellow-400 ml-2`,
  commentText: `text-gray-600 ml-4`,
  iconsWrapper: `flex space-x-4 text-gray-500`,
  iconButton: `cursor-pointer hover:text-[#8A0500] transition-colors`,
  loadingText: `text-center text-gray-500 italic`,
  errorText: `text-center text-red-500`,
};

type RatingRecord = {
  id: string;
  title: string;   // nome do restaurante ou prato
  stars: number;   // número de estrelas (1 a 5)
};

type CommentRecord = {
  id: string;
  title: string;   // nome do restaurante ou prato
  text: string;    // comentário completo
};

const History: React.FC = () => {
  const [ratings, setRatings] = useState<RatingRecord[]>([]);
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [loadingRatings, setLoadingRatings] = useState<boolean>(true);
  const [loadingComments, setLoadingComments] = useState<boolean>(true);
  const [errorRatings, setErrorRatings] = useState<string | null>(null);
  const [errorComments, setErrorComments] = useState<string | null>(null);

  useEffect(() => {
    // Busca histórico de avaliações do backend
    const fetchRatings = async () => {
      try {
        setLoadingRatings(true);
        const response = await fetch('/api/ratings'); // ajuste a rota conforme seu backend
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - Erro ao carregar avaliações.`);
        }
        const data: RatingRecord[] = await response.json();
        setRatings(data);
      } catch (err: any) {
        console.error('Erro ao buscar avaliações:', err);
        setErrorRatings('Falha ao carregar histórico de avaliações.');
      } finally {
        setLoadingRatings(false);
      }
    };

    // Busca histórico de comentários do backend
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const response = await fetch('/api/comments'); // ajuste a rota conforme seu backend
        if (!response.ok) {
          throw new Error(`HTTP ${response.status} - Erro ao carregar comentários.`);
        }
        const data: CommentRecord[] = await response.json();
        setComments(data);
      } catch (err: any) {
        console.error('Erro ao buscar comentários:', err);
        setErrorComments('Falha ao carregar histórico de comentários.');
      } finally {
        setLoadingComments(false);
      }
    };

    fetchRatings();
    fetchComments();
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Header />

      <main className={styles.contentContainer}>
        {/* Histórico de Avaliações */}
        <section className={styles.panel}>
          <h2 className={styles.sectionTitle}>Histórico de Avaliações</h2>

          {loadingRatings && (
            <p className={styles.loadingText}>Carregando histórico de avaliações...</p>
          )}
          {errorRatings && <p className={styles.errorText}>{errorRatings}</p>}

          {!loadingRatings && !errorRatings && (
            <div className={styles.recordContainer}>
              {ratings.length === 0 ? (
                <p className={styles.loadingText}>Nenhuma avaliação encontrada.</p>
              ) : (
                ratings.map((item) => (
                  <div key={item.id} className={styles.recordItem}>
                    <div className={styles.leftSide}>
                      <span className={styles.titleText}>{item.title}</span>
                      <span className={styles.stars}>
                        {'★'.repeat(item.stars)}
                      </span>
                    </div>
                    <div className={styles.iconsWrapper}>
                      <Edit2 size={20} className={styles.iconButton} />
                      <Trash2 size={20} className={styles.iconButton} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>

        {/* Histórico de Comentários */}
        <section className={styles.panel}>
          <h2 className={styles.sectionTitle}>Histórico de Comentários</h2>

          {loadingComments && (
            <p className={styles.loadingText}>Carregando histórico de comentários...</p>
          )}
          {errorComments && <p className={styles.errorText}>{errorComments}</p>}

          {!loadingComments && !errorComments && (
            <div className={styles.recordContainer}>
              {comments.length === 0 ? (
                <p className={styles.loadingText}>Nenhum comentário encontrado.</p>
              ) : (
                comments.map((item) => (
                  <div key={item.id} className={styles.recordItem}>
                    <div className={styles.leftSide}>
                      <span className={styles.titleText}>{item.title}</span>
                      <p className={styles.commentText}>{item.text}</p>
                    </div>
                    <div className={styles.iconsWrapper}>
                      <Edit2 size={20} className={styles.iconButton} />
                      <Trash2 size={20} className={styles.iconButton} />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CommentsHistory;
