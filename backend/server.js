const express = require("express");
const app = express();
const server = require("http").createServer(app);
const cors = require("cors");
const mongoose = require("mongoose");
const noteRouter = require("./routes/api/NoteApis")

app.use(express.urlencoded({
    extended:false
}))
app.use(express.json());
app.use(cors());
app.use("/api",noteRouter)

//database conection

mongoose.connect("mongodb://localhost:27017/noteData");
mongoose.Promise = global.Promise;
mongoose.set("debug",true);
const db = mongoose.connection;

db.once("open",function callback(){
    console.log("Database Connected Sucessfully")
});
db.on("error",function(err){
    console.log({err:err})
})

server.listen(5000,()=>{
    console.log("server Starting...")
})