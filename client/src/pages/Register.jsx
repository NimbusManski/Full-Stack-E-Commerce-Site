import { useState } from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function register(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.status === 409) {
        alert("Username taken");
      }

      if (response.status === 201) {
        alert("Registration successful. You can now log in");
        navigate("/login");
      }

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="register-form-wrapper">
      <Form className="register-form" onSubmit={register}>
        <h1>Create An Account</h1>
        <Form.Group className="mb-3 input" controlId="formGroupUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3 input" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <FormCheck
            className="checkbox"
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <button type="submit">
          Sign Up
        </button>
        <p>
          Have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </Form>
    </div>
  );
}
