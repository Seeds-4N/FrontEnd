/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../css/Map.css";

// memo
const Memo = ({ onCreate }) => {
  const titleInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    title: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);

    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.title.length < 1) {
      // alert("제목은 최소 1글자 이상 입력해주세요");
      titleInput.current.focus();
      // titleInput처럼 Dom 요소를 선택하는 UseRef로 생성한 레퍼런스 객체는 현재 가리키는 값을 current라는 프로퍼티로 사용할 수 있음
      return;
      // 알림을 띄우고 강제 종료 <- 요즘 트렌드 아님
      // focus를 사용해보자
    }

    if (state.content.length < 5) {
      // alert("일기 본문은 최소 5글자 이상 입력해주세요");
      contentInput.current.focus();
      return;
    }

    onCreate(state.title, state.content, state.emotion);
    // console.log(state);
    alert("저장 성공");
  };

  return (
    <div className="MemoEditor">
      <h3>스타벅스 구의역점</h3>
      <div></div>

      {/* 클릭한 위치의 위도, 경도를 표시할 엘리먼트  */}
      <div id="clickLatlng">
        {clickLatlng &&
          `위도: ${clickLatlng.getLat()}, 경도: ${clickLatlng.getLng()}`}
      </div>

      <div className="title_container">
        <span>제목: </span>
        <input
          name="title"
          value={state.title}
          className="title"
          // onChange={(e) => {
          // onChange: 이벤트 핸들러로 입력하는 값이 변경되었을 때 작동
          //   // setAuthor(e.target.value); //author의 상태를 입력값으로 업데이트
          //   setState({
          //     ...state,
          //     // state의 기본값 전달 / 이 spread 연산자가 밑으로 내려가면 기본값으로 덮어씌어지기 때문에 내려가면 안됨
          //     author: e.target.value,
          //     // content: state.content,
          //   });
          // }}
          onChange={handleChangeState}
          ref={titleInput}
          placeholder="제목을 입력하세요"
        />
      </div>
      <div className="content_container">
        <textarea
          name="content"
          value={state.content}
          className="content"
          // onChange={(e) => {
          //   // setContent(e.target.value);
          //   setState({
          //     ...state,
          //     // author: state.author,
          //     content: e.target.content,
          //   });
          // }}
          onChange={handleChangeState}
          ref={contentInput}
          placeholder="장소를 기록하세요"
        />
      </div>
      {/* <div>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div> */}
      <div>
        <button onClick={handleSubmit}>저장하기</button>
      </div>
    </div>
  );
};

const { kakao } = window;

