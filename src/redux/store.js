/**
 * store.js - Центральное Redux хранилище приложения
 * 
 * Отвечает за:
 * - Конфигурацию Redux Toolkit хранилища
 * - Объединение всех reducers (слайсов)
 * - Централизованное управление состоянием приложения
 * 
 * Содержит reducers для:
 * - user: данные пользователя
 * - articles: статьи
 * - products: товары и категории
 * - cars: автомобили с лайками и рейтингом
 * - todos: задачи из JSONPlaceholder API
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import articleReducer from './slices/articleSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import carReducer from './slices/carSlice';
import todoReducer from './slices/todoSlice';

/**
 * Централизованное Redux хранилище
 * Каждое поле соответствует одному слайсу (набору состояния + actions)
 */
const store = configureStore({
  reducer: {
    user: userReducer,           // Состояние пользователя
    articles: articleReducer,     // Статьи и их операции
    products: productReducer,     // Товары
    categories: categoryReducer,  // Категории товаров
    cars: carReducer,            // Автомобили, лайки, избранное, рейтинг
    todos: todoReducer,          // Задачи из REST API (CRUD операции)
  },
});

export default store;
