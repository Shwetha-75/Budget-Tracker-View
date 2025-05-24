import React from 'react';
import Main from "./Main";
import LoginSuccess from './Component/LoginSuccess';
import{ BrowserRouter,Routes,Route} from "react-router-dom";


export const UserStatus=React.createContext(null);
export const UserRegistrationStatus=React.createContext(null);
export const SelectedDatesCalendar=React.createContext(null);
export const CounterContext=React.createContext(0);
export const PopUpDisplayStatus=React.createContext(null);
export const InputTitleValue=React.createContext(null);
export const ExpenseValue=React.createContext(null);
export const FromToDatesSelected=React.createContext(null);
export const Expenses=React.createContext(null);
export const ExpensesObject=React.createContext(null);
export const Counter=React.createContext(0);
export const UserDetails=React.createContext(null);
export const UserObject=React.createContext(null);
export const Salary=React.createContext(null);
export const UpdatedUserSavings=React.createContext(null);
export const CurrentEditableObject=React.createContext(null);
export const EditableObjectStatus=React.createContext(null)


function App() {
  const [counter,setCounter]=React.useState(0);

  // userStatus lazy initialization 
  const [userStatus,setUserStatus]=React.useState(
    JSON.parse(localStorage.getItem('userStatus'))||
    false);
  const [selectedDatesCalendar,setSelectedDatesCalendar]=React.useState([]);
  const [userRegistrationStatus,SetUserRegistrationStatus]=React.useState(false);
  const [displayPoppUp,setDisplayPopUp]=React.useState(false);
  const [inputTitleValue,setInputTitleValue]=React.useState('');
  const [expenseValue,setExpenseValue]=React.useState(0);
  const [expenses,setExpenses]=React.useState([]);
  const [fromToDatesSelected,setFromToDatesSelected]=React.useState([]);
  const [expensesObject,setExpensesObject]=React.useState(JSON.parse(localStorage.getItem("expensesObject")) || []);
  const [userObject,setUserObject]=React.useState(JSON.parse(localStorage.getItem('userObject')) || {});
  const [userDetails,setUserDetails]=React.useState(JSON.parse(localStorage.getItem('userDetails'))||{});
  const [salary,setSalary]=React.useState(userObject?.salary);
  const [updatedUserSavings,setUpdatedUserSavings]=React.useState("");
  const [currentEditableObject,setCurrentEditableObject]=React.useState('')
  const [editableObjectStatus,setEditableObjectStatus]=React.useState('')


 React.useEffect(()=>{
    localStorage.setItem('userObject',JSON.stringify(userObject));
    localStorage.setItem('userDetails',JSON.stringify(userDetails));
    localStorage.setItem('expensesObject',JSON.stringify(expensesObject))
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
