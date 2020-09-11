export const UseLocalStorage = (action, key, value) => {
  localStorage[action](key, value);
};

