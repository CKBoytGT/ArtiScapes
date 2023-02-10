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
// const minutesEl = document.getElementById('time-minutes');
let countdownEL = document.getElementById('time-minutes')
const secondsEl = document.getElementById('time-seconds')

let timerEl = document.getElementById('set-timer')
timerEl.addEventListener('click', updateCountdown);
console.log(countdownEL.value);

//setInterval(updateCountdown, 1000)

function updateCountdown (){
  console.log(countdownEL.value);
  const initialTime = countdownEL.value
  let time = countdownEL.value * 60;
 timerInterval = setInterval(function() {


  const minutes = Math.floor(time / 60)
  let seconds = time % 60;

  countdownEL.value = minutes;
  secondsEl.value = seconds

  //seconds = seconds < 10 ? '0' + seconds;
  if (seconds < 10) {
    secondsEl.value = '0' + seconds;
  }
  time--;

     if (time < 0) {
      clearInterval(timerInterval)
       timeOver(initialTime);
       getImage();
     }
   }, 1000)
  };

function timeOver(initialTime){
  console.log('time is up');
  console.log(initialTime);
  countdownEL.value = initialTime;
  
}