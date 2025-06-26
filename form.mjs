import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

var authorise = false;

const FB_GAMECONFIG = {
    apiKey: "AIzaSyCd2Z_1nM5CI6l6NVOrvlN7EDbKEaSTiv0",
    authDomain: "comp-2025-mio-hoffman.firebaseapp.com",
    databaseURL: "https://comp-2025-mio-hoffman-default-rtdb.firebaseio.com",
    projectId: "comp-2025-mio-hoffman",
    storageBucket: "comp-2025-mio-hoffman.firebasestorage.app",
    messagingSenderId: "724400775542",
    appId: "1:724400775542:web:dccd0b43fb6bc612725a57",
    measurementId: "G-GYKCG77RCD"
  };

const COL_C = 'white';	    // These two const are part of the coloured
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
            'color: blue; background-color: white;');


function fb_authenticate(){
    const AUTH = getAuth();
    const PROVIDER = new GoogleAuthProvider();
    // The following makes Google ask the user to select the account
    PROVIDER.setCustomParameters({
            prompt: 'select_account'
        });
        signInWithPopup(AUTH, PROVIDER).then((result) => {
            //Code for a successful authentication goes here
            console.log(result.user);
            userInfo = result.user;
            userUid = result.user.uid;
            localStorage.setItem("userUid", userUid);
            authorise = true;
        })
        .catch((error) => {
            //Code for an authentication error goes here
            console.log(error);
        });
}

var userInfo;
var userUid;
var FB_GAMEDB;

function fb_initialise() {
    console.log('%c fb_initialise(): ', 
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
                
                const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
                FB_GAMEDB  = getDatabase(FB_GAMEAPP);
                console.info(FB_GAMEDB);  
                
                const app = initializeApp(FB_GAMECONFIG);
                const analytics = getAnalytics(app);
}

function validation(){
    if (authorise === false){
        alert("You must login first!");
    }
    else {
        fb_writeRec();
    }
    localStorage.setItem("authorise", authorise);
}

function fb_writeRec(){
    const userName = document.getElementById("userName").value;
    console.log(userName);

    const userAge = document.getElementById("userAge").value;
    console.log(userAge);

    const userDisplayName = userInfo.displayName;
    const userPhotoURL = userInfo.photoURL;

    const userNamePath = "gameScores/" + userUid + "/appleAttack/userName";
    var reference = ref(FB_GAMEDB, userNamePath);
    set(reference, userName).then(() => {
        console.log("Username write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    const userNamePath2 = "gameScores/" + userUid + "/meteorRush/userName";
    var reference = ref(FB_GAMEDB, userNamePath2);
    set(reference, userName).then(() => {
        console.log("Username write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    const userAgePath = "userData/" + userUid + "/userAge"
    var reference = ref(FB_GAMEDB, userAgePath);
    set(reference, userAge).then(() => {
        console.log("User age write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    const userDisplayNamePath = "userData/" + userUid + "/userDisplayName"
    var reference = ref(FB_GAMEDB, userDisplayNamePath);
    set(reference, userDisplayName).then(() => {
        console.log("User display name write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    const userPhotoURLPath = "userData/" + userUid + "/userPhotoURL"
    var reference = ref(FB_GAMEDB, userPhotoURLPath);
    set(reference, userPhotoURL).then(() => {
        console.log("User photo URL write rec successful");
        alert("Thank you! Sign in successful!");
    }).catch((error) => {
        console.log(error);
    });
}

export {fb_initialise, fb_authenticate, validation};