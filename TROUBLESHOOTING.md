# 🛠️ ОТЛАДКА И ОБСЛУЖИВАНИЕ

## 🐛 Если что-то не работает

### Проблема 1: "Cannot find module"
**Решение:**
```bash
# Переустановите зависимости
rm -rf node_modules
rm package-lock.json
npm install
npm run dev
```

### Проблема 2: Данные не загружаются
**Проверьте:**
1. Откройте консоль браузера (F12 → Console)
2. Ищите ошибки красного цвета
3. Проверьте пути импортов в компонентах
4. Убедитесь, что JSON файлы в `src/mock-data/`

**Часто встречающаяся ошибка:**
```javascript
// ❌ НЕПРАВИЛЬНО
import carsData from './cars.json'; // Нет пути

// ✅ ПРАВИЛЬНО
import carsData from '../mock-data/cars.json'; // Полный путь
```

### Проблема 3: Спиннер не исчезает
**Решение:**
```javascript
// Проверьте в Redux DevTools:
// 1. loading должен быть false после загрузки
// 2. data должны быть заполнены

if (loading) {
  return <Spinner />;
}

// Если спиннер остается - значит loading всегда true
// Проверьте actions в Redux слайсе
```

### Проблема 4: LIST/DETAIL не работает
**Проверьте в ArticleList.jsx:**
```javascript
// Есть ли состояние selectedId?
const [selectedId, setSelectedId] = useState(null);

// Есть ли условие для переключения?
if (selectedId) {
  return <ArticleDetail />;
}
```

### Проблема 5: Стили не применяются
**Решение:**
```javascript
// Убедитесь что импортированы:
import '../styles/components.css'; // В компонентах

// И в App.css:
@import './styles/components.css'; // На уровне App
```

---

## 🔍 ДЕБАГ СОВЕТЫ

### 1. Используйте Redux DevTools
```bash
# Установите расширение для браузера
# https://github.com/reduxjs/redux-devtools-extension
```

**Как использовать:**
- Откройте F12 → Redux tab
- Видите все actions
- Видите state changes
- Можете отменить действия (time-travel)

### 2. Консоль браузера (F12 → Console)
```javascript
// Добавьте логи для отладки:
import { useSelector } from 'react-redux';

export function MyComponent() {
  const data = useSelector(state => {
    console.log('Current state:', state); // Видите весь state
    return state.myData.list;
  });
  
  console.log('Rendered data:', data); // Видите данные компонента
}
```

### 3. Network tab (F12 → Network)
- Видите запросы (если бы было API)
- Можете видеть временные задержки
- Проверяете responseы

### 4. Performance tab (F12 → Performance)
- Видите перерендеривания компонентов
- Проверяете производительность
- Ищите бутылочные горлышка

---

## 🚨 COMMON ERRORS

### Error: "Cannot read property 'map' of undefined"
**Причина:** list/array пусто или undefined
```javascript
// ❌ Неправильно
<div>{articles.map(a => a.title)}</div> // articles может быть undefined

// ✅ Правильно
<div>{articles?.map(a => a.title)}</div> // Optional chaining
// или
<div>{Array.isArray(articles) && articles.map(a => a.title)}</div>
```

### Error: "React Hook useEffect has a missing dependency"
**Решение:**
```javascript
// ❌ Неправильно
useEffect(() => {
  dispatch(loadData());
}, []); // Забыли dispatch

// ✅ Правильно
useEffect(() => {
  dispatch(loadData());
}, [dispatch]); // Добавили зависимость
```

### Error: "setState on unmounted component"
**Решение:** Добавьте abort cleanup
```javascript
useEffect(() => {
  let isMounted = true;
  
  const fetchData = async () => {
    const data = await api.getData();
    if (isMounted) {
      setState(data);
    }
  };
  
  fetchData();
  
  return () => {
    isMounted = false; // Cleanup
  };
}, []);
```

---

## 📈 ОПТИМИЗАЦИЯ

### 1. Мемоизация компонентов
```javascript
import { memo } from 'react';

// Предотвращает ненужные перерендеривания
const ArticleCard = memo(({ article, onClick }) => {
  return (
    <div onClick={onClick}>
      {article.title}
    </div>
  );
});
```

