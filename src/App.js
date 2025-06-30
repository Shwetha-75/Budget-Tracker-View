import React from 'react';
// import Main from "./Main";
import LoginSuccess from './Component/LoginSuccess';
import{ BrowserRouter,Routes,Route} from "react-router-dom";
import UserStatus from "./ContextAPI/UserStatus";
import SelectedDatesCalendar from "./ContextAPI/SelectedDatesCalendar";
import FromToDatesSelected from "./ContextAPI/FromToDatesSelected";
import PopUpDisplayStatus from "./ContextAPI/PopUpDisplayStatus";
import InputTitleValue from "./ContextAPI/InputTitleValue"
import ExpenseValue from "./ContextAPI/ExpenseValue"
import Expenses from "./ContextAPI/Expenses"
import ExpensesObject from "./ContextAPI/ExpensesObject"
import UserDetails from "./ContextAPI/UserDetails"
import UserObject from "./ContextAPI/UserObject"
import Salary from "./ContextAPI/Salary"
import UpdatedUserSavings from "./ContextAPI/UpdatedUserSavings"
import CurrentEditableObject from "./ContextAPI/CurrentEditableObject"
import EditableObjectStatus from "./ContextAPI/EditableObjectStatus"
import CounterContext from "./ContextAPI/CounterContext"
import SalaryPoppUpDisplay from "./ContextAPI/SalaryPoppUpDisplay";
// import { error } from 'jquery';
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserLoginStatus from './ContextAPI/UserLoginStatus';
import UserPayload from './ContextAPI/UserPayload';

function App() {
  const [counter,setCounter]=React.useState(0);
  // userStatus lazy initialization 
  const [userStatus,setUserStatus]=React.useState(()=>{

    let temp=sessionStorage.getItem('userStatus');
    return temp?JSON.parse(temp) : false
  });
  const [selectedDatesCalendar,setSelectedDatesCalendar]=React.useState([]);
  const [userRegistrationStatus,SetUserRegistrationStatus]=React.useState(false);
  const [displayPoppUp,setDisplayPopUp]=React.useState(false);
  const [inputTitleValue,setInputTitleValue]=React.useState('');
  const [expenseValue,setExpenseValue]=React.useState(0);
  const [expenses,setExpenses]=React.useState([]);
  const [fromToDatesSelected,setFromToDatesSelected]=React.useState([]);
  const[userPayload,setUserPayload]=React.useState(()=>{
    let temp=sessionStorage.getItem('userPayload');
    return temp?JSON.parse(temp):{}
  })
  const [userLoginStatus,setUserLoginStatus]=React.useState(()=>{
      let temp=sessionStorage.getItem('userLoginStatus');
      return temp?JSON.parse(temp):false;
  });
  const [expensesObject,setExpensesObject]=React.useState(()=>{
    try{
 
      let temp=sessionStorage.getItem("expensesObject");
       return temp ? JSON.parse(temp) : []
    }catch(error){
          return {}
    }
    });
  const [userObject,setUserObject]=React.useState(()=>{
    try{
      let temp=sessionStorage.getItem('userObject');
      return temp? JSON.parse(temp) : {}
    }catch(error){
      return {}
    }
   });
  const [userDetails,setUserDetails]=React.useState(()=>{
    try{

      let temp=sessionStorage.getItem('userDetails');
      return temp ? JSON.parse(temp) :{}
    }catch(error){
        return {}
    }
  });
  const [salary,setSalary]=React.useState(userObject?.salary);
  const [updatedUserSavings,setUpdatedUserSavings]=React.useState("");
  const [currentEditableObject,setCurrentEditableObject]=React.useState('')
  const [editableObjectStatus,setEditableObjectStatus]=React.useState('')
  const [salaryPoppUpDisplay,setSalaryPoppUpDisplay]=React.useState(false);
 
 React.useEffect(()=>{
    sessionStorage.setItem('userObject',JSON.stringify(userObject));
    sessionStorage.setItem('userDetails',JSON.stringify(userDetails));
    sessionStorage.setItem('expensesObject',JSON.stringify(expensesObject));
    sessionStorage.setItem('userLoginStatus',JSON.stringify(userLoginStatus));
    sessionStorage.setItem('userPayload',JSON.stringify(userPayload));
 })

  return (
    <GoogleOAuthProvider clientId='582547398987-fp7v77v7kjpqenus3uorevkps29978j7.apps.googleusercontent.com'>
      <UserStatus.Provider value={{userStatus,setUserStatus,userRegistrationStatus,SetUserRegistrationStatus}} >
      <CounterContext.Provider value={{counter,setCounter}}>
      <SelectedDatesCalendar.Provider value={{selectedDatesCalendar,setSelectedDatesCalendar}}>
      <PopUpDisplayStatus.Provider  value={{displayPoppUp,setDisplayPopUp}}>
      <FromToDatesSelected.Provider value={{fromToDatesSelected,setFromToDatesSelected}}>
      <ExpenseValue.Provider value={{expenseValue,setExpenseValue}}>
      <InputTitleValue.Provider value={{inputTitleValue,setInputTitleValue}}>
      <Expenses.Provider value={{expenses,setExpenses}}>
      <ExpensesObject.Provider value={{expensesObject,setExpensesObject}}>
      <UserDetails.Provider value={{userDetails,setUserDetails}}>
      <UserObject.Provider value={{userObject,setUserObject}}>
      <Salary.Provider value={{salary,setSalary}}>
      <SalaryPoppUpDisplay.Provider value={{salaryPoppUpDisplay,setSalaryPoppUpDisplay}}>
      <UpdatedUserSavings.Provider value={{updatedUserSavings,setUpdatedUserSavings}}>
      <EditableObjectStatus.Provider value={{editableObjectStatus,setEditableObjectStatus}}>
      <CurrentEditableObject.Provider value={{currentEditableObject,setCurrentEditableObject}}>
      <UserLoginStatus.Provider value={{userLoginStatus,setUserLoginStatus}}>
      <UserPayload.Provider value={{userPayload,setUserPayload}}>

      <div className='h-[100vh]'>
        <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Main/>}></Route> */}
          <Route path="/" element={<LoginSuccess/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
      
      </UserPayload.Provider>
      </UserLoginStatus.Provider>
      </CurrentEditableObject.Provider>
      </EditableObjectStatus.Provider>
      </UpdatedUserSavings.Provider>
      </SalaryPoppUpDisplay.Provider>
      </Salary.Provider>
      </UserObject.Provider>
      </UserDetails.Provider>
      </ExpensesObject.Provider>
      </Expenses.Provider>
      </InputTitleValue.Provider>
      </ExpenseValue.Provider>
      </FromToDatesSelected.Provider>
      </PopUpDisplayStatus.Provider>
      </SelectedDatesCalendar.Provider>
      </CounterContext.Provider>
      </UserStatus.Provider>
      </GoogleOAuthProvider>
  );
}
export default App;
