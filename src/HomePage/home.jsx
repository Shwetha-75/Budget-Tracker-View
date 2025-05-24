import React from 'react';
import LoginForm from './LoginForm';
import axios from "axios";

export default function Home() {

  const [data,setData]=React.useState("");

  React.useEffect(()=>{
      axios.get("http://127.0.0.1:5000/")
      .then(response=>{
        setData(prev=>prev=response.data.message);
        console.log(data+"............");
      }).catch(error=>{
        console.error("Error while fetching the data",error)
      });
  });

  return (
    <div>
          
       
       <LoginForm/>
       
    </div>
  )
}
