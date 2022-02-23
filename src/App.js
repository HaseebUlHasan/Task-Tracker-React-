import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])


  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

 
  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })
    
    res.status === 200
      ? setTasks(tasks.filter((task) => task.id !== id))
      : alert('Error Deleting This Task')
  }

  
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  const updateTask = async ({ id,text,day,reminder}) => {
    console.log("text:", text , "Day:", day)
    const updTask = { id, text,day,reminder }
    // console.log("upd : ", text , ":", day)
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })
    console.log("upd : ", text , ":", day)
     const data = await res.json()
      
      
      
      setTasks(tasks.map((task) => 
      {
        if(task.id === id){
          task.id=data.id
          task.text = data.text
          task.reminder = data.reminder
          task.day = data.day
        }
        return task
      }
        // task.id === id ? updTask  : task
        //  task.id === id ?   updTask : data
      ))
  
  
   
    };
 
  

  return (
    <div className="container">

    <Header onAdd = {() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
     
     { showAddTask && <AddTask onAdd = {addTask}/>}

    {tasks.length > 0 ? (<Tasks tasks = {tasks} onDelete = {deleteTask}
     onToggle = {toggleReminder} updateTask = {updateTask} />) : 
    (<h3>Empty tasks please add New Tasks!</h3>)}
      
      </div>
         
    
   
  );
}

export default App
