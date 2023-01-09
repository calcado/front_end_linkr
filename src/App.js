import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Timeline from "./pages/timeline.js";
import Trending from "./Trending.js";

import {useState} from "react"
import { UserPage } from "./pages/UserPage.js";

function App() {

  const [token, setToken] = useState()
  const [picture, setPicture] = useState()

  return (
    <>
    <GlobalStyle/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn setToken={setToken} setPicture={setPicture}/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/timeline" element={<Timeline/>} />
        <Route path="/hashtag/:hashtag" element={<Trending/>} />
        <Route path="/user/:id" element={<UserPage/>} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;