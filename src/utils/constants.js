const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const forms = document.querySelectorAll(validationConfig.formSelector);


const token = "3e9eaec0-f019-41da-88c7-8959f761274c";
const link = "https://mesto.nomoreparties.co/v1/cohort-65";

const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit");

const addButton = profile.querySelector(".profile__button");
const avatar = profile.querySelector(".profile__avatar-container");

const avatarForm = document.querySelector('.popup-avatar__form')

export {
  validationConfig,
  token,
  link,
  profile,
  editButton,
  addButton,
  avatar,
  forms,
  avatarForm
};

