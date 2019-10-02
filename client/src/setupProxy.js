const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("/apii/**", { target: "http://localhost:5002/" }));
};