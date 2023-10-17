import { useState } from 'react';
import tasksData from '../data/tasks.json';

function AddTaskModal() {
const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); // Define the modal state
const [tasks, setTasks] = useState(tasksData);
const [newTask, setNewTask] = useState({ description: '', status: 'Not Started' });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTask({
            ...newTask,
            [name]: value,
        });
    };
// Add new task to the tasks list
const handleAddTask = () => {
    if (newTask.description.trim() !== '') {
        setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
        setNewTask({ description: '', status: 'Not Started' });
        closeAddTaskModal();
    }
};

const openAddTaskModal = () => {
    setIsAddTaskModalOpen(true);
};

const closeAddTaskModal = () => {
    setIsAddTaskModalOpen(false);
};

    return (
        <div>
            <button onClick={openAddTaskModal}>Add Task</button>

            {/* Modal for Adding a Task */}
            {isAddTaskModalOpen && (
                <div className="modal-container">
                    <div className="modal">
                        <span className="close-button" onClick={closeAddTaskModal}>
                            &times;
                        </span>
                        <h3>Add your task</h3>
                        <input
                            type="text"
                            name="description"
                            placeholder="Task description"
                            value={newTask.description}
                            onChange={handleInputChange}

                        />
                        <select
                            name="status"
                            value={newTask.status}
                            onChange={handleInputChange}
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Finished">Finished</option>
                        </select>
                        <button onClick={handleAddTask}>Add Task</button>
                        <button onClick={closeAddTaskModal}>Close</button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default AddTaskModal;