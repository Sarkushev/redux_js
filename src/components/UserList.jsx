import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, removeUser } from '../store/userSlice';

export function UserList() {
  const users = useSelector(state => state.user.users);
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#7c3aed' }}>Японские автомобили</h2>
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
            <small style={{ color: '#6b7280' }}>Год: {user.year}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
