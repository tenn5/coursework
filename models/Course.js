const mongoose = require("../db");
const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    video: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    test: [{
      question: {
        type: String,
        required: true
      },
      answers: {
        type: Array,
        required: true
      },
      correctAnswer: {
        type: String,
        required: true
      }
    }],
    author: {
      type: String,
      required: true
    }
  }
)

module.exports = mongoose.model('Course', schema);
