//bj unsplash API area
let  mainPageEl = document.getElementById('main-image')
const generateImgBtn = document.getElementById('gen-image')
const footerEl = document.getElementById('photo-credit')
// api call 
const unsplashUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature landscape&client_id=RXClu4iq9UxSj8v52n3NqMX7OGHFk_4-8iFI4x2PlZw' 

generateImgBtn.addEventListener('click', getImage)


function getImage(){
  fetch(unsplashUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayImage(data.urls.regular, data.links.html, data.user.name)
  })
}

function displayImage(imageURL, userSite, name){
  console.log(imageURL);
 
  let image = imageURL
  console.log(image);

  mainPageEl.innerHTML =
   `<img class="min-w-full min-h-full absolute object-cover" src="${image}" alt=""> `

  footerEl.innerHTML = 
   `Photo By: <a href="${userSite}" target="_blank" class="underline">${name}</a>
   `
}

// mobile menu toggle (will rework this so it doesn't use the HTML attribute for onclick)
function menuToggle() {
  var x = document.getElementById("mobile-menu");
  if (x.classList.contains("hidden")) {
    x.classList.remove("hidden");
  } else {
    x.classList.add("hidden");
  }
}

// "how to use" open and close
const howToUseEl = document.getElementById('how-to-use');
const howToUseBtn = document.getElementById('how-to-use-btn');
const howToUseBtnMobile = document.getElementById('how-to-use-btn-mobile');
const howToUseX = document.getElementById('how-to-use-x');

function howToToggle() {
  if (howToUseEl.classList.contains("hidden")) {
    howToUseEl.classList.remove("hidden");
    howToUseBtn.classList.add("bg-emerald-900");
    howToUseBtnMobile.classList.add("bg-emerald-900");
    howToUseBtn.classList.remove("hover:bg-emerald-700", "active:bg-emerald-900", "border", "border-white");
    howToUseBtnMobile.classList.remove("hover:bg-emerald-700", "active:bg-emerald-900");
  } else {
    howToUseEl.classList.add("hidden");
    howToUseBtn.classList.remove("bg-emerald-900");
    howToUseBtnMobile.classList.remove("bg-emerald-900");
    howToUseBtn.classList.add("hover:bg-emerald-700", "active:bg-emerald-900", "border", "border-white");
    howToUseBtnMobile.classList.add("hover:bg-emerald-700", "active:bg-emerald-900");
  }
}

howToUseBtn.addEventListener('click', howToToggle);
howToUseBtnMobile.addEventListener('click', howToToggle);
howToUseX.addEventListener('click', howToToggle);

// timer 
// capture timer input
let timerEl = document.getElementById('set-timer')
let minutesEl = document.getElementById('time-minutes');
let secondsEl = document.getElementById('time-seconds');
//event listener on timer button 
timerEl.addEventListener('click', setTime);
// let secondsLeft 

function setTime() {
  console.log('button clicked');
  // Sets interval in variable
  console.log(secondsEl.value);
  // store the initial input of time to set once the timer is up
  const initialMinutes = minutesEl.value;
  const initialSeconds = secondsEl.value;
  // set the input time to a var that will be used to countdown
  let secondsLeft = secondsEl.value;
  let minutesLeft = minutesEl.value;
  timerInterval = setInterval(function () {
    secondsEl.value = secondsLeft;
    minutesEl.value = minutesLeft;


    // minutesLeft = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft;
    // secondsLeft = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft;
    secondsLeft--;
   
    if (secondsLeft < 10) {
      console.log('seconds below 10');
      secondsLeft = '0' + secondsLeft;
    }
    
  //   if (minutesLeft < 10) {
  //     console.log('minutes below 10');
  //     minutesLeft = '0' + minutesLeft;  
  //  }

    if (secondsLeft < 0 && minutesLeft > 0) {
      secondsLeft = 59;
      minutesLeft -= 1;
      
    }

    if (secondsLeft <= 0 && minutesLeft <= 0) {
      timeOver(initialMinutes, initialSeconds)
      // Stops execution of action at set interval
      getImage();
    }
  }, 1000);
}

// var m =0;
// var s =0;
// var t;
// function start(){
// t= setInterval(run,1000);
// }
// function run(){
// document.getEl......innerHTML = s;
// document.getEl....innerHTML = m;
// if(m<=90){
// m = m-1;}
// else{
// s=60;
// s= s-1
// }}


// timer ends 
function timeOver(initialMinutes, initialSeconds){
  console.log('time is up');
  clearInterval(timerInterval)
  minutesEl.value =initialMinutes
  secondsEl.value = initialSeconds
}

// let secondsInput