
var inputTitle = document.querySelector('.input-title');
var inputBody = document.querySelector('.input-body');
var saveButton = document.querySelector('.save-button');
var inputSearch = document.querySelector('.input-search');
var newCardContainer = document.querySelector('.new-card-container');
var newObject = {};

saveButton.addEventListener('click', buildCard);
newCardContainer.addEventListener('click', deleteCard);

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

function store(uniqueId, inputTitle, inputBody) {
  localStorage.setItem(uniqueId, JSON.stringify({title: inputTitle, body: inputBody}));
}

fetchCard();
