import { useState } from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  async function register() {
    try {
      const response = await fetch(`${REACT_APP_SERVER_URL}/register`, {
        method: "POST",
        body: JSON.stringify(username, password),
        headers: "Content-Type/ application/json",
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="register-form-wrapper">
      <Form className="register-form" onSubmit={register}>
        <h1>Create An Account</h1>
        <Form.Group className="mb-3 input" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="email" placeholder="Username" value={username} />
        </Form.Group>
        <Form.Group className="mb-3 input" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
          />
          <FormCheck
            className="checkbox"
            type="checkbox"
            label="Show Password"
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>
        <button>
          <Link to={"/login"}>Sign Up</Link>
        </button>
        <p>
          Have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </Form>
    </div>
  );
}
