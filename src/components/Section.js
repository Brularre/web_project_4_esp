export default class Section {
  constructor({ renderer }, containerSelector) {
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

  renderItems(items) {
    this.clear();
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}
