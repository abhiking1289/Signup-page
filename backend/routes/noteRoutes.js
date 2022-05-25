const express = require("express");
const {
  getNotes,
  createNote,
  getNoteById,
  UpdateNote,
  DeleteNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router(); //creating the router

router.route("/").get(protect, getNotes);
//route is for api end point and we are storing the data in backened so we use get here
router.route("/create").post(protect, createNote);
router
  .route("/:id")
  .get(getNoteById)
  .put(protect, UpdateNote)
  .delete(protect, DeleteNote); //route is for api end point and we are storing the data in backened so we use post here to create the notes and only user can edit his own note
//  .put() //update our note
//  .delete(); //to delete our note

module.exports = router; // exporting the router
