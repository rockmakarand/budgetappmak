import React,{useState,useEffect} from 'react'
import { Timestamp,collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import { storage, db, auth } from "../firebase";

const Data=()=>{

    const [tran, setTran] = useState([]);
    
  
    
       
 
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
   
    return(
<div></div>
    )
}

export default Data