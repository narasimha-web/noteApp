const mongoose = require("mongoose");

const notedata = new mongoose.Schema({
    text : {
        type : String,
        required : true
    },
    title : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("note",notedata)