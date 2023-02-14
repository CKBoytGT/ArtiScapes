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