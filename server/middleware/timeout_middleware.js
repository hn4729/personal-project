module.exports = {
  timer: (req, res, next) => {
    setTimeout(() => {
      next();
    }, 500);
  }
};
