import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this.close = this.close.bind(this);
  }

  getInputValues() {
    this._inputValues = {};
    this._inputList.forEach(input => {
      this._inputValues[input.name] = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleSubmit);
  }

  setInputsValue(dataUser) {
    this._inputList.forEach(input => {
      input.value = dataUser[input.name]
    })
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}

export default PopupWithForm;
