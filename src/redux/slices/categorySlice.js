/**
 * categorySlice.js - Redux слайс для категорий товаров
 *
 * Самый простой слайс в проекте: только загрузка списка категорий.
 * Здесь НЕТ синхронных reducers — только один thunk и его extraReducers.
 * Удобный пример «минимального» слайса для объяснения архитектуры.
 *
 * Асинхронное действие (thunk): loadCategories
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../../api/api';

// === АСИНХРОННОЕ ДЕЙСТВИЕ (Thunk) ===
// Загружает категории из api/api.js
export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    return await fetchCategories();
  }
);

const categorySlice = createSlice({
  name: 'categories',
  // Начальное состояние
  initialState: {
    list: [],        // список категорий
    loading: false,  // флаг загрузки
    error: null,     // ошибка
  },
  // === АСИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  // Обрабатывают 3 фазы загрузки: pending / fulfilled / rejected
  extraReducers: (builder) => {
    builder
      .addCase(loadCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;
