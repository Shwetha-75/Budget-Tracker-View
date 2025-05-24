import React from 'react'
import "./dates.css";
import Expenses from '../Component/Expenses';
// import Expenses from '../Component/Expenses';
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { nanoid } from 'nanoid';
import { CounterContext } from '../App';
import { SelectedDatesCalendar } from '../App';
export default function Dates(props) {
    
    // storing all the selected dates 
    const[selectedDates,setSelectedDates]=React.useState();
    // setup the counter when the dates are selected 
    const {counter,setCounter}=React.useContext(CounterContext);
    const {setSelectedDatesCalendar}=React.useContext(SelectedDatesCalendar);
    // displaying the weekdays 
    const weekdays=['Su','Mo','Tu','We','Th','Fr','Sa'].map((item,index)=>
    <p key={index}>{item}</p>
    );
// initializing the current date object 
   const [currentDate,setCurrentDate]=React.useState(new Date());
//    selecting all the dates in the month 
   const [month,setMonth]=React.useReducer(month=>!month,false);
//    func: calculate the number of days in a particular month 
   const daysInMonth=(year,month)=>new Date(year,month+1,0).getDate();
// generating the month for the whole month based on the date passed parameter
   const generateDates=(date)=>{
       const numberOfDates=daysInMonth(date.getFullYear(),date.getMonth());
       return Array.from({length:numberOfDates},(_,i)=>
    (
        {
            id:nanoid(),
            date:i+1,
            status:false,
            
        }
    )
    )
    }
    // initially creating the list of dates for a month
    const [datesDisplay,setDatesDisplay]=React.useState(generateDates(currentDate));
    // 
    const handleOnClickMonth=()=>{
        if(!month){
              setDatesDisplay((prev)=>
               prev.map((item)=>(
                {
                    ...item,
                    status:true
                }
               )
            )
            )
        
        }
        else{
            setDatesDisplay((prev)=>
                prev.map((item)=>(
                 {
                     ...item,
                     status:false
                 }
                )
             )
             )    
            
        }
       setMonth();
    }

    // func: generating the dates 
    const handleGenerateDates=()=>{
       const startDay=new Date(currentDate.getFullYear(),currentDate.getMonth()).getDay();

       const display_dates=[];
       for(let i=0;i<startDay;i++){
           display_dates.push(
        <p key={`empty-${i}`} className='empty'></p>
    )
   }

   
   datesDisplay.forEach((item)=>
   display_dates.push(
    <p key={item.id} className={item.status?'active':''} onClick={()=>handleOnClickDate(item)}>{item.date}</p>
   )
)

// selecting the particular date
const handleOnClickDate=(value)=>{
    setDatesDisplay((prev)=>
        prev.map((item)=>
        item.id===value.id?{...item,status:!item.status}:item
        )
    )
   }

return display_dates;
}


// on clicking previous month
 const handleOnClickPrevious=()=>{
    const previousDate=new Date(currentDate.getFullYear(),currentDate.getMonth()-1,1);

    setCurrentDate(previousDate);
    setDatesDisplay(generateDates(previousDate));
 }

//  on clicking next month
 const handleOnClickNext=()=>{
    const nextDates=new Date(currentDate.getFullYear(),currentDate.getMonth()+1,1);

    setCurrentDate(nextDates);
    setDatesDisplay(generateDates(nextDates));

 }


 React.useEffect(()=>{
    
    let timeId=setTimeout(()=>{
        let array=[];
        let count=0
        datesDisplay.forEach((item)=>{
            if(item.status){
                array.push(item);
             count++;
            }
        })
    
       setCounter(count);
       setSelectedDatesCalendar(array);
    },1000)


    return ()=>clearTimeout(timeId)
})   //do not include the counter, selected dates as it runs infinite loop the website may crash 
   



  return (
    <div className='w-[70%] ml-[15%]'>
        <div>
            <p>Calendar</p>
        </div>
        <div className='flex justify-between'>
            <ArrowLeftIcon onClick={handleOnClickPrevious}/>
           <p onClick={handleOnClickMonth}>{currentDate.toLocaleString("default",{month:'long'})}</p>
           <p>{currentDate.toLocaleString("default",{year:'numeric'})}</p>
           <ArrowRightIcon onClick={handleOnClickNext}/>
        </div>

        <div>
            <div className="flex justify-around">
              {weekdays}
            </div>

            <div className='flex date--display'>
               {handleGenerateDates()}
            </div>
        </div>
   <div>
    {counter>0 && 
    
    <Expenses
       onUpdate={props.onUpdate}
       expenses={props.expenses}
       onClick={props.onClick}
       onReduce={props.onReduce}
       selectedDates={selectedDates}
       setSelectedDates={setSelectedDates}
       />
    
    }


   </div>
 
  
    </div>
  )
}
