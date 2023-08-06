import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate  } from 'react-router-dom';

const Login = (props) => {
  const Rest_api_key = 'c684aed1126dd79ff99c6f8e0964d4fa'; // REST API KEY
  const redirect_uri = 'http://localhost:8000/kakaologin/'; // Redirect URI
  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const NaverclientId = 'D0F08xuNTZ1fLXCzYW9N'; // 네이버 개발자 센터에서 발급받은 클라이언트 ID
  const NavercallbackUrl = 'http://localhost:8000/naverlogin/'; // 네이버 개발자 센터에서 등록한 콜백 URL
  const NaverURL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NaverclientId}&redirect_uri=${encodeURIComponent(NavercallbackUrl)}`

  
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [useremail, setUsername] = useState(''); // 추가: 사용자 이름 상태 값
  const [password, setPassword] = useState(''); 
  // useHistory 훅을 사용하여 리다이렉트 처리
  const navigate = useNavigate(); // useNavigate 훅 사용


  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  const naverlogin = () => {
    window.location.href = NaverURL;
  }

  
  const handleLogin2 = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:8000/login/', { useremail, password });
        console.log(response.data.message); // 로그인 성공 메시지 출력
      // 로그인에 성공하면 다음 페이지로 이동하도록 처리 (예: react-router-dom 사용)
      // 로그인에 성공하면 리다이렉트
      navigate('/'); // 리다이렉트할 경로를 지정합니다. 여기서는 홈 페이지로 리다이렉트합니다.
    } 
    catch (error) {
      console.error(error.response.data.message); // 로그인 실패 메시지 출력
    }
  };

  const handleChangePassword = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/changepassword/',
        {
          password: password,
          new_password: newPassword,
          re_password: passwordConfirm,
        }
      );

      if (response.status === 200) {
        console.log(response.data.message); // 비밀번호 변경 성공 메시지 출력
        // 비밀번호 변경에 성공하면 추가적인 동작 수행 (예: 메인 페이지로 이동)
      } else {
        console.error(response.data.message); // 비밀번호 변경 실패 메시지 출력
        // 비밀번호 변경에 실패했을 때 추가적인 동작 수행
      }
    } catch (error) {
      console.error('API 요청 실패:', error); // API 요청 실패 시 에러 출력
    }
  };
//   const handleLogout = async () => {
//     try {
//       const response = await axios.get('http://127.0.0.1:8000/logout/');
//       console.log(response.data.message); // 로그아웃 성공 메시지 출력
//       navigate('/'); // 로그아웃 성공 시 로그인 페이지로 리다이렉트
//     } catch (error) {
//       console.error('로그아웃 실패:', error); // 로그아웃 실패 시 에러 출력
//     }
//   };


  return (
    <div>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleLogin2}>
        <div>
          <input
            type="text"
            value={useremail}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="사용자 이름"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <Link to="/SignUp" style={{ textDecoration: 'none' }}>
        <button>회원가입</button>
      </Link>
      <button onClick={handleLogin}>카카오 로그인</button>

      <button onClick={naverlogin}>네이버 로그인</button>
      {/* 비밀번호 변경 UI 추가 */}
      <div>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="새로운 비밀번호"
        />
      </div>
      <div>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder="새로운 비밀번호 확인"
        />
      </div>
      <button onClick={handleChangePassword}>비밀번호 변경</button>
      {/* <button onClick={handleLogout}>로그아웃</button> */}
    </div>
  );
};


export default Login;