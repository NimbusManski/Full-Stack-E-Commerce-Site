import { useState, useContext } from "react";
import { Form, FormCheck } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import{ UserContext} from "../components/UserContext";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  

  async function login(e) {
    e.preventDefault();
    try { const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/login`, {
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: { "Content-Type" : "application/json"},
        credentials: "include"
        })
        
        response.json().then(userInfo => {
          setUserInfo(userInfo)
        });

        if(response.status === 200) {
          navigate("/");
        }

    } catch(err) {
        console.error("Error logging in:",err);
        if(err.reaponse.status === 501) {
          alert("Username taken")
        }
    }
  }


  return (
    <div className="login-form-wrapper">
      <Form className="login-form" onSubmit={login}>
        <h1>Sign In</h1>
        <Form.Group className="mb-3 input" controlId="formGroupEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3 input" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            value={password}
            placeholder="Password"
            onChange={(e) => {setPassword(e.target.value)}}
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
