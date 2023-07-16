import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import "../css/Map.css";
import "../css/main.css";

const {kakao}=window;

const Map=(props)=>{

    
    useEffect(()=>{
        const container=document.getElementById('map');
        const options={
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };
        const map=new kakao.maps.Map(container, options);

        function displayMarker(locPosition, message) {

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({  
                map: map, 
                position: locPosition
            }); 
            
            var iwContent = message, // 인포윈도우에 표시할 내용
                iwRemoveable = true;
        
            // 인포윈도우를 생성
            var infowindow = new kakao.maps.InfoWindow({
                content : iwContent,
                removable : iwRemoveable
            });
            
            // 인포윈도우를 마커위에 표시 
            infowindow.open(map, marker);
            
            // 지도 중심좌표를 접속위치로 변경
            map.setCenter(locPosition);      
        } 

        function MyLocation(){
            if (navigator.geolocation) {
    
                // GeoLocation을 이용해서 접속 위치
                navigator.geolocation.getCurrentPosition(function(position) {
                    
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
                    
                    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
                    
                    // 마커와 인포윈도우를 표시합니다
                    displayMarker(locPosition, message);
                        
                  });
                
            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                
                var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                    message = 'geolocation을 사용할수 없어요..'
                    
                displayMarker(locPosition, message);
            }
        }

        MyLocation();
       
    },[]);
    
    
    return(
        <div>
            <div className='topbar' style={{backgroundColor:'#9FAA81',}}>
                <Link to="/SignUp" style={{textDecoration:'none'}}>
                    <button>회원가입</button>
                </Link>
                <Link to="/Login" style={{textDecoration:'none'}}>
                    <button>로그인</button>
                </Link>
                <h4>4N : 장소를 기록하다</h4>
                <input 
                    type='text'
                    placeholder='어떤 장소를 찾으시나요?'
                    ></input>
            </div>
            <div className='main'>
                <div className='minibar'>
                    <button>-O-</button>
                    <button>☆</button>
                </div>
                <div id='map'></div>
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