import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  addButton,
  popupAddFormElement,
  editInputDesc,
  editInputName,
  editButton,
  initialCards
} from '../utils/constants.js';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


const templateSelector = '#element';
const elements = '.elements';
const popupEdit = '.popup-edit';
const popupAdd = '.popup-element';

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description'
});


const popupWithImage = new PopupWithImage('.popup-image');
popupWithImage.setEventListeners()



const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, templateSelector, popupWithImage.open);
    return card.generateCard()
  }
}, elements)

section.renderCards()




const profilePopup = new PopupWithForm(popupEdit, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(profilePopup.getInputValues())
  profilePopup.close();
});
profilePopup.setEventListeners();



const popupAddingCard = new PopupWithForm(popupAdd, (evt) => {
  evt.preventDefault();
  section.addItem(section._renderer(popupAddingCard.getInputValues()));

  popupAddingCard.close();
  popupAddFormElement.reset();
});



popupAddingCard.setEventListeners();


const forms = document.querySelectorAll(config.formSelector);
const validators = [];


forms.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  validators.push(validator);
})



popupWithImage.setEventListeners();

editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  editInputName.value = currentUserInfo.name;
  editInputDesc.value = currentUserInfo.description;
  profilePopup.open();
});

addButton.addEventListener('click', () => {
  popupAddingCard.open();
});
