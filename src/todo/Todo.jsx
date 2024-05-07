import {useState, useEffect} from "react";
import './Todo.css'

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [newTodo, setNewTodo] = useState({title: "", status: "incomplete"});

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    const saveTodosToLocalStorage = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    const toggleForm = () => {
        setShowForm(!showForm);
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setNewTodo({
            ...newTodo,
            [name]: value
        });
    };

    const addTodo = () => {
        if (newTodo.title.trim() !== "") {
            setTodos([...todos, newTodo]);
            saveTodosToLocalStorage([...todos, newTodo]);
            setNewTodo({title: "", status: "incomplete"});
            toggleForm();
        }
    };

    return (
        <div className={'todoo'}>
            <div className={'container'}>
                <h1 className={'todo-head'}>TODO LIST</h1>
                <div className={"todo"}>
                    <div className={"todo-btn"}>
                        <button onClick={toggleForm}>Add task</button>
                    </div>
                    <div className={"todo-block"}>
                        {todos.length === 0 ? <p>No Todos</p> : (
                            <ul>
                                {todos.map((todo, index) => (
                                    <li key={index}>{todo.title} - {todo.status}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            {showForm && (
                <div className={"hide-block"}>
                    <div className={'hide-block-bg'}>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            addTodo();
                        }}>
                            <h1>Add TODO</h1>
                            <label htmlFor="title">
                                Title
                                <input
                                    type="text"
                                    id={"title"}
                                    name="title"
                                    value={newTodo.title}
                                    onChange={handleInputChange}
                                />
                            </label>
                            <label htmlFor="status">
                                Status
                                <select
                                    id="status"
                                    name="status"
                                    value={newTodo.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="incomplete">Incomplete</option>
                                    <option value="complete">Complete</option>
                                </select>
                            </label>
                            <div className={'hide-block-sellect'}>
                                <button type="submit" id={'add'}>Add Task</button>
                                <button onClick={toggleForm} id={'cancel'}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
