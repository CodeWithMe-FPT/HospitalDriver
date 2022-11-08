import { 
    callAmbulance,
    listenCall,
    getHospitalByAccount,
    deleteAllCall,
    receiveCall,
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

if(!uid){
    window.location.href = "/";
} else{
    if(receiveCase){
        window.location.href = "/ontheway";
    } else {
        driverInfo = await getHospitalByAccount(uid);
        let name = document.createElement('span');
        name.classList.add("driver-name", "mx-3");
        name.innerHTML = `Tài xế: ${driverInfo.nameDriver}`
        document.querySelector('.driver-name-cointainer').appendChild(name);
        document.getElementsByTagName('body')[0].style.display = "block";
    }
}

document.querySelector('.btn-confirm').addEventListener('click', ()=>{
    var now = new Date();
    now.setDate(now.getDate() + 1);
    document.cookie= `_cId=${receiveCase}; expires=${now.toUTCString()}; Path=/`;
    receiveCall(driverInfo.hosId, receiveCase)
    window.location.href = "/ontheway";
})

listenCall(driverInfo.hosId,(data)=>{
    victimList.innerHTML ="";
    console.log(data)
    data.map((victim)=>{
        const boxVictimInfo = document.createElement("div");
        boxVictimInfo.classList.add("victim-info-container");
        boxVictimInfo.setAttribute("case_id", victim.cId);
        boxVictimInfo.addEventListener('click', ()=>{
            document.querySelector('.modal').classList.add('modal-open');
            receiveCase = victim.cId;
            console.log(receiveCase)
        })
        boxVictimInfo.innerHTML = `<div class="victim-flex-box-1"> <img class="ambulance-img" src="../dashboard/assets/img/icons8-ambulance-50.png" alt=""> <div class="victim-flex-box-1-2"> <div class="hospital-name">${driverInfo.name}</div> <div class="victim-location" style="margin: 6px 0px 8px 0;">${victim.coordinate}</div> </div> </div> <div class="victim-flex-box2"> <button class="victim-phone-number"><svg xmlns="http://www.w3.org/2000/svg" class="victim-phone-number--icon" fill="#4069E5FF" id="Flat" viewBox="0 0 256 256"><path d="M176,224C96.59766,224,32,159.40234,32,80A56.07029,56.07029,0,0,1,80.91992,24.44434a16.037,16.037,0,0,1,16.65235,9.583l20.09179,46.87793a15.96924,15.96924,0,0,1-1.32031,15.06641L99.709,121.38965l-.00195.00195a76.54083,76.54083,0,0,0,35.20508,35.04981l25.043-16.69336a15.95163,15.95163,0,0,1,15.17871-1.39453l46.83789,20.07324a16.03476,16.03476,0,0,1,9.584,16.65234A56.07032,56.07032,0,0,1,176,224ZM82.86621,40.33105A40.01746,40.01746,0,0,0,48,80,128.1454,128.1454,0,0,0,176,208a40.04283,40.04283,0,0,0,39.68262-34.92578L168.832,153.06055l-25.03515,16.69433a15.98041,15.98041,0,0,1-15.74512,1.14063,92.59535,92.59535,0,0,1-42.76367-42.56934,15.993,15.993,0,0,1,1.03222-15.69824l16.63574-25.419Zm52.1416,116.15625h0Z"></path></svg><p class="phone-number--text">${victim.phone}</p></button> <div class="victim-distance"><svg xmlns="http://www.w3.org/2000/svg" class="vcitim-distance--icon" fill="#ef9834" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"></path></svg><p class="victim-distance--text">1.9km</p></div> <div class="ambulance-status"><svg xmlns="http://www.w3.org/2000/svg" class="ambulance-status--icon" fill="#1DD75B" id="Flat" viewBox="0 0 256 256"><path d="M232,128A104,104,0,1,1,128,24,104.12041,104.12041,0,0,1,232,128Z"></path></svg><p class="ambulance-status--text">Chưa đi</p></div> </div>`
        victimList.appendChild(boxVictimInfo)
    })
})

document.querySelector('.log-out').addEventListener('click', ()=>{
    document.cookie= `_log=; expires=Thu, 01 Jan 1970 00:00:00 UTC; Path=/`;
    window.location.href = "/";
})