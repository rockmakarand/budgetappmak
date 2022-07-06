/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { Timestamp,collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db, auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Typewriter from "typewriter-effect";

import { Link } from "react-router-dom";
import './Home.css'
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
    const [user] = useAuthState(auth);
  const [formData, setFormData] = useState({
    product: "",
    amount: "",
    total:"",
   
    createdAt: Timestamp.now().toDate(),
  });

  const [tran, setTran] = useState([]);
 
  useEffect(() => {
    const traRef = collection(db, "transac");
    const q = query(traRef, orderBy("createdAt", "desc"));
    onSnapshot(q, (snapshot) => {
      const tran = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTran(tran);
      console.log(tran);
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

const handlePublish=()=>
{
    if ((!formData.product || !formData.amount>0) ) {
        alert("Please fill all the fields");
        return;
      }

      const articleRef = collection(db, "transac");
      addDoc(articleRef, {
        product: formData.product,
        amount: formData.amount,
       
       
        createdAt: Timestamp.now().toDate(),
        createdBy:user.displayName,
        userId:user.uid,
        total:formData.total
        
       
      })
      
}


return (

   
    <div className="ff" style={{ position: "fixed" }}>
        <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Typewriter
          options={{
            strings: "Welcome to Budget App ! Add Your Transactions here !",
            autoStart: true,
            loop: true,
          }}
        />
      </div>
        
        
      {!user ? (
        <>


          <h2>
            <Link to="/signin">Login to add transactions</Link>
          </h2>
        
        </>
      ) : (
        <>

        
          <h2>Enter Transactions for today</h2>
          <div className="form-group">
            <label htmlFor="">Product Name:</label>
            <input
              type="text"
              name="product"
              className="form-control"
              value={formData.product}
              onChange={(e) => handleChange(e)}
            />
          </div>

          {/* description */}
          <label htmlFor="">Amount</label>
          <input
            name="amount"
            className="form-control"
            value={formData.amount}
            type="number"
            onChange={(e) => handleChange(e)}
          />
         <br/>

        
         
          <br/>
          <button
            className="ol"
            onClick={handlePublish}
          >
            Publish
          </button>
          
        </>
      )}
   <br/>
   <br/>


              
             
              
              
                   
        


</div>




   
    



 );
 




}

export default Home 