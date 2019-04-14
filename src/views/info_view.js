const PubSub = require('../helpers/pub_sub.js');

const InfoView = function(container){
  this.container = container;
};

InfoView.prototype.bindEvents = function(){
  PubSub.subscribe('Characters:selected-character-ready', (evt) => {
    const character = evt.detail;
    this.render(character);
  });
};
InfoView.prototype.buildElement = function(type, text, cls) {
  let element = document.createElement(type);
  if (text !='') { element.textContent = text}
  if (cls) { element.classList = cls }
  return element;
}
InfoView.prototype.render = function(character){
  const infoParagraph = this.buildElement('div', '');
  const characterName = this.buildElement('h2', `Character: ${character.name}`);
  const characterStatus = this.buildElement('p', `Status: ${character.status}`);
  const characterSpecies = this.buildElement('p', `Species: ${character.species}`);
  const characterGender = this.buildElement('p', `Gender: ${character.gender}`);
  const characterPicture = document.createElement('img');
  characterPicture.classList = 'picture';
  characterPicture.src = character.image;

  infoParagraph.appendChild(characterName);
  infoParagraph.appendChild(characterPicture);
  infoParagraph.appendChild(characterStatus);
  infoParagraph.appendChild(characterSpecies);
  infoParagraph.appendChild(characterGender);

  this.container.innerHTML = '';
  this.container.appendChild(infoParagraph);

};

module.exports = InfoView;
