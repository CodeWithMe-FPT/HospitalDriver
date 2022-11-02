import { 
    getAccountStatus,
    getListVictim
} from "./guideline.js";
let idDriver;
const checkAccount = async(e)=> {
    var email = document.querySelector('.input-email').value;
    var pass = document.querySelector('.input-password').value;
    e.preventDefault();
    let status  = await getAccountStatus(email, pass);
    if(status == "failed" || status == "none"){
        alert(status);
    } else{
        idDriver = status;
        window.location.href = "/dashboard";
    }
}

document.querySelector('.submit-account').addEventListener('submit', checkAccount);