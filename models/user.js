const mongoose = require('mongoose');

// User Schema
let userSchema = mongoose.Schema({
  name:{
    type:String,
    required: true
  },
  email:{
    type: String,
    required: true,
  },
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  address:{
    type:String,
    required: true
  },
  city:{
    type:String,
    required: true
  },
  state:{
    type:String,
    required: true
  },
  zip:{
    type:Number,
    required: true
  },
  phone:{
    type:String,
    required:true
  }
});

const User = module.exports = mongoose.model('User', userSchema);
