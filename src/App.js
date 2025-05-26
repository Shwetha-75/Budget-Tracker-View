import React from 'react';
import Main from "./Main";
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

// export const UserStatus=React.createContext(null);
// export const UserRegistrationStatus=React.createContext(null);
// export const SelectedDatesCalendar=React.createContext(null);
// export const CounterContext=React.createContext(0);
// export const PopUpDisplayStatus=React.createContext(null);
// export const InputTitleValue=React.createContext(null);
// export const ExpenseValue=React.createContext(null);
// export const FromToDatesSelected=React.createContext(null);
// export const Expenses=React.createContext(null);
// export const ExpensesObject=React.createContext({});
// export const Counter=React.createContext(0);
// export const UserDetails=React.createContext({});
// export const UserObject=React.createContext({});
// export const Salary=React.createContext('')
// export const UpdatedUserSavings=React.createContext(null);
// export const CurrentEditableObject=React.createContext(null);
// export const EditableObjectStatus=React.createContext(null)


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
  const [expensesObject,setExpensesObject]=React.useState(()=>{
       let temp=sessionStorage.getItem("expensesObject");
        return temp ? JSON.parse(temp) : []
      }
    
    );
  const [userObject,setUserObject]=React.useState(()=>{
       let temp=sessionStorage.getItem('userObject');
       return temp? JSON.parse(temp) : {}
   });
  const [userDetails,setUserDetails]=React.useState(()=>{
    let temp=sessionStorage.getItem('userDetails');
    return temp ? JSON.parse(temp) :{}
  });
  const [salary,setSalary]=React.useState(userObject?.salary);
  const [updatedUserSavings,setUpdatedUserSavings]=React.useState("");
  const [currentEditableObject,setCurrentEditableObject]=React.useState('')
  const [editableObjectStatus,setEditableObjectStatus]=React.useState('')


 React.useEffect(()=>{
    sessionStorage.setItem('userObject',JSON.stringify(userObject));
    sessionStorage.setItem('userDetails',JSON.stringify(userDetails));
    sessionStorage.setItem('expensesObject',JSON.stringify(expensesObject))
 })

  return (
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
      <UpdatedUserSavings.Provider value={{updatedUserSavings,setUpdatedUserSavings}}>
      <EditableObjectStatus.Provider value={{editableObjectStatus,setEditableObjectStatus}}>
      <CurrentEditableObject.Provider value={{currentEditableObject,setCurrentEditableObject}}>


      <div className='h-[100vh]'>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
          <Route path="/login" element={<LoginSuccess/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>


     </CurrentEditableObject.Provider>
     </EditableObjectStatus.Provider>
      </UpdatedUserSavings.Provider>
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
  );
}



export default App;
