const path = require("path");
const DB_PATH = path.join(__dirname + "/../data/messages.json");
let db = require(DB_PATH);
const fs = require("fs");

class MessageController {
  async getAll(req, res) {
    return res.json(db);
  }

  async get(req, res) {
    const id = req.params.id;
    const response = await isRecord(id);
    if (Object.keys(response).length > 0) {
      return res.status(200).json({ data: response });
    } else {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }
  }

  async getTag(req, res) {
    const tag = req.params.tag;
    const response = await isMessages(tag);
    if (response.length > 0) {
      return res.status(200).json({ data: response });
    } else {
      return res.status(404).json({ message: "Tag no encontrado" });
    }
  }

  async add(req, res) {
    const body = req.body;
    let message;
    let firstId = 1;
    if (db.length === 0) {
      message = { id: firstId, ...body };
    } else {
      const lastMessage = db[db.length - 1];
      const { id } = lastMessage;
      let nextId = id + 1;
      message = { id: nextId, ...body };
    }

    db.push(message);
    fs.writeFileSync(DB_PATH, JSON.stringify(db));
    return res.status(200).json({ message: "Mensaje insertado" });
  }
}

const isRecord = async (id) => {
  for (let i = 0; i < db.length; i++) {
    if (db[i].id === parseInt(id)) {
      return db[i];
    }
  }
  return {};
};

const isMessages = async (tag) => {
  let arrayMsg = [];
  for (let i = 0; i < db.length; i++) {
    if (db[i].tags === tag) {
      arrayMsg.push(db[i]);
    }
  }
  return arrayMsg;
};

module.exports = new MessageController();
