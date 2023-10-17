import  { useState ,useEffect} from 'react';
import tasksData from '../data/tasks.json';
import '../styles/task.css';

const Task = () => {
    const [tasks, setTasks] = useState(tasksData);
    const [newTask, setNewTask] = useState({ description: '', status: 'Not Started' });
    const [filterStatus, setFilterStatus] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [editingTask, setEditingTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false); // Define the modal state

    const tasksPerPage = 5;


    ///////add to cache
    useEffect(() => {
        // Load tasks from local storage when the component mounts
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        } else {
            setTasks(tasksData);
        }
    }, []);

    useEffect(() => {
        // Save tasks to local storage whenever the tasks state changes
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);


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


    ////////sort 
    
    const handleSortTasks = () => {
        const sortedTasks = [...tasks].sort((a, b) => {
            if (a.description < b.description) return -1;
            if (a.description > b.description) return 1;
            return 0;
        });

        setTasks(sortedTasks);
    };

    ///////EDIT 
    const handleSave = () => {
        const updatedTasks = tasks.map((task) =>
            task.id === editingTask.id ? editingTask : task
        );
        setTasks(updatedTasks);
        closeModal();
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openEditModal = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };



    // Filter out the task to delete
    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        setTasks(updatedTasks);
    };

    return (
        <div className="task-wrapped">

            <button onClick={openAddTaskModal}className='mybtn'>Add Task</button>

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
{/* sorting */}
            <button onClick={handleSortTasks} className='mybtn'>Sort by Description</button>
            <select onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="">All</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Finished">Finished</option>
            </select>

            <ul>
                {tasks
                    .filter((task) => !filterStatus || task.status === filterStatus)
                    .slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage)
                    .map((task) => (
                        <li
                            key={task.id}
                            className={`task`}
                            style={{
                                backgroundColor:
                                    task.status === "Not Started"
                                        ? "#ffcccc"
                                        : task.status === "In Progress"
                                            ? "#ffebcc"
                                            : "#ccffcc",
                            }}
                        >
                            <div className="task-details">
                                <p>{task.description} - Status: {task.status}</p>
                            </div>
                            <div className="task-actions">
                                <button onClick={() => openEditModal(task)}>Edit</button>

                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            </div>
                        </li>
                    ))}
            </ul>

            {isModalOpen && (
                <div className="modal-container">
                    <div className="modal">
                        <span className="close-button" onClick={closeModal}>
                            &times;
                        </span>
                        <h3>Edit Task</h3>
                        <input
                            type="text"
                            name="description"
                            value={editingTask.description}
                            onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        />
                        <select
                            name="status"
                            value={editingTask.status}
                            onChange={(e) => setEditingTask({ ...editingTask, status: e.target.value })}
                        >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Finished">Finished</option>
                        </select>
                        <button onClick={handleSave}>Save</button>
                        <button onClick={closeModal}>Close</button>

                    </div>
                </div>
            )}


            <div className="pagination">
                {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }).map((_, index) => (
                    <button className='pagi-button'key={index} onClick={() => setCurrentPage(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Task;
