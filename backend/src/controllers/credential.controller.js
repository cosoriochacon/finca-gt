const path = require("path");
const DB_PATH = path.join(__dirname + "/../data/db.json");
let db = require(DB_PATH);
const fs = require("fs");

class CredentialController {
  async get(req, res) {
    return res.json(db);
  }

  async put(req, res) {
    const body = req.body;
    const response = await isKey(body);
    if (response) {
      return res.status(403).json({ status: 403, message: "Key repetida" });
    } else {
      db.push(body);
      fs.writeFileSync(DB_PATH, JSON.stringify(db));
      return res.status(200).json({ status: 200, message: "Key insertada" });
    }
  }
}

const isKey = async (body) => {
  for (let i = 0; i < db.length; i++) {
    if (db[i].key === body.key) {
      return true;
    }
  }
  return false;
};

module.exports = new CredentialController();
