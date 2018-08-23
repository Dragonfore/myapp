"use strict";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function generatePi(){
    for (let i = 0; i < 10000; i++){
        let currentPi = 0;
        let oscillation = 1;
        currentPi = oscillation * (4/(2*i + 1));
        oscillation *= -1;
        if (i % 50 == 49){
            displayPi(currentPi);
        }
    }
}
function displayPi(data){
    document.getElementById("displayAsyncMath").innerHTML = data;
}