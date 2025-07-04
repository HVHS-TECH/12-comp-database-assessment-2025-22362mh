import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";

import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

var authorise = false;
var userNameValid = false;
var userAgeValid = false;
var validated = false;

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
            localStorage.setItem("authorise", authorise);
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
        return;
    }

    //Username Validation
    const userName = document.getElementById("userName").value;
    if (userName === "") { //Checks if username is null
        alert("Please put in a username containing letters!"); 
        return;
    }
    //THE FOLLOWING CODE WAS GENERATED BY CHATGPT
    else if (Number.isFinite(+userName)) {
        console.log("The user name is purely numeric.");
        alert("User name can’t be just a number.");
        return;
    }
    else {
        userNameValid = true;
    }
    //END OF CODE GENERATED BY CHATGPT

    //User age validation
    const userAge = document.getElementById("userAge").value;
    if (userAge < 5 || userAge > 95 || userAge === ""){
        alert("Please put in a age between 5-95");
        return;
    }
    else {
        userAgeValid = true;
    }

    if (authorise === true && userNameValid === true){
        validated = true;
    }
    if (validated === true) {
        fb_writeRec();
    }
    }

function fb_writeRec(){
    //Getting the user input from the form.
    const userName = document.getElementById("userName").value;
    console.log(userName);

    const userAge = document.getElementById("userAge").value;
    console.log(userAge);

    const userDisplayName = userInfo.displayName;
    const userPhotoURL = userInfo.photoURL;

    //Writing the username to Apple Attack
    const userNamePath = "gameScores/" + userUid + "/appleAttack/userName";
    var reference = ref(FB_GAMEDB, userNamePath);
    set(reference, userName).then(() => {
        console.log("Username write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    //Writing username to Meteor Rush
    const userNamePath2 = "gameScores/" + userUid + "/meteorRush/userName";
    var reference = ref(FB_GAMEDB, userNamePath2);
    set(reference, userName).then(() => {
        console.log("Username write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    //Writing age to database under UserData
    const userAgePath = "userData/" + userUid + "/userAge"
    var reference = ref(FB_GAMEDB, userAgePath);
    set(reference, userAge).then(() => {
        console.log("User age write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    //Getting Display Name from email and writing it to database under userData
    const userDisplayNamePath = "userData/" + userUid + "/userDisplayName"
    var reference = ref(FB_GAMEDB, userDisplayNamePath);
    set(reference, userDisplayName).then(() => {
        console.log("User display name write rec successful");
    }).catch((error) => {
        console.log(error);
    });

    //Getting photoURL and writing it to database under userData
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