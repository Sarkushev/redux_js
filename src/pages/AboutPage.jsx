export function AboutPage() {
  return (
    <main className="page-container">
      <h1>О проекте</h1>
      <p className="page-description">Приложение для управления данными в автомобильно‑сервисном каталоге.</p>
      <section className="about-section">
        <h2>Возможности</h2>
        <ul>
          <li>React приложение</li>
          <li>Маршрутизация, 4–5 страниц</li>
          <li>Redux Toolkit с createSlice, configureStore, useSelector, useDispatch</li>
          <li>API и CRUD</li>
          <li>Поиск, фильтрация, состояния loading/error/empty</li>
        </ul>
        <h2>Структура</h2>
        <p>src/components, src/pages, src/redux/slices, src/services, src/routes</p>
      </section>
    </main>
  );
}
