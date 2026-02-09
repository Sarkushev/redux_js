import { useState, useEffect } from 'react'
import '../styles/header.css'

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Проверяем сохраненную тему или предпочтение системы
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Применяем тему при изменении состояния
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark-mode')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-logo">
          <h1 className="logo-text">Redux App</h1>
        </div>
        
        <nav className="nav-menu">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#home" className="nav-link active">Главная</a>
            </li>
            <li className="nav-item">
              <a href="#users" className="nav-link">Пользователи</a>
            </li>
            <li className="nav-item">
              <a href="#profile" className="nav-link">Профиль</a>
            </li>
            <li className="nav-item">
              <a href="#settings" className="nav-link">Настройки</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link">О проекте</a>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <button 
            className="btn-theme"
            onClick={toggleTheme}
            title={isDarkMode ? 'Светлый режим' : 'Темный режим'}
            aria-label="Переключить тему"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
