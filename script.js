let edit = document.querySelector('.profile__edit');
let popupEl = document.querySelector('.popup');
let popupClose = document.querySelector('.popup__close');
let page = document.querySelector('.page');
let profileName = document.querySelector('.profile__title');
let profileDesc = document.querySelector('.profile__description');
let formElement = document.querySelector('.popup__input');
let inputName = document.querySelector('.popup__input_title');
let inputDesc = document.querySelector('.popup__input_description');
let popupBut = document.querySelector('.popup__button')


function popup() {
  popupEl.classList.add('popup_opened');
  page.classList.add('page_fixed');
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
}

function popClose() {
  popupEl.classList.remove('popup_opened');
  page.classList.remove('page_fixed');
}

function savePopup() {
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  popClose();
}

edit.addEventListener('click', popup);

popupClose.addEventListener('click', popClose);

popupBut.addEventListener('click', savePopup)

function handleFormSubmit (evt) {
  evt.preventDefault();
  savePopup()
}

formElement.addEventListener('submit', handleFormSubmit);
