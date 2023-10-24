module.exports = function logger(req, _, next) {
  console.log(`logger : ${req.url}`);
  next();
};
