// Selectors for calculating average ratings

export const selectAverageRating = (item) => {
  const ratings = Object.values(item.ratings || {});
  if (ratings.length === 0) return 0;
  const sum = ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / ratings.length).toFixed(1);
};

export const selectIsLiked = (item, userId) => {
  return item.likes?.includes(userId) || false;
};

export const selectIsFavorited = (item, userId) => {
  return item.favorites?.includes(userId) || false;
};