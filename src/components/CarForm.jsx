import { useState, useEffect } from 'react';
import '../styles/components.css';

export function CarForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: '',
    price: '',
    color: '',
    ...initialData,
  });

  useEffect(() => {
    setForm({
      brand: initialData.brand || '',
      model: initialData.model || '',
      year: initialData.year || '',
      price: initialData.price || '',
      color: initialData.color || '',
    });
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const prepared = {
      brand: form.brand,
      model: form.model,
      year: parseInt(form.year, 10) || null,
      price: form.price,
      color: form.color,
    };
    onSubmit(prepared);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div>
        <label>Марка:</label>
        <input name="brand" value={form.brand} onChange={handleChange} placeholder="Например, Toyota" required />
      </div>
      <div>
        <label>Модель:</label>
        <input name="model" value={form.model} onChange={handleChange} placeholder="Например, Camry" required />
      </div>
      <div>
        <label>Год:</label>
        <input name="year" type="number" value={form.year} onChange={handleChange} placeholder="Например, 2020" />
      </div>
      <div>
        <label>Цена:</label>
        <input name="price" value={form.price} onChange={handleChange} placeholder="$ 10000" />
      </div>
      <div>
        <label>Цвет:</label>
        <input name="color" value={form.color} onChange={handleChange} placeholder="Например, красный" />
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
