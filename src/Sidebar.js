function Sidebar({ notes, onAddNote, activeNote, setActiveNote }){
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    return <div id = "app-sidebar">
        <div className = "app-sidebar-header">
            <h1>Notes</h1>
            <button id = "add" onClick={onAddNote}>&#43;</button>
        </div>
        <div className = "app-sidebar-notes">
            {sortedNotes.map(({ id, title, body, lastModified}) => (
            <div className={`app-sidebar-note ${id === activeNote && "active"}`} onClick={() => setActiveNote(id)}>
                <div className = "sidebar-note-title">
                    <strong dangerouslySetInnerHTML={{__html: title}}></strong>
                </div>
                <p>{formatDate(lastModified)}</p>
                <p dangerouslySetInnerHTML={{__html: body && body.substr(0, 100) + "..."}}></p>  
                
            </div>
            ))}
        </div>
    </div>
}
export default Sidebar;