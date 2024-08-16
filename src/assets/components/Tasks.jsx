import { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = () => {
        axios.get('/api/tasks')
            .then(response => {
                setTasks(response.data);
            })
            .catch(error => {
                console.error('Error fetching tasks:', error);
            });
    };

    const createTask = () => {
        axios.post('/api/tasks', { title: newTask })
            .then(response => {
                setTasks([...tasks, response.data]);
                setNewTask('');
            })
            .catch(error => {
                console.error('Error creating task:', error);
            });
    };

    const updateTask = (id, updatedTask) => {
        axios.put(`/api/tasks/${id}`, updatedTask)
            .then(() => {
                const updatedTasks = tasks.map(task => {
                    if (task.id === id) {
                        return { ...task, ...updatedTask };
                    }
                    return task;
                });
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error updating task:', error);
            });
    };

    const deleteTask = (id) => {
        axios.delete(`/api/tasks/${id}`)
            .then(() => {
                const updatedTasks = tasks.filter(task => task.id !== id);
                setTasks(updatedTasks);
            })
            .catch(error => {
                console.error('Error deleting task:', error);
            });
    };

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        <input
                            type="text"
                            value={task.title}
                            onChange={(e) => updateTask(task.id, { title: e.target.value })}
                        />
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={createTask}>Add Task</button>
        </div>
    );
};

export default Tasks;