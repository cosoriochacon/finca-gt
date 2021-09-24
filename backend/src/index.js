const app = require("./config/server");
const { CredentialRoutes, MessageRoutes, UserRoutes } = require("./routes");

/**
 * Rutas
 */
CredentialRoutes(app);
MessageRoutes(app);
UserRoutes(app);

app.listen(app.get("port"), () => {
  console.log(`Server running on port ${app.get("port")}`);
});
