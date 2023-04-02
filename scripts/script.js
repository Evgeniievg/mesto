import { config } from "./formValidator.js";
import { FormValidator } from "./formValidator.js";
import { Card } from "./Card.js";

const editButton = document.querySelector('.profile__edit');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup-edit');
const popupEditFormElement = document.forms['profile'];
const editInputName = document.querySelector('.popup-edit__input_type_title');
const editInputDesc = document.querySelector('.popup-edit__input_type_description');
const popupAdd = document.querySelector('.popup-element');
const popupAddFormElement = document.forms['new-card'];
const popupAddName = document.querySelector('.popup-element__input_type_title');
const popupAddDesc = document.querySelector('.popup-element__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const popImage = document.querySelector('.popup-image');
const popImageImg = popImage.querySelector('.popup-image__image');
const popImageTitle = popImage.querySelector('.popup-image__title');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];



function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupsWithEsc);
  validators.forEach((validator) => {
    validator.resetValidation();
    });

}

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupsWithEsc);
}

function editProfile() {
  openPopup(popupEdit);
  editInputName.value = profileName.textContent;
  editInputDesc.value = profileDesc.textContent;
}

editButton.addEventListener('click', editProfile);

function handleEditFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = editInputName.value;
  profileDesc.textContent = editInputDesc.value;
  closePopup(popupEdit);
}



popupEditFormElement.addEventListener('submit', handleEditFormSubmit);

addButton.addEventListener('click', () => {
  openPopup(popupAdd);
});



function handleCardFormSubmit (evt) {
  evt.preventDefault();
  const newCard = {name: popupAddName.value, link: popupAddDesc.value};
  closePopup(popupAdd);
  const cardElement = createCard(newCard);
  elements.prepend(cardElement);
  evt.target.reset();
}

popupAddFormElement.addEventListener('submit', handleCardFormSubmit);


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


const closePopupsWithEsc = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function initClosePopupsWithClick() {
  popups.forEach((popup) => {
    popup.addEventListener('click', function(evt) {
      if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
    })
})
}
initClosePopupsWithClick();



const forms = document.querySelectorAll(config.formSelector);
const validators = [];

forms.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  validators.push(validator);
})


function handleCardClick(name, link) {
  popImageImg.src = link;
  popImageTitle.textContent = name;
  popImageImg.alt = name;
  openPopup(popImage);
}


function createCard(item) {
  const card = new Card(item, '#element', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement
}


initialCards.forEach((item) => {
  const cardElement = createCard(item);
  elements.append(cardElement);
});
