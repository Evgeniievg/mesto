const editButton = document.querySelector('.profile__edit');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const popupEdit = '.popup-edit';
const popupEditFormElement = document.forms['profile'];
const editInputName = document.querySelector('.popup-edit__input_type_title');
const editInputDesc = document.querySelector('.popup-edit__input_type_description');
const popupAdd = '.popup-element';
const popupAddFormElement = document.forms['new-card'];
const popupAddName = document.querySelector('.popup-element__input_type_title');
const popupAddDesc = document.querySelector('.popup-element__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button');
const elements = '.elements';
const popImage = document.querySelector('.popup-image');
const popImageImg = popImage.querySelector('.popup-image__image');
const popImageTitle = popImage.querySelector('.popup-image__title');
const templateSelector = '#element';




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

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const forms = document.querySelectorAll(config.formSelector);


export {
  addButton,
  popupAddFormElement,
  editInputDesc,
  editInputName,
  editButton,
  config,
  initialCards,
  popupEdit,
  popupAdd,
  templateSelector,
  elements,
  forms
};
