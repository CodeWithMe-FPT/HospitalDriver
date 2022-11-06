import { 
    signIn,
    
} from "../store/api.js";
let uid = document.cookie.split("; ")[2].split("=")[1];
console.log(uid);