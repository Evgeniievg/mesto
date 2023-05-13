import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._submitButton = this._popupForm.querySelector(".popup__button");
    this._inputList = Array.from(this._popupForm.querySelectorAll(".popup__input"));
    this._submitButtonText = this._submitButton.textContent;
    this._inputValues = {};
    this.getInputValues = this.getInputValues.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
  }

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  handleSubmit(evt) {
    this._handleSubmit(evt, this.getInputValues());
  }

  _disable(){
    this._submitButton.classList.add('popup__button_inactive')
  }

  renderLoading(isLoading, loadingText='Сохранение...') {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
  } else {
      this._submitButton.textContent = this._submitButtonText;
  }
}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", this.handleSubmit);
  }

  setInputsValue(inputValues) {
    this._inputList.forEach(input => {
      input.value = inputValues[input.name];
    });
  }

  open() {
    super.open();
    this._submitButton.textContent = "Сохранить";
    this._submitButton.textContent = this._submitButtonText;
  }

  close() {
    this._popupForm.reset();
    super.close();
    this._disable();
  }
}

export default PopupWithForm;
