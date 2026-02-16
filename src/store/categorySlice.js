import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories } from '../api/api';

export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  async () => {
    return await fetchCategories();
  }
);

const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
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
