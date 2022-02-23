import Task from './Task'

const Tasks = ({ tasks, onDelete, onToggle ,updateTask }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} 
        onDelete={onDelete} onToggle={onToggle} updateTask={updateTask}  />
      ))}
    </>
  )
}

export default Tasks
