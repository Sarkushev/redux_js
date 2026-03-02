import carsJson from '../mock-data/cars.json';
import articlesData from '../mock-data/articles.json';
import productsJson from '../mock-data/products.json';
import categoriesJson from '../mock-data/categories.json';

// копируем данные в изменяемые переменные для симуляции CRUD
let carsData = Array.isArray(carsJson) ? [...carsJson] : [];
let productsData = Array.isArray(productsJson) ? [...productsJson] : [];
let categoriesData = Array.isArray(categoriesJson) ? [...categoriesJson] : [];
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

// CRUD имитация для автомобилей
export const createCar = async (car) => {
  await simulateDelay(1200);
  const newId = carsData.length ? Math.max(...carsData.map(c => c.id)) + 1 : 1;
  const newCar = { ...car, id: newId };
  // use reassignment instead of push in case original array is non-writable
  carsData = [...carsData, newCar];
  return newCar;
};

export const updateCar = async (id, updates) => {
  await simulateDelay(1200);
  const idx = carsData.findIndex(c => c.id === parseInt(id));
  if (idx === -1) throw new Error('Car not found');
  carsData[idx] = { ...carsData[idx], ...updates };
  return carsData[idx];
};

export const deleteCar = async (id) => {
  await simulateDelay(1000);
  const idx = carsData.findIndex(c => c.id === parseInt(id));
  if (idx === -1) throw new Error('Car not found');
  const [removed] = carsData.splice(idx, 1);
  return removed;
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
