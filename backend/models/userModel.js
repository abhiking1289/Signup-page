const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  //here we are creating userschema
  {
    name: {
      type: String, //go to mongoDB website for this datatypes
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, //No two users will have a same email id
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      //just incase we need any admin functionality in our app
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      //by default the pic will be like this if the user donot want to put his picture
      type: String,
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  {
    timestamps: true, //we can track when the (date) data was created in the database and when it was updated
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// will encrypt password everytime its saved
userSchema.pre("save", async function (next) {
  // pre is previous operation before saving,next is the middleware
  if (!this.isModified("password")) {
    //isModified is Mongoose function...meaning is...if this is not modified we are moving to next
    next();
  }
  const salt = await bcrypt.genSalt(10); //bcrypt functionality generating asyncrnously a salt for our pasword
  //the more higher the value the more secure the password
  this.password = await bcrypt.hash(this.password, salt); //this is the password that user had entered and making it encrypted
});
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); //compare is a bcrypt method that compares the user entered password and the password in the database
};

const User = mongoose.model("User", userSchema);

module.exports = User;
