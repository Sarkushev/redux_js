import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { CarsPage } from '../pages/CarsPage';
import { ProductsPage } from '../pages/ProductsPage';
import { TodosPage } from '../pages/TodosPage';
import { ArticlesPage } from '../pages/ArticlesPage';
import { AboutPage } from '../pages/AboutPage';
import { NotFoundPage } from '../pages/NotFoundPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cars" element={<CarsPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/todos" element={<TodosPage />} />
      <Route path="/articles" element={<ArticlesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
