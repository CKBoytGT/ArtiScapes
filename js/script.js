//bj unsplash API area
let mainPageEl = document.getElementById('main-image');
const generateImgBtn = document.getElementById('gen-image');
const footerEl = document.getElementById('photo-credit');
// api call
const unsplashUrl =
  'https://api.unsplash.com/photos/random?orientation=landscape&query=nature landscape&client_id=RXClu4iq9UxSj8v52n3NqMX7OGHFk_4-8iFI4x2PlZw';

generateImgBtn.addEventListener('click', getImage);

function getImage() {
  fetch(unsplashUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayImage(data.urls.regular, data.links.html, data.user.name);

      buildHTML(data);
    });
}

function displayImage(imageURL, userSite, name) {
  console.log(imageURL);

  let image = imageURL;
  console.log(image);

  mainPageEl.innerHTML = `<img class="min-w-full min-h-full absolute object-cover" src="${image}" alt=""> `;

  footerEl.innerHTML = `Photo By: <a href="${userSite}" target="_blank" class="underline">${name}</a>
   `;
}

// mobile menu toggle (will rework this so it doesn't use the HTML attribute for onclick)
function menuToggle() {
  var x = document.getElementById('mobile-menu');
  if (x.classList.contains('hidden')) {
    x.classList.remove('hidden');
  } else {
    x.classList.add('hidden');
  }
}

// "how to use" open and close
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
  }
}

howToUseBtn.addEventListener('click', howToToggle);
howToUseBtnMobile.addEventListener('click', howToToggle);
howToUseX.addEventListener('click', howToToggle);

// timer
// const minutesEl = document.getElementById('time-minutes');
let countdownEL = document.getElementById('time-minutes');
const secondsEl = document.getElementById('time-seconds');

let timerEl = document.getElementById('set-timer');
timerEl.addEventListener('click', updateCountdown);
console.log(countdownEL.value);

//setInterval(updateCountdown, 1000)

function updateCountdown() {
  console.log(countdownEL.value);
  const initialTime = countdownEL.value;
  let time = countdownEL.value * 60;
  timerInterval = setInterval(function () {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    countdownEL.value = minutes;
    secondsEl.value = seconds;

    //seconds = seconds < 10 ? '0' + seconds;
    if (seconds < 10) {
      secondsEl.value = '0' + seconds;
    }
    time--;

    if (time < 0) {
      clearInterval(timerInterval);
      timeOver(initialTime);
      getImage();
    }
  }, 1000);
}

function timeOver(initialTime) {
  console.log('time is up');
  console.log(initialTime);
  countdownEL.value = initialTime;
}

//Image History
const imageHistoryEl = document.getElementById('image-history');
const imageHistoryBtn = document.getElementById('image-history-btn');
const imageHistoryBtnMobile = document.getElementById(
  'image-history-btn-mobile'
);
const imageHistoryBtnX = document.getElementById('image-history-x');

imageHistoryBtn.addEventListener('click', showImageHistory);
imageHistoryBtnMobile.addEventListener('click', showImageHistory);
imageHistoryBtnX.addEventListener('click', showImageHistory);

function showImageHistory() {
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
  }
}

function buildHTML(data) {
  console.log(data);

  let recentPhotoArray =
    JSON.parse(window.localStorage.getItem('recentPhotos')) || [];

  let newPhoto = {
    thumbnail: data.urls.thumb,
    url: data.links.html,
    alt: data.alt_description,
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

  const recentPhotosEl = document.getElementById('recent-photos');
  // clear the container
  recentPhotosEl.innerHTML = '';

  // buiild the  thumb nails and links
  for (let index = 0; index < recentPhotoArray.length; index++) {
    let url = recentPhotoArray[index].url;
    let thumbnail = recentPhotoArray[index].thumbnail;
    let alt = recentPhotoArray[index].alt;

    // replace the html element with the thubmnails
    recentPhotosEl.innerHTML += `
    <div class="border border-emerald-700 w-32 my-2 rounded-lg">
    <a href="${url}" target="_blank" ><img src=${thumbnail} alt="${alt}">
    </a>
    </div>
    `;
  }
}
