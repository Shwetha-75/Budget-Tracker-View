import React from 'react'
import "./loginSuccess.css";
import {CounterContext} from "../App";
export default function Expenses(props) {

  const {counter}=React.useContext(CounterContext);

  // editing the expenses 
const [isEditing,setIsEditing]=React.useState([false,'']);
//  initial creating the expense or by editing 
const [titleInput,setTitleInput]=React.useState({
  title:'',
  value:'',
 
});

// on change function for input tags 
const handleOnChange=(event)=>{
  event.preventDefault();
   setTitleInput(prev=>({
        ...prev,
        [event.target.name]:event.target.value
   }));
}

// editing the title tag
const handleOnEditing=(id)=>{
  isEditing[0] && isEditing[1]===id ?setIsEditing([false,'']):setIsEditing([true,id])
}


// saving the contents which is edited on the expense tag 
const handleOnSubmit=(event,id)=>{
  event.preventDefault();
  const copy_data=[titleInput,id]

  if(copy_data[0].value===''||copy_data[0].title===''){
    return;
  }
  props.onUpdate(id,copy_data[0].value,copy_data[0].title);
  setTitleInput({title:'',value:''});
  handleOnEditing(id);
}


// mapping through each expense tag


const array=props.expenses.map((item)=>(


    <div className='w-[100%] ' key={item.id}>

          <div  className='flex  border border-sky-500 '>
            <div className='flex w-[90%] h-[40px]  '>
              <p className='w-[40%]'>{item.title}</p>
              <p className='w-[40%]'>{item.value}</p>
            </div>
              <button className='w-[5%]' onClick={()=>handleOnEditing(item.id)}>
              <svg xmlns="http://www.w3.org/2000/svg"  fill="currentColor" className="bi bi-pencil-fill w-[30%] ml-[20%]" viewBox="0 0 16 16">
             <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/></svg>
              </button>
              <button className='w-[5%]' onClick={()=>{props.onReduce(item.id)}}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-trash w-[30%] ml-[20%]" viewBox="0 0 16 16">
             <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
             <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
         </svg>
              </button>
          </div>
          {/* enabling editing for particular expense matching on id  */}
         {isEditing[0] && item.id===isEditing[1] &&  <div className='border border-sky-500  h-[10vh] ' >
          <form className="flex h-[50%]" >
           {/* title  */}
          <input 
          className=' text-center w-[30%] ml-[5%] input--edit--tag' 
          type="text" 
          name="title"
          value={titleInput.title||""}
          onChange={handleOnChange}
          placeholder='Enter the Expenses title'
          required
          ></input>
          {/* expense */}
            <input 
          className=' text-center w-[30%] ml-[5%] input--edit--tag' 
          type="number" 
          name="value"
          value={titleInput.value||""}
          onChange={handleOnChange}
          placeholder='Enter the value'
          required
          ></input>
          <div className='justify-between w-[40%]'>
          <button className='w-[20%]' onClick={()=>handleOnEditing(item.id)}>Cancel</button>
          <button className='w-[20%]' onClick={(e)=>handleOnSubmit(e,item.id)} type="submit">save</button>
            
            </div>
          </form>
          
          </div>
          }
    </div>

   ))

  

  return (
    <div className='w-[80%] ml-[10%] mt-[50px] flex  justify-between'>
      <div className='w-[100%]  expenses--list--tag'>
     {counter>0 && array}
      </div>
      <div >
       <button
       onClick={props.onClick}
       >Add</button>
      </div>
      </div>

  )
}
