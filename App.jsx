import { useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this CSS import!
// import './App.css'
  import './App.css'
import Student from './Student';


  
  function ShowTodo(props){
  
    return(
  <div className="outerDiv">
   <li>
    {props.value}
    <span onClick={props.deleteTodo}>&times;</span>
   </li>
    </div>
    )
  
  }

  
  function App(){



  const [todoList,setTodo]=useState(()=>{
    const savedTodo=localStorage.getItem('todoList')
    return savedTodo?JSON.parse(savedTodo):[];
  })
  useEffect(()=>{
    localStorage.setItem('todoList',JSON.stringify(todoList))
  },[todoList])
    function SaveTodo(event){
      event.preventDefault();
      let toname=event.target.toname.value.trim();
    if(toname==''){
       alert("enter todo");
       return;
    }
        if(!todoList.includes(toname)){
               let finalTodo=[...todoList,toname];
      setTodo(finalTodo)
      event.target.reset();
        }else{
          alert("todo already exists");
        }
    }
    function DeleteElement(deleteItems){
      let todos=todoList.filter((value,index)=>{
      return index!== deleteItems;
   

      })
         setTodo(todos);
    }
    let list=todoList.map((value,index)=>{
      return(
         <ShowTodo
         
     key={index}
     value={value}
         deleteTodo={()=>DeleteElement(index)}
      />
      )
   
    })
  
  
  return (
    <>
    <div className='todo'>
              <h1>Todo List</h1>
      <form onSubmit={SaveTodo}>

        <input type="text" name='toname' />
        <button type="submit" className='btn'>save</button>
        
      </form>
      
         <div className="todoContainer">
          {list}
         </div>
    </div>
       </>
  );
    
 }
export default App;