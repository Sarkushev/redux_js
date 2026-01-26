import { useSelector } from 'react-redux';

export function UserProfile() {
  const currentUser = useSelector(state => state.user.currentUser);

  if (!currentUser) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#9ca3af', backgroundColor: '#fff', borderRadius: '8px', border: '2px solid #e5e7eb' }}>
        <p>Выберите автомобиль из списка</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', backgroundColor: '#fff', borderRadius: '8px', border: '2px solid #7c3aed' }}>
      <h3 style={{ color: '#7c3aed', marginTop: 0 }}>Характеристики</h3>
      <p style={{ color: '#1f2937' }}><strong>Марка:</strong> {currentUser.brand}</p>
      <p style={{ color: '#1f2937' }}><strong>Модель:</strong> {currentUser.model}</p>
      <p style={{ color: '#1f2937' }}><strong>Год выпуска:</strong> {currentUser.year}</p>
      <p style={{ color: '#1f2937' }}><strong>Двигатель:</strong> {currentUser.engine}</p>
      <p style={{ color: '#1f2937' }}><strong>Цена:</strong> <span style={{ color: '#7c3aed', fontSize: '18px' }}>{currentUser.price}</span></p>
      <p style={{ color: '#9ca3af', fontSize: '12px' }}>ID: {currentUser.id}</p>
    </div>
  );
}
