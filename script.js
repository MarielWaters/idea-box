
var saveButton = document.querySelector('.save-button');
var inputSearch = document.querySelector('.input-search');

saveButton.addEventListener('click', createIdeaCard);

function createIdeaCard() {
  event.preventDefault();
  var inputTitle = document.querySelector('.input-title');
  var inputBody = document.querySelector('.input-body');
  var ideaCardList = document.querySelector('.idea-card-list');
  ideaCardList.innerHTML += `<form class="idea-card">
                            <span class="idea-card-title-and-delete-button">
                            <h2 class="idea-card-title">${inputTitle.value}</h2>
                            <img src="FEE-ideabox-icon-assets/delete.svg" class="card-buttons delete-button">
                            </span>
                            <p class="idea-card-text">${inputBody.value}
                            </p>
                            <span class="vote-buttons-and-quality">
                            <img src="FEE-ideabox-icon-assets/upvote.svg" class="card-buttons upvote-button">
                            <img src="FEE-ideabox-icon-assets/downvote.svg" class="card-buttons downvote-button">
                            <p class="quality">quality:<span class="quality-setting"> swill</span>
                            </p>
                            </span>
                            <hr>
                            </form>`;
  inputTitle.value = '';
  inputBody.value = '';
}