import React,{useState,useEffect,useContext} from 'react';
import { Container,Card,Button,Modal } from 'react-bootstrap';
import {Formik,Form,Field,ErrorMessage,} from "formik";
import * as yup from "yup";
import { store } from '../App';



const NoteList = () => {
    const [saveNote,setSaveNote] = useState([])
    const [show,setShow] = useState(false);
    const [deleteId,setDeleteId] = useState('');
    const [visible,setVisable] = useState(false);
    const [editData,setEditData] = useState({title:"",text:""});
    const [editId,setEditId] = useState('');
    const [saveTitle,setSaveTitle,clearTitle,setClearTitle] = useContext(store)

 
    useEffect(()=>{
      if(saveTitle){
        setTimeout(()=>{
          setSaveNote([])
          setSaveNote(saveTitle)
        },500)
      }
    },[saveTitle]);

    useEffect(()=>{
      if(clearTitle){
        fetchNoteData();
        setClearTitle(false)
      }
    },[clearTitle])

  const fetchNoteData = async()=>{
    try{
      const response = await fetch("http://localhost:5000/api/getNoteData",{
        method : 'GET',
        headers :{
          "Content-Type":"application/json"
        }
      })
      const data = await response.json();
      localStorage.setItem("noteListData",JSON.stringify(data.responce))
      setTimeout(()=>{
        setSaveNote(data.responce)
      },500)
    }catch(err){
      console.log(err)
    }
  }
  const handleClose = () => setShow(false)
  const handleClosing = () => setVisable(false)
  //delete Note
  const handleDelete = (id) =>{
    setShow(true)
    setDeleteId(id)
  }
  useEffect(()=>{
    fetchNoteData();

  },[])
  const deleteNote = async() =>{
    try{
      const response = await fetch(`http://localhost:5000/api/deleteNote/${deleteId}`,{
        method : "DELETE",
        headers : {
          "Content-Type" : "application/json"
        }
      })
      const data = await response.json();
      setShow(false)
      fetchNoteData()
    }catch(err){
      console.log(err)
    }
  };
  const editNoteData = async(values) => {
    try{
      const response = await fetch(`http://localhost:5000/api/updateNote/${editId}`,{
        method : "PUT",
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(values) 
      })
      const data = await response.json()
      console.log(data);
      setVisable(false)
      fetchNoteData()
    }catch(err){
      console.log(err)
    }
  }
  // edit NoteData 

const validationSchema = yup.object({
    text : yup.string().required("Field Required"),
    title : yup.string().required("Filed Required")
})
const errorMessage = (props)=>{
    return(
        <div>
            <p className="error">{props.children}</p>
        </div>
    )
};
const onSubmit = async(values) =>{
 await editNoteData(values);
}
const editNote = async(data)=>{
  setEditId(data._id)
  setVisable(true)
  setEditData({
    title : data.title,
    text:data.text
  })
}

  return (
    <>
    
    <Container className='listContainer'>
      {saveNote.map((note)=>(
           <Card className="mb-3 text-center listCard">
           <Card.Header><strong>Title : {note.title}</strong>

        <Button variant="link" className='trashIcon'onClick={()=>handleDelete(note._id)} style={{ "backgroundColor": 'transparent', border: 'none', padding: 0 }}>
        <i className="fa-solid fa-trash icon "></i> </Button>

        <Button variant="link" className='editIcon'onClick={()=>editNote(note)} style={{ "backgroundColor": 'transparent', border: 'none', padding: 0 }}>
        <i class="fa-regular fa-pen-to-square icons "></i>
    </Button>
        </Card.Header>
           <Card.Body>
             <Card.Text>{note.text}</Card.Text>
           </Card.Body>
           <Card.Footer className="text-muted"><i class="fa-solid fa-calendar-days"></i><strong> Date : {note.createdAt}</strong></Card.Footer>
         </Card>
      ))}
    </Container>

    
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are You Sure Delete The Note</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={deleteNote} >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

{/* update Model */}

<Modal show={visible} onHide={handleClosing}>
        <Modal.Header closeButton>
          <Modal.Title>Update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Formik initialValues={editData} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <Field type='text' name="title" className='mb-4 titleText' placeholder="Type Your Title here..." />
                    <ErrorMessage name='text' component={errorMessage}></ErrorMessage>
                    <Field name="text" className='mb-3 textArea' as="textarea" placeholder="Type your note here..." />
                    <ErrorMessage name='text' component={errorMessage}></ErrorMessage>
                    <Button variant="outline-info" type='submit' className='inline' onClick={editNoteData}>Update</Button>
                </Form>
            </Formik>
          
          </Modal.Body>
      </Modal>
    </>
  )
}

export default NoteList