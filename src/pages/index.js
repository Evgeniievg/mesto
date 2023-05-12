import "./index.css";
import {
  validationConfig,
  editButton,
  addButton,
  avatar,
  token,
  link,
  forms
} from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithDelete from "../components/PopupWithDelete";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api";

const api = new Api ({
  link,
  headers: {
    authorization: token,
    'Content-Type': 'application/json'
  }
})

const profilePopup  = new PopupWithForm(".popup-edit", handleEditForm);


const popupAddingCard = new PopupWithForm(".popup-element", handleAddForm);

const popupAvatar = new PopupWithForm(
  ".popup-avatar",
  handleAvatarForm
);

const popupDelete = new PopupWithDelete(".popup-delete", deleteCard);
const popupImage = new PopupWithImage(".popup-image");

const validators = [];

forms.forEach((form) => {
  const validator = new FormValidator(validationConfig, form);
  validator.enableValidation();
  validators.push(validator);
})


profilePopup .setEventListeners();
popupAddingCard.setEventListeners();
popupAvatar.setEventListeners();

popupImage.setEventListeners();
popupDelete.setEventListeners();


const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__about",
  avatarSelector: ".profile__avatar",
});

const renderInitialCards = new Section({
  renderer: (card) => createCard(card)
}, '.elements');

Promise.all([api.getUserInfo(), api.fetchCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    renderInitialCards.renderCards(cards);
  })
  .catch((err) =>
    console.log(err)
  );


function createCard(card) {
  const newCard = new Card(
    card,
    "#element",
    () => popupImage.open(card),
    userInfo.getUserInfo().userId,
    (cardId, card) => popupDelete.open(cardId, card),
    handleLikeButton
  );
  return newCard.generateCard();
}

function handleLikeButton(card) {
  api
    .likeCard(card.getCardInfo())
    .then((res) => card.updateLike(res))
    .catch((err) => console.log(err));
}

function handleEditForm(evt, inputItems) {
  evt.preventDefault();
  profilePopup .renderLoading();
  api
    .changeProfile(inputItems)
    .then((data) => {
      userInfo.setUserInfo(data);
      profilePopup.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      profilePopup.renderLoading();
    });
}

function handleAddForm(evt, inputItems) {
  evt.preventDefault();
  popupAddingCard.renderLoading();
  api
    .createCard(inputItems)
    .then((data) => {
      renderInitialCards.addItem(data);
      popupAddingCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAddingCard.renderLoading();
    });
}

function deleteCard(evt, { cardId, card }) {
  evt.preventDefault();
  api
    .deleteCard(cardId)
    .then(() => {
      card.remove();
      popupDelete.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleAvatarForm(evt, { link }) {
  evt.preventDefault();
  popupAvatar.renderLoading();
  api
    .changeAvatar(link)
    .then((data) => {
      userInfo.setUserInfo(data);
      popupAvatar.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupAvatar.renderLoading();
    });
}

editButton.addEventListener('click', () => {
  const currentUserInfo = userInfo.getUserInfo();
  profilePopup.setInputsValue(currentUserInfo);
  profilePopup.open();
});

addButton.addEventListener("click", () => {
  popupAddingCard.open();
});

avatar.addEventListener("click", () => {
  popupAvatar.open();
});

