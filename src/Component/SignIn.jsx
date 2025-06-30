import { GoogleLogin } from '@react-oauth/google';
import UserPayload from '../ContextAPI/UserPayload';
import React from 'react';
import UserLoginStatus from '../ContextAPI/UserLoginStatus';
import axios from 'axios';


function SignIn() {
  const {setUserPayload}=React.useContext(UserPayload);
  const {setUserLoginStatus}=React.useContext(UserLoginStatus);
  const handleGoogleLoginSuccess =async(credentialResponse) => {
    try{
        
        let tokenId={
            tokenId:credentialResponse.credential
        }
        const response = await axios.post("http://localhost:7000/login-service",{tokenId},{
             headers:{
                 'Content-Type':'application/json'
             },
             withCredentials:true
        })
          let result=response.data
          if(result['status']==='yes'){
              let token={
                random_token_id:response.headers[process.env.REACT_APP_AUTHORIZATION]
              }
              let data={
                email:result['email'],
                name:result['name'],
                picture:result['picture']
              }
              setUserPayload(data);
              sessionStorage.setItem("token",JSON.stringify(token));
              setUserLoginStatus(true);

          }
       }catch(error){
          console.log(error)
       }
  
  }
  const handleGoogleLoginError = () => {
    console.log('Google Sign-In Failed');
    // Handle login failure, e.g., show an error message
  };

  return (
    <div>
      <h2>Sign In with Google</h2>
      <GoogleLogin
        onSuccess={(cred)=>console.log(cred.credential)}
        onError={handleGoogleLoginError}
        size="large"
        text="signin_with"
        theme="outline"
        type="standard"
        auto_select={true}
      />
     
    </div>
  );
}

export default SignIn;