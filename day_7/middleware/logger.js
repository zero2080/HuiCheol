module.exports = function logger(req, _, next) {
  console.log(
    `${new Date().toISOString()} - LOGGER : [${req.method}] - ${req.url}`
  );
  next();
};
