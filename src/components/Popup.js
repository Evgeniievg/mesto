export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close");
  }

  _handleEscClose = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };

  setEventListeners() {
    this._popup.addEventListener("click", this._handleOverlayClose);
    this._popupCloseBtn.addEventListener("click", () => this.close());
  }

  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };
}

