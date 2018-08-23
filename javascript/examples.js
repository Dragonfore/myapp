"use strict";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function generatePi(){
    let currentPi = 0;
    let oscillation = 1; 
    for (let i = 0; i < 100000000; i++){
        currentPi += oscillation * (4/(2*i + 1));
        oscillation *= -1;
        if (i % 50 == 49){
            displayPi(currentPi.toFixed(20));
        }
        await(sleep(5));
    }
}
function displayPi(data){
    document.getElementById("displayAsyncMath").innerHTML = "PI: " + data;
}

async function scrollingPictures(){
    let gallery = document.getElementById('pictureGallery1');
    let pictures = ['converse.jpeg', 'mountain.jpeg', 'forest.jpeg'];
    let currentPicture = 0;
    gallery.appendChild(document.createElement('img'));
    while(true){
        let image = document.createElement('img');
        image.src = 'pictures/' + pictures[currentPicture];
        gallery.replaceChild(image, gallery.childNodes[0]);
        await(sleep(1000));
        currentPicture = (currentPicture+1)%pictures.length;
    }
}