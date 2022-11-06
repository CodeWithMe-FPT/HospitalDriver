let cookie_log = document.cookie.split("=");
if(cookie_log.length==2){
    window.location.href = "/dashboard";
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