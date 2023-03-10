import ReactQuill from "react-quill";
import React, { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

function Main({ onDeleteNote, activeNote, onUpdateNote }) {

    const [title, setTitle] = useState(activeNote ? activeNote.title : '');
    const [body, setBody] = useState(activeNote ? activeNote.body : '');

    if (!activeNote) return <div className="no-active-note">Select a note, or create a new one.</div>;
  
    function handleTitleChange(event) {
        setTitle(event.target.value);
    }
  
    const handleBodyChange = (value) => {
        setBody(value.replace(/<\/?[^>]+(>|$)/g, ""));
    };
  
    const handleSaveClick = () => {
      onUpdateNote(title, body);
    };
    const currentDateAndTime = new Date().toISOString().slice(0, 16);
    return (
      <div className="app-main">
        <div className="app-main-note-edit">  
          <div className="main-header">
            <input type="text" id="title" autoFocus value={title} onChange={handleTitleChange} />
            <div className="click">
              <button type="button" id="save" onClick={handleSaveClick}>
                Save
              </button>
              <button type="button" id="delete" onClick={() => onDeleteNote(activeNote.id)}>
                Delete
              </button>
            </div>
            <p>
              <input type="datetime-local" id="time" defaultValue={currentDateAndTime} />
            </p>
          </div>
          <ReactQuill theme="snow" className="editor" value={body} onChange={handleBodyChange} />
        </div>
      </div>
    );
  }
  export default Main;  