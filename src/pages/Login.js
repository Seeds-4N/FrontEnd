import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";

const Login = () => {
  const [useremail, setUseremail] = useState("");
  const [password, setPassword] = useState("");

  // Show input error message
  function showError(message) {
    // Implement your error handling logic here
    console.error(message);
  }

  // Show success outline
  function showSuccess() {
    // Implement your success handling logic here
    console.log("Success");
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (useremail === "") {
      showError("Id is required");
    } else {
      showSuccess();
    }

    if (password === "") {
      showError("Password is required");
    } else {
      showSuccess();
    }

    // Call your API here or handle form submission logic
    gotoLogin();
  };

  const gotoLogin = () => {
    axios
      .post("http://127.0.0.1:8000/login/", {
        useremail: useremail,
        password: password,
      })
      .then((result) => {
        console.log(result.data);
        alert("로그인 성공");
      })
      .catch();
  };

  return (
    <div className="test">
      <div className="container">
        <form onSubmit={handleSubmit} className="form">
          <h2>Login</h2>
          <div className="form-control">
            <label htmlFor="useremail">useremail</label>
            <input
              type="email"
              id="useremail"
              placeholder="Enter email"
              value={useremail}
              onChange={(e) => setUseremail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
