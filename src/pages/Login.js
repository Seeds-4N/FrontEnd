import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Login=(props)=>{

    const Rest_api_key='c684aed1126dd79ff99c6f8e0964d4fa' //REST API KEY
    const redirect_uri = 'http://localhost:8000/kakao/' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    
    return(
        <div>
                <Link to="/SignUp" style={{textDecoration:'none'}}>
                    <button>회원가입</button>
                </Link>
                <button onClick={handleLogin}>카카오 로그인</button>
        </div>
    );
    
};


export default Login


