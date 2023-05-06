export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialCards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards() {
    this._initialCards.forEach(item => {
      this.addItem(this._renderer(item));
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
