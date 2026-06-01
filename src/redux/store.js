import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import articleReducer from './slices/articleSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import carReducer from './slices/carSlice';
import todoReducer from './slices/todoSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    articles: articleReducer,
    products: productReducer,
    categories: categoryReducer,
    cars: carReducer,
    todos: todoReducer,
  },
});

export default store;
