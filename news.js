const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')



const reporterScehma = new mongoose.Schema({
    description: {
      type: String,
      required: true,
      trim: true,
    },
    title:{
      type: String,
      required: true,
      trim: true,
    },
    owner:{
         type:mongoose.Schema.Types.ObjectId,
         required:true
    }
})

const Tasknew = mongoose.model("Tasknew", reporterScehma);
module.exports = Tasknew;
///////////////////////////////////////////////
 