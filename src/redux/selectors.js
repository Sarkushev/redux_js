/**
 * selectors.js - Селекторы (функции для вычисления производных данных)
 *
 * Селектор не хранит данные, а ВЫЧИСЛЯЕТ их из состояния «на лету».
 * Это позволяет не дублировать в state то, что можно посчитать
 * (например, среднюю оценку). Компоненты вызывают эти функции при рендере.
 */

// Средняя оценка элемента: берём все значения из объекта ratings,
// складываем и делим на количество. Если оценок нет — возвращаем 0.
export const selectAverageRating = (item) => {
  const ratings = Object.values(item.ratings || {});
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

// Лайкнул ли данный пользователь элемент (есть ли его id в массиве likes)
export const selectIsLiked = (item, userId) => {
  return item.likes?.includes(userId) || false;
};

// Добавил ли пользователь элемент в избранное (есть ли его id в favorites)
export const selectIsFavorited = (item, userId) => {
  return item.favorites?.includes(userId) || false;
};
