import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTodos,
  addTodo,
  editTodo,
  removeTodo,
  loadTodoById,
  clearSelectedTodo,
} from '../store/todoSlice';
import { TodoForm } from './TodoForm';
import '../styles/components.css';

export function TodoList() {
  const dispatch = useDispatch();
  const { list: todos, selectedTodo, loading, error } = useSelector((state) => state.todos);

  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState('add');
  const [currentTodo, setCurrentTodo] = useState(null);
  const [showDetail, setShowDetail] = useState(false);

  useEffect(() => {
    dispatch(loadTodos());
  }, [dispatch]);

  const openAddForm = () => {
    setFormMode('add');
    setCurrentTodo(null);
    setShowForm(true);
  };

  const openEditForm = (todo) => {
    setFormMode('edit');
    setCurrentTodo(todo);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setCurrentTodo(null);
  };

  const handleSubmit = (data) => {
    if (formMode === 'add') {
      dispatch(addTodo(data));
    } else if (formMode === 'edit' && currentTodo) {
      dispatch(editTodo({ id: currentTodo.id, updates: data }));
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить задачу?')) {
      dispatch(removeTodo(id));
    }
  };

  const handleViewDetail = (id) => {
    dispatch(loadTodoById(id));
    setShowDetail(true);
  };

  const closeDetail = () => {
    setShowDetail(false);
    dispatch(clearSelectedTodo());
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Загрузка задач...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  return (
    <div className="todos-wrapper">
      <h2 className="section-title">📝 Задачи (Todo)</h2>
      <button onClick={openAddForm} className="add-button">
        ➕ Добавить задачу
      </button>
      {showForm && (
        <TodoForm
          initialData={currentTodo || {}}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
      {showDetail && selectedTodo && (
        <div className="detail-modal">
          <div className="detail-content">
            <h3>{selectedTodo.title}</h3>
            <p><strong>Описание:</strong> {selectedTodo.description}</p>
            <p><strong>Статус:</strong> {selectedTodo.completed ? 'Выполнено' : 'Не выполнено'}</p>
            <p><strong>Создано:</strong> {new Date(selectedTodo.createdAt).toLocaleString()}</p>
            <button onClick={closeDetail} className="close-button">Закрыть</button>
          </div>
        </div>
      )}
      <div className="todos-grid">
        {todos.map((todo) => (
          <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Статус: {todo.completed ? '✅ Выполнено' : '⏳ В процессе'}</p>
            <div className="card-actions">
              <button onClick={() => handleViewDetail(todo.id)}>Подробнее</button>
              <button onClick={() => openEditForm(todo)}>Редактировать</button>
              <button onClick={() => handleDelete(todo.id)}>Удалить</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}