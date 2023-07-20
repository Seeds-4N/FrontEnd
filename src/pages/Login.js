import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const Login=(props)=>{
    
    return(
        <div>
                <Link to="/SignUp" style={{textDecoration:'none'}}>
                    <button>회원가입</button>
                </Link>
        </div>
    );
    
};

export default Login;
