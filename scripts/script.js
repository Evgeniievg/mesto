const page = document.querySelector('.page')
const edit = document.querySelector('.profile__edit');
const popupEl = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');
const popupTitle = document.querySelector('.popup__title')
const formElement = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_title');
const inputDesc = document.querySelector('.popup__input_type_description')
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const addButton = document.querySelector('.profile__button');
const elements = document.querySelector('.elements');
const elementTemplate = document.querySelector('#element').content;

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

initialCards.forEach(function(card) {
  const initialElements = elementTemplate.querySelector('.element').cloneNode(true);
  initialElements.querySelector('.element__image').src = card.link;
  initialElements.querySelector('.element__title').textContent = card.name;
  elements.append(initialElements);
})

function addOneEl(){
  const newElement = elementTemplate.querySelector('.element').cloneNode(true);
  let lastEl = initialCards.length - 1;
  newElement.querySelector('.element__image').src = initialCards[lastEl].link;
  newElement.querySelector('.element__title').textContent = initialCards[lastEl].name;
  elements.prepend(newElement);
  const like = newElement.querySelector('.element__like');
  like.addEventListener('click', function() {
    like.classList.toggle('element__like_active');
  });

  const deleteEl = newElement.querySelector('.element__delete');
  deleteEl.addEventListener('click', function() {
    deleteEl.parentElement.remove();
  });

  const image = newElement.querySelector('.element__image');
  image.addEventListener('click', function() {
    const element = image.parentElement;
    const title = element.querySelector('.element__title');
    popImage.classList.add('popup-image_opened')
    popImage.querySelector('.popup-image__image').src = image.src;
    popImage.querySelector('.popup-image__title').textContent = title.textContent;
  });
}

function popupOpen() {
  popupEl.classList.add('popup_opened');
}

function popClose() {
  popupEl.classList.remove('popup_opened');
}

function profileEdit() {
  popupOpen()
  popupTitle.textContent = 'Редактировать';
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
}

edit.addEventListener('click', profileEdit);

popupClose.addEventListener('click', popClose);

function handleFormSubmit (evt) {
  evt.preventDefault();
  if (popupTitle.textContent === 'Редактировать') {
    profileName.textContent = inputName.value;
    profileDesc.textContent = inputDesc.value;
  } else{
    let newCard = {name: inputName.value, link: inputDesc.value};
    initialCards.push(newCard);
    addOneEl();
  }
  popClose();
}

formElement.addEventListener('submit', handleFormSubmit);

function addCard() {
  popupOpen()
  inputName.value = '';
  inputDesc.value = '';
  popupEl.classList.add('popup_opened');
  popupTitle.textContent = 'Новое место';
  inputName.placeholder = 'Название';
  inputDesc.placeholder = 'Новое место';

}

addButton.addEventListener('click', addCard);

const like = document.querySelectorAll('.element__like')

like.forEach((item) => {
  item.addEventListener('click', function() {
    item.classList.toggle('element__like_active')
  })
})

const deleteEl = document.querySelectorAll('.element__delete');

deleteEl.forEach((item) => {
  item.addEventListener('click', function() {
    item.parentElement.remove();
  })
})

const popImageTemplate = document.querySelector('#popup-image').content;
const popImage = popImageTemplate.querySelector('.popup-image').cloneNode(true);
const popImageClose = popImage.querySelector('.popup-image__close');


const image = document.querySelectorAll('.element__image');

image.forEach((item) => {
  item.addEventListener('click', function() {
    const element = item.parentElement;
    const title = element.querySelector('.element__title');
    popImage.classList.add('popup-image_opened')
    popImage.querySelector('.popup-image__image').src = item.src;
    popImage.querySelector('.popup-image__title').textContent = title.textContent;
  })
})

popImageClose.addEventListener('click', function() {
  popImage.classList.remove('popup-image_opened')
})

page.prepend(popImage)
