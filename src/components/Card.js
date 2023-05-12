export class Card {
  constructor(cardData, templateSelector, handleCardClick, userId, onOpenPopupDelete, handleLike) {
    this._data = cardData;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._userId = userId;
    this._onOpenPopupDelete = onOpenPopupDelete;
    this._handleLike = handleLike;

    this._handleOpenPopup = this._handleOpenPopup.bind(this);
    this._handleDeleteCard = this._handleDeleteCard.bind(this);

  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  getCardInfo() {
    return {
      cardId: this._data._id,
      isLiked: this._data.likes.some((like) => this._userId === like._id)
    };
  }

  _handleOpenPopup() {
    this._handleCardClick({ name: this._data.name, link: this._data.link });
  }

  _handleDeleteCard() {
    this._onOpenPopupDelete(this._data._id, this._card);
  }

  _handleLikeButtonClick() {
    this._handleLike(this);
  }

  _setLikeState() {
    if (this._data.likes.some((like) => this._userId === like._id)) {
      this._likeElement.classList.add("element__like_active");
    } else {
      this._likeElement.classList.remove("element__like_active");
    }
  }

  updateLike(data) {
    this._data = data;
    this._likeCountElement.textContent = data.likes.length;
    this._setLikeState();
  }

  _setHandlers() {
    this._likeElement.addEventListener("click", this._handleLikeButtonClick.bind(this));

    if (this._data.owner._id === this._userId) {
      this._deleteButton.addEventListener("click", this._handleDeleteCard);
    } else {
      this._deleteButton.remove();
    }

    this._imageElement.addEventListener("click", this._handleOpenPopup);
  }

  generateCard() {
    this._card = this._getTemplate();
    this._titleElement = this._card.querySelector(".element__title");
    this._likeElement = this._card.querySelector(".element__like");
    this._likeCountElement = this._card.querySelector(".element__like-count");
    this._deleteButton = this._card.querySelector(".element__delete");
    this._imageElement = this._card.querySelector(".element__image");

    this._titleElement.textContent = this._data.name;
    this._likeCountElement.textContent = this._data.likes.length;
    this._imageElement.src = this._data.link;
    this._imageElement.alt = this._data.name;

    this._setLikeState();
    this._setHandlers();

    return this._card;
  }
}
