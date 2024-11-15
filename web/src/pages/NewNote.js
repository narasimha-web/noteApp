import React,{useState} from 'react';
import { Button, Container,Card } from 'react-bootstrap';
import {Formik,Form,Field,ErrorMessage,} from "formik";
import * as yup from "yup";

const NewNote = () => {
    //const [saveNote,setSaveNote] = useState("");
    const [alertMessage,setAlertMessage] = useState("");

    const initiaValues = {
        text :"",
        title : ""
    };
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
    }

    const onSubmit = async (values,{resetForm})=>{
         localStorage.setItem("note",JSON.stringify(values))
         //setSaveNote(values)
        
         try{
            const response = await fetch("http://localhost:5000/api/savedNote",{
                method : "POST",
                headers :{
                    "Content-Type" : "application/json"
                },
                body : JSON.stringify(values)
            })
            const data = await response.json();
            if(data.status === 0){
             setAlertMessage("Note Save sucessfully");
             setTimeout(() => {
                setAlertMessage("");
              }, 2000);
            }
           resetForm()
         }catch(err){
            console.log(err)
         }
    };


  return (
    <>
        <Container>
            <Card border="info" style={{ width: '50rem' }} className='cardDimension' >
            <Card.Header><strong>Dream Plan Do.. <i class="fa-solid fa-earth-americas"></i></strong></Card.Header>
            <Card.Body>
            <Card.Text>
            <Formik initialValues={initiaValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <Field type='text' name="title" className='mb-4 titleText fieldText' placeholder="Type Your Title here..." style={{height:"40px",border:"none","border-radius": "5px",  opacity: 0.75   }} />
                    <ErrorMessage name='text' component={errorMessage}></ErrorMessage>
                    <Field name="text" className='mb-3 textArea fieldText' as="textarea" placeholder="Type your note here..." style={{border:"none","border-radius": "5px",  opacity: 0.75 }}/>
                    <ErrorMessage name='text' component={errorMessage}></ErrorMessage>
                    <Button variant="outline-info" type='submit' className='inline cardbtn'>Save Note</Button> {alertMessage && <p className ='inline'style={{ color: "green" }}>{alertMessage}</p>}
                </Form>
            </Formik>
            </Card.Text>
            </Card.Body>
        </Card>
        </Container>


        
    </>
  )
}
export default NewNote;