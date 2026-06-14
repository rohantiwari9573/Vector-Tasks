import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Dashboard() {

  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [lastLogin, setLastLogin] = useState("");

  const username = localStorage.getItem("username");

  const fetchTasks = async () => {

    try {

      const res = await API.get("tasks/");

      setTasks(res.data);

    } catch (err) {

      console.error(err);

      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  useEffect(() => {

    const storedLogin = localStorage.getItem("lastLogin");

    if (storedLogin) {
      setLastLogin(storedLogin);
    }

    fetchTasks();

    // eslint-disable-next-line
  }, []);

  const handleAddTask = async (e) => {

    e.preventDefault();

    if (!title.trim()) return;

    try {

      await API.post("tasks/", {
        title,
        completed: false,
      });

      setTitle("");

      fetchTasks();

    } catch (err) {

      console.error(err);
    }
  };

  const handleDelete = async (id) => {

    try {

      await API.delete(`tasks/${id}/`);

      fetchTasks();

    } catch (err) {

      console.error(err);
    }
  };

  const handleToggle = async (task) => {

    try {

      await API.patch(`tasks/${task.id}/`, {
        completed: !task.completed,
      });

      fetchTasks();

    } catch (err) {

      console.error(err);
    }
  };

  const handleEdit = (task) => {

    setEditingId(task.id);

    setEditTitle(task.title);
  };

  const handleUpdate = async (id) => {

    try {

      await API.patch(`tasks/${id}/`, {
        title: editTitle,
      });

      setEditingId(null);

      setEditTitle("");

      fetchTasks();

    } catch (err) {

      console.error(err);
    }
  };

  const handleLogout = () => {

    const confirmLogout = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("username");

    navigate("/");
  };

  return (

    <div className="min-h-screen bg-gradient-to-r from-black via-slate-950 to-blue-950 text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-8 py-5 border-b border-slate-700">

        <div>

          <h1 className="text-4xl font-bold">
            Task Manager
          </h1>

          <p className="text-slate-300 mt-2">
            Hey {username}, Welcome Back 👋
          </p>

          {lastLogin && (
            <p className="text-slate-400 text-sm mt-1">
              Last Login: {lastLogin}
            </p>
          )}

        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>

      </div>

      {/* Add Task */}
      <div className="max-w-5xl mx-auto mt-12 px-4">

        <div className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl p-8 shadow-2xl">

          <h2 className="text-4xl font-bold mb-8">
            Add New Task
          </h2>

          <form
            onSubmit={handleAddTask}
            className="flex gap-4"
          >

            <input
              type="text"
              placeholder="Enter task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-4 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 rounded-xl font-semibold transition"
            >
              Add
            </button>

          </form>

        </div>

        {/* Task List */}
        <div className="mt-12 space-y-6">

          {tasks.map((task) => (

            <div
              key={task.id}
              className="bg-slate-800/70 backdrop-blur-md border border-slate-700 rounded-2xl p-6 shadow-xl flex justify-between items-center"
            >

              <div className="flex-1">

                {editingId === task.id ? (

                  <div className="flex gap-3">

                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) =>
                        setEditTitle(e.target.value)
                      }
                      className="flex-1 p-3 rounded-lg bg-slate-900 border border-slate-700 text-white"
                    />

                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-lg"
                    >
                      Save
                    </button>

                  </div>

                ) : (

                  <>
                    <h3
                      className={`text-2xl font-semibold ${
                        task.completed
                          ? "line-through text-slate-400"
                          : ""
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
                        {task.completed
                          ? "Completed"
                          : "Pending"}
                      </span>

                      <span className="text-slate-400 text-sm">
                        {new Date(task.created_at).toLocaleString()}
                      </span>

                    </div>
                  </>

                )}

              </div>

              <div className="flex gap-4 ml-6">

                <button
                  onClick={() => handleEdit(task)}
                  className="bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-xl font-semibold"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleToggle(task)}
                  className={`px-5 py-3 rounded-xl font-semibold ${
                    task.completed
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl font-semibold"
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