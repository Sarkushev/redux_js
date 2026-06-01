/**
 * todoSlice.js - Redux слайс для управления задачами (TODO)
 * 
 * Отвечает за:
 * - CRUD операции (создание, чтение, обновление, удаление) задач
 * - Загрузку задач из REST API (JSONPlaceholder)
 * - Выбранную задачу для просмотра
 * - Состояния загрузки и ошибки
 * - Трансформацию данных (добавление description и createdAt)
 * 
 * Основные действия (thunks):
 * - loadTodos: загрузить все задачи из API
 * - addTodo: создать новую задачу
 * - editTodo: обновить задачу
 * - removeTodo: удалить задачу
 * - loadTodoById: загрузить одну задачу по ID
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTodos, fetchTodoById, createTodo as apiCreateTodo, updateTodo as apiUpdateTodo, deleteTodo as apiDeleteTodo } from '../../services/todoApi';

/**
 * === АСИНХРОННЫЕ ДЕЙСТВИЯ (Thunks) ===
 * Каждый вызывает REST API функцию из services/todoApi.js
 * и трансформирует данные перед сохранением в Redux
 */

// Загрузить все задачи
// Добавляет поля description и createdAt если их нет
export const loadTodos = createAsyncThunk('todos/loadTodos', async () => {
  const todos = await fetchTodos();
  return todos.map(todo => ({
    ...todo,
    description: todo.description ?? todo.title,
    createdAt: todo.createdAt ?? new Date().toISOString(),
  }));
});

// Загрузить одну задачу по ID
export const loadTodoById = createAsyncThunk('todos/loadTodoById', async (id) => {
  const todo = await fetchTodoById(id);
  return {
    ...todo,
    description: todo.description ?? todo.title,
    createdAt: todo.createdAt ?? new Date().toISOString(),
  };
});

// Добавить новую задачу
export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await apiCreateTodo(todo);
  return {
    ...response,
    description: todo.description || todo.title,
    createdAt: todo.createdAt || new Date().toISOString(),
  };
});

// Обновить задачу
export const editTodo = createAsyncThunk('todos/editTodo', async ({ id, updates }) => {
  const response = await apiUpdateTodo(id, updates);
  return {
    ...response,
    description: updates.description || response.description || response.title,
    createdAt: updates.createdAt || response.createdAt || new Date().toISOString(),
  };
});

// Удалить задачу
export const removeTodo = createAsyncThunk('todos/removeTodo', async (id) => {
  return await apiDeleteTodo(id);
});

/**
 * === REDUX СЛАЙС ===
 * Содержит состояние и редьюсеры для задач
 */
const todoSlice = createSlice({
  name: 'todos',
  // Начальное состояние
  initialState: {
    list: [],              // Массив всех задач
    selectedTodo: null,    // Выбранная задача для просмотра
    loading: false,        // Флаг загрузки
    error: null,           // Сообщение об ошибке
  },
  // === СИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  reducers: {
    // Очистить выбранную задачу
    clearSelectedTodo: (state) => {
      state.selectedTodo = null;
    },
  },
  // === АСИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  // Обрабатывают состояния thunks: pending, fulfilled, rejected
  extraReducers: (builder) => {
    builder
      // Обработка loadTodos
      .addCase(loadTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadTodoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTodoById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedTodo = action.payload;
      })
      .addCase(loadTodoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.list.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
        if (state.selectedTodo && state.selectedTodo.id === action.payload.id) {
          state.selectedTodo = action.payload;
        }
      })
      .addCase(editTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeTodo.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(todo => todo.id !== action.payload.id);
        if (state.selectedTodo && state.selectedTodo.id === action.payload.id) {
          state.selectedTodo = null;
        }
      })
      .addCase(removeTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedTodo } = todoSlice.actions;
export default todoSlice.reducer;
