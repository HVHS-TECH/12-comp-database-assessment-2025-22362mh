//FIREBASE SCORE INPUT
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";
import { ref, set, query, orderByChild, limitToFirst, get } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
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

fb_initialise();

function appleAttackScoreRec(){
    const uid = localStorage.getItem("userUid");
    const appleAttackScore = localStorage.getItem("userScore");

    const appleAttackScorePath = "gameScores/" + uid + "/appleAttackScore";
    var reference = ref(FB_GAMEDB, appleAttackScorePath);
    set(reference, appleAttackScore).then(() => {
        console.log("Userscore write rec for Apple Attack successful");
    }).catch((error) => {
        console.log(error);
    });
}

appleAttackScoreRec();

function aa_readSorted(){
    const uid = localStorage.getItem("userUid");
    const whereToReadFrom = "gameScores";
    const sortkey = "appleAttackScore";
    const numberToRead = 5;
    const reference = query(ref(FB_GAMEDB, whereToReadFrom), orderByChild(sortkey), limitToFirst(numberToRead));
    get(reference).then((snapshot) => {
        var fb_data = snapshot.val();
        console.log(fb_data);
      if (fb_data != null) {
            console.log("Sort read success");
            var finalScore = Object.values(fb_data);
            console.log(finalScore);
            console.log(finalScore[0].appleAttackScore);

            var firstPlace = document.getElementById("first_place");
            firstPlace.innerHTML = finalScore[0].appleAttackScore;

            var secondPlace = document.getElementById("second_place");
            secondPlace.innerHTML = finalScore[1].appleAttackScore;
        } else {
            console.log("Success: Record not found");
        }
    }).catch((error) => {
        console.log(error);
    });
    console.log(whereToReadFrom);
}

aa_readSorted();