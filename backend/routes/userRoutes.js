const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("..//controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router(); //creating the router

router.route("/").post(registerUser); //route is for api end point and we are storing the data in backened so we use post here
router.route("/login").post(authUser);
router.route("/profile").post(protect, updateUserProfile); //only user that is authorised can update his profile

module.exports = router; // exporting the router
