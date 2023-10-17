/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import tasksData from "../data/tasks.json"; 

const TaskList = () => {
  const [tasks, setTasks] = useState(tasksData);

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.description} - Status: {task.status}
            </span>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
