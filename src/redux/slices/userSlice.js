/**
 * userSlice.js - Redux слайс для управления пользователями
 *
 * Хранит:
 * - users: список пользователей
 * - currentUser: текущий выбранный пользователь
 * - loading / error: состояния асинхронной загрузки
 *
 * Синхронные действия: setCurrentUser, addUser, removeUser
 * Асинхронные действия (thunks): loadCars, loadCarById
 *
 * ВАЖНО (объяснить на защите): thunks называются loadCars/loadCarById —
 * это наследие копипасты из carSlice. Источник данных тот же (api/api.js),
 * но результат кладётся в поля users/currentUser этого слайса.
 */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from '../../api/api';

// === АСИНХРОННЫЕ ДЕЙСТВИЯ (Thunks) ===
// Загружают данные из api/api.js. RTK сам создаёт под каждый thunk
// три экшена: pending (запрос пошёл) / fulfilled (успех) / rejected (ошибка)
export const loadCars = createAsyncThunk(
  'user/loadCars',
  async () => {
    return await fetchCars();
  }
);

export const loadCarById = createAsyncThunk(
  'user/loadCarById',
  async (id) => {
    return await fetchCarById(id);
  }
);

const userSlice = createSlice({
  name: 'user',
  // Начальное состояние слайса
  initialState: {
    users: [],          // список пользователей
    currentUser: null,  // выбранный пользователь
    loading: false,     // флаг загрузки (для спиннера)
    error: null,        // текст ошибки (если запрос упал)
  },
  // === СИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  // Меняют состояние мгновенно, без обращения к серверу
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  // === АСИНХРОННЫЕ РЕДЬЮСЕРЫ ===
  // Реагируют на 3 фазы thunks и обновляют состояние
  extraReducers: (builder) => {
    builder
      // Загрузка всех автомобилей
      .addCase(loadCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCars.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(loadCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Загрузka одного автомобиля
      .addCase(loadCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(loadCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCurrentUser, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
