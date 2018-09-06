
var mainSection = document.querySelector('.main-section');
var inputTitle = document.querySelector('.input-title');
var inputBody = document.querySelector('.input-body');
var saveButton = document.querySelector('.save-button');
var inputSearch = document.querySelector('.input-search');
var newCardContainer = document.querySelector('.new-card-container');
var qualityArray = ['swill', 'plausible', 'genius'];

saveButton.addEventListener('click', buildCard);
newCardContainer.addEventListener('keyup', saveContentEditable);
newCardContainer.addEventListener('click', deleteCard);
newCardContainer.addEventListener('click', upDownVote);

function createId() {
  return Math.random().toString(36).substr(2, 16);
};

function buildCard() {
  event.preventDefault();
  var ideaCardList = document.querySelector('.idea-card-list');
  var uniqueId = createId();
  createIdeaCard(uniqueId, inputTitle.value, inputBody.value, 0);
  inputTitle.value = '';
  inputBody.value = '';
};

function fetchCard() {
  if (localStorage.length > 0) {
    Object.keys(localStorage).forEach(function (key)  {
      var card = JSON.parse(localStorage.getItem(key));
      createIdeaCard(key, card.title, card.body, card.quality);
    })
  }  
};

function createIdeaCard(uniqueId, inputTitle, inputBody, quality) {
  var newCard = document.createElement('li');
  newCard.innerHTML = `<form class="idea-card" data-id="${uniqueId}">
                        <span class="idea-card-title-and-delete-button">
                          <h2 class="idea-card-title" contenteditable="true">${inputTitle}
                          </h2>
                          <img src="FEE-ideabox-icon-assets/delete.svg" class="card-buttons delete-button">
                        </span>
                        <p class="idea-card-text" contenteditable="true">${inputBody}
                        </p>
                        <span class="vote-buttons-and-quality">
                          <img src="FEE-ideabox-icon-assets/upvote.svg" class="card-buttons upvote-button">
                          <img src="FEE-ideabox-icon-assets/downvote.svg" class="card-buttons downvote-button">
                          <p class="quality">quality:<span class="quality-setting">${qualityArray[quality]}</span>
                          </p>
                        </span>
                        <hr>
                      </form>`;
  if (!localStorage.getItem(uniqueId)) {
    store(uniqueId, inputTitle, inputBody, quality)
  };                    
  newCardContainer.prepend(newCard);
};

function deleteCard(event) {
  if (event.target.classList.contains('delete-button')) {
    var idToRemove = event.target.closest('.idea-card').dataset.id;
    event.target.closest('li').remove();
    localStorage.removeItem(idToRemove);
  }
};

function saveContentEditable(event) {
  if (event.keyCode == '13') {
    var idToSaveContentEditable = event.target.closest('.idea-card').dataset.id;
    var grabCardForUpdate = JSON.parse(localStorage.getItem(idToSaveContentEditable));
    var qualitySetting = document.querySelector('.quality-setting').innerText;
    if (event.target.classList.contains('idea-card-title')) {
      var data = {title: event.target.innerText, body: grabCardForUpdate.body, quality: qualityArray.indexOf(qualitySetting)};
      localStorage.setItem(idToSaveContentEditable, JSON.stringify(data));
    } else if (event.target.classList.contains('input-card-text')) {
      var data = {body: event.target.innerText, title: grabCardForUpdate.title, quality: qualityArray.indexOf(qualitySetting)};
      localStorage.setItem(idToSaveContentEditable, JSON.stringify(data));
    }
  }
};

function upDownVote(event) {
    var qualitySetting = document.querySelector('.quality-setting');
  if (event.target.classList.contains('upvote-button')) {
    var qualityUp = qualityArray.indexOf(qualitySetting.innerText);
    qualityUp++;
    if (qualityUp > 2) {
      qualitySetting.innerText = qualityArray[2];
    } else {
      qualitySetting.innerText = qualityArray[qualityUp];
    }
  } else if (event.target.classList.contains('downvote-button')) {
    var qualityDown = qualityArray.indexOf(qualitySetting.innerText);
    qualityDown--;
    if (qualityDown < 0) {
      qualitySetting.innerText = qualityArray[0];
    } else {
      qualitySetting.innerText = qualityArray[qualityDown];
    }
  }
};

function store(uniqueId, inputTitle, inputBody, quality) {
  localStorage.setItem(uniqueId, JSON.stringify({title: inputTitle, body: inputBody, quality: quality}))
};

fetchCard();
