import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("tasks/");
      setTasks(res.data.results || res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    if (!title) return;

    await API.post("tasks/", {
      title,
      completed: false,
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`tasks/${id}/`);
    fetchTasks();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Dashboard</h2>

      <input
        placeholder="New Task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={createTask}>Add</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title}

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;