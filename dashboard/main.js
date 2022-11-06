import { 
    signIn,
    
} from "../store/api.js";
let uid;
let cookie_log = document.cookie.split("; ").forEach((key, index)=>{
    var x;
    if((x = document.cookie.split("="))[0]=="_log"){
        uid = x[1];
        console.log(uid);
    }
})

if(!uid){
    window.location.href = "/";
}

document.querySelector('.log-out').addEventListener('click', ()=>{
    document.cookie= `_log=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
    window.location.href = "/";
})