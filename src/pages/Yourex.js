import React, { useState, useEffect } from 'react'
import { Timestamp,collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import './Yourex.css'
import { PieChart, Pie} from 'recharts';
import Piec from './Piec';

export const Yourex = () => {

    
    const ALL_AMOUNT = localStorage.getItem("amount")
  ? JSON.parse(localStorage.getItem("amount"))
  : [];
  const [tran, setTran] = useState(ALL_AMOUNT);

    
       
 
  useEffect(() => {
    const articleRef = collection(db, "transac");
    const q = query(articleRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tran = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTran(tran);
      console.log(tran);
    });
  }, []);
 
 
if(tran.userId===auth.uid)
  return(
      

    <div className='ff'>


  <br/>
  {tran.map(
                ({
                  product,
                  amount,
                  createdAt, createdBy, userId,total=0
          
                }) => (
                    
          <div className='mn'>
          <h5>{product}</h5>
         
          <h5> ₹ {amount}</h5>
          <h5>{createdAt.toDate().toDateString()}</h5>
          <br/>

         
      

       
       

         
          </div>
                        
         
          
          
                )
          
              )
    }
    <br/>
    <br/>
    <div>
                        <h4>
                          Total Expense:{" "}
                          <span className="text-success">
                            ₹{" "}
                            {tran.reduce((accumulator, tran) => {
                              return (accumulator += parseFloat(tran.amount));
                            }, 0)}
                          </span>
                        </h4>
                      </div> 
          
    
    
    
    
    
    
    
    
    </div>
    
  
)
}
