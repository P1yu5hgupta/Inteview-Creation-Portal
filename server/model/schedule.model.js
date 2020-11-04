const mongoose =require('mongoose');

const Schedule = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Sch',Schedule)