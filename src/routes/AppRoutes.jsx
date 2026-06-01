/**
 * AppRoutes.jsx - Определение всех маршрутов приложения
 * 
 * Отвечает за:
 * - Навигацию между разными страницами
 * - Установку URL маршрутов
 * - Отображение компонентов страниц в зависимости от URL
 * 
 * Маршруты:
 * - / (главная)
 * - /cars (каталог автомобилей)
 * - /products (каталог товаров)
 * - /todos (список задач)
 * - /articles (статьи)
 * - /about (о проекте)
 * - * (страница 404 не найдена)
 */

import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsPage } from '../pages/CarsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { TodosPage } from '../pages/TodosPage';
import { ArticlesPage } from '../pages/ArticlesPage';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';

/**
 * Компонент для определения всех маршрутов
 * React Router автоматически рендерит страницы в зависимости от текущего URL
 */
function AppRoutes() {
  return (
    <Routes>
      {/* Маршруты приложения */}
      <Route path="/" element={<HomePage />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/about" element={<AboutPage />} />
      {/* Приложение других маршрутов */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
