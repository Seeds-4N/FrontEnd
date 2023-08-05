import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useEffect,useRef,useState } from 'react';
import "../css/Map.css";
import axios from 'axios';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';

var folder=[
    {
        id : 0,
        name : '폴더1',
        location : ['세종대학교', '건국대학교']
    },
    {
        id : 1,
        name : '폴더2',
        location : ['설빙','스타벅스','투썸플레이스']
    },
    {
        id : 2,
        name : '폴더3',
        location : ['세종대학교', '스타벅스']
    }
]

var user=[
    {
        name : '한별',
        id : 'qufdl8382@gmail.com',
        pw : '12345678'
    }
]

var memo=[
    {
        id:0,
        postdate: '20230730',
        posttitle: '오늘 장소 일기1',
        postcontent: 'brbrbrbrbr',
        update: '00',
        userId: 'qufdl8382@gmail.com',
        _status : 'brbr', //로그인 상태
        area : '세종대학교'
    },
    {
        id:1,
        postdate: '20230728',
        posttitle: '오늘 장소 일기2',
        postcontent: 'brbrbrbrbr',
        update: '00',
        userId: 'qufdl8382@gmail.com',
        _status : 'brbr',
        area:'세종대학교'
    },
    {
        id:2,
        postdate: '20230623',
        posttitle: '오늘 장소 일기3',
        postcontent: 'brbrbrbrbr',
        update: '00',
        userId: 'qufdl8382@gmail.com',
        _status : 'brbr'
    }
]

const {kakao}=window;

const Map=(props)=>{
    
    const container = useRef(null); // 지도를 담을 영역의 DOM 레퍼런스
    const [map, setMap] = useState(null); // 지도 인스턴스를 저장할 state
    

    // 지도 초기화
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

            const locPosition = new window.kakao.maps.LatLng(lat, lon);
        });

        if (container.current) {
            const options = {
                center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                level: 3,
            };

            const initialMap = new window.kakao.maps.Map(container.current, options);
            setMap(initialMap);
        }
    }, []); //[container]
   

    // 위치에 마커 생성
    const placeMarker = () => {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude, // 위도
            lon = position.coords.longitude; // 경도

            const locPosition = new window.kakao.maps.LatLng(lat, lon);
            const marker = new window.kakao.maps.Marker({ position: locPosition });

            marker.setMap(map);
            map.setCenter(locPosition); // 마커가 위치한 중심으로 이동
        });
        } else {
        alert("현재 위치를 받아오지 못했습니다.");
        }
    };


    //mainbar button click
    const[mymemoOpen, setmymemoOpen]=useState(false);
    const[mylctOpen, setmylctOpen]=useState(false);
    const[mypageOpen, setmypageOpen]=useState(false);

    function Mymemo(){
        setmylctOpen(false);
        setmypageOpen(false);
        setmymemoOpen(mymemoOpen=>!mymemoOpen);
    }

    function Mylocation(){
        setmymemoOpen(false);
        setmypageOpen(false);
        setmylctOpen(mylctOpen=>!mylctOpen);
    }

    function Mypage(){
        setmymemoOpen(false);
        setmylctOpen(false);
        setmypageOpen(mypageOpen=>!mypageOpen);
    }

    //폴더목록
    const [folderlist, setfolderlist] = useState(true);
    const [selectedFolder, setSelectedFolder] = useState(null);
    
    const folderClick = (folder) => {
      setfolderlist(!folderlist);
      setSelectedFolder(folder);
    };

    //기록목록
    const [memolist, setmemolist]=useState(true);
    const [selectedList, setSelectedList]=useState(null);
    const [viewAll, setViewAll]=useState(true); //전체보기 or 장소별로 보기 

    const memoClick=(memo)=>{
        setmemolist(!setmemolist);
        setSelectedList(memo);
    }

    //회원탈퇴
    const handleDeleteProfile=(e)=>{
        e.preventDefault();
        if(window.confirm('정말로 탈퇴하시겠습니까?ㅜ ')){
            axios.delete('https://jsonplaceholder.typicode.com/todos/1') //임시 url
                .then(function (response) {
                    // handle success
                    console.log('회원정보 삭제 성공');
                })
                .catch(function (error) {
                    // handle error
                    console.log('실패');
                })
        }
    }

    
    return(
        <div id='home'>
            <div className='mainbar'>
                <Link to="/">
                    <button className='homebtn'>4N</button>
                </Link>
                <Link to="/Prac">
                    <button style={{backgroundColor:'transparent', color:'white'}}>pra</button>
                </Link> 
                <button onClick={Mymemo} className={mymemoOpen?'btnActive':'btnInactive'}>내기록</button>
                <button onClick={Mylocation} className={mylctOpen?'btnActive':'btnInactive'}>내장소</button> 
                <button onClick={Mypage} className={mypageOpen?'btnActive':'btnInactive'} style={{marginBottom:'40vh'}}>마이페이지</button> 
                <Link to="/Login">
                    <button className='loginbtn'>로그인</button>
                </Link>   
            </div>
            <div className={mymemoOpen?'mymemoActive':'mymemoInactive'}>
                <h3>내 기록</h3>
            </div>
            <div className={mylctOpen?'mylctActive':'mylctInactive'}>
                <h3 style={{marginLeft:'12vw'}}>내 장소</h3>
                <div className='mylocation'>
                    {folderlist ? (
                        <div className='folder'>
                            <div>
                                <button style={{margin:'0px 0px 10px 10px'}}>+폴더추가</button>
                            </div>
                            <div>
                                {folder.map((data)=>(
                                    <div  className='folderlist'>
                                        <button key={data.id} onClick={()=>folderClick(data)}>{data.name}
                                            <button className='more'>...</button>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className='location'>
                            <div className='locationList'>
                                {selectedFolder && selectedFolder.location.map((loc) => <div key={loc}><button>{loc}</button></div>)}
                            </div>
                            <button onClick={folderClick}>목록으로</button>
                        </div>
                    )}
                </div>
            </div>
            <div className={mypageOpen?'mypageActive':'mypageInactive'}>
                <h3 style={{marginLeft:'10vw'}}>마이페이지</h3>
                <span>이름</span><span>{user.map((data)=>(<span>{data.name}</span>))}</span><br/>
                <span>이메일</span><span>{user.map((data)=>(<span>{data.id}</span>))}</span><br/>
                <button onClick={handleDeleteProfile}>회원탈퇴</button>
            </div>
            <div>
                <div className='minibar'>
                    <button onClick={placeMarker}><GpsFixedIcon></GpsFixedIcon></button>
                    <button><FolderSpecialIcon></FolderSpecialIcon></button>
                </div>
                <input 
                    className='find'
                    type='text'
                    placeholder='어떤 장소를 찾으시나요?'
                    ></input>
                <div id='map' ref={container}></div>
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