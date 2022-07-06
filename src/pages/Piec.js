/* eslint-disable no-unused-vars */
import React,{useState,useEffect} from 'react'
import { Timestamp,collection, onSnapshot, orderBy, query, addDoc } from "firebase/firestore";
import { storage, db, auth } from "../firebase";
import {Chart as ChartJs, Tooltip, Title, ArcElement, Legend} from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';
ChartJs.register(
  Tooltip, Title, ArcElement, Legend
);




const Piec = () => {

   

    const [tran, setTran] = useState([]);
    const [data, setData] = useState({
        datasets: [{
            data: [],
            backgroundColor:[
              'red',
              'blue',
              'yellow'
            ]
        },
      ],
      labels: [
          'Red',
          'Yellow',
          'Blue'
      ], 
    });
  
    
       
 
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
   

  return (
    <div className="App" style={{width:'30%', height:'30%'}}>


        


     
    </div>
  )
}

export default Piec