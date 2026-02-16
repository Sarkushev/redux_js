import { useSelector } from 'react-redux';

export function UserProfile() {
  const currentUser = useSelector(state => state.user.currentUser);

  if (!currentUser) {
    return (
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center', 
        color: '#9ca3af', 
        backgroundColor: '#fff', 
        borderRadius: '8px', 
        border: '2px solid #e5e7eb',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ fontSize: '64px', marginBottom: '15px' }}>👈</div>
        <p style={{ fontSize: '18px', fontWeight: '500' }}>Выберите автомобиль из списка</p>
        <p style={{ fontSize: '14px', marginTop: '10px' }}>Чтобы увидеть детальную информацию</p>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: '25px', 
      backgroundColor: '#fff', 
      borderRadius: '8px', 
      border: '2px solid #7c3aed',
      minHeight: '400px'
    }}>
      <h3 style={{ color: '#7c3aed', marginTop: 0, marginBottom: '20px', fontSize: '22px' }}>
        📋 Характеристики
      </h3>
      
      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '15px',
        borderLeft: '4px solid #7c3aed'
      }}>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>🏭 Марка:</strong> {currentUser.brand}
        </p>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>🚗 Модель:</strong> {currentUser.model}
        </p>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>📅 Год выпуска:</strong> {currentUser.year}
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '15px',
        borderLeft: '4px solid #7c3aed'
      }}>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>⚙️ Двигатель:</strong> {currentUser.engine}
        </p>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>🎛️ Трансмиссия:</strong> {currentUser.transmission}
        </p>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>🎨 Цвет:</strong> {currentUser.color}
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#f9fafb', 
        padding: '15px', 
        borderRadius: '6px', 
        marginBottom: '15px',
        borderLeft: '4px solid #7c3aed'
      }}>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>📏 Пробег:</strong> {currentUser.mileage}
        </p>
        <p style={{ color: '#1f2937', margin: '8px 0' }}>
          <strong>📝 Описание:</strong> {currentUser.description}
        </p>
      </div>

      <div style={{ 
        backgroundColor: '#fef3c7', 
        padding: '15px', 
        borderRadius: '6px', 
        borderLeft: '4px solid #f59e0b'
      }}>
        <p style={{ 
          color: '#7c3aed', 
          fontWeight: '700', 
          fontSize: '20px',
          margin: '0'
        }}>
          💰 Цена: {currentUser.price}
        </p>
      </div>

      {currentUser.features && (
        <div style={{ 
          marginTop: '15px',
          padding: '15px', 
          backgroundColor: '#dbeafe',
          borderRadius: '6px',
          borderLeft: '4px solid #3b82f6'
        }}>
          <p style={{ fontWeight: '600', color: '#1f2937', margin: '0 0 8px 0' }}>
            ✨ Особенности:
          </p>
          <ul style={{ margin: '0', paddingLeft: '20px', color: '#1f2937' }}>
            {currentUser.features.map((feature, idx) => (
              <li key={idx} style={{ marginBottom: '4px' }}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ color: '#9ca3af', fontSize: '12px', marginTop: '15px' }}>
        ID: {currentUser.id}
      </p>
    </div>
  );
}
