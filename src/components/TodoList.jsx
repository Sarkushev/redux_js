import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadTodos,
  addTodo,
  editTodo,
  removeTodo,
  loadTodoById,
  clearSelectedTodo,
} from '../redux/slices/todoSlice';
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

  const openEditForm = (event, todo) => {
    event?.preventDefault();
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
      closeForm();
      return;
    }

    if (formMode === 'edit' && currentTodo) {
      dispatch(editTodo({ id: currentTodo.id, updates: data }))
        .unwrap()
        .then((updatedTodo) => {
          if (showDetail && selectedTodo?.id === updatedTodo.id) {
            dispatch(loadTodoById(updatedTodo.id));
          }
        })
        .catch(() => {
          // ignore
        });
    }
    closeForm();
  };

  const handleDelete = (id) => {
    if (window.confirm('Удалить задачу?')) {
      dispatch(removeTodo(id));
    }
  };

  const handleViewDetail = (event, id) => {
    event?.preventDefault();
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
      <button type="button" onClick={openAddForm} className="add-button">
        ➕ Добавить задачу
      </button>
      {showForm && (
        <div className="detail-modal">
          <div className="detail-content">
            <h3>{formMode === 'add' ? 'Новая задача' : 'Редактировать задачу'}</h3>
            <TodoForm
              initialData={currentTodo || {}}
              onSubmit={handleSubmit}
              onCancel={closeForm}
            />
          </div>
        </div>
      )}
      {showDetail && selectedTodo && (
        <div className="detail-modal">
          <div className="detail-content">
            <h3>{selectedTodo.title}</h3>
            <p><strong>Описание:</strong> {selectedTodo.description || 'Описание отсутствует'}</p>
            <p><strong>Статус:</strong> {selectedTodo.completed ? 'Выполнено' : 'Не выполнено'}</p>
            <p><strong>Создано:</strong> {new Date(selectedTodo.createdAt || Date.now()).toLocaleString()}</p>
            <button onClick={closeDetail} className="close-button">Закрыть</button>
          </div>
        </div>
      )}
      {todos.length === 0 ? (
        <div className="empty-state">
          Список задач пуст. Добавьте новую задачу, чтобы начать.
        </div>
      ) : (
        <div className="todos-grid">
          {todos.map((todo) => (
            <div key={todo.id} className={`todo-card ${todo.completed ? 'completed' : ''}`}>
              <h3>{todo.title}</h3>
              <p>{todo.description || 'Описание отсутствует'}</p>
              <p>Статус: {todo.completed ? '✅ Выполнено' : '⏳ В процессе'}</p>
              <div className="card-actions">
                <button type="button" onClick={(e) => handleViewDetail(e, todo.id)}>Подробнее</button>
                <button type="button" onClick={(e) => openEditForm(e, todo)}>Редактировать</button>
                <button type="button" onClick={() => handleDelete(todo.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}