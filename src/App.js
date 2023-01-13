import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./GlobalStyles.js";
import SignIn from "./SignIn.js";
import SignUp from "./SignUp.js";
import Timeline from "./pages/timeline.js";
import Trending from "./Trending.js";
import userContext from "./userContext.js";
import { useContext, useState } from "react"
import { UserPage } from "./pages/UserPage.js";
import TopBar from "./TopBar.js";

function App() {

  const [userInfo, setUserInfo] = useState()

  return (
    <userContext.Provider value={[userInfo, setUserInfo]}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<TopBar/>} />
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/hashtag/:hashtag" element={<Trending />} />
          <Route path="/user/:id" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;