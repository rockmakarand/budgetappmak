import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import { Yourex } from "./pages/Yourex";
import Login from "./pages/Login";
import { useState } from "react";
//import { signOut } from "firebase/auth";
//import { auth } from "./firebase-config";

//import {AuthContextProvider} from './pages/AuthContext'
//import Protected from './pages/Protected'
import Account from "./pages/Account";

import Navbar from "./pages/Navbar";
import Piec from "./pages/Piec";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  

  return (
    <Router>
      <nav>
      

        {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Navbar/>
            
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/yourex" element={<Yourex isAuth={isAuth} />} />
        <Route path="/piec" element={<Piec isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/account" element={<Account setIsAuth={setIsAuth} />} />

      </Routes>
    </Router>
  );
}

export default App;