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
    return fetch(options.url, options).then((response) => {
        if (response.status === 200) {
            return response.json();
        } else if(response.status === 403){

        } else {
            Promise.reject(response);
            throw Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
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
            }
        });
}

//회원가입