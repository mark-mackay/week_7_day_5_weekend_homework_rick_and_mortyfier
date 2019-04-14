const PubSub = require('../helpers/pub_sub.js');

const ButtonView = function(container){
  this.container = container;
};

ButtonView.prototype.bindEvents = function(){

  const prevButton = document.querySelector('#prev-button');
  prevButton.addEventListener('click', (evt) => {
    this.handleButtonClick(evt.target.value);
  });
  const nextButton = document.querySelector('#next-button');
  nextButton.addEventListener('click', (evt) => {
    this.handleButtonClick(evt.target.value);
  });
  const firstButton = document.querySelector('#first-button');
  firstButton.addEventListener('click', (evt) => {
    this.handleButtonClick(evt.target.value);
  });
  const lastButton = document.querySelector('#last-button');
  lastButton.addEventListener('click', (evt) => {
    this.handleButtonClick(evt.target.value);
  });
  // PubSub.subscribe('Characters:all-characters-ready', (evt) => {
  //   const allCharacters = evt.detail;
  //   this.populate(allCharacters);
  // });
  //
  // this.element.addEventListener('click', (evt) => {
  //   const selectedIndex = evt.target.value;
  //   PubSub.publish('ButtonView:click', selectedIndex);
  // });
};

ButtonView.prototype.handleButtonClick = function(direction){
    PubSub.publish('Buttons: Clicked', direction);
};


module.exports = ButtonView;
