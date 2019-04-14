const Request = require('../helpers/request.js');
const PubSub = require('../helpers/pub_sub.js');

const RickAndMorty = function () {
  this.data = null;
  this.characters = null;
};

RickAndMorty.prototype.bindEvents = function () {
  this.getData();
  PubSub.subscribe('SelectView:change', (evt) => {
    const characterIndex = evt.detail;
      this.publishCharacterByIndex(characterIndex);
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

module.exports = RickAndMorty;
