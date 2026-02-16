import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from '../api/api';

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
  initialState: {
    users: [],
    currentUser: null,
    loading: false,
    error: null,
  },
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
