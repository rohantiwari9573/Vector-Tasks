import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const lastLogin = localStorage.getItem("lastLogin");

  useEffect(() => {

    fetchTasks();

  }, []);

  const fetchTasks = async () => {

    try {

      const res = await API.get("tasks/");

      setTasks(res.data);

    } catch (err) {

      console.error(err);

      toast.error("Failed to load tasks");
    }
  };

  const handleAddTask = async () => {

    if (!title.trim()) return;

    try {

      await API.post("tasks/", {
        title,
        completed: false,
      });

      setTitle("");

      fetchTasks();

      toast.success("Task added");

    } catch (err) {

      console.error(err);

      toast.error("Failed to add task");
    }
  };

  const toggleComplete = async (task) => {

    try {

      await API.patch(`tasks/${task.id}/`, {
        completed: !task.completed,
      });

      fetchTasks();

    } catch (err) {

      console.error(err);
    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`tasks/${id}/`);

      fetchTasks();

      toast.success("Task deleted");

    } catch (err) {

      console.error(err);
    }
  };

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-blue-950">

      {/* HEADER */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-slate-800">

        <div>

          <h1 className="text-4xl font-bold text-white">
            Task Manager
          </h1>

          <p className="text-slate-300 mt-2 text-lg">
            Hey <span className="text-blue-400 font-semibold">{username}</span>, Welcome Back 👋
          </p>

          <p className="text-slate-400 text-sm mt-1">
            Last login: {lastLogin}
          </p>

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-3 rounded-lg font-semibold"
        >
          Logout
        </button>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* ADD TASK */}
        <div className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-slate-700 mb-10">

          <h2 className="text-4xl font-bold text-white mb-6">
            Add New Task
          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-4 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddTask}
              className="bg-blue-600 hover:bg-blue-700 transition text-white px-8 rounded-lg font-semibold"
            >
              Add
            </button>

          </div>

        </div>

        {/* TASKS */}
        <div className="space-y-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-slate-800/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-700 flex justify-between items-center"
            >

              <div>

                <h3
                  className={`text-2xl font-semibold ${
                    task.completed
                      ? "line-through text-gray-400"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h3>

                <div className="flex items-center gap-4 mt-3">

                  <span
                    className={`px-4 py-1 rounded-full text-sm font-medium ${
                      task.completed
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => toggleComplete(task)}
                  className={`px-5 py-3 rounded-lg font-semibold text-white ${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-lg font-semibold text-white"
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;