const mongoose = require("../db");
const schema = new mongoose.Schema(
  {
    nickname: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true,
      select: false
    }
  }
)

module.exports = mongoose.model('User', schema);
