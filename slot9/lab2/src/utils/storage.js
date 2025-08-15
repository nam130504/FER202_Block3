const KEY = 'fav-movies';

export const loadFavs = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? [];
  } catch {
    return [];
  }
};

export const saveFavs = (ids) => {
  localStorage.setItem(KEY, JSON.stringify(ids));
};
