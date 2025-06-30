import React from 'react';
import UserPayload from "../ContextAPI/UserPayload";


export default function UserProfile() {
  const {userPayload}=React.useContext(UserPayload);
  let picture='';

 React.useEffect(()=>{
     picture=userPayload?.picture;

 },[userPayload])
  return (
    <div  className='border border-sky-500 p-5'>
      <ul>
        <li className="text-white">{userPayload.name}</li>
        <li className="text-white">{userPayload.email}</li>
        <li 
        className="w-fit"
        
        >
          <img src={picture} alt="" width={50}
          style={{
          borderRadius:'100px'
        }}
          />
        </li>
      </ul>
    </div>
  )
}
