# 📡 API Справка

## Все API функции находятся в `src/api/api.js`

### Все функции имитируют сетевой запрос с задержкой

## 🚗 Автомобили (Cars API)

```javascript
// Получить все автомобили
fetchCars() → Promise<Array>
Задержка: 1500ms (1.5 сек)
Возвращает: Массив объектов с автомобилями

// Пример использования в Redux:
import { fetchCars } from '../api/api';

export const loadCars = createAsyncThunk('user/loadCars', async () => {
  return await fetchCars();
});
```

**Структура данных автомобиля:**
```json
{
  "id": 1,
  "brand": "Toyota",
  "model": "Camry",
  "year": 2023,
  "engine": "2.5L",
  "price": "$32,000",
  "description": "Надежный седан...",
  "color": "Серебристый",
  "mileage": "0 км",
  "transmission": "Автоматическая",
  "features": ["Опция 1", "Опция 2"]
}
```

---

## 📰 Статьи (Articles API)

```javascript
// Получить все статьи
fetchArticles() → Promise<Array>
Задержка: 2000ms (2 сек)
Возвращает: Массив объектов со статьями

export const loadArticles = createAsyncThunk('articles/loadArticles', async () => {
  return await fetchArticles();
});

// Получить одну статью по ID
fetchArticleById(id) → Promise<Object>
Задержка: 1200ms (1.2 сек)
Возвращает: Объект статьи или undefined

export const loadArticleById = createAsyncThunk('articles/loadArticleById', async (id) => {
  return await fetchArticleById(id);
});
```

**Структура данных статьи:**
```json
{
  "id": 1,
  "title": "Название статьи",
  "author": "Иван Петров",
  "date": "2024-01-15",
  "category": "Технологии",
  "image": "🚗",
  "excerpt": "Краткое описание статьи",
  "content": "Полное содержание статьи..."
}
```

---

## 🛒 Товары (Products API)

```javascript
// Получить все товары
fetchProducts() → Promise<Array>
Задержка: 1800ms (1.8 сек)
Возвращает: Массив объектов с товарами

export const loadProducts = createAsyncThunk('products/loadProducts', async () => {
  return await fetchProducts();
});

// Получить один товар по ID
fetchProductById(id) → Promise<Object>
Задержка: 1000ms (1 сек)
Возвращает: Объект товара или undefined

export const loadProductById = createAsyncThunk('products/loadProductById', async (id) => {
  return await fetchProductById(id);
});
```

**Структура данных товара:**
```json
{
  "id": 1,
  "name": "Автомасло Premium Synthetic",
  "price": 45.99,
  "stock": 150,
  "category": "Масла",
  "rating": 4.8,
  "description": "Профессиональное синтетическое масло",
  "image": "🛢️",
  "features": ["Синтетическое", "Высокая вязкость", "Защита двигателя"]
}
```

---

## 📂 Категории (Categories API)

```javascript
// Получить все категории
fetchCategories() → Promise<Array>
Задержка: 1300ms (1.3 сек)
Возвращает: Массив объектов с категориями

export const loadCategories = createAsyncThunk('categories/loadCategories', async () => {
  return await fetchCategories();
});

// Получить одну категорию по ID
fetchCategoryById(id) → Promise<Object>
Задержка: 800ms (0.8 сек)
Возвращает: Объект категории или undefined

export const fetchCategoryById = async (id) => {
  await simulateDelay(800);
  return categoriesData.find(category => category.id === parseInt(id));
};
```

**Структура данных категории:**
```json
{
  "id": 1,
  "name": "Масла и жидкости",
  "icon": "🛢️",
  "description": "Все виды масел и жидкостей для вашего автомобиля",
  "itemCount": 45
}
```

---

## ⏱️ Вспомогательная функция

```javascript
// Имитирует задержку сетевого запроса
simulateDelay(ms) → Promise<void>
Параметры: ms (миллисекунды, по умолчанию 1500)

// Использование
const simulateDelay = (ms = 1500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Пример
await simulateDelay(2000); // Ждёт 2 секунды
```

---

## 🔄 Redux Асинхронные операции

Все API функции используются с Redux Toolkit `createAsyncThunk`:

```javascript
export const loadCars = createAsyncThunk(
  'user/loadCars',          // Название actionType
  async () => {              // Async function
    return await fetchCars(); // API call
  }
);
```

### Жизненный цикл Thunk:

1. **Pending** (загрузка начинается)
   ```javascript
   case loadCars.pending:
     state.loading = true;
     state.error = null;
   ```

2. **Fulfilled** (загрузка успешна)
   ```javascript
   case loadCars.fulfilled:
     state.loading = false;
     state.users = action.payload;
   ```

3. **Rejected** (ошибка)
   ```javascript
   case loadCars.rejected:
     state.loading = false;
     state.error = action.error.message;
   ```

---

## 📝 Примеры использования в компонентах

### Загрузка данных

```javascript
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadArticles } from '../store/articleSlice';

export function ArticleList() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.articles);

  useEffect(() => {
    dispatch(loadArticles()); // Загружаем данные
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <div>
      {list.map(article => (
        <div key={article.id}>{article.title}</div>
      ))}
    </div>
  );
}
```

### Выбор одного элемента

```javascript
const handleSelect = (id) => {
  dispatch(loadCarById(id)); // Загружаем один элемент
};
```

---

## 🚨 Обработка ошибок

```javascript
if (loading) {
  return <Spinner />; // Показываем спиннер
}

if (error) {
  return <Error message={error} />; // Показываем ошибку
}

// Отображаем данные
return <Content data={data} />;
```

---

## 📊 Задержки по умолчанию

| API | Задержка | Назначение |
|---|---|---|
| `fetchCars()` | 1.5 сек | Имитация загрузки списка |
| `fetchCarById()` | 1 сек | Имитация загрузки детали |
| `fetchArticles()` | 2 сек | Самая долгая загрузка |
| `fetchArticleById()` | 1.2 сек | Загрузка статьи |
| `fetchProducts()` | 1.8 сек | Загрузка каталога |
| `fetchProductById()` | 1 сек | Загрузка товара |
| `fetchCategories()` | 1.3 сек | Загрузка категорий |
| `fetchCategoryById()` | 0.8 сек | Самая быстрая |

---

## 🛠️ Как изменить задержку

Отредактируйте файл `src/api/api.js`:

```javascript
// Было
export const fetchCars = async () => {
  await simulateDelay(1500); // 1.5 сек
  return carsData;
};

// Стало
export const fetchCars = async () => {
  await simulateDelay(5000); // 5 сек
  return carsData;
};
```

---

## ✅ Проверка функциональности

- ✓ Все функции возвращают Promise
- ✓ Все функции имитируют задержку
- ✓ Все данные берутся из JSON файлов
- ✓ Никаких хардкодированных данных
- ✓ Error handling работает правильно

---

**Документация API полна. Готово к использованию!** 🚀
