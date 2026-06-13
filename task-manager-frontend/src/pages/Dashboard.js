import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const navigate = useNavigate();

  const fetchTasks = async () => {

    try {

      const res = await API.get("tasks/");

      setTasks(res.data.results || res.data);

    } catch (err) {

      toast.error("Failed to fetch tasks");

      console.log(err);

    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {

    if (!title) return;

    try {

      await API.post("tasks/", {
        title,
        completed: false,
      });

      toast.success("Task added");

      setTitle("");

      fetchTasks();

    } catch (err) {

      toast.error("Failed to add task");

    }
  };

  const deleteTask = async (id) => {

    try {

      await API.delete(`tasks/${id}/`);

      toast.success("Task deleted");

      fetchTasks();

    } catch (err) {

      toast.error("Failed to delete task");

    }
  };

  const toggleComplete = async (task) => {

    try {

      await API.patch(`tasks/${task.id}/`, {
        completed: !task.completed,
      });

      toast.success(
        task.completed
          ? "Task marked pending"
          : "Task completed"
      );

      fetchTasks();

    } catch (err) {

      toast.error("Failed to update task");

    }
  };

  const startEditing = (task) => {

    setEditingId(task.id);

    setEditedTitle(task.title);
  };

  const saveEdit = async (task) => {

    try {

      await API.patch(`tasks/${task.id}/`, {
        title: editedTitle,
      });

      toast.success("Task updated");

      setEditingId(null);

      fetchTasks();

    } catch (err) {

      toast.error("Failed to update task");

    }
  };

  const confirmLogout = () => {

    localStorage.removeItem("token");

    toast.success("Logged out");

    navigate("/login", { replace: true });
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-10 py-5 border-b border-gray-700">

        <h1 className="text-3xl font-bold">
          Task Manager
        </h1>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition-all"
        >
          Logout
        </button>

      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto mt-10 px-4">

        {/* ADD TASK */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-gray-700 shadow-xl">

          <h2 className="text-2xl font-semibold mb-5">
            Add New Task
          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Enter task..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-500"
            />

            <button
              onClick={createTask}
              className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg font-semibold"
            >
              Add
            </button>

          </div>

        </div>

        {/* TASKS */}
        <div className="mt-10 grid gap-4">

          {tasks.length === 0 ? (

            <div className="text-gray-400 text-center">
              No tasks available
            </div>

          ) : (

            tasks.map((task) => (

              <div
                key={task.id}
                className="bg-white/10 backdrop-blur-lg border border-gray-700 rounded-xl p-5 flex justify-between items-center shadow-lg"
              >

                <div className="flex-1">

                  {editingId === task.id ? (

                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full p-3 rounded-lg bg-gray-800 border border-gray-600 outline-none focus:border-blue-500"
                    />

                  ) : (

                    <>
                      <h3
                        className={`text-lg font-semibold ${
                          task.completed
                            ? "line-through text-gray-500"
                            : "text-white"
                        }`}
                      >
                        {task.title}
                      </h3>

                      <div className="flex items-center gap-3 mt-2">

                        <span
                          className={`text-xs px-3 py-1 rounded-full ${
                            task.completed
                              ? "bg-green-500/20 text-green-300"
                              : "bg-yellow-500/20 text-yellow-300"
                          }`}
                        >
                          {task.completed ? "Completed" : "Pending"}
                        </span>

                        <span className="text-sm text-gray-400">
                          {new Date(task.created_at).toLocaleString()}
                        </span>

                      </div>

                    </>

                  )}

                </div>

                <div className="flex gap-3 ml-5">

                  {editingId === task.id ? (

                    <button
                      onClick={() => saveEdit(task)}
                      className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
                    >
                      Save
                    </button>

                  ) : (

                    <button
                      onClick={() => startEditing(task)}
                      className="bg-purple-500 hover:bg-purple-600 px-4 py-2 rounded-lg"
                    >
                      Edit
                    </button>

                  )}

                  <button
                    onClick={() => toggleComplete(task)}
                    className={`px-4 py-2 rounded-lg transition-all ${
                      task.completed
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-green-500 hover:bg-green-600"
                    }`}
                  >
                    {task.completed ? "Undo" : "Complete"}
                  </button>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-all"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

      {/* LOGOUT MODAL */}
      {showLogoutModal && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 w-[400px] shadow-2xl">

            <h2 className="text-2xl font-bold mb-4">
              Confirm Logout
            </h2>

            <p className="text-gray-300 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-end gap-4">

              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600"
              >
                No
              </button>

              <button
                onClick={confirmLogout}
                className="px-5 py-2 rounded-lg bg-red-500 hover:bg-red-600"
              >
                Yes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Dashboard;