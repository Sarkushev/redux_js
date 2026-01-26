import './App.css'
import { UserList } from './components/UserList'
import { UserProfile } from './components/UserProfile'

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f7fa', padding: '20px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h1 style={{ color: '#7c3aed', textAlign: 'center' }}>Каталог японских автомобилей</h1>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '30px' }}>Управление данными через Redux</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <UserList />
          </div>
          <div>
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
