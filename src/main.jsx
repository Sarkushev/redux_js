/**
 * main.jsx - Точка входа приложения
 * 
 * Отвечает за:
 * - Создание корневого DOM элемента
 * - Инициализацию Redux-хранилища
 * - Подключение React и ReactDOM
 * - Оборачивание приложения в Provider (для доступа к Redux)
 * 
 * Иерархия: main.jsx -> Provider -> App -> Header + Routes
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import './index.css'
import App from './App.jsx'

/**
 * Инициализация React приложения
 * - StrictMode помогает выявить проблемы в разработке
 * - Provider делает Redux хранилище доступным для всех компонентов
 */
creatRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
