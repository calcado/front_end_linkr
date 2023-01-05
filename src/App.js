import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Timeline from "./Timeline.js";
import {useState} from "react"

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
        <Route path="/timeline" element={<Timeline token={token} picture={picture}/>} />
      </Routes>
    </BrowserRouter>
    </> 
  );
}

export default App;
