const express = require("express");
const router = express();
const {noteData,getData,delteNote,editNoteData,titleData,getTitleData} =require("../../controllers/NoteApp")

router.post("/savedNote",noteData);
router.get("/getNoteData",getData);
router.delete("/deleteNote/:id",delteNote);
router.put("/updateNote/:id",editNoteData);
router.post("/titleData",titleData);



module.exports = router;