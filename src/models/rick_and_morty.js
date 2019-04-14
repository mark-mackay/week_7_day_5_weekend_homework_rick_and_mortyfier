const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const RickAndMorty = function () {
  this.data = null;
  this.characters = null;
  this.previousPage = '';
  this.nextPage = '';
};

RickAndMorty.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('SelectView:change', (evt) => {
    const characterIndex = evt.detail;
      this.publishCharacterByIndex(characterIndex);
  });
  PubSub.subscribe('Buttons: Clicked', (evt) => {
    const direction = evt.detail;
    if (direction === 'previous')  {
      this.getData(this.previousPage);
    }
    else if (direction === 'next' ){
      this.getData(this.nextPage);
    }
    else if (direction === 'last'){
      this.getData('https://rickandmortyapi.com/api/character/?page=25');
    }
    else {
      this.getData();
    };
  });
};

RickAndMorty.prototype.getData = function (url) {
if (!url) {
  url = `https://rickandmortyapi.com/api/character/`;
}
const request = new Request(url);

request.get()
    .then((characters) => {
      this.data = characters.results;
      this.previousPage = characters.info.prev;
      this.nextPage = characters.info.next;
      PubSub.publish('Characters:all-characters-ready', this.data);
      this.publishCharacters();
    })
    .catch((err) => {
      PubSub.publish('Characters:error', err);
    });
};

RickAndMorty.prototype.publishCharacters = function () {
  this.characters = this.characterList();
  PubSub.publish('Characters:characters-ready', this.characters);
}

RickAndMorty.prototype.characterList = function () {
  const fullList = this.data.map(character => character.name);
  return fullList;
}

RickAndMorty.prototype.informationByCharacter = function (characterIndex) {
  const selectedCharacter = this.data[characterIndex];
   // console.log('Index:', characterIndex);
   // console.log('selectedCharacter:', selectedCharacter);
  return this.data.find((character) => {
    return character.name === selectedCharacter.name;
  });
};

RickAndMorty.prototype.publishCharacterByIndex = function (characterIndex) {
  const foundCharacter = this.informationByCharacter(characterIndex);
  PubSub.publish('Characters:selected-character-ready', foundCharacter);
};

RickAndMorty.prototype.changePage = function() {

};

module.exports = RickAndMorty;
