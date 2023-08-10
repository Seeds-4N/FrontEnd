import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../css/signup.css";
import "../css/Map.css";

const SignUp=(props)=>{
    //이름, 이메일, 비밀번호, 비밀번호 확인
    const [username, setUsername] = useState(''); // 변경
    const [useremail, setUseremail] = useState(''); // 변경
    const [password, setPassword] = useState('');
    const [re_password, setRePassword] = useState('');

    //유효성 검사
    const[isName, setisName]=useState(false);
    const[isEmail, setisEmail]=useState(false);
    const[isPassword, setisPassword]=useState(false);
    const[isPwCfm, setisPwCfm]=useState(false);

    //오류메세지
    const[nameMsg, setNameMsg]=useState('');
    const[emailMsg, setEmailMsg]=useState('');
    const[passwordMsg, setPasswordMsg]=useState('');
    const[pwcfmMsg, setpwcfmMsg]=useState('');

    //이름
    const handleinputname=(e)=>{
        setUsername(e.target.value);
        if(e.target.value.length<2){
            setNameMsg('2글자 이상으로 입력해주세요');
            setisName(false);
        }
        else{
            setNameMsg('');
            setisName(true);
        }
    };

    //이메일
    const handleinputid=(e)=>{
        setUseremail(e.target.value);
        if(e.target.value.length>=2 && e.target.value.includes('@') && e.target.value.includes('.')){
            setEmailMsg('');
            setisEmail(true);
        }
        else{
            setEmailMsg('올바른 이메일 형식이 아닙니다');
            setisEmail(false);
        }
    };

    //비밀번호
    const handleinputpw=(e)=>{
        setPassword(e.target.value);
        if(e.target.value.length<8){
            setPasswordMsg('8자 이상으로 입력해주세요');
            setisPassword(false);
        }
        else{
            setPasswordMsg('');
            setisPassword(true);
        }
    };

    //비밀번호 확인
    const handleinputpwcfm=(e)=>{
        setRePassword(e.target.value);
        if(password===e.target.value){
            setpwcfmMsg('');
            setisPwCfm(true);
        }
        else{
            setpwcfmMsg('비밀번호가 틀립니다.');
            setisPwCfm(false);
        }
    };
    
    const isactive=isName&&isEmail&&isPassword&&isPwCfm;

    const handleButtomValid = () => {
        if ( !isactive ) {
          alert('올바른 형식이 아닙니다.');
        }
        else{
            gotosignup();
        }
    };

    const gotosignup=()=>{

        console.log("username:", username);
        console.log("useremail:", useremail);
        console.log("password:", password);
        console.log("re_password:", re_password);


        axios.post('http://127.0.0.1:8000/register/'
        ,{
            username: username,
            useremail: useremail,
            password: password,
            re_password: re_password,
        })
        .then((result)=>{
            console.log(result.data);
            alert('회원가입 성공');
        }).catch();
    }

    return (

        <div className='signupbody'>
            <div className='form'>
            <div>회원가입</div>
                
                <input 
                    type="text"
                    id="username"
                    placeholder='이름을 입력해주세요'
                    required
                    value={username}
                    onChange={handleinputname}
                />
                <span className={isName?'':'invalid'}>{nameMsg}</span>
                
                <input
                    type='useremail'
                    id='id' 
                    placeholder='이메일를 입력해주세요'
                    required
                    value={useremail}
                    onChange={handleinputid}
                />
                <span className={isEmail?'':'invalid'}>{emailMsg}</span>
                
                <input
                    id='password'
                    type='password'
                    placeholder='비밀번호를 입력해주세요'
                    required
                    value={password}
                    onChange={handleinputpw}
                />
                <span className={isPassword?'valid':'invalid'}>{passwordMsg}</span>
                
                <input
                    id='confirmpw'
                    type='password'
                    placeholder='비밀번호 확인'
                    required
                    value={re_password}
                    onChange={handleinputpwcfm}
                />
                <span className={isPwCfm?'':'invalid'}>{pwcfmMsg}</span>
                
                <button className={isactive?'validbutton':'invalidbutton'} onClick={handleButtomValid}>회원가입</button>
                <div className='sociallogin'>
                    <div>
                        naver로 회원가입
                    </div>
                    <div>
                        kakao로 회원가입
                    </div>
                </div>
            </div>
            <Link to="/" style={{textDecoration:'none'}}>
                    <button>홈으로</button>
            </Link> 
        </div>
        
    )
    
};
export default SignUp;

