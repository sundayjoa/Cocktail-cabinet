import { API_BASE_URL } from "./api-config";

function handleError(response) {
    return response.json().then((error) => {
        throw new Error(error.message || response.statusText);
    });
}

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
    return fetch(api, options).then((response) =>
        response.ok ? response.json() : handleError(response)
    );
}

//로그인
export function signin(userDTO){
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then((error) => {
                    throw new Error(error.error || "로그인 실패");
                });
            }
        })
        .then((data) => {
            if (data.token) {
                // 로컬 스토리지에 토큰 저장
                localStorage.setItem("ACCESS_TOKEN", data.token);
                localStorage.setItem("USER_ID", data.userId);
                localStorage.setItem("USERNAME", data.username);
                window.location.href = "/";
            } else {
                throw new Error("로그인 실패");
            }
        })
        .catch((error) => {
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