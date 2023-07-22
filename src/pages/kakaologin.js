const SocialKakao = ()=>
{
    const Rest_api_key='c684aed1126dd79ff99c6f8e0964d4fa' //REST API KEY
    const redirect_uri = 'http://localhost:8000/callback/' //Redirect URI
    // oauth 요청 URL
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`
    const handleLogin = ()=>{
        window.location.href = kakaoURL
    }
    return(
    <>
    <button onClick={handleLogin}>카카오 로그인</button>
    </>
    )
}
export default SocialKakao