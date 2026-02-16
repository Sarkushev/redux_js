import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticles } from '../store/articleSlice';
import '../styles/components.css';

export function ArticleList() {
  const dispatch = useDispatch();
  const { list: articles, loading, error } = useSelector((state) => state.articles);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    dispatch(loadArticles());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка статей...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  // Если выбрана статья - показываем детали
  if (selectedId) {
    const selected = articles.find(a => a.id === selectedId);
    return (
      <div className="article-container">
        <button 
          onClick={() => setSelectedId(null)}
          className="back-button"
        >
          ← Вернуться к списку
        </button>
        <div className="article-detail">
          <h2 className="article-title">{selected.title}</h2>
          <div className="article-meta">
            <span className="author">✍️ {selected.author}</span>
            <span className="date">📅 {selected.date}</span>
            <span className="category">🏷️ {selected.category}</span>
          </div>
          <div className="article-image">{selected.image}</div>
          <p className="article-content">{selected.content}</p>
          <p className="article-excerpt">Исходное описание: {selected.excerpt}</p>
        </div>
      </div>
    );
  }

  // Показываем список
  return (
    <div className="articles-wrapper">
      <h2 className="section-title">📰 Статьи и блог</h2>
      <div className="articles-grid">
        {articles.map((article) => (
          <div 
            key={article.id}
            className="article-card"
            onClick={() => setSelectedId(article.id)}
          >
            <div className="article-icon">{article.image}</div>
            <h3 className="article-card-title">{article.title}</h3>
            <p className="article-excerpt">{article.excerpt}</p>
            <div className="article-footer">
              <span className="article-author">{article.author}</span>
              <span className="article-date">{article.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
