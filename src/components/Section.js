export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderingItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  appendItem(item) {
    this._container.append(item);
  }

  prependItem(item) {
    this._container.prepend(item);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems() {
    this.clear();
    this._renderingItems.forEach((item) => {
      this._renderer(item);
    });
  }
}
