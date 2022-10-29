const checkAccount = async(e)=> {
    var email = document.querySelector('.input-email').value;
    var pass = document.querySelector('.input-password').value
    e.preventDefault();
    // let status  = await getAccountStatus(email, pass);
    // if(!status){
    //     location.reload();
    // } else{
    //     if(status == "success"){
    //         console.log(status)
    //     } else{
    //         if(status == "failed"){
    //             console.log(status)
    //         } else{
    //             console.log(status);
    //         }
    //     }
    // }
    
}
 

document.querySelector('.submit-account').addEventListener('submit', checkAccount);