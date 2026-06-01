import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <main className="page-container">
      <h1>Страница не найдена</h1>
      <p>Похоже, такой страницы здесь нет.</p>
      <Link to="/" className="link-button">Вернуться на главную</Link>
    </main>
  );
}
