//bj unsplash API area
let mainPageEl = document.getElementById('main-image');
const generateImgBtn = document.getElementById('gen-image');
const footerEl = document.getElementById('photo-credit');
// api call
const unsplashUrl =
  'https://api.unsplash.com/photos/random?orientation=landscape&query=nature landscape&client_id=RXClu4iq9UxSj8v52n3NqMX7OGHFk_4-8iFI4x2PlZw';

  window.onload = buildHTML()
generateImgBtn.addEventListener('click', getImage);

function getImage() {
  fetch(unsplashUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayImage(data.urls.full, data.links.html, data.user.name);
      addHistory(data.urls.thumb, data.links.html, data.alt_description)
      
    }) 
  };
  
  function addHistory (thumbnail, url, alt){
    console.log(thumbnail, url, alt);
    
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
    console.log(recentPhotoArray);
    console.log(recentPhotoArray[0].alt);
    
    buildHTML();
  }
  function buildHTML() {
    let recentPhotoArray =
    JSON.parse(window.localStorage.getItem('recentPhotos')) || [];
    console.log(recentPhotoArray);
    
    const showRecentPhotoMessage = document.getElementById('recents-container')
      if (recentPhotoArray.length == 0) {
        showRecentPhotoMessage.innerHTML = `
        <p> You have No recent images to display.</p>
        `
        console.log('empty');
      } else if (recentPhotoArray.length > 0){
        console.log('you have 1 image placeholder');

      } else {
        console.log('you have multiple images placeholder');
      }


        const recentPhotosEl = document.getElementById('recent-photos');
        // clear the container
        recentPhotosEl.innerHTML = '';
        
        // buiild the  thumb nails and links
        for (let index = 0; index < recentPhotoArray.length; index++) {
          let alt = recentPhotoArray[index].alt;
          let thumbnail = recentPhotoArray[index].thumbnail;
          let url = recentPhotoArray[index].url;
          console.log(alt, thumbnail, url);
       
          // replace the html element with the thubmnails
      recentPhotosEl.innerHTML += `
      <div class=" py-1 rounded-lg">
      <a href="${url}" target="_blank" ><img class="h-24 w-32" src=${thumbnail} alt="${alt}">
      </a>
      </div>
      `;
    };
  };
  
  function displayImage(imageURL, userSite, name) {
    console.log(imageURL);
    
    let image = imageURL;
    console.log(image);
    
    mainPageEl.innerHTML = `<img class="min-w-full min-h-full absolute object-cover" src="${image}" alt=""> `;
    
    footerEl.innerHTML = `Photo By: <a href="${userSite}" target="_blank" class="underline">${name}</a>`;
  };
  
// MOBILE MENU TOGGLE
let menuToggled = false;
const mobileMenuBtn = document.getElementById('mobile-menu-btn');

mobileMenuBtn.addEventListener('click',   function() {
  const mobileMenu = document.getElementById('mobile-menu');
    const mobileIconClosed = document.getElementById('mobile-icon-closed');
  const mobileIconOpen = document.getElementById('mobile-icon-open');
  
  if (!menuToggled) {
    menuToggled = true;
    mobileMenu.classList.remove('hidden');
    mobileIconClosed.classList.replace('block','hidden');
      mobileIconOpen.classList.replace('hidden', 'block');
    } else {
      menuToggled = false;
    mobileMenu.classList.add('hidden');
      mobileIconOpen.classList.replace('block','hidden');
    mobileIconClosed.classList.replace('hidden', 'block');
  }
  });

  
// HOW TO USE TOGGLE
const howToUseEl = document.getElementById('how-to-use');
const howToUseBtn = document.getElementById('how-to-use-btn');
const howToUseBtnMobile = document.getElementById('how-to-use-btn-mobile');
const howToUseX = document.getElementById('how-to-use-x');

function howToToggle() {
  if (howToUseEl.classList.contains('hidden')) {
    howToUseEl.classList.remove('hidden');
    howToUseBtn.classList.add('bg-emerald-900');
    howToUseBtnMobile.classList.add('bg-emerald-900');
    howToUseBtn.classList.remove(
      'hover:bg-emerald-700',
      'active:bg-emerald-900',
      'border',
      'border-white'
    );
    howToUseBtnMobile.classList.remove(
      'hover:bg-emerald-700',
      'active:bg-emerald-900'
    );
  } else {
    howToUseEl.classList.add('hidden');
    howToUseBtn.classList.remove('bg-emerald-900');
    howToUseBtnMobile.classList.remove('bg-emerald-900');
    howToUseBtn.classList.add(
      'hover:bg-emerald-700',
      'active:bg-emerald-900',
      'border',
      'border-white'
    );
    howToUseBtnMobile.classList.add(
      'hover:bg-emerald-700',
      'active:bg-emerald-900'
    );
  };
};

howToUseBtn.addEventListener('click', howToToggle);
howToUseBtnMobile.addEventListener('click', howToToggle);
howToUseX.addEventListener('click', howToToggle);

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

function updateCountdown() {
  const initialTime = countdownEL.value;
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
      clearInterval(timerInterval);
      timeOver(initialTime);
      getImage();
    };
  }, 1000);
};

function timeOver(initialTime) {
  countdownEL.value = initialTime;
  minutesElHidden.textContent = initialTime;
};

//Image History
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


// HIDE UI
const hideUIBtn = document.getElementById('hide-ui-btn');
const navBar = document.getElementById('navbar');
const controlBar = document.getElementById('control-bar');
const hiddenTimer = document.getElementById('hidden-timer');
let hideUIToggled = false;

function hideUI() {
  if (!hideUIToggled) {
    hideUIToggled = true;
    navBar.classList.add('hidden');
    controlBar.classList.add('hidden');
    hiddenTimer.classList.replace('hidden', 'inline');
    hideUIBtn.textContent = 'Unhide UI';
  } else {
    hideUIToggled = false;
    navBar.classList.remove('hidden');
    controlBar.classList.remove('hidden');
    hiddenTimer.classList.replace('inline', 'hidden');
    hideUIBtn.textContent = 'Hide UI';
  };
};

hideUIBtn.addEventListener('click', hideUI);
