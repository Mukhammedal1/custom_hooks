import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "./axios";

function App() {
  // const [tasks, setTasks] = useState([]);
  const [reversed, setReversed] = useState(false);
  // const [title, setTitle] = useState("");

  // const handleAdd = () => {
  //   if (title.trim().length > 0) {
  //     setTasks([
  //       ...tasks,
  //       {
  //         id: Date.now(),
  //         title,
  //         completed: false,
  //       },
  //     ]);
  //   }

  //   setTitle("");
  // };

  // const handleDelete = (id) => {
  //   setTasks(tasks.filter((task) => task.id !== id));
  // };

  // const handleEdit = (id) => {
  //   let newTitle = prompt("Name of title");
  //   if (newTitle.trim().length > 0) {
  //     setTasks(
  //       tasks.map((task) =>
  //         task.id === id ? { ...task, title: newTitle } : task
  //       )
  //     );
  //   }
  // };

  // const handleComplete = (id) => {
  //   setTasks((tasks) => {
  //     return tasks.map((task) => {
  //       if (task.id === id) {
  //         return { ...task, completed: true };
  //       }
  //       return task;
  //     });
  //   });
  // };

  // const handleActivate = (id) => {
  //   setTasks((tasks) => {
  //     return tasks.map((task) => {
  //       if (task.id === id) {
  //         return { ...task, completed: false };
  //       }
  //       return task;
  //     });
  //   });
  // };

  // useEffect(() => {
  //   let a = setInterval(() => {
  //     console.log("I am here!");
  //   }, 1000);

  //   return () => {
  //     clearInterval(a);
  //   };
  // }, []);

  // useEffect(() => {
  //   setTasks([...tasks].reverse());
  // }, [reversed]);

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get();
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    console.log(newTodo);
    if (newTodo.trim() === "") return;
    console.log(newTodo);
    await axios.post("/", { title: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const completeTodo = async (id) => {
    await axios.get(`/complete/${id}`);
    fetchTodos();
  };

  const activateTodo = async (id) => {
    await axios.get(`/activate/${id}`);
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/${id}`);
    fetchTodos();
  };

  return (
    <>
      <h1>Tasks</h1>
      <div className="main-div">
        <div className="div-2">
          <input
            className=""
            type="text"
            value={newTodo}
            onKeyDown={(e) => {
              if (e.keyCode === 13) addTodo();
            }}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Title of task"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <button className="reverse" onClick={() => setReversed(!reversed)}>
          {reversed ? "Reversed" : "Reverse"}
        </button>

        <div className="list">
          {todos.length === 0 ? <p className="list-2">No tasks</p> : null}
          {todos.map((task) => {
            return (
              <div
                className={`list-2 ${task.completed ? "completed" : ""}`}
                key={task._id}
              >
                <p>{task.title}</p>
                <div>
                  {task.completed ? (
                    <button
                      id="activate"
                      onClick={() => activateTodo(task._id)}
                    >
                      activate
                    </button>
                  ) : (
                    <>
                      <button onClick={() => deleteTodo(task._id)}>🗑️</button>
                      <button
                        id="complete"
                        onClick={() => completeTodo(task._id)}
                      >
                        complete
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
