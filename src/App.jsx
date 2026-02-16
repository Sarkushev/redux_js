import './App.css'
import { Header } from './components/Header'
import { UserList } from './components/UserList'
import { UserProfile } from './components/UserProfile'
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
          
          {/* Основной контент - Автомобили (LIST/DETAIL) */}
          <div className="main-section">
            <h2 className="section-divider">📑 Главный каталог: Автомобили</h2>
            <div className="content-grid">
              <div>
                <UserList />
              </div>
              <div>
                <UserProfile />
              </div>
            </div>
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
