import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../services/api";

function Login() {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      const res = await API.post("token/", form);

      localStorage.setItem("token", res.data.access);

      toast.success("Login successful");

      navigate("/dashboard", { replace: true });

    } catch (err) {

      toast.error("Invalid credentials");

      setError("Invalid credentials");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-gray-700 shadow-2xl">

        <h1 className="text-5xl font-bold text-white text-center mb-8">
          Task Manager
        </h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-5 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 text-white outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-lg font-semibold text-white transition-all ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >

            {loading ? (

              <div className="flex justify-center items-center gap-3">

                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

                <span>Logging in...</span>

              </div>

            ) : (
              "Login"
            )}

          </button>

        </form>

        <p className="text-gray-300 text-center mt-6">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="text-blue-400 hover:text-blue-300"
          >
            Create account
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;