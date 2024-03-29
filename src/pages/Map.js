/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../css/Map.css";

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
    } else {
      alert("현재 위치를 받아오지 못했습니다.");
    }
  }, [container]);

  //mainbar button click
  const [mymemoOpen, setmymemoOpen] = useState(false);
  const [mylctOpen, setmylctOpen] = useState(false);
  const [mypageOpen, setmypageOpen] = useState(false);

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
