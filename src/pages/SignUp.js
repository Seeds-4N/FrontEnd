import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';



const SignUp=(props)=>{

    const[name, setName]=useState('')
    const[id, setId]=useState('')
    const[password, setPassword]=useState('')
    const[pwConfirm, setPwConfirm]=useState('')

    const handleinputname=(e)=>{
        setName(e.target.value);
    };
    const handleinputid=(e)=>{
        setId(e.target.value);
    };
    const handleinputpw=(e)=>{
        setPassword(e.target.value);
    };
    const handleinputpwcfm=(e)=>{
        setPwConfirm(e.target.value);
    };

    const isvalidpassword=password.length>=8;
    const isvalidinput=name.length>=2;
    const isactive=isvalidpassword&&isvalidinput;
   
    const handleButtomValid = () => {
        if (
          !isvalidinput ||
          !isvalidpassword
          ) {
          alert('please fill in the blanks');
        }
        else{
            gotosignup();
        }
    };

    const gotosignup=()=>{

        

        console.log("name:",name);
        console.log("id:",id);
        console.log("pw:",password);
        console.log("pwcfm:",pwConfirm);

        

        axios.get('http://127.0.0.1:8000/register/'
        //https://jsonplaceholder.typicode.com/todos/
        //http://127.0.0.1:8000/register/
        ,{
            name:name,
            id:id,
            password:password,
            pwConfirm:pwConfirm,
        })
        .then((result)=>{
            console.log(result.data);
            alert('회원가입 성공');
        }).catch();
    }

    return (

        <div className='signupbody'>
                <div>회원가입</div>
                
                <input 
                    type="text"
                    id="name"
                    placeholder='이름을 입력해주세요'
                    required
                    value={name}
                    onChange={handleinputname}
                />
                
                <input
                    type='eamil'
                    id='id' 
                    placeholder='아이디를 입력해주세요'
                    required
                    value={id}
                    onChange={handleinputid}
                />
                
                <input
                    id='password'
                    type={'password'}
                    placeholder='비밀번호를 입력해주세요'
                    required
                    value={password}
                    onChange={handleinputpw}
                />
                
                <input
                    id='confirmpw'
                    type={'password'}
                    placeholder='비밀번호를 확인'
                    required
                    value={pwConfirm}
                    onChange={handleinputpwcfm}
                />
                <button className={isactive?'validbutton':'invalidbutton'} onClick={handleButtomValid}>회원가입</button>
                <div className='easy'>
                    <div>
                        google로 회원가입
                    </div>
                    <div>
                        kakao로 회원가입
                    </div>
                </div>
            </div>
        
    )
    
};
export default SignUp;


/*
<label for="name">이름</label>
<label for="id">아이디</label>
<label for='password'>비밀번호</label>
<label for='confirmpw'>비밀번호 확인</label>
*/

