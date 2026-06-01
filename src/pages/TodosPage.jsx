import { TodoList } from '../components/TodoList';

export function TodosPage() {
  return (
    <main className="page-container">
      <h1>Задачи</h1>
      <p className="page-description">JSONPlaceholder REST API для задач: загрузка, создание, редактирование и удаление.</p>
      <TodoList />
    </main>
  );
}
