const { UserController } = require("../controllers/index");

module.exports = (app) => {
  app.post("/login", UserController.login);
  app.post("/register", UserController.register);
};
