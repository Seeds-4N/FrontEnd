import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const {kakao}=window;

const Map=(props)=>{
    
    useEffect(()=>{
        const container=document.getElementById('map');
        const options={
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 13
        };
        const map=new kakao.maps.Map(container, options);
        
    },[]);


    




    return(
    <div>
        <Link to="/SignUp">
			<button>회원가입</button>
		</Link>
        <div id='map' style={{width:'1000px', height:'1000px'}}></div>
    </div>
    
    );
    
};
export default Map;