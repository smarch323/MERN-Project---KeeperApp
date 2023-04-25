/* 
1. Replace Server.js URL from local host
2. Restructure folders
3. Add Notes Categories / Pages / Modules
4. Add Color Options
5. Add Authentication
6. Add to Github + Cyclic

*/




import React, {useState, useEffect} from "react";
import Header from "./Header";
import Note from "./Note";
import Footer from "./Footer";
import CreateArea from "./CreateArea";
import axios from "axios";


const PORT = process.env.PORT || 3000; 
const client = axios.create({
  baseURL:  'http://localhost:8000/notes'
});


function App() {

const [notes, setNotes] = useState([]);


useEffect(() => {
  client.get().then(response => setNotes(response.data));
});

function createNote(noteItem, index){
  return (
  <Note 
  key = {index}
  id = {noteItem._id}
  title = {noteItem.title}
  content = {noteItem.content} 
  onDelete={deleteNote}
  />
  );
}

function addNote(newNote){
//   setNotes(prevNotes => { 
//     return [...prevNotes, newNote];
// });

try{
  client.post('', newNote).then((response)=> {
    setNotes([response.data, ...notes])
  });
} catch(err){
  console.log(err);
}

}

function deleteNote(id){


  client.delete(`/${id}`)
  .then((res) => alert(res.data.message))

  setNotes(prevNotes => {
    return prevNotes.filter((noteItem, index) => {
   return index !== id;
     });
   });
}


  return (
    <div>
      <Header />
      <CreateArea onAdd = {addNote}/>
      {notes.map(createNote)}
      <Footer />
    </div>
  );
}

export default App;