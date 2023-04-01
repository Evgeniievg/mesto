import { config } from "./formValidator.js";

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
const saveButtons = document.querySelectorAll('.popup__button')


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

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._template = document.querySelector(templateSelector).content.querySelector('.element');
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.element')
    .cloneNode(true)

      return cardElement;
  }

  _handleOpenPopup() {
    popImageImg.src = this._link;
    popImageTitle.textContent = this._name;
    popImageImg.alt = this._name;
    openPopup(popImage);
  }

  _setEventListeners() {
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopup()
    })
    this._element.querySelector('.element__like').addEventListener('click', () => {
      this._handleLikeButton()
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard()
    })
  }


  _handleLikeButton() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active')
  }

  _deleteCard() {
    this._element.remove();
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').alt = this._name;

    return this._element;
  }
}


initialCards.forEach((item) => {
  const card = new Card(item, '#element');
  const cardElement = card.generateCard();
  elements.append(cardElement);
});



function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupsWithEsc);
}

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupsWithEsc);
  saveButtons.forEach(button => {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass)
  })

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
  closePopup(popupAdd);
  const card = new Card({
    name: popupAddName.value,
    link: popupAddDesc.value
  }, '#element');
  const cardElement = card.generateCard();
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
