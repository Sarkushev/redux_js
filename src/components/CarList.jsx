import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCars,
  addCar,
  editCar,
  removeCar,
} from '../store/carSlice';
import { CarForm } from './CarForm';
import '../styles/components.css';

export function CarList() {
  const dispatch = useDispatch();
  const { list: cars, loading, error } = useSelector((state) => state.cars);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentCar, setCurrentCar] = useState(null);

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
