import { ProductList } from '../components/ProductList';
import { CategoryList } from '../components/CategoryList';

export function ProductsPage() {
  return (
    <main className="page-container">
      <h1>Товары</h1>
      <p className="page-description">Список товаров и категории товаров, загруженные через Redux.</p>
      <ProductList />
      <CategoryList />
    </main>
  );
}
