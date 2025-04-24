import { useState, useEffect } from "react"
import Todoinput from "./components/Todoinput"
import Todolist from "./components/Todolist"

function App() {
  
  const [todos, setTodos] = useState([])

  function persistData(newList){
    localStorage.setItem('todos', JSON.stringify({todos : newList}))
  }

  const[todoValue,setTodoValue] = useState('')

  function handleAddTodos(newTodo){
    const newTodoList = [...todos,newTodo]
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleDeleteTodos(index){
    const newTodoList = todos.filter((todos, todoIndex) => {
      return todoIndex !== index
    })
    persistData(newTodoList)
    setTodos(newTodoList)
  }

  function handleEditTodos(index){
    const valueTobeAdded = todos[index]
    setTodoValue(valueTobeAdded)
    handleDeleteTodos(index)
  }

  useEffect(() => {
    if (!localStorage)
      {return}
    let localTodos = localStorage.getItem('todos')
    if (!localStorage)
      {return}
    localTodos = JSON.parse(localTodos).todos
    setTodos(localTodos)
   
    }, [])
  


  return (
    <>
      <Todoinput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos}/>
      <Todolist handleEditTodos={handleEditTodos} handleDeleteTodos={handleDeleteTodos} todos={todos}/>
    </>
  )
}

export default App
