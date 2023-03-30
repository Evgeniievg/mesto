export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

const toggleInputErrorState = (inputElement, config) => {
  const errorElement = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);
  if(!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
}

function showInputError(inputElement, errorElement, config) {
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
  errorElement.classList.add(config.errorClass);
}

function hideInputError(inputElement, errorElement, config){
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    enableSaveButton(buttonElement, config)
  } else {
    disableSaveButton(buttonElement, config)
  }
};

function enableSaveButton(buttonElement, config) {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.disabled = true;
}

function disableSaveButton(buttonElement, config) {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.disabled = false;
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleInputErrorState(inputElement, config)
      toggleButtonState(inputList, buttonElement, config);
    })
  })
}

const enableValidation = config => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
 })
}

enableValidation(config);
