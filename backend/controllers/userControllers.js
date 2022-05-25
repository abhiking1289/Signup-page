const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { use } = require("../routes/userRoutes");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  //asynHandler will handle errors inside this function
  const { name, email, password, pic } = req.body; //we are requesting from the user

  const userExists = await User.findOne({ email }); //this mongoose query to find whether the user exists or not by email

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    //if user doesn't exists ....new user created in our database...used to create new user in our database
    name,
    email,
    password,
    pic,
  });

  if (user) {
    //this is when user creation is successfull after the above code creates
    res.status(201).json({
      //we are returning to the user back without password
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, //we remeber it is default set to false in the userModel.js
      pic: user.pic,
      token: generateToken(user._id), //we are genarting token and sending it to the user
    });
  } else {
    res.status(400);
    throw new Error("Error Occured!!!");
  }
});

//user login authenticaion
const authUser = asyncHandler(async (req, res) => {
  //asynHandler will handle errors inside this function
  const { email, password } = req.body; //we are requesting from the user

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      //we are returning to the user back without password
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin, //we remeber it is default set to false in the userModel.js
      pic: user.pic,
      token: generateToken(user._id), //we are genarting token and sending it to the user
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };
