const { CredentialController } = require("../controllers/index");

module.exports = (app) => {
  app.put("/credential", CredentialController.put);
  app.get("/credential", CredentialController.get);
};
