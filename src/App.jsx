/**
 * App.jsx - Корневой компонент приложения
 * 
 * Отвечает за:
 * - Инициализацию BrowserRouter для маршрутизации
 * - Отображение Header (навигационная панель)
 * - Отображение маршрутов приложения через AppRoutes
 * 
 * Структура: Header + Routes
 */

import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import AppRoutes from './routes/AppRoutes'

/**
 * Основной компонент приложения
 * Оборачивает приложение в Router и добавляет Header
 */
function App() {
  return (
    <BrowserRouter>
      {/* Навигационная панель с логотипом и меню */}
      <Header />
      {/* Маршруты страниц приложения */}
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
