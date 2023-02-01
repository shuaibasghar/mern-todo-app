import { useState, useEffect } from "react";

import axios from "axios";
import "./App.css";

function App() {
    const [todo, setTodo] = useState("");
    const [allTodos, setAllTodos] = useState([]);
    const [updating, setUpdating] = useState("");
    const [updatedTodoText, setUpdatedTodoText] = useState("");
    //adding todo to database

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:4000/api/item", {
                item: todo,
            });
            setTodo("");
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    //delete item
    const deleteTodo = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:4000/api/item/${id}`
            );

            console.log(res.data);
            const newListOfTodos = allTodos.filter((item) => item._id !== id);

            setAllTodos(newListOfTodos);
        } catch (error) {}
    };
    // update item
    const updateTodo = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `http://localhost:4000/api/item/${updating}`,
                { item: updatedTodoText }
            );

            setUpdatedTodoText("");
            setUpdating("");
        } catch (error) {
            console.log(error);
        }
    };
    // before update we will show input field where we will create our updated item
    const UpdatedForm = () => (
        <form className="updated-form" onSubmit={updateTodo}>
            <input
                className="updated-new-input"
                type="text"
                placeholder="New Item"
                onChange={(e) => {
                    setUpdatedTodoText(e.target.value);
                }}
                value={updatedTodoText}
            />
            <button className="updated-new-btn" type="submit">
                Update
            </button>
        </form>
    );

    useEffect(() => {
        const getAllTodos = async () => {
            try {
                const res = await axios.get("http://localhost:4000/api/items");
                // console.log(res);
                // console.log(res.data.allTodos);
                setAllTodos(res.data.allTodos);
            } catch (error) {
                console.log(error);
            }
        };
        getAllTodos();
    }, [allTodos]);

    return (
        <div className="container">
            <form action="" onSubmit={addTodo}>
                <input
                    type="text"
                    value={todo}
                    placeholder="Add Todo Item"
                    onChange={(e) => setTodo(e.target.value)}
                />
                <button type="submit">Add</button>
            </form>

            <div className="todo-items-list">
                {allTodos.map((item) => (
                    <div className="todo-items" key={item._id}>
                        {updating === item._id ? (
                            UpdatedForm()
                        ) : (
                            <>
                                <p className="item-text">{item.item}</p>
                                <button
                                    className="update"
                                    onClick={() => setUpdating(item._id)}
                                >
                                    Update
                                </button>
                                <button
                                    className="delete"
                                    onClick={() => deleteTodo(item._id)}
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
