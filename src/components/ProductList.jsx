import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProducts, toggleLike, toggleFavorite } from '../store/productSlice';
import { selectIsLiked, selectIsFavorited } from '../store/selectors';
import '../styles/components.css';

export function ProductList() {
  const dispatch = useDispatch();
  const { list: products, loading, error } = useSelector((state) => state.products);

  const userId = 1;

  const handleToggleLike = (id, e) => {
    e.stopPropagation();
    dispatch(toggleLike({ id, userId }));
  };

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ id, userId }));
  };

  useEffect(() => {
    dispatch(loadProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка товаров...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div className="products-wrapper">
      <h2 className="section-title">🛒 Каталог товаров</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">{product.image}</div>
            <h3 className="product-title">{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <div className="product-info">
              <span className="category">{product.category}</span>
              <span className="in-stock">На складе: {product.stock}</span>
            </div>
            <div className="article-actions">
              <button 
                onClick={(e) => handleToggleLike(product.id, e)}
                className={`action-btn ${selectIsLiked(product, userId) ? 'liked' : ''}`}
              >
                👍 {product.likes.length}
              </button>
              <button 
                onClick={(e) => handleToggleFavorite(product.id, e)}
                className={`action-btn ${selectIsFavorited(product, userId) ? 'favorited' : ''}`}
              >
                ⭐ {product.favorites.length}
              </button>
            </div>
            <div className="product-price">${product.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
