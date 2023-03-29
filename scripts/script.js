const page = document.querySelector('.page')
const editButton = document.querySelector('.profile__edit');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup-edit');
const popupEditClose = document.querySelector('.popup-edit__close');
const popupEditFormElement = document.forms['profile'];
const editInputName = document.querySelector('.popup-edit__input_type_title');
const editInputDesc = document.querySelector('.popup-edit__input_type_description');
const popupAdd = document.querySelector('.popup-element');
const popupAddFormElement = document.forms['new-card'];
const popupAddName = document.querySelector('.popup-element__input_type_title');
const popupAddDesc = document.querySelector('.popup-element__input_type_description');
const popupAddClose = document.querySelector('.popup-element__close')
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;
const popImage = document.querySelector('.popup-image');
const popImageClose = popImage.querySelector('.popup-image__close');
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


function createCard(item) {
  const cardElement = elementTemplate.querySelector('.element').cloneNode(true);
  cardElement.querySelector('.element__image').src = item.link;
  cardElement.querySelector('.element__title').textContent = item.name;
  cardElement.querySelector('.element__image').alt = item.name;


  cardElement.querySelectorAll('.element__like').forEach((like) => {
    like.addEventListener('click', function() {
    like.classList.toggle('element__like_active')
  })
})
  cardElement.querySelector('.element__delete').addEventListener('click', function() {
    cardElement.querySelector('.element__delete').closest('.element').remove();
  });

  const image = cardElement.querySelector('.element__image');

  image.addEventListener('click', function() {
    const element = image.closest('.element');
    const title = element.querySelector('.element__title');
    popImageImg.src = image.src;
    popImageTitle.textContent = title.textContent;
    popImageImg.alt = title.textContent;
    openPopup(popImage);
  });
  return cardElement
}

initialCards.forEach(function(card) {
  const cardElement = createCard(card)
  elements.append(cardElement);
})

const openedPopup = document.querySelector('.popup_opened');


function openPopup(popups) {
  popups.classList.add('popup_opened');
  document.addEventListener('keydown', initClosePopupsWithEsc);
}

function closePopup(popups) {
  popups.classList.remove('popup_opened');
  document.removeEventListener('keydown', initClosePopupsWithEsc);
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
  initialCards.push(newCard);
  closePopup(popupAdd);
  const cardElement = createCard(newCard);
  elements.prepend(cardElement);
  popupAddName.value = '';
  popupAddDesc.value = '';
}

popupAddFormElement.addEventListener('submit', handleCardFormSubmit);


closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});


const initClosePopupsWithEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' || evt.key === 'Esc') {
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





