import carsData from '../mock-data/cars.json';
import articlesData from '../mock-data/articles.json';
import productsData from '../mock-data/products.json';
import categoriesData from '../mock-data/categories.json';

// Функция для имитации задержки (например, сетевой запрос)
const simulateDelay = (ms = 1500) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// API для автомобилей
export const fetchCars = async () => {
  await simulateDelay(1500);
  return carsData;
};

export const fetchCarById = async (id) => {
  await simulateDelay(1000);
  return carsData.find(car => car.id === parseInt(id));
};

// API для статей
export const fetchArticles = async () => {
  await simulateDelay(2000);
  return articlesData;
};

export const fetchArticleById = async (id) => {
  await simulateDelay(1200);
  return articlesData.find(article => article.id === parseInt(id));
};

// API для товаров
export const fetchProducts = async () => {
  await simulateDelay(1800);
  return productsData;
};

export const fetchProductById = async (id) => {
  await simulateDelay(1000);
  return productsData.find(product => product.id === parseInt(id));
};

// API для категорий
export const fetchCategories = async () => {
  await simulateDelay(1300);
  return categoriesData;
};

export const fetchCategoryById = async (id) => {
  await simulateDelay(800);
  return categoriesData.find(category => category.id === parseInt(id));
};
