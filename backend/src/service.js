const jwt = require("jsonwebtoken");
const SHA256 = require("crypto-js/sha256");
const path = require("path");
const DB_PATH = path.join(__dirname + "/data/db.json");
const db = require(DB_PATH);
const SHARED_SECRET = db[0].shared_secret;
const KEY = db[0].key;
let services = {};

services.verify = function (req, res, next) {
  var auth = services.getHeaders(req, res);
  jwt.verify(auth.TOKEN, "fincaguatemala", function (err, decoded) {
    if (err) {
      res.status(403).json({ message: "Error de autenticación", error: err });
    } else {
      next();
    }
  });
};
services.getHeaders = function (req, res) {
  const header = req.headers;
  const pathname = req.route.path;
  const body = req.body;
  const params = req.params;
  let strParams = "";
  let strBody = "";
  Object.keys(params).length > 0
    ? (strParams = JSON.stringify(params))
    : (strParams = "");
  Object.keys(body).length > 0
    ? (strBody = JSON.stringify(body))
    : (strBody = "");

  let auth = {};
  if (
    typeof header["x-key"] != "undefined" &&
    typeof header["x-route"] != "undefined" &&
    typeof header["x-signature"] != "undefined" &&
    typeof header.authorization != "undefined"
  ) {
    let tokenArray = header.authorization.split(" ");
    let token = tokenArray.pop();
    let xkey = header["x-key"];
    let xroute = header["x-route"];
    let xsignature = header["x-signature"];
    let signatureEncode = strBody + ";" + strParams + ";" + xroute;
    const signature = SHA256(signatureEncode, SHARED_SECRET).toString();
    if (xsignature === signature) {
      if (xroute === pathname) {
        if (xkey === KEY) {
          auth = {
            TOKEN: token,
            "X-KEY": xkey,
            "X-Route": xroute,
            "X-Signature": xsignature,
          };
          return auth;
        } else {
          res.status(403).json({ message: "Error en key de cabecera" });
        }
      } else {
        res.status(403).json({ message: "Error en ruta de cabecera" });
      }
    } else {
      res.status(403).json({ status: 0, message: "Error de firma" });
    }
  } else {
    res
      .status(403)
      .json({ message: "No existen las cabeceras de autorización" });
    return;
  }
};

module.exports = services;
