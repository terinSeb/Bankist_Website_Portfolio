'use strict';
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');

///////////////////////////////////////
// Modal window

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
const header = document.querySelector('.header');

const message = document.createElement('div');
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