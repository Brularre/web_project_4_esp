class Card {
  constructor(data) {
    this._name = data.name;
    this._src = data.src;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#template_cards")
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardName = this._element.querySelector(".elements__name");
    const cardImage = this._element.querySelector(".elements__image");
    cardName.textContent = this._name;
    cardImage.src = this._src;
    cardImage.alt = `Fotografía subida por usuario/a de ${this._name}`;
    return this._element;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".elements__image");
    const cardLike = this._element.querySelector(".elements__like-btn");
    const cardDelete = this._element.querySelector(".elements__del-btn");

    cardImage.addEventListener("click", this._handleOpenPopup);
    cardDelete.addEventListener("click", () => this._element.remove());
    cardLike.addEventListener("click", this._like);
  }

  _handleOpenPopup = (img) => {
    const modalCheckTimeout = 100;
    const isPopupActive = document
      .querySelector(".popup")
      .classList.contains("popup_active");
    if (isPopupActive) {
      return;
    }
    setTimeout(() => {
      const popupElement = document.querySelector(".popup");
      const popupTitle = popupElement.querySelector(".popup__image-caption");
      const popupImage = popupElement.querySelector(".popup__image");
      popupImage.src = img.target.src;
      popupImage.alt = img.target.alt;
      popupTitle.textContent = this._name;
      popupElement.classList.add("popup_active");
    }, modalCheckTimeout);
  };

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }
}

export default Card;
