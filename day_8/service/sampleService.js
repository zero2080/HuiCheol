module.exports = function toArray() {
  return Array.from({ length: 100 }).map(() => parseInt(Math.random() * 100));
};
