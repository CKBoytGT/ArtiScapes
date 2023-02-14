//bj unsplash API area
let mainPageEl = document.getElementById('main-image');
const generateImgBtn = document.getElementById('gen-image');
const footerEl = document.getElementById('photo-credit');
// api call
const unsplashUrl =
  'https://api.unsplash.com/photos/random?orientation=landscape&query=nature landscape&client_id=' + unsplashKey;

window.onload = buildHTML();
generateImgBtn.addEventListener('click', getImage);

function getImage() {
   // clear the time interval before getting next image
   timeOver(timerInterval)
    
  fetch(unsplashUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    displayImage(data.urls.full, data.links.html, data.user.name);
    addHistory(data.urls.thumb, data.links.html, data.alt_description)
    }) 
  };
  
  function resetTimer(){
    clearInterval(timerInterval)
    timerEl.classList.remove('hidden')
    countdownEL.value = '';
    minutesElHidden.textContent = '00';
    secondsEl.textContent = '00';
    secondsElHidden.textContent = '00';
  }

  function addHistory (thumbnail, url, alt){
    
    let recentPhotoArray =
    JSON.parse(window.localStorage.getItem('recentPhotos')) || [];
    
    let newPhoto = {
      thumbnail: thumbnail,
      url: url,
      alt: alt,
    };
    
    // add the score to the array
    recentPhotoArray.push(newPhoto);
    
    if (recentPhotoArray.length > 6) {
      recentPhotoArray.reverse();
      recentPhotoArray.pop();
      recentPhotoArray.reverse();
    }
    // when sending to local systme must stringify and then set it
    window.localStorage.setItem('recentPhotos', JSON.stringify(recentPhotoArray));
    
    buildHTML();
  };

  function buildHTML() {
    let recentPhotoArray = JSON.parse(window.localStorage.getItem('recentPhotos')) || [];
    
    const showRecentPhotoMessage = document.getElementById('recents-container');

    if (recentPhotoArray.length == 0) {
      showRecentPhotoMessage.innerHTML = `
      <p>You have no recent images to display.</p>
      `
    } else {
      showRecentPhotoMessage.innerHTML = `
      <p>Your most recently viewed images:</p>
      `
    };

    const recentPhotosEl = document.getElementById('recent-photos');
    // clear the container
    recentPhotosEl.innerHTML = '';
        
    // buiild the  thumb nails and links
    for (let index = 0; index < recentPhotoArray.length; index++) {
      let alt = recentPhotoArray[index].alt;
      let thumbnail = recentPhotoArray[index].thumbnail;
      let url = recentPhotoArray[index].url;
       
      // replace the html element with the thubmnails
      recentPhotosEl.innerHTML += `
      <div class=" rounded-lg">
      <a href="${url}" target="_blank" ><img class="h-24 w-40" src=${thumbnail} alt="${alt}">
      </a>
      </div>
      `;
    };
  };
  
  function displayImage(imageURL, userSite, name) {
    let image = imageURL;
    
    mainPageEl.innerHTML = `<img class="min-w-full min-h-full absolute object-cover" src="${image}" alt=""> `;
    
    footerEl.innerHTML = `Photo by <a href="${userSite}" target="_blank" class="underline hover:text-emerald-500">${name}</a>`;
  };

// TIMER
const countdownEL = document.getElementById('time-minutes');
// filter the input field to only accept digits and limit to 2 characters
countdownEL.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1');
  if (this.value.length > 2) {
    this.value = this.value.slice(0, this.maxLength);
  };
});
const secondsEl = document.getElementById('time-seconds');
// for the hide UI mini-timer
const minutesElHidden = document.getElementById('hidden-time-min');
const secondsElHidden = document.getElementById('hidden-time-sec');

let timerEl = document.getElementById('set-timer');
timerEl.addEventListener('click', updateCountdown);
timerInterval = '';
function updateCountdown() {
  const initialTime = countdownEL.value;
  if (initialTime > 0) {
    timerEl.classList.add('hidden')
    let time = countdownEL.value * 60;
    timerInterval = setInterval(function () {
      const minutes = Math.floor(time / 60);
      let seconds = time % 60;

      countdownEL.value = minutes;
      secondsEl.textContent = seconds;

      // for the hide UI mini-timer
      minutesElHidden.textContent = minutes;
      secondsElHidden.textContent = seconds;

      if (seconds < 10) {
        secondsEl.textContent = '0' + seconds;
        secondsElHidden.textContent = '0' + seconds;
      };
      time--;

      if (time < 0) {
        // pass the time interval to timeOver function
        timeOver(timerInterval);
        getImage();
        timerEl.classList.remove('hidden');
      };
    }, 1000);
  }
};

function timeOver(timerInterval) {
  clearInterval(timerInterval);
  timerEl.classList.remove('hidden')
  countdownEL.value = '';
  minutesElHidden.textContent = '00';
  secondsEl.textContent = '00';
  secondsElHidden.textContent = '00';
};

// IMAGE HISTORY
const imageHistoryEl = document.getElementById('image-history');
const imageHistoryBtn = document.getElementById('image-history-btn');
const imageHistoryBtnMobile = document.getElementById('image-history-btn-mobile');
const imageHistoryBtnX = document.getElementById('image-history-x');

imageHistoryBtn.addEventListener('click', showImageHistory);
imageHistoryBtnMobile.addEventListener('click', showImageHistory);
imageHistoryBtnX.addEventListener('click', showImageHistory);

function showImageHistory() {
  buildHTML() 
  if (imageHistoryEl.classList.contains('hidden')) {
    imageHistoryEl.classList.remove('hidden');
    imageHistoryBtn.classList.add('bg-emerald-900');
    imageHistoryBtnMobile.classList.add('bg-emerald-900');
    imageHistoryBtn.classList.remove(
      'hover:bg-emerald-700',
      'active:bg-emerald-900',
      'border',
      'border-white'
    );
    imageHistoryBtnMobile.classList.remove(
      'hover:bg-emerald-700',
      'active:bg-emerald-900'
    );
  } else {
    imageHistoryEl.classList.add('hidden');
    imageHistoryBtn.classList.remove('bg-emerald-900');
    imageHistoryBtnMobile.classList.remove('bg-emerald-900');
    imageHistoryBtn.classList.add(
      'hover:bg-emerald-700',
      'active:bg-emerald-900',
      'border',
      'border-white'
    );
    imageHistoryBtnMobile.classList.add(
      'hover:bg-emerald-700',
      'active:bg-emerald-900'
    );
  };
};

