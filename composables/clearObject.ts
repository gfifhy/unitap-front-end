export const clearObject = (obj, v = '') => {
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      clearObject(obj[key], v);
    } else {
      obj[key] = v;
    }
  }
}