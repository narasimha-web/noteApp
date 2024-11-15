import React,{useEffect, useState,useContext} from 'react';
import {Navbar,Nav,Container,Button} from "react-bootstrap";
import {Formik,Form,Field,ErrorMessage,} from "formik";
import * as yup from "yup";
import { useLocation} from "react-router-dom";
import {store} from "../App";

const NavBar = () => {
  const [noteList,setNoteList] = useState([]);
  const [saveTitle,setSaveTitle,clearTitle,setClearTitle] = useContext(store);
  

  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem("noteListData"))
    setNoteList(data);

   
  },[])
  const initiaValues = {
    title : ""
  };
  const validationSchema = yup.object({
    title : yup.string().required("Field is Requred")
  })
 const errorMessage = (props) =>{
  return(
    <div>
      <p>{props.children}</p>
    </div>
  )
 }

 const onSubmit = async(values, { resetForm }) => {
const responce = await fetch("http://localhost:5000/api/titleData",{
  method : "POST",
  headers:{
    "Content-Type":"application/json"
  },
  body : JSON.stringify(values)
})
const data = await responce.json();
setSaveTitle(data.responce)
if(data.status === 1){
 alert("No data here.");
 resetForm();
}

};

  const loacation = useLocation();
  return (
    <>
    {
      loacation.pathname === "/" ?(
        <Navbar expand="lg"  className="bg-body-tertiary nav" fixed="top" >
        <Container fluid>
          <Navbar.Brand href="#" bg='primary' ><strong><i class="fa-solid fa-book notebook"></i>My NoteApp</strong></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" >
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/NoteList"><strong><i class="fa-solid fa-list"></i> {" "}My Note Lists</strong></Nav.Link>
            </Nav>
          
          </Navbar.Collapse>
        </Container>
      </Navbar>
      ):(
        <Navbar expand="lg" className="bg-body-tertiary nav" fixed="top">
        <Container fluid>
          <Navbar.Brand href="#"><strong>Total Notes : {noteList.length}</strong></Navbar.Brand>
          <Nav.Link href="/"><strong style={{color:"black"}}><i class="fa-solid fa-pen-nib"></i> New Note</strong></Nav.Link>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}w 
              navbarScrollw
            >
              {/* <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link> */}
            </Nav>
              <Formik initialValues={initiaValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                  <Form className='d-flex'>
                    <Field type='text' name="title" style={{marginRight:"5px",}} className='me-2' placeholder="Search here..." />
                    <ErrorMessage name='text' component={errorMessage}></ErrorMessage> 
                    <Button variant="primary" style={{marginRight:"10px"}} type='submit'>Search</Button>
                    <Button variant="primary" onClick={()=>setClearTitle(true)} type='reset'>Clear</Button>
                  </Form>
           </Formik>
         
          </Navbar.Collapse>
        </Container>
      </Navbar>


      )
 }
    </>
  )
}

export default NavBar;