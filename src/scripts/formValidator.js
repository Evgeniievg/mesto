export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}


export class FormValidator {
  constructor(config, form ) {
    this._config = config;
    this._form = form;
    this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._button = this._form.querySelector(this._config.submitButtonSelector);
  }

  _toggleInputErrorState(inputElement){
    const errorElement = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);
    if(!inputElement.validity.valid) {
      this._showInputError(inputElement, errorElement);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _showInputError(inputElement, errorElement) {
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement, errorElement){
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
  }

  _enableSaveButton() {
    this._button.classList.add(config.inactiveButtonClass);
    this._button.disabled = true;
  }

  _disableSaveButton() {
    this._button.classList.remove(config.inactiveButtonClass);
    this._button.disabled = false;
  }

  _toggleButtonState(){
    if (this._hasInvalidInput(this._inputs)) {
      this._enableSaveButton()
    } else {
      this._disableSaveButton()
    }
  };

  resetValidation(){
    this._toggleButtonState();
    this._inputs.forEach((inputElement) => {
      const errorElement = inputElement.parentElement.querySelector(`.${inputElement.id}-error`);
      this._hideInputError(inputElement, errorElement);
    });
      }


  _hasInvalidInput(inputElement){
    return this._inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  _setEventListeners() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._enableSaveButton();
    });
    this._toggleButtonState()
    this._inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._hasInvalidInput(inputElement);
        this._toggleButtonState();
        this._toggleInputErrorState(inputElement);
      })
    })
  }

  enableValidation(){
    this._setEventListeners();
  }

}



