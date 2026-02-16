import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCategories } from '../store/categorySlice';
import '../styles/components.css';

export function CategoryList() {
  const dispatch = useDispatch();
  const { list: categories, loading, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(loadCategories());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка категорий...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div className="categories-wrapper">
      <h2 className="section-title">📂 Категории товаров</h2>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <div className="category-icon">{category.icon}</div>
            <h3 className="category-name">{category.name}</h3>
            <p className="category-description">{category.description}</p>
            <div className="category-count">Товаров: {category.itemCount}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
