const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

/////////////////////////////////////////////////////////////////////////////////////////////////

// Sce

const reporterScehma = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  age: {
    type: Number,
    default: 20,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    // lowercase:true,
    minLength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can't contain password word");
      }
    },
  },
  address:{
    type: String,
    required: true,
    trim: true,
  },
  // Token
  tokens:[
    {
      token:{
        type:String,
        required:true
      }
    }
  ]
});


// Middleware
reporterScehma.pre("save", async function (next) {
  const reporter = this;


  if (reporter.isModified("password")) {
    reporter.password = await bcrypt.hash(reporter.password, 8);
  }
  next();
});
////////////////////////////////////////////////////////////////////////////////////////////////

// login

reporterScehma.statics.findByCredentials = async (email, password) => {
  // find by email
  const reporter = await Reporter.findOne({ email });

  if (!reporter) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, reporter.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  return reporter;
};

/////////////////////////////////////////////////////////////////////////////////////////
// token

reporterScehma.methods.generateToken = async function(){
  const reporter = this
  const token = jwt.sign({_id:reporter._id.toString()},'node-course')

  // Step 2 --> Save token D.B

  reporter.tokens = reporter.tokens.concat({token:token})
  await reporter.save()

  return token
}

/////////////////////////
reporterScehma.vertual('reportertasks',{
  ref:'Tasknew',
  localField:'_id',
  foreignField:'owner'
})


const Reporter = mongoose.model("Reporter", reporterScehma);
module.exports = Reporter;
