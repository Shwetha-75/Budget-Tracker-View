import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {PopUpDisplayStatus} from "../App";
import SelectingYears from '../SelectingYear/SelectingYear';
import SelectingMonths from '../SelectingMonthsCalender/SelectingMonthsCalender';
import SelectingDates from '../SelectingDatesCalender/SelectingDatesCalender';

// import { nanoid } from 'nanoid';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function reducer(state,action){
      if(action.type==="dates"){
        return({
          input:'date'
        })
      }
        else if(action.type==="months"){
             return({
              input:'month'
             })
        }

        else if(action.type==="year"){
          return({
            input:'year'
          })
        }

       
      
}
export default function PopUpDisplay() {
   
  const {setDisplayPopUp}=React.useContext(PopUpDisplayStatus);
  const [state,dispatch]=React.useReducer(reducer,{input:'date'})
  const handleOnClickClose=()=>{
       setDisplayPopUp(prev=>!prev)
  }



  return (

    <div className="overlay--background--tag">
    <div className="overlay---tag">

    <div className="absolute right-5 top-5 text-center">
    <CloseIcon onClick={handleOnClickClose} className="close--icon--tag" fontSize='large'/>
  </div>    

  <div>
      <div className="w-[100%] flex justify-around mt-[20px]">
        <label className={`text-white p-3 option---selection--tag ${state.input==="date"?"active--border":""}`}>
          Select Dates
          <span>
          <input
          
          onClick={()=>{
            dispatch({
              type:'dates',
              
            })
          }}
          type="radio" className="opacity-0"/>
            </span>
          </label>
        <label className={`text-white p-3 option---selection--tag  ${state.input==='month'?"active--border":""}`}>
          Select Months
          <span>
          <input 
           onClick={()=>{
           dispatch({
             type:'months',
            })
          }}
          type="radio" className="opacity-0"/>
            </span>
          </label>
        <label className={`text-white p-3 option---selection--tag ${state.input==="year"?"active--border":""}`}>
          Select Year
          <span>
          <input 
         
         onClick={()=>{
           dispatch({
              type:'year',
             
            })
          }}
          type="radio" className="opacity-0"/>
            </span>
          </label>
      </div>

      {state.input==="date"  && 
      <>
      <SelectingDates 
       className="label---selected--tag"/>
   </>
      
      }
      {state.input==='month' &&  <SelectingMonths className="label---selected--tag"/>}
      {state.input==="year" &&   <SelectingYears className="label---selected--tag"/>}
    </div>        
  </div>

          </div>
  
  )
}