const Map = (props) => {
  const container = useRef(null); // 지도를 담을 영역의 DOM 레퍼런스
  const [map, setMap] = useState(null); // 지도 인스턴스를 저장할 state
  const [locPosition, setlocPosition] = useState();

  navigator.geolocation.getCurrentPosition((position) => {
    const lat = position.coords.latitude, // 위도
      lon = position.coords.longitude; // 경도
    setlocPosition(new window.kakao.maps.LatLng(lat, lon));
  });

  // 위치에 마커 생성
  const placeMarker = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const marker = new window.kakao.maps.Marker({ position: locPosition });
        marker.setMap(map);
        map.setCenter(locPosition); // 마커가 위치한 중심으로 이동
      });
    } else {
      alert("현재 위치를 받아오지 못했습니다.");
    }
  };

  // 지민

  // 마커를 표시할 변수 추가
  const [marker, setMarker] = useState(null);

  // 클릭한 위치의 위도, 경도를 표시할 변수
  const [clickLatlng, setClickLatlng] = useState(null);

  // 지도 클릭 이벤트 핸들러
  const handleMapClick = (mouseEvent) => {
    const latlng = mouseEvent.latLng;

    // 기존 마커가 있으면 제거
    if (marker) {
      marker.setMap(null);
    }

    // 새로운 마커 생성
    const newMarker = new kakao.maps.Marker({
      position: latlng,
    });

    // 지도에 마커 표시
    newMarker.setMap(map);
    setMarker(newMarker);

    // 클릭한 위치의 위도, 경도 표시
    setClickLatlng(latlng);
  };

  // 지도 초기화 // 수정
  useEffect(() => {
    if (navigator.geolocation && container.current) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const loc = new window.kakao.maps.LatLng(lat, lon);
        setlocPosition(loc);

        const options = {
          center: loc,
          level: 3,
        };

        const initialMap = new window.kakao.maps.Map(
          container.current,
          options
        );
        setMap(initialMap);
      });

      // 지도 클릭 이벤트 등록

      if (map) {
        kakao.maps.event.addListener(map, "click", handleMapClick);
      }
    } else {
      alert("현재 위치를 받아오지 못했습니다.");
    }
  }, [container, map]);

  //mainbar button click
  const [mymemoOpen, setmymemoOpen] = useState(false);
  const [mylctOpen, setmylctOpen] = useState(false);
  const [mypageOpen, setmypageOpen] = useState(false);

  const [mymemoCreate, setmymemoCreate] = useState(false);

  function Mymemo() {
    setmylctOpen(false);
    setmypageOpen(false);
    setmymemoOpen((mymemoOpen) => !mymemoOpen);
  }

  function Mylocation() {
    setmymemoOpen(false);
    setmypageOpen(false);
    setmylctOpen((mylctOpen) => !mylctOpen);
  }

  function Mypage() {
    setmymemoOpen(false);
    setmylctOpen(false);
    setmypageOpen((mypageOpen) => !mypageOpen);
  }

  // 지민
  function MymemoCreate() {
    setmymemoCreate((mymemoCreate) => !mymemoCreate);
    // console.log("클릭");
  }

  return (
    <div id="home">
      <div className="mainbar">
        <Link to="/">
          <button className="linkbtn">4N</button>
        </Link>
        <button
          onClick={Mymemo}
          className={mymemoOpen ? "btnActive" : "btnInactive"}
        >
          내기록
        </button>
        <button
          onClick={Mylocation}
          className={mylctOpen ? "btnActive" : "btnInactive"}
        >
          내장소
        </button>
        <button
          onClick={Mypage}
          className={mypageOpen ? "btnActive" : "btnInactive"}
        >
          마이페이지
        </button>
        <Link to="/Login">
          <button className="linkbtn">로그인</button>
        </Link>
        {/* <Link to="/Prac"> */}
        {/* <button>pra</button> */}
        {/* </Link> */}
      </div>
      <div className={mymemoOpen ? "mymemoActive" : "mymemoInactive"}>
        <h3>내 기록</h3>
        <button
          onClick={MymemoCreate}
          className={
            mymemoCreate ? "mymemocreateActive" : "mymemocreateInactive"
          }
        >
          +
        </button>
        {mymemoCreate && <Memo />}
      </div>
      <div className={mylctOpen ? "mylctActive" : "mylctInactive"}>
        <h3>내 장소</h3>
      </div>
      <div className={mypageOpen ? "mypageActive" : "mypageInactive"}>
        <h3>마이페이지</h3>
        <button>회원탈퇴</button>
      </div>

      <div>
        <div className="minibar">
          <button onClick={placeMarker}>-O-</button>
          <button>☆</button>
        </div>
        <input
          className="find"
          type="text"
          placeholder="어떤 장소를 찾으시나요?"
        ></input>
        <div id="map" ref={container}></div>
      </div>

      {/* <div class="modal">
        <div class="modal_body">Modal</div>
      </div> */}
    </div>
  );
};
export default Map;

/*

<div id='map'></div>
        <Link to="/SignUp">
            <button style={{color:'red'}}>회원가입</button>
        </Link>
*/
/*
useEffect(()=>{
        const container=document.getElementById('map');
        const options={
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map=new kakao.maps.Map(container, options);

        

        function displayMarker(locPosition) { //(locPosition, message)

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            
            //var iwContent = message, // 인포윈도우에 표시할 내용
                //iwRemoveable = true;
        
            // 인포윈도우를 생성
            //var infowindow = new kakao.maps.InfoWindow({
                //content : iwContent,
                //removable : iwRemoveable
            //});
            
            // 인포윈도우를 마커위에 표시 
            //infowindow.open(map, marker);
            
            // 지도 중심좌표를 접속위치로 변경
            map.setCenter(locPosition);      
        } 
        
        if (navigator.geolocation) {
    
            // GeoLocation을 이용해서 접속 위치
            navigator.geolocation.getCurrentPosition(function(position) {
                
                var lat = position.coords.latitude, // 위도
                    lon = position.coords.longitude; // 경도
                
                var locPosition = new kakao.maps.LatLng(lat, lon)//, // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                    //message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                
                // 마커와 인포윈도우를 표시합니다
                displayMarker(locPosition);
                    
              });
            
        } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
            
            var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                message = 'geolocation을 사용할수 없어요..'
                
            displayMarker(locPosition);
        }
       
    },[]);

*/
