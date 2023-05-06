export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content.querySelector('.element')
    .cloneNode(true)

      return cardElement;
  }


  _handleLikeButton() {
    this._likeButton.classList.toggle('element__like_active')
  }

  _handlePopupImage = () => {
    this._handleCardClick(this._data)
  }

  _deleteCard() {
    this._element.remove();
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton()
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard()
    })
    this._cardImage.addEventListener('click', this._handlePopupImage)
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector('.element__image')
    this._likeButton = this._element.querySelector('.element__like');
    this._setEventListeners();
    this._cardImage.src = this._link;
    this._element.querySelector('.element__title').textContent = this._name;
    this._cardImage.alt = this._name;

    return this._element;
  }
}


