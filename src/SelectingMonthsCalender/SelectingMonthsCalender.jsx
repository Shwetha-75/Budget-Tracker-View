import React from 'react'
import styled from 'styled-components'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { nanoid } from 'nanoid';

export default function SelectingMonths() {
    const [currentDate,setCurrentDate]=React.useState(new Date());
    const [year,setYear]=React.useState(currentDate.getFullYear());
    const [selectedMonths,setSelectedMonths]=React.useState(JSON.parse(localStorage.getItem('selectedMonths'))||{0:0});

    
    const Container=styled.div`
         display:flex 
    `
    const [months]=React.useState(["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);

const generateMonths=(year)=>{
    return handleGeneratingMonths(year);
  }
//   updating the status 
     const handleGeneratingMonths=(year)=>{
          const display_months=[];
          for(let i=0;i<12;i++){
             let value_month=`${i}${year}`;
             let status=value_month in selectedMonths;
             display_months.push({
                id:nanoid(),
                month:i,
                current_year:year,
                current_status:status,
                value:value_month
             })
          }

          return display_months;
           
     }

     const Panel=styled.div`
     flex:${props=>props.weight}
   `


     const [monthsArray,setMonthsArray]=React.useState(JSON.parse(localStorage.getItem("monthsArray"))||generateMonths(new Date().getFullYear()))
    const handleOnClickPresentYear=()=>{

        const previousYear=new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));
        setYear(previousYear.getFullYear());
        setCurrentDate(previousYear)
        setMonthsArray(generateMonths(previousYear.getFullYear()));
    };

    const handleOnClickNextYear=()=>{
        const nextYear=new Date(currentDate.setFullYear(currentDate.getFullYear()+1));
        setYear(nextYear.getFullYear());
        setCurrentDate(nextYear)
        setMonthsArray(generateMonths(nextYear.getFullYear()));
    };
    
    
   

React.useEffect(()=>{
    localStorage.setItem('monthsArray',JSON.stringify(monthsArray));
   localStorage.setItem('selectedMonths',JSON.stringify(selectedMonths));
})


React.useEffect(()=>{
    const handleOnScroll=(event)=>{
        if(event.deltaY<0) handleOnClickPresentYear();
        if(event.deltaY>0) handleOnClickNextYear();
    }
        const selected_month_element=document.querySelector(".grid--month--display");
        selected_month_element.addEventListener("wheel",handleOnScroll);
        return ()=>selected_month_element.removeEventListener("wheel",handleOnScroll);
    
})

React.useEffect(()=>{
      const storedSelectedMonths={...JSON.parse(localStorage.getItem('selectedMonths'))};
      monthsArray.forEach((item)=>{
        if(item.current_status){
            storedSelectedMonths[item.value]=`${months[item.month]}, ${item.current_year}`
        }
        else{
            if(item.value in storedSelectedMonths)
                delete storedSelectedMonths[item.value];
        }
      });

      setSelectedMonths(storedSelectedMonths);
},[monthsArray,months])

const handlOnClickMonthsPerYear=(value)=>{

    if(Object.keys(selectedMonths).length<3 && !(value in selectedMonths)){
            
        setMonthsArray(prev=>

            prev.map((item)=>
               item.value===value?{
                ...item,
                current_status:true
               }:{...item}
            )
        )
    }
    else{
        setMonthsArray(prev=>

            prev.map((item)=>
               item.value===value?{
                ...item,
                current_status:false 
               }:{...item}
            )
        )
    }
    
};

return (
        <div className="flex flex-col justify-center items-center mt-[10%]">

        <Container  className=' justify-between flex w-[90%]'>

        <Panel weight={2} className='w-[90%] mr-[5%]'>
                <div className="flex flex-col items-center justify-center">
                  <div className="w-[100%] flex flex-row justify-between">
                   <p className='text-white  cursor-pointer' onClick={handleOnClickPresentYear}><ArrowLeftIcon/></p> 
                   <p className='text-white  text-center'>{year}</p> 
                   <p className='text-white  cursor-pointer' onClick={handleOnClickNextYear}><ArrowRightIcon/></p>
                  </div>
                </div>

            <div  className='grid--month--display'>
                {monthsArray.map((item)=>
                    <p key={item.id}  
                       onClick={()=>handlOnClickMonthsPerYear(item.value)}
                       className={`text-center text-white mt-[10%] py-[14%] months--per--tag ${item.current_status?"months--per--tag--active":""}`}
                    >{months[item.month]}</p>
                )}
            </div>
    </Panel>

    <Panel weight={2} className="text-white">   
 
        <div>
        <h3  className="title---tag text-center p-4">Expense</h3>

        </div>
        <div  className="flex flex-col items-center justify-center">
                  <div  className="flex justify-around w-[80%] text-white">
                      <p className='p-2'>From</p>
                      <p className='p-2'>To</p>
                  </div>
                 <div className="flex justify-around w-[80%] text-white">
                      <p className='h-[40px]'>{selectedMonths && selectedMonths[Object.keys(selectedMonths)[1]]}</p>
                      <p className='h-[40px]'>{selectedMonths && selectedMonths[Object.keys(selectedMonths)[2]]}</p>
                 </div>
        </div>
        <div>
        <input className="input--tag--expense text-white" type="text" name="Expense 1" />

        </div>
    </Panel>
    </Container>

    <Container className="w-[80%] m-[5%] mt-[3%] relative">
  {/* Other content */}
  <div className="fixed bottom-0 left-[5%] w-[90%] flex justify-around mb-4">
    <button className=" p-4 w-[20%] text-center text-white">Save</button>
    <button className=" p-4 w-[20%] text-center text-white">Cancel</button>
  </div>
</Container>
    </div>
  )
}
