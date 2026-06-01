/**
 * Header.jsx - Навигационная панель приложения
 * 
 * Отвечает за:
 * - Отображение логотипа
 * - Навигацию по главным страницам
 * - Переключение тёмной/светлой темы
 * - Мобильное меню (бургер)
 */

import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/header.css'

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      return saved === 'dark'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
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
              <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/cars" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Авто
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Товары
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/todos" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Задачи
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/articles" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                Статьи
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
                О проекте
              </NavLink>
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
          <button 
            className="hamburger-btn"
            onClick={toggleMobileMenu}
            title="Меню"
            aria-label="Открыть меню"
          >
            ☰
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <nav className="mobile-menu open">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/cars" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Авто
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/products" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Товары
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/todos" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Задачи
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/articles" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Статьи
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/about" 
                className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                О проекте
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
