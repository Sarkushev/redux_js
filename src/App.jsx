import './App.css'
import { Header } from './components/Header'
import { CarList } from './components/CarList'
import { ArticleList } from './components/ArticleList'
import { ProductList } from './components/ProductList'
import { CategoryList } from './components/CategoryList'

function App() {
  return (
    <>
      <Header />
      <div className="layout-container">
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">🌟 Автомобильный портал</h1>
            <p className="page-subtitle">Управление данными через Redux с загрузкой из JSON</p>
          </div>
          
          {/* Основной контент - Автомобили (LIST/CRUD) */}
          <div className="main-section">
            <h2 className="section-divider">📑 Главный каталог: Автомобили</h2>
            <CarList />
          </div>

          {/* Секция со статьями (LIST/DETAIL функциональность) */}
          <div className="secondary-section">
            <ArticleList />
          </div>

          {/* Секция с товарами */}
          <div className="secondary-section">
            <ProductList />
          </div>

          {/* Секция с категориями */}
          <div className="secondary-section">
            <CategoryList />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
