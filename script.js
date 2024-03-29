'use strict';
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const message = document.createElement('div');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////
// Modal window
const dotContainer = document.querySelector('.dots');
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// SCROLLING

btnScrollTo.addEventListener('click',function(e){
  const slcords = section1.getBoundingClientRect();
window.scrollTo({
  left: slcords.left + window.pageXOffset,
  top: slcords.top + window.pageYOffset,
  behavior: 'smooth'
});
});

///////////////////////////////////////
// Adding New Element

message.classList.add('cookie-message');
message.innerHTML = `We use cookie for improved functionality
and analytic. <button class="btn btn--close-cookie">Git it!</button>`
header.after(message);
// header.append(message.cloneNode(true));

document.querySelector('.btn--close-cookie').
addEventListener('click',() => message.remove());

message.style.background = '#37383d';
message.style.width = '120%';

console.log(message.style.background);
console.log(message.style.height);

console.log(getComputedStyle(message).height);
document.documentElement.style.setProperty('--color-primary','orangered');


// // h1.addEventListener('mouseenter', showAlert);
// const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.background = randomColor();
//   console.log('Link',e.currentTarget); 
// });
// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.background = randomColor();
//   console.log('Container',e.currentTarget);
// });
// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.background = randomColor();
//   console.log('Nav',e.currentTarget);
// },true);

///////////////////////////////////////
// IMPLEMENTING PAGE NAVIGATION
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link'))
  {
const id = e.target.getAttribute('href');
document.querySelector(id).scrollIntoView({
  behavior:'smooth'
})
  }
});
// const h1 = document.querySelector('h1');
// console.log(h1.children);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// console.log(h1.parentNode);
// console.log(h1.parentElement);
// h1.closest('.header').style.background ='var(--gradient-secondary)';
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// [...h1.parentElement.children].forEach(function(el){
//   if(el != h1) el.style.transform = 'scale(.5)'
// })



tabsContainer.addEventListener('click',function(e){
const clicked = e.target.closest('.operations__tab');
if(!clicked) return;
tabs.forEach(function(el){
  el.classList.remove('operations__tab--active')
})
clicked.classList.add('operations__tab--active');
tabContent.forEach((el) => el.classList.remove('operations__content--active'));
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active');
})
const handleHover = function(e) {
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el =>{
      if (el !== link) el.style.opacity = this
    })
    logo.style.opacity = this
  }
}
// nav.addEventListener('mouseover',function(e){
//   handleHover(e,0.5)
// });
// nav.addEventListener('mouseout',function(e){
//   handleHover(e,1)
// });
nav.addEventListener('mouseover',handleHover.bind(0.5));

nav.addEventListener('mouseout',handleHover.bind(1));

// const initialCords = section1.getBoundingClientRect();
// console.log(initialCords.top);
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCords.top)
//   nav.classList.add('sticky');
//   else
//   nav.classList.remove('sticky');
// });
 const navHeight = nav.getBoundingClientRect().height;
 console.log(nav.getBoundingClientRect());
const sticky = function (entries) {
  const [entry] = entries;
 console.log(entry);
 if
 (!entry.isIntersecting) 
 nav.classList.add('sticky');
 else
 nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(
  sticky,{
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  }
);
headerObserver.observe(header);

const allSections = document.querySelectorAll('.section');
const revealSection = function(enteries,observer){
  const [entry] = enteries
  console.log(entry)
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');  
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root: null,
  threshold: 0.15
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function(enteries,observer){
  const [entry] = enteries;
  if(!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;  
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
    observer.unobserve(entry.target);
  });
}
const imgObserver = new IntersectionObserver(loadImg,
  {
    root: null,
    threshold: 0
  });
  imgTargets.forEach(img => imgObserver.observe(img));

// SLIDER
const slider = function (){
  
  let curSlide = 0 ;
  const btnleft = document.querySelector('.slider__btn--left');
  const btnright = document.querySelector('.slider__btn--right');

  const slides = document.querySelectorAll('.slide');
  let maxSlide = slides.length;


  const goToSlide = function(slide){
    slides.forEach((s,i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`));
  }

  const nextslide = function () {
    if(maxSlide -1 === curSlide)
    {
      curSlide = 0
    }
    else
    {
    curSlide++;
    }
    
    goToSlide(curSlide);
    activateDots(curSlide);
  }

  const prevSlide = function () {
     if(curSlide === 0){
      curSlide = maxSlide -1;
     }
     else
     {
     curSlide--;
     }
    goToSlide(curSlide);
    activateDots(curSlide);
  }
  btnright.addEventListener('click', nextslide);
  btnleft.addEventListener('click', prevSlide);

 document.addEventListener('keydown',function(e){
if(e.key === 'ArrowLeft') prevSlide();
e.key === 'ArrowRight' && nextslide();
 });
 const createDots = function(slide) {
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  });
 }

 dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset;
    goToSlide(slide)
    activateDots(slide);
  }
 })

 const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
 }


 const init = function (){
  goToSlide(0);
  createDots();
  activateDots(0);
 }
 init();
}
slider();

document.addEventListener('DOMContentLoaded',function(e){
  console.log('HTml parsed and Dom tree build',e)
});

window.addEventListener('load', function(e){
console.log('Page fully loaded', e);
});

window.addEventListener('beforeunload',function(e){
e.preventDefault();
e.returnValue = '';
});