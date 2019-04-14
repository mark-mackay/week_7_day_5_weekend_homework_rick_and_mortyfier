const RickAndMorty = require('./models/rick_and_morty.js');
const SelectView = require('./views/select_view.js');
const InfoView = require('./views/info_view.js');
const ButtonView = require('./views/button_view.js');
const ErrorView = require('./views/error_view.js');

document.addEventListener('DOMContentLoaded', () => {
  const rickAndMorty = new RickAndMorty();
  rickAndMorty.bindEvents();

  const selectContainer = document.querySelector('select#character-selector');
  const selectView = new SelectView(selectContainer);
  selectView.bindEvents();

  const buttonContainer = document.querySelector('#button-container');
  const buttonView = new ButtonView(buttonContainer);
  buttonView.bindEvents();
  // forwardButton.addEventListener('click', handleButtonClick);

  const infoContainer = document.querySelector('#character-info');
  const infoView = new InfoView(infoContainer);
  infoView.bindEvents();

  const errorView = new ErrorView(infoContainer);
  errorView.bindEvents();
});