### 2. Используйте useCallback
```javascript
import { useCallback } from 'react';

const handleSelect = useCallback((id) => {
  dispatch(selectArticle(id));
}, [dispatch]);
```

### 3. Ленивая загрузка (Lazy Loading)
```javascript
import { lazy, Suspense } from 'react';

const ArticleList = lazy(() => import('./ArticleList'));

<Suspense fallback={<div>Загрузка...</div>}>
  <ArticleList />
</Suspense>
```

---

## 🔄 ОБНОВЛЕНИЕ ДАННЫХ

### Как добавить новые данные в JSON:

**1. Отредактируйте JSON файл:**
```json
// src/mock-data/articles.json
[
  {
    "id": 1,
    "title": "Статья 1",
    "author": "Автор",
    ...
  },
  // ➕ ДОБАВЬТЕ НОВУЮ СТАТЬЮ
  {
    "id": 6,
    "title": "Новая статья!",
    "author": "Новый автор",
    ...
  }
]
```

**2. Сохраните файл (Ctrl+S)**

**3. Данные обновятся автоматически при перезагрузке**

---

## 📊 PERFORMANCE METRICS

### Текущие задержки загрузки:
| API | Time | Purpose |
|---|---|---|
| Cars | 1500ms | Основная загрузка |
| Articles | 2000ms | Самая долгая |
| Products | 1800ms | Каталог |
| Categories | 1300ms | Быстрая загрузка |

### Как изменить:
```javascript
// src/api/api.js
export const fetchArticles = async () => {
  await simulateDelay(2000); // ← ИЗМЕНИТЕ ЭТО
  return articlesData;
};
```

---

## ✅ КОНТРОЛЬНЫЙ СПИСОК

Перед тем как считать готово:

- [ ] `npm install` выполнена
- [ ] `npm run dev` запускается без ошибок
- [ ] Браузер открывается на http://localhost:5173
- [ ] Видите все 4 контента на странице
- [ ] Спиннеры появляются при загрузке
- [ ] Данные демонстрируются после загрузки
- [ ] LIST/DETAIL для статей работает
- [ ] Кнопка "Вернуться" работает
- [ ] Нет ошибок в консоли (F12)
- [ ] Redux DevTools показывает actions

---

## 📞 ЕСЛИ НЕ ПОМОГАЕТ

### Полная переустановка:

```bash
# 1. Удалите файлы кэша
rm -rf node_modules
rm package-lock.json

# 2. Установите заново
npm install

# 3. Очистите кэш браузера
# Ctrl+Shift+Delete в Chrome

# 4. Запустите заново
npm run dev
```

### Если вы используете Windows:

```cmd
REM Удалите на Windows
rmdir /s /q node_modules
del package-lock.json

REM Затем переустановите
npm install
npm run dev
```

---

## 🎯 СОВЕТЫ ДЛЯ РАЗРАБОТКИ

### 1. Используйте VS Code extensions:
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ES Lint
- Redux DevTools

### 2. Hot Reload
- Vite автоматически перезагружает
- Сохраняет состояние компонента
- Просто редактируйте и видите изменения

### 3. Debug Mode
```javascript
// Добавьте временные логи:
console.log('State:', state);
console.log('Props:', props);

// Потом удалите
```

### 4. Testing
```bash
# Для будущего (if needed):
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm test
```

---

## 🚀 ГОТОВЫ К ПРОДАКШЕНУ?

### Перед деплоем:

```bash
# 1. Проверьте сборку
npm run build

# 2. Проверьте бандл размер
# Должен быть < 500KB

# 3. Удалите логи
# Удалите все console.log из кода

# 4. Тестируйте финальное приложение
npm run preview

# 5. Если всё работает - готово!
# Загрузите на сервер
```

---

**Good luck! 🚀**

Если что-то остается неясным, смотрите:
- [DOCUMENTATION.md](./DOCUMENTATION.md) - Полная документация
- [QUICK_START.md](./QUICK_START.md) - Быстрый старт
- [API_REFERENCE.md](./API_REFERENCE.md) - Справка по API
