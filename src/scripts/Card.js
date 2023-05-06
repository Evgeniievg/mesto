export class Card {
  constructor(data, templateSelector, handleCardClick) {
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


  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link)
    })
    this._likeButton.addEventListener('click', () => {
      this._handleLikeButton()
    })
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._deleteCard()
    })
  }


  _handleLikeButton() {
    this._likeButton.classList.toggle('element__like_active')
  }

  _deleteCard() {
    this._element.remove();
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


