import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, loadCars } from '../store/userSlice';

export function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(loadCars());
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{
          border: '4px solid #e5e7eb',
          borderTop: '4px solid #7c3aed',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 15px'
        }}></div>
        <p style={{ color: '#6b7280' }}>Загрузка автомобилей...</p>
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red', padding: '20px' }}>Ошибка: {error}</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#7c3aed' }}>🚗 Японские автомобили</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map(user => (
          <li 
            key={user.id}
            style={{
              border: '2px solid #7c3aed',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: '#fff',
              color: '#1f2937',
              transition: 'all 0.3s'
            }}
            onClick={() => dispatch(setCurrentUser(user))}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#ede9fe'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fff'}
          >
            <strong style={{ fontSize: '18px' }}>{user.brand} {user.model}</strong>
            <br />
            <small style={{ color: '#6b7280' }}>
              {user.year} | {user.engine} | {user.price}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
