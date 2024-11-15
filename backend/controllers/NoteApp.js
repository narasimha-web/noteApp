const noteModel = require("../models/NoteSchema");
const searchModel = require("../models/Searchtitle");
//save noteData
exports.noteData = async(req,res)=>{
    try{
        const responce = noteModel(req.body)
        const noteResponce = await responce.save()
        res.status(200).send({status:0,noteResponce})
    }catch(err){
        console.log(err)
    }
};
// search title api
exports.titleData = async (req, res) => {
    try {
  
        const noteData = await noteModel.find({title:req.body.title}); 
     
         return res.status(200).send({status:0,message:"Response saved",responce:noteData});
    
    } catch (err) {
        console.log(err);
        res.status(500).send({status:1,message:'An error occurred'});
    }
};

//get NoteData
exports.getData = async(req,res)=>{
    try{
        const responce = await noteModel.find()
        res.status(200).json({status:0,responce})
    }catch(err){
        console.log(err)
        res.status(400).send({error:err})
    }
};
//Delete NoteData
exports.delteNote = async(req,res)=>{
    try{
        const response = await noteModel.findByIdAndDelete(req.params.id)
        if(!response){
            return res.status(400).json({status:1,message:"Note Note Found"})
        }
        res.status(200).send({status:0,message:"delete Sucessfully"})
    }catch(err){
        console.log(err)
        res.status(400).send({error:err})
    }
};
//edit NoteData 

exports.editNoteData = async(req,res) => {
    try{
        const response = await noteModel.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!response){
            res.status(400).send({status:1,message:"Note Not Found"})
        }
        res.status(200).json({status:0,response})
    }catch(err){
        console.log(err)
        res.status(400).send({error:err})
    }
}
