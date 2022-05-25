const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      //note title
      type: String,
      required: true,
    },
    content: {
      //note content
      type: String,
      required: true,
    },
    category: {
      //to what category does the note belongs
      type: String,
      required: true,
    },
    user: {
      //user information who created this note
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true, //when was created and when was updated time stamps
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
//export default Note;
