import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {

    e.preventDefault();

    setError("");
    setSuccess("");

    setLoading(true);

    try {

      const res = await api.post("register/", formData);

      setSuccess(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {

      console.error(err);

      if (err.response?.data?.error) {

        setError(err.response.data.error);

      } else if (err.response?.data?.username) {

        setError(err.response.data.username[0]);

      } else {

        setError("Registration failed");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-black via-slate-950 to-blue-950 px-4">

      <div className="bg-slate-800/70 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-md border border-slate-700">

        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Create Account
        </h1>

        {error && (

          <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (

          <div className="bg-green-500/20 border border-green-500 text-green-300 p-3 rounded-lg mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-4 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 text-white py-3 rounded-lg font-semibold flex items-center justify-center"
          >

            {loading ? (

              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

            ) : (
              "Register"
            )}

          </button>

        </form>

        <p className="text-slate-300 text-center mt-6">

          Already have an account?{" "}

          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;