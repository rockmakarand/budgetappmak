/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable no-unused-vars */
import { auth, db } from "../firebase";
import React,{ useState } from "react";
import { signOut } from "firebase/auth";
import RemoveCookie from "./RemoveCookie";




const Account = () => {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      RemoveCookie(auth);
      window.location.pathname = "/login";
    });
  };
  if(isAuth)
  {
    return (
    
        <div>
          <br/>
            <br/>
           
            <div className="iuu">
            <br/>
            <br/>
            <br/>
            <br/>
            <button onClick={signUserOut} style={{width:150, backgroundColor:'violet',color:'white',height:40,borderRadius:20}} className="jj"> <b style={{fontSize:18}}>Log Out</b></button>
           
        <br/>
        <br/>
        
        <h2 style={{textAlign:'center',marginLeft:10,marginRight:10}}> Name:{auth.currentUser.displayName}</h2>
        <br/>
        <h2 style={{textAlign:'center',marginLeft:10,marginRight:10}}>Email:{auth.currentUser.email}</h2>
        <br/>
        <h2 style={{textAlign:'center',marginLeft:10,marginRight:10}}>Profile Picture:</h2>
        <img src={auth.currentUser.photoURL} className="bb"></img>
        </div>
        <br/>
        </div>
      )
    }
    
  }
 
export default Account