import { useState, useEffect } from 'react';
import '../styles/components.css';

export function TodoForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    completed: false,
    ...initialData,
  });

  useEffect(() => {
    setForm({
      title: initialData.title || '',
      description: initialData.description || '',
      completed: initialData.completed || false,
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prepared = {
      title: form.title,
      description: form.description,
      completed: form.completed,
    };
    onSubmit(prepared);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>Заголовок:</label>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Например, Купить продукты" required />
      </div>
      <div>
        <label>Описание:</label>
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Подробное описание задачи" />
      </div>
      <div>
        <label>
          <input name="completed" type="checkbox" checked={form.completed} onChange={handleChange} />
          Выполнено
        </label>
      </div>
      <div className="form-buttons">
        <button type="submit">Сохранить</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="cancel-button">
            Отмена
          </button>
        )}
      </div>
    </form>
  );
}