//bj unsplash API area
let  mainPageEl = document.getElementById('main-image')
const generateImgBtn = document.getElementById('gen-image')
const footerEl = document.getElementById('photo-credit')
// api call 
const unsplashUrl = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature landscape&client_id=RXClu4iq9UxSj8v52n3NqMX7OGHFk_4-8iFI4x2PlZw' 

generateImgBtn.addEventListener('click', (event) =>{
  console.log(event);
  fetch(unsplashUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    displayImage(data.urls.regular, data.links.html, data.user.name)
  })
}
)

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

function menuToggle() {
  var x = document.getElementById("mobile-menu");
  if (x.classList.contains("hidden")) {
    x.classList.remove("hidden");
  } else {
    x.classList.add("hidden");
  }
}