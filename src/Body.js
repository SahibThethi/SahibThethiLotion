import React, { useState, useEffect } from "react";
import uuid from "react-uuid"
import Siderbar from "./Sidebar";
import Main from "./Main";

function Body() {

  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  )
  const [activeNote, setActiveNote] = useState(false);
  
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "Untitled",
      body: "...",
      lastModified: Date.now()
    }

    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  }
  const onDeleteNote = (noteId) => {
    const answer = window.confirm("Are you sure?");
    if (answer) {
      setNotes(notes.filter(({ id }) => id !== noteId));
    }   
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  };

  const stylesH1 = {
    marginBottom: "0px"
  }
  const stylesP = {
    marginTop: "0px",
    color: "grey"
  }
  const onToggleSidebar = () => {
    const sidebar = document.getElementById("app-sidebar");
        sidebar.toggleAttribute("hidden");
  }
  const onUpdateNote = (title, text) => {
    const updatedNote = {
      ...getActiveNote(),
      title: title,
      body: text,
      lastModified: Date.now(),
    };
    setNotes(notes.map((note) => (note.id === activeNote ? updatedNote : note)));
    setActiveNote(updatedNote.id);
  };
  return <div>
      <div className ="top-bar"></div>
      <div className = "header">
        <h1 style={stylesH1}>Lotion</h1>
        <p style={stylesP}>Like Notion, but worse.</p>
        <button type = "button" className = "head" onClick={() => onToggleSidebar()}>&#9776;</button>
      </div>
      <div className = "app-body">
        <Siderbar 
          notes = {notes} 
          onAddNote={onAddNote} 
          activeNote={activeNote}
          setActiveNote={setActiveNote}
        />
        <Main 
          notes = {notes} 
          onDeleteNote={onDeleteNote}
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
        />
      </div>
    </div>;
}

export default Body;
