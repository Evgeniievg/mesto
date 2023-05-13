import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup-image__image");
    this._title = this._popup.querySelector(".popup-image__title");
    this.close = this.close.bind(this);
  }

  open = (data) => {
    this._title.textContent = data.name;
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  }
}

export default PopupWithImage;
