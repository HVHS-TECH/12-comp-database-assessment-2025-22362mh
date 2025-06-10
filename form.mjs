import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";


import { ref, set } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { get, update }from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { query, orderByChild, limitToFirst } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
 
import { onValue, remove } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

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
            userUid = result.user.uid;
        })
        .catch((error) => {
            //Code for an authentication error goes here
            console.log(error);
        });
}

var userUid
var FB_GAMEDB

function fb_initialise() {
    console.log('%c fb_initialise(): ', 
                'color: ' + COL_C + '; background-color: ' + COL_B + ';');
                
                const FB_GAMEAPP = initializeApp(FB_GAMECONFIG);
                FB_GAMEDB  = getDatabase(FB_GAMEAPP);
                console.info(FB_GAMEDB);  
                
                const app = initializeApp(FB_GAMECONFIG);
                const analytics = getAnalytics(app);
}

function fb_writeRec(){
    const whereWrite = "userData/userUid";
    const dataToWrite = userUid;
    var reference = ref(FB_GAMEDB, whereWrite);
    set(reference, dataToWrite).then(() => {
        console.log("Write rec successful");
    }).catch((error) => {
        console.log(error);
    });
}

export { fb_initialise, fb_authenticate, fb_writeRec };