import { API_BASE_URL } from "./api-config";

export function call(api, method, request){

    let headers = new Headers({
        "Content-Type": "application/json",
    });

    //로컬 스토리지에서 ACCESS TOKEN 가져오기 
    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken != null){
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };
    
    if(request){
        options.body = JSON.stringify(request);
    }
    return fetch(options.url, options)
    .then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if (response.status === 403) {
            return Promise.reject(new Error("Forbidden"));
        } else {
            return Promise.reject(new Error("An error occurred"));
        }
    })
    .catch((error) => {
        console.error("HTTP error:", error);
        return Promise.reject(error);
    });
}

//로그인
export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.token){
                //로컬 스토리지에 토큰 및 사용자 정보 저장
                localStorage.setItem("ACCESS_TOKEN", response.token);
                localStorage.setItem("USER_ID", response.userId);
                localStorage.setItem("USERNAME", response.username);
                window.location.href = "/";
            } else {
                alert("ID 또는 비밀번호가 잘못되었습니다.");
            }
        }) .catch((error) => {
            alert("ID 또는 비밀번호가 잘못되었습니다.");
        });
}

//회원가입
export function signup(userDTO){
    return call("/auth/signup", "POST", userDTO);
}

//로그아웃
export function signout() {
    //로컬스토리지에 저장된 값 삭제
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_ID");
    localStorage.removeItem("USERNAME");
    window.location.href = "/";
}