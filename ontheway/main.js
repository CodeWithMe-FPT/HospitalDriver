import { 
    callAmbulance,
    listenCall,
    getHospitalByAccount,
    deleteAllCall,
    receiveCall,
    getCaseById,
    completeCall,
    deleteCall,
} from "../store/api.js";

const victimList = document.querySelector('.victim-list');
const modal = document.querySelector('.modal')
Array.from(document.querySelectorAll('.btn-close-1')).map((btn)=>{
   btn.addEventListener('click',()=>{
    modal.classList.remove("modal-open")
   })
})

document.getElementsByTagName('body')[0].style.display = "none";
let uid, driverInfo, receiveCase;
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

if(!uid || !receiveCase){
    window.location.href = "/";
} else{
        // callAmbulance("1842979c32e0.eb8e1b09ef8e6", "10.8445823, 106.7521356", "0333159054");
        driverInfo = await getHospitalByAccount(uid);
        let name = document.createElement('span');
        name.classList.add("driver-name", "mx-3");
        name.innerHTML = `Tài xế: ${driverInfo.nameDriver}`
        document.querySelector('.driver-name-cointainer').appendChild(name);      
        document.getElementsByTagName('body')[0].style.display = "block";
}

const renderCaseId = async (hosId, keyCall)=>{
    let victimInfo = await getCaseById(hosId, keyCall);
    const boxVictiminfo = document.createElement('div');
    boxVictiminfo.setAttribute('case-id',receiveCase);
    boxVictiminfo.classList.add("victim-case-info");
    boxVictiminfo.innerHTML = `<div class="hospital-name">${driverInfo.name}</div> <div class="coordinate">Tọa độ: ${victimInfo.coordinate}</div> <div class="phone-number">Số điện thoại: ${victimInfo.phone}</div>`
    document.querySelector('.victim-case-info-container').appendChild(boxVictiminfo)
}


renderCaseId(driverInfo.hosId, receiveCase)

document.querySelector('.btn-success').addEventListener('click',async()=>{
    document.cookie= `_cId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
    await completeCall(driverInfo.hosId, receiveCase);
    await deleteCall(driverInfo.hosId, receiveCase);
    window.location.href = "/dashboard";
})

document.querySelector('.log-out').addEventListener('click', ()=>{
    document.cookie= `_log=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
    window.location.href = "/";
})