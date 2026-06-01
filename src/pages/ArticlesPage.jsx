import { ArticleList } from '../components/ArticleList';

export function ArticlesPage() {
  return (
    <main className="page-container">
      <h1>Статьи</h1>
      <p className="page-description">Список статей с возможностью просмотра деталей и реактивными действиями.</p>
      <ArticleList />
    </main>
  );
}
