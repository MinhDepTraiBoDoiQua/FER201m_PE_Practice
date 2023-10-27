import axios from 'axios';
import { useEffect, useState } from 'react';

const Index = () => {
    const [todos, setTodos] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:9999/todo')
            .then(response => setTodos(response.data))
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:9999/user')
            .then(response => setUsers(response.data))
            .catch(error => console.log(error));
    }, []);

    // Update filter selection
    let [userFilters, setUserFilters] = useState(new Set());
    const updateFilters = (checked, userId) => {
        if (checked) {
            setUserFilters(prev => new Set(prev).add(userId));
        }
        if (!checked) {
            setUserFilters(prev => {
                const newSet = new Set(prev);
                newSet.delete(userId);
                return newSet;
            });
        }
    };

    // Filter todos by users
    let filterdTodos =
        userFilters.size === 0
            ? todos
            : todos.filter(todo => userFilters.has(todo.userId));

    // Filter todos by status
    let [radioSelected, setRadioSelected] = useState('all');
    if (radioSelected === 'finished') {
        filterdTodos = filterdTodos.filter(todo => todo.completed === true);
    }
    if (radioSelected === 'unfinished') {
        filterdTodos = filterdTodos.filter(todo => todo.completed === false);
    }

    // Sort todos by title
    let [sortAsc, setSortAsc] = useState(false);
    if (sortAsc) {
        filterdTodos.sort((a, b) => {
            let titleA = a.title.toUpperCase();
            let titleB = b.title.toUpperCase();

            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        });
    }

    // Change todo complete
    let [newTd, setNewTd] = useState({});
    const handleChangeStatus = async e => {
        axios
            .get(`http://localhost:9999/todo/${e.target.value}`)
            .then(response => {
                const newTodo = {
                    ...response.data,
                    completed: !response.data.completed,
                };
                setNewTd(newTodo);

                axios
                    .put(
                        `http://localhost:9999/todo/${e.target.value}`,
                        newTodo
                    )
                    .then(response => {
                        alert('Change success');
                    })
                    .catch(error => console.log(error));
            })
            .catch(error => console.log(error));
    };
    if (newTd) {
        filterdTodos = filterdTodos.map(todo => {
            if (todo.id === newTd.id) {
                todo.completed = newTd.completed;
            }
            return todo;
        });
    }

    return (
        <>
            <div className="col-lg-9">
                <div className="center-text">
                    <h1>Todo List</h1>
                </div>

                <div className="sort-todo-list">
                    Sort: &nbsp;
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={e => setSortAsc(true)}
                    >
                        Ascending by Title
                    </button>
                </div>
                <div className="todo-list">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">NO.</th>
                                <th scope="col">Title</th>
                                <th scope="col">User</th>
                                <th scope="col">Completed</th>
                                <th scope="col">Change status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterdTodos.map(todo => (
                                <tr key={`todo${todo.id}`}>
                                    <th scope="row">{todo.id}</th>
                                    <td>{todo.title}</td>
                                    <td>
                                        {
                                            users.find(
                                                user => user.id === todo.userId
                                            )?.name
                                        }
                                    </td>
                                    <td>
                                        {todo.completed ? (
                                            <span className="finished-text ">
                                                Finished
                                            </span>
                                        ) : (
                                            <span className="unfinished-text ">
                                                Unfinished
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-success"
                                            onClick={handleChangeStatus}
                                            value={todo.id}
                                        >
                                            Change
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-lg-3">
                <h2>Users</h2>
                {users.map(user => (
                    <div key={`user${user.id}`} className="user-checkbox">
                        <input
                            type="checkbox"
                            id={user.id}
                            onChange={e =>
                                updateFilters(e.target.checked, user.id)
                            }
                        />
                        <label htmlFor={user.id}>&nbsp; {user.name} </label>
                    </div>
                ))}
                <h2>Completed</h2>
                <div className="completed-checkbox">
                    <input
                        type="radio"
                        id="finished"
                        name="radioStatus"
                        value="finished"
                        onChange={e => setRadioSelected(e.target.value)}
                        checked={radioSelected === 'finished'}
                    />
                    <label htmlFor="finished">&nbsp; Finished </label>
                </div>
                <div className="completed-checkbox">
                    <input
                        type="radio"
                        id="unfinished"
                        name="radioStatus"
                        value="unfinished"
                        onChange={e => setRadioSelected(e.target.value)}
                        checked={radioSelected === 'unfinished'}
                    />
                    <label htmlFor="unfinished">&nbsp; Unfinished </label>
                </div>
                <div className="completed-checkbox">
                    <input
                        type="radio"
                        id="all"
                        name="radioStatus"
                        value="all"
                        onChange={e => setRadioSelected(e.target.value)}
                        checked={radioSelected === 'all'}
                    />
                    <label htmlFor="all">&nbsp; All </label>
                </div>
            </div>
        </>
    );
};

export default Index;
