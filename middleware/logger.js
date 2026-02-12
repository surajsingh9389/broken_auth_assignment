const requestLogger = (req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} -> ${res.statusCode} (${duration}ms)`);
  });
 
  //  Forgot to call next(), Request gets stuck here, never reaches routes, browser keeps waiting forever.
  next();
};

module.exports = requestLogger;
