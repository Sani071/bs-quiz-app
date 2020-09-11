export const UseLocalStorage = (action, key, value) => {
  localStorage[action](key, value);
};

export const formatFirebaseResponse = (firebaseScores) => {
  const scores = [];

  for (let key in firebaseScores) {
    const val = firebaseScores[key];
    val["key"] = key;
    scores.push(val);
  }

  return scores;
};
