import React from 'react'
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
export default function SelectingYears() {

    const [currentDate]=React.useState(new Date());
    const [selectedYear,setSelectedYear]=React.useState(JSON.parse(localStorage.getItem("selectedYear"))||{0:0});

    const generateYears=(date,status)=>{
          if(status==='previous'){
            console.log("HEll")
            const previous=Array.from({length:12},(_,i)=>(

              
                {
                  id:nanoid(),
                  year: date-i
                  ,status: date-i in selectedYear         
                })
            )
            return previous.reverse();
          }

          else if (status==="next"){
            const next=Array.from({length:12},(_,i)=>(
                {
                  id:nanoid(),
                  year: date+i
                  ,status:date+i in selectedYear
                })
            )
            return next;

          }
          return Array.from({length:12},(_,i)=>(
            {
              id:nanoid(),
              year: date+i
              ,status: date+i in selectedYear
            })
        )
    }
    const [displayYear,setDisplayYear]=React.useState(JSON.parse(localStorage.getItem('displayYear'))||generateYears(currentDate.getFullYear(),"current"))


   const Container=styled.div`
      display:flex;
   `
    const Panel=styled.div`
      flex:${props=>props.weight};
    `
    const handleOnClick=(year)=>{
          if(Object.keys(selectedYear).length<3 && !(year in selectedYear)){
               setDisplayYear(prev=>
                prev.map((item)=>
                    item.year===year?{
                      ...item,
                      status:true
                    }:{
                      ...item
                    }
                )

               )
          } 

          else{
               

            setDisplayYear(prev=>
                 prev.map((item)=>
                    item.year===year?{
                      ...item,
                      status:false
                    }:{
                      ...item
                    }
                )

            )
          }
    }
    const handlePreviousYear=()=>{
        const previousYear=displayYear[0].year;
        console.log(previousYear)
        setDisplayYear(generateYears(previousYear,"previous"));
        

    }


    const handleNextYear=()=>{
        const nextYear=displayYear[displayYear.length-1].year;
        setDisplayYear(generateYears(nextYear,"next"));
      

    }
   
React.useEffect(()=>{
  localStorage.setItem('displayYear',JSON.stringify(displayYear));
  localStorage.setItem("selectedYear",JSON.stringify(selectedYear));
})
React.useEffect(()=>{
    const handleScroll=(event)=>{
        if(event.deltaY<0) handlePreviousYear();
        if(event.deltaY>0)  handleNextYear();
  
    }
    const element=document.querySelector(".column--years--display");
        element.addEventListener("wheel",handleScroll);

    return ()=>element.removeEventListener("wheel",handleScroll);
})



React.useEffect(()=>{
     
    // make a copy of selected year
    const copy_selected_years={...selectedYear};
    
     displayYear.forEach((item)=>{
      if(item.status){
           copy_selected_years[item.year]=item.year
      }
      else{
           if(item.year in copy_selected_years)
              delete copy_selected_years[item.year];
           
      }
     });
    setSelectedYear(copy_selected_years);
},[displayYear])

    return (
    <div className="flex flex-col items-center justify-center w-[100%]  mt-[5%]">
    <Container className=" w-[80%]">
    <Panel weight={3} className="w-[40%] ">

        <div>
                <span  onClick={handlePreviousYear} className="text-white"><ArrowDropUpIcon/></span>  
                <span  onClick={handleNextYear}className="text-white"><ArrowDropDownIcon/></span>
        </div>
         <div className="column--years--display text-white">
            {displayYear.map((item)=>
            <p key={item.id}  onClick={()=>handleOnClick(item.year)} className={`px-4 py-4 text-center  populating--year ${item.status?"populating--year--active":""}`}>{item.year}</p>
            )}
         </div>
    
       
 </Panel>
 
 <Panel weight={2} className="w-[40%]  flex flex-col items-center justify-center">
   <div className='w-[96%] p-5'>
    <h1 className="text-center text-white font-bold">Expense</h1>
   </div>
   <div  className="w-[96%] p-3 flex flex-col justify-center items-center">


    <div className="w-[80%] justify-around flex p-3">
        <p  className="text-center text-white">From</p>
        <p  className="text-center text-white">To</p>
    </div>

    <div className="flex justify-around w-[80%]  ">
        <p className="text-center text-white">{selectedYear[Object.keys(selectedYear)[1]]}</p>
        <p className="text-center text-white">{selectedYear[Object.keys(selectedYear)[2]]}</p>
    </div>
   </div>
    <div  className="  w-[96%] p-5 flex flex-col justify-center items-center">
      <input className="w-[100%]  input--tag--expense  text-white"/>
    </div>

 </Panel>

    </Container>

  
    <Container className="w-[80%] m-[5%] mt-[3%] relative">
  {/* Other content */}
  <div className="fixed bottom-0 left-[5%] w-[90%] flex justify-around mb-4">
    <button className="border border-sky-500 p-4 w-[20%] text-center text-white">Save</button>
    <button className="border border-sky-500 p-4 w-[20%] text-center text-white">Cancel</button>
  </div>
</Container>

    </div>
  )
}
