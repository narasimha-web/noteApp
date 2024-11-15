import React,{createContext,useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import NewNote from './pages/NewNote';
import NavBar from './pages/NavBar';
import NoteList from './pages/NoteList';
import "./App.css";
export const store = createContext()

const App = () => {
  const [saveTitle,setSaveTitle] = useState([])
  const [clearTitle,setClearTitle] = useState(false)
  return (
   <>
      <store.Provider value={[saveTitle,setSaveTitle,clearTitle,setClearTitle]}>
      <NavBar/>
      <Routes>
      <Route path='/'element={<NewNote/>}></Route>
      <Route path='/notelist' element={<NoteList/>}/>
      </Routes>
      </store.Provider>
   </>
  )
}

export default App