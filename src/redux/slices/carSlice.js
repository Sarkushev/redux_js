import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById, createCar as apiCreateCar, updateCar as apiUpdateCar, deleteCar as apiDeleteCar } from '../../api/api';

export const loadCars = createAsyncThunk('cars/loadCars', async () => {
  return await fetchCars();
});

export const loadCarById = createAsyncThunk('cars/loadCarById', async (id) => {
  return await fetchCarById(id);
});

export const addCar = createAsyncThunk('cars/addCar', async (car) => {
  return await apiCreateCar(car);
});

export const editCar = createAsyncThunk('cars/editCar', async ({ id, updates }) => {
  return await apiUpdateCar(id, updates);
});

export const removeCar = createAsyncThunk('cars/removeCar', async (id) => {
  return await apiDeleteCar(id);
});

const carSlice = createSlice({
  name: 'cars',
  initialState: {
    list: [],
    selectedCar: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedCar: (state) => {
      state.selectedCar = null;
    },
    toggleLike: (state, action) => {
      const { id, userId } = action.payload;
      const car = state.list.find(c => c.id === id);
      if (car) {
        if (car.likes.includes(userId)) {
          car.likes = car.likes.filter(uid => uid !== userId);
        } else {
          car.likes.push(userId);
        }
      }
      if (state.selectedCar && state.selectedCar.id === id) {
        state.selectedCar.likes = car.likes;
      }
    },
    toggleFavorite: (state, action) => {
      const { id, userId } = action.payload;
      const car = state.list.find(c => c.id === id);
      if (car) {
        if (car.favorites.includes(userId)) {
          car.favorites = car.favorites.filter(uid => uid !== userId);
        } else {
          car.favorites.push(userId);
        }
      }
      if (state.selectedCar && state.selectedCar.id === id) {
        state.selectedCar.favorites = car.favorites;
      }
    },
    addRating: (state, action) => {
      const { id, userId, rating } = action.payload;
      const car = state.list.find(c => c.id === id);
      if (car) {
        car.ratings = { ...car.ratings, [userId]: rating };
      }
      if (state.selectedCar && state.selectedCar.id === id) {
        state.selectedCar.ratings = car.ratings;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCars.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(loadCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadCarById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCar = action.payload;
      })
      .addCase(loadCarById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.loading = false;
        state.list.push(action.payload);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCar.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.list.findIndex(c => c.id === action.payload.id);
        if (idx !== -1) {
          state.list[idx] = action.payload;
        }
        if (state.selectedCar && state.selectedCar.id === action.payload.id) {
          state.selectedCar = action.payload;
        }
      })
      .addCase(editCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeCar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeCar.fulfilled, (state, action) => {
        state.loading = false;
        state.list = state.list.filter(c => c.id !== action.payload.id);
        if (state.selectedCar && state.selectedCar.id === action.payload.id) {
          state.selectedCar = null;
        }
      })
      .addCase(removeCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearSelectedCar, toggleLike, toggleFavorite, addRating } = carSlice.actions;
export default carSlice.reducer;
