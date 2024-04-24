import { useState, useEffect } from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();
    try { const response = await fetch(`${REACT_APP_SERVER_URL}/login`, {
        method: "POST",
        body: JSON.stringify(username, password),
        headers: "Content-Type: application/json",
        credentials: "include"
        })

    } catch(err) {
        console.log(err);
    }
  }


  return (
    <div className="login-form-wrapper">
      <Form className="login-form" onSubmit={login}>
        <h1>Sign In</h1>
        <Form.Group className="mb-3 input" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Username" value={username}/>
        </Form.Group>
        <Form.Group className="mb-3 input" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
          />
          <FormCheck
            className="checkbox"
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <button>
          <Link to={"/"}>Sign In</Link>
        </button>
        <p>
          Don't have an account? <Link to={"/register"}>Register here</Link>
        </p>
      </Form>
    </div>
  );
}
