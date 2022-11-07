import { 
    signIn,
    
} from "./store/api.js";
let uid, receiveCase;
let cookie_log = document.cookie.split("; ").forEach((key, index)=>{
    var x;
    if((x = key.split("="))[0]=="_log"){
        uid = x[1];
        console.log(uid);
    }
    if((x = key.split("="))[0]=="_cId"){
        receiveCase = x[1];
        console.log(receiveCase);
    }
})

if(uid){
    if(uid&&receiveCase){
        window.location.href = "/ontheway";
    } else{
        window.location.href = "/dashboard";
    }
    
} else{
    console.log("please login first")
}

if(uid && receiveCase){
    window.location.href = "/ontheway"
}

const checkAccount = async(e)=> {
    const check = {
        email: document.querySelector('.input-email').value,
        password: document.querySelector('.input-password').value
    }
    e.preventDefault();
    let status  = await signIn(check);
    if(typeof status === "object"){
        var now = new Date();
        now.setDate(now.getDate() + 1);
        document.cookie= `_log=${status.id}; expires=${now.toUTCString()}`;
        window.location.href = "/dashboard";
    } else{
        alert(status);
    }
}

document.querySelector('.submit-account').addEventListener('submit', checkAccount);