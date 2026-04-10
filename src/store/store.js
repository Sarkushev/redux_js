import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import articleReducer from './articleSlice';
import productReducer from './productSlice';
import categoryReducer from './categorySlice';
import carReducer from './carSlice';
import todoReducer from './todoSlice';

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
