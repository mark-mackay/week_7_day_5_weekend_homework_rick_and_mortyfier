const PubSub = require('../helpers/pub_sub.js');

const SelectView = function(element){
  this.element = element;
};

SelectView.prototype.bindEvents = function(){
  PubSub.subscribe('Characters:all-characters-ready', (evt) => {
    const allCharacters = evt.detail;
    this.populate(allCharacters);
  });

  this.element.addEventListener('change', (evt) => {
    const selectedIndex = evt.target.value;
    PubSub.publish('SelectView:change', selectedIndex);
  });
};

SelectView.prototype.populate = function(charactersData){
  charactersData.forEach((character, index) => {
    const option = document.createElement('option');
    option.textContent = character.name;
    option.value = index;
    this.element.appendChild(option);
  })
}

module.exports = SelectView;
