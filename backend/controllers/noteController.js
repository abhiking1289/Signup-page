const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");
//const res = require("express/lib/response");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }); //this will find all of the notes but we want particular users notes
  res.json(notes);
});

//for creating the note
const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the Fields");
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save(); //we are saving the noote into ourdatabase

    res.status(201).json(createdNote);
  }
});

//For Reading the note or a particular note
const getNoteById = asyncHandler(async (req, res) => {
  //for a single note among the various notes
  const note = await Note.findById(req.params.id); // finding the single/ particular note by Id

  if (note) {
    //if the Id is found
    res.json(note);
  } else {
    //if the Id is not found
    res.status(404).json({ message: "Note not found" });
  }
});

//For updating the Note
const UpdateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body; //destructuring from our body

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

//For deleting the Note
const DeleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (note) {
    await note.remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not Found");
  }
});

module.exports = { getNotes, createNote, getNoteById, UpdateNote, DeleteNote };
