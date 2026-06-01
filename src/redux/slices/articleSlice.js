/**
 * articleSlice.js - Redux слайс для управления статьями
 *
 * Хранит список статей, выбранную статью и состояния загрузки/ошибки.
 * Реализует социальные функции: лайки, избранное, рейтинги (синхронно).
 *
 * Асинхронные действия (thunks): loadArticles, loadArticleById
 * Синхронные действия: clearSelectedArticle, toggleLike, toggleFavorite, addRating
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles, fetchArticleById } from '../../api/api';

// === АСИНХРОННЫЕ ДЕЙСТВИЯ (Thunks) ===
// Загружают статьи из api/api.js. Под каждый создаются экшены pending/fulfilled/rejected
export const loadArticles = createAsyncThunk(
  'articles/loadArticles',
  async () => {
    return await fetchArticles();
  }
);

export const loadArticleById = createAsyncThunk(
  'articles/loadArticleById',
  async (id) => {
    return await fetchArticleById(id);
  }
);

const articleSlice = createSlice({
  name: 'articles',
  // Начальное состояние
  initialState: {
    list: [],               // все статьи
    selectedArticle: null,  // открытая статья
    loading: false,         // флаг загрузки
    error: null,            // ошибка
  },
  // === СИНХРОННЫЕ РЕДЬЮСЕРЫ (лайки, избранное, рейтинг) ===
  // Работают локально с уже загруженным состоянием, без запроса к серверу
  reducers: {
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
    toggleLike: (state, action) => {
      const { id, userId } = action.payload;
      const article = state.list.find(a => a.id === id);
      if (article) {
        if (article.likes.includes(userId)) {
          article.likes = article.likes.filter(uid => uid !== userId);
        } else {
          article.likes.push(userId);
        }
      }
      if (state.selectedArticle && state.selectedArticle.id === id) {
        state.selectedArticle.likes = article.likes;
      }
    },
    toggleFavorite: (state, action) => {
      const { id, userId } = action.payload;
      const article = state.list.find(a => a.id === id);
      if (article) {
        if (article.favorites.includes(userId)) {
          article.favorites = article.favorites.filter(uid => uid !== userId);
        } else {
          article.favorites.push(userId);
        }
      }
      if (state.selectedArticle && state.selectedArticle.id === id) {
        state.selectedArticle.favorites = article.favorites;
      }
    },
    addRating: (state, action) => {
      const { id, userId, rating } = action.payload;
      const article = state.list.find(a => a.id === id);
      if (article) {
        article.ratings = { ...article.ratings, [userId]: rating };
      }
      if (state.selectedArticle && state.selectedArticle.id === id) {
        state.selectedArticle.ratings = article.ratings;
      }
    },
  },
  // === АСИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  // Реагируют на 3 фазы каждого thunk и обновляют состояние
  extraReducers: (builder) => {
    builder
      // Загрузка списка статей
      .addCase(loadArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Загрузка одной статьи
      .addCase(loadArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadArticleById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedArticle = action.payload;
      })
      .addCase(loadArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedArticle, toggleLike, toggleFavorite, addRating } = articleSlice.actions;
export default articleSlice.reducer;
