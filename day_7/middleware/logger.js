module.exports = function logger(req, res, next) {
  console.log(`body : `, req.body);
  console.log(`logger : ${req.url}`);
  next();
};
