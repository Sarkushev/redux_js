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
} from '../store/carSlice';
import { selectAverageRating, selectIsLiked, selectIsFavorited } from '../store/selectors';
import { CarForm } from './CarForm';
import '../styles/components.css';

export function CarList() {
  const dispatch = useDispatch();
  const { list: cars, loading, error } = useSelector((state) => state.cars);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentCar, setCurrentCar] = useState(null);
  const [showRating, setShowRating] = useState({});

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

  const openAddForm = () => {
    setFormMode('add');
    setCurrentCar(null);
    setShowForm(true);
  };

  const openEditForm = (car) => {
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
      <button onClick={openAddForm} className="add-button">
        ➕ Добавить авто
      </button>
      {showForm && (
        <CarForm
          initialData={currentCar || {}}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <h3>{car.brand} {car.model}</h3>
            <p>{car.year} • {car.engine}</p>
            <p>{car.price}</p>
            <p>{car.color}, пробег {car.mileage}</p>
            <div className="article-actions">
              <button 
                onClick={(e) => handleToggleLike(car.id, e)}
                className={`action-btn ${selectIsLiked(car, userId) ? 'liked' : ''}`}
              >
                👍 {car.likes.length}
              </button>
              <button 
                onClick={(e) => handleToggleFavorite(car.id, e)}
                className={`action-btn ${selectIsFavorited(car, userId) ? 'favorited' : ''}`}
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
                  {[1,2,3,4,5].map(r => (
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
              <button onClick={() => openEditForm(car)}>Редактировать</button>
              <button onClick={() => handleDelete(car.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
