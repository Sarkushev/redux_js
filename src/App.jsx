import './App.css'
import { Header } from './components/Header'
import { UserList } from './components/UserList'
import { UserProfile } from './components/UserProfile'

function App() {
  return (
    <>
      <Header />
      <div className="layout-container">
        <div className="content-wrapper">
          <div className="page-header">
            <h1 className="page-title">Каталог японских автомобилей</h1>
            <p className="page-subtitle">Управление данными через Redux</p>
          </div>
          
          <div className="content-grid">
            <div>
              <UserList />
            </div>
            <div>
              <UserProfile />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
