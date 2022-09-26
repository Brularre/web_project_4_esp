const cards = [
  {
    name: "Times Square",
    src: "./images/elements-img-TimesSquare.jpg",
    alt: "Fotografía de Times Square en NYC",
  },
  {
    name: "Monte Rushmore",
    src: "./images/elements-img-Rushmore.jpg",
    alt: "Fotografía del Monte Rushmore en Dakota del Sur",
  },
  {
    name: "Puerta de las Nubes",
    src: "./images/elements-img-CloudGate.jpg",
    alt: "Fotografía de la Cloud Gate en Chicago",
  },
  {
    name: "Golden Gate",
    src: "./images/elements-img-GoldenGate.jpg",
    alt: "Fotografía del Puente Golden Gate en San Francisco",
  },
  {
    name: "Empire State",
    src: "./images/elements-img-EmpireState.jpg",
    alt: "Fotografía del edificio Empire State en NYC",
  },
  {
    name: "Yellowstone",
    src: "./images/elements-img-Yellowstone.jpg",
    alt: "Fotografía del Parque Nacional Yellowstone",
  },
];

class Card {
  constructor(data) {
    this._name = data.name;
    this._src = data.src;
    this._alt = data.alt;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#template_cards")
      .content.querySelector(".elements__card")
      .cloneNode(true);
    return cardElement;
  }

  _getModalTemplate() {
    const modalElement = document
      .querySelector("#template_modal-box")
      .content.querySelector(".modal-box")
      .cloneNode(true);
    return modalElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardName = this._element.querySelector(".elements__name");
    const cardImage = this._element.querySelector(".elements__image");
    cardName.textContent = this._name;
    cardImage.src = this._src;
    cardImage.alt = `Fotografía subida por el usuario de ${this._name}`;
    return this._element;
  }

  generateModal(img) {
    this._modalElement = this._getModalTemplate();
    const modalTitle = this._modalElement.querySelector(".modal-box__title");
    const modalImage = this._modalElement.querySelector(".modal-box__image");
    modalImage.src = img.src;
    modalImage.alt = img.alt;
    modalTitle.textContent = img.closest("div").textContent;
    document.body.prepend(this._modalElement);
    this._setModalListeners();
    return this._modalElement;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".elements__image");
    const cardLike = this._element.querySelector(".elements__like-btn");
    const cardDelete = this._element.querySelector(".elements__del-btn");

    cardImage.addEventListener("click", (evt) =>
      this._handleOpenModal(evt.target)
    );
    cardDelete.addEventListener("click", () => this._element.remove());
    cardLike.addEventListener("click", (evt) => this._like(evt));
  }

  _setModalListeners() {
    const modalCloseBtn = document.querySelector(".modal-box__close-btn");

    modalCloseBtn.addEventListener("click", () => this._handleCloseModal());

    document.addEventListener("keydown", (evt) => this._handleCloseEsc(evt));

    document.addEventListener("click", (evt) =>
      this._handleCloseOutsideClick(evt)
    );
  }

  _handleOpenModal(img) {
    const modalCheckTimeout = 300;
    if (this._modalElement) {
      return;
    }
    setTimeout(() => {
      this.generateModal(img);
    }, modalCheckTimeout);
  }

  _handleCloseModal() {
    const delayValueMs = 600;
    const noOpacity = 0;
    if (!this._modalElement) {
      return;
    }
    this._modalElement.style.transition = "opacity 600ms ease";
    this._modalElement.style.opacity = noOpacity;
    setTimeout(function () {
      document.querySelector(".modal-box").remove();
      document.removeEventListener("keydown", this._handleCloseEsc);
      document.removeEventListener("click", this._handleCloseOutsideClick);
    }, delayValueMs);
  }

  _handleCloseEsc(evt) {
    if (evt.code === "Escape") {
      this._handleCloseModal();
    }
  }

  _handleCloseOutsideClick(evt) {
    const parent = evt.target.closest(".modal-box");
    if (!parent) {
      this._handleCloseModal();
    }
  }

  _like(evt) {
    evt.target.classList.toggle("elements__like-btn_active");
  }
}

(function renderCards() {
  cards.forEach((item) => {
    const newCard = new Card(item);
    const cardElement = newCard.generateCard();
    const cardsContainer = document.querySelector(".elements");
    cardsContainer.append(cardElement);
  });
})();
