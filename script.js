
var inputTitle = document.querySelector('.input-title');
var inputBody = document.querySelector('.input-body');
var saveButton = document.querySelector('.save-button');
var inputSearch = document.querySelector('.input-search');
var newCardContainer = document.querySelector('.new-card-container');
var newObject = {};
var quality = 'swill';

saveButton.addEventListener('click', buildCard);
newCardContainer.addEventListener('click', deleteCard);
// newCardContainer.addEventListener('click', upDownVote);
newCardContainer.addEventListener('click', upVote);

function createId() {
  return Math.random().toString(36).substr(2, 16);
};

function buildCard() {
  event.preventDefault();
  var ideaCardList = document.querySelector('.idea-card-list');
  var uniqueId = createId();
  createIdeaCard(uniqueId, inputTitle.value, inputBody.value);
  inputTitle.value = '';
  inputBody.value = '';
};

function fetchCard() {
  if (localStorage.length > 0) {
    Object.keys(localStorage).forEach(function (key)  {
      var card = JSON.parse(localStorage.getItem(key))
      createIdeaCard(key, card.title, card.body)
    })
  }  
};

function createIdeaCard(uniqueId, inputTitle, inputBody) {
  var newCard = document.createElement('li');
  newCard.innerHTML = `<form class="idea-card" data-id="${uniqueId}">
                        <span class="idea-card-title-and-delete-button">
                          <h2 class="idea-card-title">${inputTitle}
                          </h2>
                          <img src="FEE-ideabox-icon-assets/delete.svg" class="card-buttons delete-button">
                        </span>
                        <p class="idea-card-text">${inputBody}
                        </p>
                        <span class="vote-buttons-and-quality">
                          <img src="FEE-ideabox-icon-assets/upvote.svg" class="card-buttons upvote-button">
                          <img src="FEE-ideabox-icon-assets/downvote.svg" class="card-buttons downvote-button">
                          <p class="quality">quality:<span class="quality-setting"> swill</span>
                          </p>
                        </span>
                        <hr>
                      </form>`;
  if (!localStorage.getItem(uniqueId)) {
    store(uniqueId, inputTitle, inputBody)
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

// trying to figure out how to make this one work
//this top function is a nested if else mess to change the quality. It doesnt work and it also 
//doesnt throw errors 
//you'll have to uncomment out the event listener for it and recomment 
//the one for the below function 

// function upDownVote(event) {
//   if (event.target.classList.contains('upvote-button')) {
//     if (event.target.innerHTML === 'swill') {
//       console.log(event.target)
//       event.target.innerHTML === 'plausible';
//     } else {
//       event.target.innerHTML === 'genius';
//     }
//   }
//   if (event.target.classList.contains('downvote-button')){
//     if (event.target.innerHTML === 'genius') {
//       event.target.innerHTML === 'plausible';
//     } else {
//       event.target.innerHTML === 'swill';
//     }
//   }
// };

// this bottom function is the for loop which actually works but loops completely through the 
//array and ends at genius yourl have to uncomment out the event listener for it and recomment 
//the one for the above function we will also have to target each cards unique id so it doesnt
//target only the top card youll see that if you create more than one card you can refresh the 
//page and click on the upvote button on a card below the top card and it will change the quality 
//on only the top card we will have to do this unique id thing on whatever function we create for 
//this
function upVote(event) {
  if (event.target.classList.contains('upvote-button')) {
    var qualityType = ['swill', 'plausible', 'genius'];
    var qualitySetting = document.querySelector('.quality-setting')
    for (var i = 0; i < qualityType.length; i++) {
      qualitySetting.innerText = qualityType[i];
    }
  }
};



function store(uniqueId, inputTitle, inputBody) {
  localStorage.setItem(uniqueId, JSON.stringify({title: inputTitle, body: inputBody}));}

fetchCard();
