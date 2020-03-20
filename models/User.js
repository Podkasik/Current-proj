const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
      id:{
        type: String
      },
      name: {
        type: String,
        required:true
      },
      email: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      dateReg:{
          type:String
      },
      role:{
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
      },

});

const User = mongoose.model("user", userSchema);

module.exports= User;