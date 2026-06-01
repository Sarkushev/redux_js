import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCars,
  addCar,
  editCar,
  removeCar,
  toggleLike,
  toggleFavorite,
  addRating,
} from '../redux/slices/carSlice';
import { selectAverageRating, selectIsLiked, selectIsFavorited } from '../redux/selectors';
import { CarForm } from './CarForm';
import '../styles/components.css';

export function CarList({ previewCount, hideControls = false }) {
  const dispatch = useDispatch();
  const { list: cars, loading, error } = useSelector((state) => state.cars);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentCar, setCurrentCar] = useState(null);
  const [showRating, setShowRating] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  const userId = 1;

  const handleToggleLike = (id, e) => {
    e.stopPropagation();
    dispatch(toggleLike({ id, userId }));
  };

  const handleToggleFavorite = (id, e) => {
    e.stopPropagation();
    dispatch(toggleFavorite({ id, userId }));
  };

  const handleAddRating = (id, rating, e) => {
    e.stopPropagation();
    dispatch(addRating({ id, userId, rating }));
  };

  const toggleRatingView = (id) => {
    setShowRating(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    dispatch(loadCars());
  }, [dispatch]);

  const openAddForm = (event) => {
    event?.preventDefault();
    setFormMode('add');
    setCurrentCar(null);
    setShowForm(true);
  };

  const openEditForm = (event, car) => {
    event?.preventDefault();
    setFormMode('edit');
    setCurrentCar(car);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCurrentCar(null);
  };

  const handleSubmit = (data) => {
    if (formMode === 'add') {
      dispatch(addCar(data));
    } else if (formMode === 'edit' && currentCar) {
      dispatch(editCar({ id: currentCar.id, updates: data }));
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить автомобиль?')) {
      dispatch(removeCar(id));
    }
  };

  const filteredCars = cars.filter((car) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return (
      car.brand.toLowerCase().includes(query) ||
      car.model.toLowerCase().includes(query) ||
      car.color.toLowerCase().includes(query)
    );
  });

  const visibleCars = previewCount ? filteredCars.slice(0, previewCount) : filteredCars;

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка автомобилей...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div className="cars-wrapper">
      <h2 className="section-title">🚗 Автомобили</h2>
      {!hideControls && (
        <div className="section-controls">
          <button type="button" onClick={openAddForm} className="add-button">
            ➕ Добавить авто
          </button>
          <input
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Поиск по марке, модели или цвету"
          />
        </div>
      )}
      {showForm && !hideControls && (
        <div className="detail-modal">
          <div className="detail-content">
            <h3>{formMode === 'add' ? 'Добавить автомобиль' : 'Редактировать автомобиль'}</h3>
            <CarForm
              initialData={currentCar || {}}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
      {visibleCars.length === 0 ? (
        <div className="empty-state">
          Автомобили не найдены. Попробуйте изменить запрос или добавьте новый автомобиль.
        </div>
      ) : (
        <div className="cars-grid">
          {visibleCars.map((car) => {
            const likeClass = selectIsLiked(car, userId) ? 'liked' : '';
            const favoriteClass = selectIsFavorited(car, userId) ? 'favorited' : '';

            return (
              <div key={car.id} className="car-card">
                <h3>{car.brand} {car.model}</h3>
                <p>{car.year} • {car.engine}</p>
                <p>{car.price}</p>
                <p>{car.color}, пробег {car.mileage}</p>
                <div className="article-actions">
                  <button
                    onClick={(e) => handleToggleLike(car.id, e)}
                    className={`action-btn ${likeClass}`}
                  >
                    👍 {car.likes.length}
                  </button>
                  <button
                    onClick={(e) => handleToggleFavorite(car.id, e)}
                    className={`action-btn ${favoriteClass}`}
                  >
                    ⭐ {car.favorites.length}
                  </button>
                  <button
                    onClick={() => toggleRatingView(car.id)}
                    className="action-btn"
                  >
                    📊 Показать оценку
                  </button>
                </div>
                {showRating[car.id] && (
                  <div className="rating-section">
                    <p><strong>Средняя оценка: {selectAverageRating(car)}</strong></p>
                    <div className="rating-buttons">
                      {[1,2,3,4,5].map((r) => (
                        <button
                          key={r}
                          onClick={(e) => handleAddRating(car.id, r, e)}
                          className="rating-btn"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="card-actions">
                  <button type="button" onClick={(e) => openEditForm(e, car)}>Редактировать</button>
                  <button type="button" onClick={() => handleDelete(car.id)}>Удалить</button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
