import { Link } from 'react-router-dom';
import { CarList } from '../components/CarList';
import '../styles/components.css';

export function HomePage() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <div className="hero-copy">
          <span className="eyebrow">Удобный каталог</span>
          <h1>Менеджер авто и задач</h1>
          <p>Модернизированное веб-приложение для управления автомобилями, товарами, задачами и статьями.</p>
          <div className="hero-actions">
            <Link to="/cars" className="hero-cta">Перейти к автомобилям</Link>
            <Link to="/todos" className="hero-secondary">Задачи и API</Link>
          </div>
        </div>
        <div className="hero-notes">
          <div className="feature-pill">Интерактивный каталог</div>
          <div className="feature-pill">Мгновенные обновления</div>
          <div className="feature-pill">Поиск и фильтры</div>
          <div className="feature-pill">Понятные статусы</div>
        </div>
      </section>
      <section className="home-grid">
        <Link to="/products" className="home-card">
          <h2>Товары</h2>
          <p>Каталог продуктов с категориями и карточками.</p>
        </Link>
        <Link to="/todos" className="home-card">
          <h2>Задачи</h2>
          <p>Работа с REST API: загрузка, создание, редактирование и удаление.</p>
        </Link>
        <Link to="/articles" className="home-card">
          <h2>Статьи</h2>
          <p>Список публикаций и просмотр деталей.</p>
        </Link>
      </section>
      <section className="featured-cars">
        <div className="section-head">
          <div>
            <h2>Избранные автомобили</h2>
            <p>Небольшой обзор реальных данных из каталога.</p>
          </div>
          <Link to="/cars" className="secondary-button">Открыть каталог</Link>
        </div>
        <CarList previewCount={3} hideControls />
      </section>
    </main>
  );
}
