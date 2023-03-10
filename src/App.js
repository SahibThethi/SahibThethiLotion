import { BrowserRouter, Routes, Route } from "react-router-dom";
import Body from "./Body";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/notes" element={<Body />}></Route>
        <Route path="/notes/:noteId" element={<Sidebar />}></Route>
        <Route path="/notes/:noteId/edit" element={<Main />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;