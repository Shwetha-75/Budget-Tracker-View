import React from 'react'
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
// import AddIcon from '@mui/icons-material/Add';
import { nanoid } from "nanoid";
// import PopUpDisplay from './PopUpDisplay';
import UserObject from "../ContextAPI/UserObject"
import ExpensesObject from '../ContextAPI/ExpensesObject';
import PopUpDisplayStatus from '../ContextAPI/PopUpDisplayStatus';
import axios from "axios";

export default function MainCalender() {

  const {userObject}=React.useContext(UserObject);
  const { expensesObject } = React.useContext(ExpensesObject);

  const weekDays = ['Sunday', 'Monday', "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((item, index) => {
    return <p key={index} className='each--date--tag--week p-7 w-[14.2%]   text-center bg-sky-500 bg-opacity-10'>{item}</p>

  });
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const days_month = (year, month) => new Date(year, month + 1, 0).getDate();

  const generateDates = (date) => {
    const numberOfDates = days_month(date.getFullYear(), date.getMonth());
    return Array.from({ length: numberOfDates }, (_, i) => (
      {
        id: nanoid(),
        date: i + 1,
        status: false
      }
    ))
  }

  const [dateDays, setDateDays] = React.useState(generateDates(currentDate));

  const { setDisplayPopUp } = React.useContext(PopUpDisplayStatus);




  const handleGenerateDates = () => {
    const display_date = []
    const start_day = new Date(currentDate.getFullYear(), currentDate.getMonth()).getDay();
    for (let i = 0; i < start_day; i++) {
      display_date.push(<div key={`empty-${i}`} className="empty  w-[99%] ml-[0.5%] h-[98%]  text-center text-white p-[25%] bg-sky-500 bg-opacity-10 each--date--tag"></div>)
    };

    dateDays.forEach((item) => {
      display_date.push(

        <div key={item.id} className='relative w-[99%] ml-[0.5%] text-center text-white bg-sky-500 bg-opacity-10 p-[25%] each--date--tag'>
          <ul className="list-none absolute left-0 top-0" key={item.id}>
            {expensesObject?.map((list) => {
              const generatePattern = (date) => {
                date = date?.toString();
                return date?.slice(4, 6) + "/" + date?.slice(6, 8) + "/" + date?.slice(0, 4);
              }
              const value = new Date(`${currentDate.getMonth() + 1}/${item.date}/${currentDate.getFullYear()}`)
              const fromDate = new Date(generatePattern(Object.keys(list.dates)[0]));
              const toDate = new Date(generatePattern(Object.keys(list.dates)[1]));

              if (value >= fromDate && value <= toDate)
                return (
                  <li key={Math.random() * 0.2} className={`cursor-pointer w-[10%]  h-[15%] w-[10%] `}>{list.title}</li>
                )
              return ""
            }
            )}

          </ul>

          <p className="text-white opacity-50">{item.date}</p>
          <div className="absolute  bottom-0 right-2 text-white opacity-50 flex add---expenses---tag"
            >
            {/* <span>
              <AddIcon  className="add--expense--tag--plus"/>
              </span>  */}
              {(userObject?.salary!=='0' && userObject?.salary!==null) &&
               <p className='add--expense--tag' onClick={() => {setDisplayPopUp(prev => !prev)}}> Add Expense</p>
              }
          </div>
        </div>
      )
    })

    return display_date;
  }

  const handleNextMonth = () => {
    const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    setCurrentDate(nextDate);
    setDateDays(generateDates(nextDate));
  }

  const handlePreviousMonth = () => {
    const previousDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    setCurrentDate(previousDate);
    setDateDays(generateDates(previousDate));
  }

  const handleOnClickLanding = async () => {
    try {

      const response = await axios.get("http://localhost:4000/landing", {
        withCredentials: true
      });

    }
    catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className=" mt-[3vh]  calender---tag">
        <div className="flex w-[100%]  justify-between">
          <ArrowLeftIcon onClick={handlePreviousMonth} className="text-white" />
          <div className="monthly--yearly w-[10%] flex justify-around">
            <p className='month--tag text-center text-white' >{currentDate.toLocaleString("default", { month: 'long' })}</p>
            <p className='text-center text-white'>{currentDate.toLocaleString("default", { year: 'numeric' })}</p>
          </div>
          <ArrowRightIcon onClick={handleNextMonth} className="text-white" />
        </div>
        <div className='flex text-white justify-around'>
          {weekDays}
        </div>
        <div className='w-[100%] '></div>
        <div className='calender--date'>{handleGenerateDates()}
        </div>
        {/* <p onClick={handleOnClickLanding} className="text-white">Landing</p>     */}
      </div>

    </>

  )
}
