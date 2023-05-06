import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {
  addButton,
  editInputDesc,
  editInputName,
  editButton,
  initialCards,
  config,
  popupEdit,
  popupAdd,
  templateSelector,
  elements,
  forms
} from '../utils/constants.js';

const userInfo = new UserInfo({
  nameSelector: '.profile__title',
  descriptionSelector: '.profile__description'
});

const popupWithImage = new PopupWithImage('.popup-image');

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
  section.addItem(section.renderer(popupAddingCard.getInputValues()));
  popupAddingCard.close();
});

popupAddingCard.setEventListeners();

const validators = [];

forms.forEach((form) => {
  const validator = new FormValidator(config, form);
  validator.enableValidation();
  validators.push(validator);
})

popupWithImage.setEventListeners();

editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputsValue(currentUserInfo);
  profilePopup.open();
});

addButton.addEventListener('click', () => {
  popupAddingCard.open();
});
