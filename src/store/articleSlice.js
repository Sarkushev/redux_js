import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles, fetchArticleById } from '../api/api';

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
  initialState: {
    list: [],
    selectedArticle: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedArticle: (state) => {
      state.selectedArticle = null;
    },
  },
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

export const { clearSelectedArticle } = articleSlice.actions;
export default articleSlice.reducer;
