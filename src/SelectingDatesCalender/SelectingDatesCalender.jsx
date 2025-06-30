import React from 'react'
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TitleControlledComponents from './TitleControlledComponents';
import ControlledComponents from './ControlledComponents';
import ExpensesObject  from '../ContextAPI/ExpensesObject';
import PopUpDisplayStatus from '../ContextAPI/PopUpDisplayStatus';
import UserObject from '../ContextAPI/UserObject';
import axios from "axios";
// import excludeVariablesFromRoot from '@mui/material/styles/excludeVariablesFromRoot';

// import { FromToDatesSelected } from '../App';
// import { Title } from 'chart.js';
// import { InputTitleValue,ExpenseValue } from "../App";
const Container=styled.div`
display:flex 
`
const Panel=styled.div`
flex:${props=>props.weight}
`
function SelectingDates(){

  const [title,setTitle]=React.useState('');
  const [expense,setExpense]=React.useState('');
  const weekDays=['Su','Mo','Tu','We','Th','Fr','Sa'].map((item,index)=><p className="paragraph--weekdays--tag" key={index}>{item}</p>)
  const [months]=React.useState(["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);
  const [currentDate,setCurrentDate]=React.useState(new Date());
  const [addMoneyStatus,setAddMoneyStatus]=React.useState(true);
  const [editTitleStatus,setEditTitleStatus]=React.useState(false);
  const [costAmount,setCostAmount]=React.useState(0);
  const {expensesObject,setExpensesObject}=React.useContext(ExpensesObject);
  const {setDisplayPopUp} = React.useContext(PopUpDisplayStatus);
  const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate();
  const [selectedDates,setSelectedDates]=React.useState({0:1});
  const {userObject,setUserObject} = React.useContext(UserObject);

  const handleDates=(date)=>{

    const currentYear=date.getFullYear();
    const currentMonth=date.getMonth();
    const firstDayMonth=new Date(currentYear,currentMonth).getDay();
    const previousMonthDatesDisplay=daysInMonth(currentYear,currentMonth-1);
    const currentNumberOfDates=daysInMonth(currentYear,currentMonth);
    const days_in_display=[];
    for(let i=firstDayMonth-1;i>=0;i--){
      let datePrev=previousMonthDatesDisplay-i;
      // generating the pattern to store the date  in selected dates object
      let month=currentMonth===0?`${currentYear-1}12`:`${currentYear}${currentMonth<=9?"0"+currentMonth:currentMonth}`;
      let valueDate=Number.parseInt(`${month}${datePrev<=9?"0"+datePrev:datePrev}`);
      let stringNumber=`${datePrev}, ${months[currentMonth===0?11:currentMonth-1]}, ${currentMonth===0?currentYear-1:currentYear}`;
      // if the selected dates is already there in selectedDates object we are retaining the status as it is 
      let status=valueDate in selectedDates;
      // creating the previous months dates 
      days_in_display.push({
        id:nanoid(),
        date:datePrev,
        status:'prev',
        value:valueDate,
        stringValue:stringNumber,
        currentStatus:status
      })
    };

    for(let i=1;i<=currentNumberOfDates;i++){
      // generating the pattern 
        let valueNow=Number.parseInt(`${currentYear}${(currentMonth+1)<=9?"0"+(currentMonth+1):currentMonth+1}${i<=9?"0"+i:i}`);
        let stringNumber=`${i<=9?"0"+i:i}, ${months[currentMonth]}, ${currentYear}`
        let status=valueNow in selectedDates;
           days_in_display.push({
              id:nanoid(),
              date:i,
              status:'current',
              value:valueNow,
              stringValue:stringNumber,
              currentStatus:status
      });
    }
     
    const nextDates=42-days_in_display.length;
    for(let i=1;i<=nextDates;i++){
      let nextDate=i;
      let monthNext=currentMonth===11?`${currentYear+1}1`:`${currentYear}${(currentMonth+2)<=9?"0"+(currentMonth+2):currentMonth+2}`
      // generating sequence of month pattern 
      let valueNow=Number.parseInt(`${monthNext}${nextDate<=9?"0"+nextDate:nextDate}`);
      let stringNumber=`${nextDate}, ${months[currentMonth===11?0:currentMonth+1]}, ${currentMonth===11?currentYear+1:currentYear}`;
      // retaining the status as it is 
      let status=valueNow in selectedDates;
        days_in_display.push({
          id:nanoid(),
          date:i,
          status:'next',
          value:valueNow,
          stringValue:stringNumber,
          currentStatus:status
        })
    }
    return days_in_display;
  }

  const [dates,setDates]=React.useState( 
    JSON.parse(localStorage.getItem('dates'))||
     handleDates(currentDate));
 
  const handlePreviousMonth=()=>{
    const previousMonth=new Date(currentDate.getFullYear(),currentDate.getMonth()-1,1);
    setDates(handleDates(previousMonth));
        setCurrentDate(previousMonth)
  }
  const handleNextMonth=()=>{
    const nextMonth=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,1);
    setDates(handleDates(nextMonth));
    setCurrentDate(nextMonth);
  };
  React.useEffect(()=>{

    const handleScroll=(event)=>{
      if(event.deltaY<0) handlePreviousMonth();
      if(event.deltaY>0) handleNextMonth();
    };

    const selected_month_element=document.querySelector(".poppup--calender--display");
    selected_month_element.addEventListener('wheel',handleScroll);
    return ()=>selected_month_element.removeEventListener('wheel',handleScroll);

  });
  

  
  React.useEffect(()=>{
  
     const updatesSelectedDates={...selectedDates};
    dates.forEach((item)=>
       {
        if(item.currentStatus){
          updatesSelectedDates[item.value]=item.stringValue
        }
        else{
          if(item.value in updatesSelectedDates){
           
            delete updatesSelectedDates[item.value];
          }
        }
    });
    
    setSelectedDates(updatesSelectedDates);
  },[dates,setDates]);


  const handleOnClickDatesSelected=(value)=>{
    // pseudo code 
    // if the length of the selected dates is exceeding more than two we have
    // perform deactivating it 
    if(Object.keys(selectedDates).length<3 && !(value in selectedDates)){
        
      setDates(prev=>
        prev.map((item)=>
          item.value===value?{
            ...item,
            currentStatus:true
          }:{...item}));
       }else{
      setDates(prev=>
        prev.map((item)=>
          item.value===value?{
            ...item,
            currentStatus:false 
          }:{...item}));
    } 
  }

  // for optimizing the input field 
  // for every key stroke the fc id re-rendering and we have to look optimizing the input fields
  // handle on change only when the specific event is triggered 
  //  https://dev.to/kevinkh89/how-to-solve-input-delay-lagging-in-react-j2o 

  React.useEffect(()=>{
    // localStorage.setItem('selectedDates',JSON.stringify(selectedDates));
    localStorage.setItem('dates',JSON.stringify(dates));
   
  },[selectedDates,dates]);


  React.useEffect(()=>{
    const element=document.querySelector("#title--input--tag")
      const handleOnFocus=(element)=>{
        if(document?.activeElement!==element){
          document.activeElement.blur();
          element.focus(); 
        }
      }
      element?.addEventListener('click',handleOnFocus(element));
      element?.removeEventListener('click',handleOnFocus(element));
  })



  const handleOnSubmitCreateExpense=async()=>{ 
    
    const createNewExpenses=(title,value,datesSelected)=>{

      let mapData={}
    
      datesSelected?.map((item)=>
        mapData[item[1]]=item[0]
      )
      const newExpenses={
        id:nanoid(),
        title:title,
        value:value,
        time:new Date(),
        dates:mapData
      }
      if(expensesObject){
        console.log("Creating the Expense Object : ",expensesObject)
        setExpensesObject(prev=>([...prev,newExpenses])); 
      }
      else{
        setExpensesObject([{...newExpenses}]);
      }
      return newExpenses;
    };
    setDisplayPopUp(prev=>!prev)
    let result=createNewExpenses(title,costAmount,[[selectedDates[Object.keys(selectedDates)[1]],Object.keys(selectedDates)[1]],[selectedDates[Object.keys(selectedDates)[2]],Object.keys(selectedDates)[2]]])
    // after success full creation of expense tag sending request to backend 
    const formData = new FormData();
    formData.append("mail",userObject.mail);
    formData.append("expense",JSON.stringify(result));
    formData.append("savings",userObject.savings? userObject.savings : 0);
    formData.append("expense_amt",userObject.expense_amt? userObject.expense_amt : 0)
    
    try{
        const response = await axios.post("http://localhost:7000/add-expense",
        formData,{
            headers:{
              'Content-Type':'multipart/form-data'
            },
             withCredentials:true
            });
            setUserObject({
              ...userObject,
              savings:response.data.user_model.savings,
              expense_amt:response.data.user_model.expense_amt,
              expenditure:[...userObject.expenditure,{...result}]
            })
            
        }catch(error){
          console.log(error)
      }
  }

 
  
  React.useEffect(()=>{
      
    
    const generatePattern=(date)=>{
         date=date?.toString();
         return date?.slice(4,6)+"/"+date?.slice(6,8)+"/"+date?.slice(0,4);

    }
    if(Object.keys(selectedDates).length>=3){

      
      const fromDate=new Date(generatePattern(Object.keys(selectedDates)[1]));
      const toDate=new Date(generatePattern(Object.keys(selectedDates)[2]));
      const difference=(toDate.getTime()-fromDate.getTime())/(1000*3600*24);
      setCostAmount(difference*expense||0)
    }

  },[selectedDates,expense]);

  console.log(expensesObject);
 
  return (
    <>
    <Container className="container--tag--calender w-[90%] mt-[2%] ml-[5%] ">
      <Panel weight={3} className="parent-panel-calender  ">
          <div className="calender--display--tag ">
          <div className="  flex flex-col items-center  w-[100%]">
          <div className='flex'>
          <p>{currentDate.toLocaleString("default",{month:'long'})},</p>
          <span className="w-[10px]"></span>
          <p>{currentDate.toLocaleString("default",{year:'numeric'})}</p>
          <span className="flex arrow-tag">  
            <ArrowDropUpIcon onClick={handlePreviousMonth}/>
            <ArrowDropDownIcon onClick={handleNextMonth}/>
              </span>   
          </div>
          </div>
          <div className='weekdays--grid--display  mt-[10%]'>
          {weekDays}
          </div>
          <div className="gap-x-2  poppup--calender--display">

          {dates.map((item)=>
           <div className={`m-0 pt-2 pb-3 date--poppup--calender ${item.status!=='current'?'deactivate---tag':''} ${item.currentStatus?"date--poppup--calender-active":""}`} onClick={()=>handleOnClickDatesSelected(item.value)} key={item.id}>
           <p >{item.date}</p>
         </div>
          )}
          </div>
          </div>
      </Panel>
      <Panel weight={2}>
        <div className="h-[50vh]">      
          {addMoneyStatus && 
          <div className="p-4 text-white text-center mt-[3%]">
                <div className="flex justify-around text-center p-2">
                       <p>From</p>
                       <p>To</p>
                </div>
                <div className="flex justify-around text-center h-[20px]">
                       <p>{selectedDates && selectedDates[Object.keys(selectedDates)[1]]}</p>
                       <p>{selectedDates && selectedDates[Object.keys(selectedDates)[2]]}</p>
                </div>

            {/* giving the title */}
          <ControlledComponents
            expense={expense}
            handleOnChangeExpense={(e)=>setExpense(e.target.value)}
            setEditTitleStatus={setEditTitleStatus}
            setAddMoneyStatus={setAddMoneyStatus}
            costAmount={costAmount}

            />
          </div>}
          { editTitleStatus &&
          <div>
            <TitleControlledComponents
             setAddMoneyStatus={setAddMoneyStatus}
             setEditTitleStatus={setEditTitleStatus}
             title={title}
             handleOnSubmitCreateExpense={handleOnSubmitCreateExpense}
             setTitle={setTitle}
            />
           </div>}
        </div>
      </Panel>
    </Container>
    </>
  )
};


export default SelectingDates;