class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

  renderCards(items) {
    items.forEach((item) => {
      this.addItem(item);
    });
  }
}

export default Section;
