import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";

import axios from "axios";

const Login=(props)=>{
    
    const Rest_api_key='c684aed1126dd79ff99c6f8e0964d4fa' //REST API KEY
    const redirect_uri = 'http://localhost:8000/kakao/' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }

    const [id, setId] = useState("");
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

    if (id === "") {
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
        id: id,
        password: password,
      })
      .then((result) => {
        console.log(result.data);
        alert("로그인 성공");
      })
      .catch();
  };
    
    return(
        <div>
                <Link to="/SignUp" style={{textDecoration:'none'}}>
                    <button>회원가입</button>
                </Link>
                <button onClick={handleLogin}>카카오 로그인</button>

                <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Register With Us</h2>
        <div className="form-control">
          <label htmlFor="id">id</label>
          <input
            type="text"
            id="id"
            placeholder="Enter id"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <small>Error message</small>
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
          <small>Error message</small>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
        </div>
        

    );
    
};

export default Login;



