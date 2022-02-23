import { FaTimes } from "react-icons/fa";
import { TiEdit } from "react-icons/ti";
import AddTask from "./AddTask";
import { useState } from "react";

const Task = ({ task, onDelete, onToggle, updateTask }) => {
  const [edit, setEdit] = useState({
    id: null,
    text: "",
    day: "",
  });
  
  const submitUpdate = ({ id, text, day, reminder }) => {
    console.log({ id, text, day, reminder }, "jjj");
    updateTask({id, text, day, reminder});    
    setEdit({id: null})
  };

 
  if (edit.id) {
    return (
      <AddTask edit={edit} submitUpdate={submitUpdate}  />
    );
  }

  return (
    <div
      className={`task ${task?.reminder && "reminder"}`}
      onDoubleClick={() => onToggle(task?.id)}
    >
      <h3>
        {task.text}
        <div className="icons">
          <FaTimes
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => onDelete(task.id)}
          />
          <TiEdit
            onClick={() =>
       setEdit({ id: task.id, text: task.text, day: task.day, reminder: task.reminder })
            }        
              />
        </div>
      </h3>
      <p>{task?.day}</p>
      
    </div>
  );
};

export default Task;
