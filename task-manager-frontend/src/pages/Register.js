import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://task-manager-j13m.onrender.com/api/register/",
        {
          username: username,
          password: password,
        }
      );

      alert("Registration Successful!");
      console.log(response.data);

    } catch (err) {
      console.log(err);

      if (err.response) {
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        alert("Server Error");
      }
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Register</h2>

      <form onSubmit={registerUser}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}