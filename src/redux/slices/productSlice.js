/**
 * productSlice.js - Redux слайс для управления товарами
 *
 * Хранит список товаров, выбранный товар и состояния загрузки/ошибки.
 * Реализует лайки, избранное и рейтинги (синхронно).
 *
 * Асинхронные действия (thunks): loadProducts, loadProductById
 * Синхронные действия: clearSelectedProduct, toggleLike, toggleFavorite, addRating
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById } from '../../api/api';

// === АСИНХРОННЫЕ ДЕЙСТВИЯ (Thunks) ===
// Загружают товары из api/api.js (pending/fulfilled/rejected генерируются автоматически)
export const loadProducts = createAsyncThunk(
  'products/loadProducts',
  async () => {
    return await fetchProducts();
  }
);

export const loadProductById = createAsyncThunk(
  'products/loadProductById',
  async (id) => {
    return await fetchProductById(id);
  }
);

const productSlice = createSlice({
  name: 'products',
  // Начальное состояние
  initialState: {
    list: [],               // все товары
    selectedProduct: null,  // выбранный товар
    loading: false,         // флаг загрузки
    error: null,            // ошибка
  },
  // === СИНХРОННЫЕ РЕДЬЮСЕРЫ (лайки, избранное, рейтинг) ===
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
    toggleLike: (state, action) => {
      const { id, userId } = action.payload;
      const product = state.list.find(p => p.id === id);
      if (product) {
        if (product.likes.includes(userId)) {
          product.likes = product.likes.filter(uid => uid !== userId);
        } else {
          product.likes.push(userId);
        }
      }
      if (state.selectedProduct && state.selectedProduct.id === id) {
        state.selectedProduct.likes = product.likes;
      }
    },
    toggleFavorite: (state, action) => {
      const { id, userId } = action.payload;
      const product = state.list.find(p => p.id === id);
      if (product) {
        if (product.favorites.includes(userId)) {
          product.favorites = product.favorites.filter(uid => uid !== userId);
        } else {
          product.favorites.push(userId);
        }
      }
      if (state.selectedProduct && state.selectedProduct.id === id) {
        state.selectedProduct.favorites = product.favorites;
      }
    },
    addRating: (state, action) => {
      const { id, userId, rating } = action.payload;
      const product = state.list.find(p => p.id === id);
      if (product) {
        product.ratings = { ...product.ratings, [userId]: rating };
      }
      if (state.selectedProduct && state.selectedProduct.id === id) {
        state.selectedProduct.ratings = product.ratings;
      }
    },
  },
  // === АСИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  // Реагируют на 3 фазы каждого thunk и обновляют состояние
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(loadProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedProduct, toggleLike, toggleFavorite, addRating } = productSlice.actions;
export default productSlice.reducer;
