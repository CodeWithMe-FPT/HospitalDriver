import { 
    callAmbulance,
    listenCall,
    getHospitalByAccount,
    deleteAllCall,
    receiveCall,
    getCaseById,
    completeCall,
    deleteCall,
    updatePosition,
} from "../store/api.js";

const victimList = document.querySelector('.victim-list');
const modal = document.querySelector('.modal')
Array.from(document.querySelectorAll('.btn-close-1')).map((btn)=>{
   btn.addEventListener('click',()=>{
    modal.classList.remove("modal-open")
   })
})

document.getElementsByTagName('body')[0].style.display = "none";
let uid, driverInfo, receiveCase, id;
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

const distance = (coordinates1, coordinates2) =>{
    var lat1 = coordinates1.split(", ")[0];
    var lon1 = coordinates1.split(", ")[1];
    var lat2 =  coordinates2.split(", ")[0];
    var lon2 = coordinates2.split(", ")[1];
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
            c(lat1 * p) * c(lat2 * p) * 
            (1 - c((lon2 - lon1) * p))/2;
    return (12742 * Math.asin(Math.sqrt(a))).toFixed(1); // 2 * R; R = 6371 km
}

const getAdress = (victimLocation) =>{
    navigator.geolocation.getCurrentPosition((pos)=>{
        let coordinate = `${pos.coords.latitude}, ${pos.coords.longitude}`
        let direct = document.createElement('a');
        direct.classList.add("btn", "btn-primary", "direct");
        let link = `https://www.google.com/maps/dir/${encodeURIComponent(coordinate)}/${encodeURIComponent(victimLocation)}`;
        direct.setAttribute("href", link);
        direct.innerHTML = "Dẫn đường"
        document.querySelector('.nagative-btn-container').appendChild(direct);    
    }, ()=>{
        alert(`ERROR(${err.code}): ${err.message}`);
    });
}

const renderCaseId = async (hosId, keyCall)=>{
    let victimInfo = await getCaseById(hosId, keyCall);
    const boxVictiminfo = document.createElement('div');
    boxVictiminfo.setAttribute('case-id',receiveCase);
    boxVictiminfo.classList.add("victim-case-info");
    boxVictiminfo.innerHTML = `<div class="hospital-name">${driverInfo.name}</div> <div class="coordinate">Tọa độ: ${victimInfo.coordinate}</div> <div class="phone-number">Số điện thoại: ${victimInfo.phone}</div>`
    document.querySelector('.victim-case-info-container').appendChild(boxVictiminfo);
    getAdress(victimInfo.coordinate);
}


await renderCaseId(driverInfo.hosId, receiveCase).then(()=>{
    id = navigator.geolocation.watchPosition((pos)=>{
        let coordinate = `${pos.coords.latitude}, ${pos.coords.longitude}`
        updatePosition(driverInfo.hosId, receiveCase, coordinate)
    }, ()=>{
        alert(`ERROR(${err.code}): ${err.message}`);
    })
})

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