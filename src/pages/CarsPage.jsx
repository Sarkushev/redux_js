import { CarList } from '../components/CarList';

export function CarsPage() {
  return (
    <main className="page-container">
      <h1>Автомобили</h1>
      <p className="page-description">Управление списком автомобилей с поиском, CRUD-операциями и состояниями загрузки.</p>
      <CarList />
    </main>
  );
}
