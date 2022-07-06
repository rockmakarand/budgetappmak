/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-lone-blocks */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Timestamp,collection, onSnapshot, orderBy, query, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, db, auth, app } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import './Yourex.css'
import { PieChart, Pie} from 'recharts';
import Piec from './Piec';
import { onAuthStateChanged, updateCurrentUser } from 'firebase/auth';
import{useCookies, removeCookies} from 'react-cookie'

export const Yourex = ({ userId }) => {
   

    const [user]=useAuthState(auth)
    const [search, setSearch]=useState("")
   
    
    const ALL_AMOUNT = localStorage.getItem("uid.amount")
  ? JSON.parse(localStorage.getItem("uid.amount"))
  : [];
  const [tran, setTran] = useState(ALL_AMOUNT);

   const searchb=(e)=>{
    e.preventDefault();
    setTran(tran.filter((tran)=>
    tran.product.toLowerCase().includes(search.toLocaleLowerCase())

    ))

   }
       
 
  useEffect(() => {
    //const articleRef=app.database().ref('transac/'+userId)
    const articleRef = collection(db, "/transac/");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
        
       
      const tran = snapshot.docs.map((uid) => ({
       
        id: userId,
        ...uid.data(),
      }));
      
      setTran(tran);
      console.log(tran);
      //console.log(userId)
      //console.log(cn)
    });
  }, []);
  const handleDelete = async (id) => {
    const postDoc = doc(db, "transac", id);
    await deleteDoc(postDoc);
  }
  
  return(
      

    <div className='ff'>
       <form onSubmit={(e)=>{searchb(e)}}>
       <input type="text" onChange={(e)=>{setSearch(e.target.value)}} ></input>
       <button type='submit'>submit</button>
       </form>
        <br/>
                    <br/>
                    <br/>
                    <br/>
                   
        
       


  
  {tran.map(
                ({
                  product,
                  amount,
                  createdAt, createdBy, userId,id
          
                }) => 
        {
         
            
                    
          if(user.uid===userId)
        {
         
               
               
             
           
          
            return(

                
                <div className='mn'>
                   
                <h5>{product}</h5>
               
                <h5> ₹ {amount}</h5>
                
                <button
                    onClick={() => {
                      handleDelete(id);
                    }}
                  >
                    {" "}
                    &#128465;
                  </button>
                
               
                
                <br/>
               
                <h4>
                Total:{" "}
                <span className="text-success">
                  ₹{" "}
                  {tran.reduce((total, currentValue) => {
                   if(user.uid===userId)
                   {
                   
                    return( (total+ parseFloat(currentValue.amount)));
                   
                   }
                   
                    
                  }, 0)}
                  
                </span>
              </h4>
               
              <br/>
             
               
               </div>
               
                
               




            
    
    
    
                
      
             
    
    
    
              )
              
             
              
              
          }
          
          
        }

          
              )
    }
    <br/>
    <br/>
    
    
    
    
    
    
    
    </div>
    
  
)
}
