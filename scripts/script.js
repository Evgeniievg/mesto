let edit = document.querySelector('.profile__edit');
let popupEl = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let profileName = document.querySelector('.profile__title');
let profileDesc = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__form');
let inputName = document.querySelector('.popup__input_type_title');
let inputDesc = document.querySelector('.popup__input_type_description');


function popupOpen() {
  popupEl.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
}

function popClose() {
  popupEl.classList.remove('popup_opened');
}

edit.addEventListener('click', popupOpen);

popupClose.addEventListener('click', popClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  popClose();
}

formElement.addEventListener('submit', handleFormSubmit);
