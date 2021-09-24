const { MessageController } = require("../controllers/index");
const Service = require("../service");

module.exports = (app) => {
  app.post("/message", Service.verify, MessageController.add);
  app.get("/message", MessageController.getAll);
  app.get("/message/:id", Service.verify, MessageController.get);
  app.get("/messages/:tag", Service.verify, MessageController.getTag);
};
