class CardModal {
  constructor(data) {
    this._name = data.closest("div").textContent;
    this._src = data.src;
    this._alt = data.alt;
  }

  _getModalTemplate() {
    const modalElement = document
      .querySelector("#template_modal-box")
      .content.querySelector(".modal-box")
      .cloneNode(true);
    return modalElement;
  }

  generateModal() {
    this._modalElement = this._getModalTemplate();

    const modalTitle = this._modalElement.querySelector(".modal-box__title");
    const modalImage = this._modalElement.querySelector(".modal-box__image");
    modalImage.src = this._src;
    modalImage.alt = this._alt;
    modalTitle.textContent = this._name;
    document.body.prepend(this._modalElement);
    this._setModalListeners();
    return this._modalElement;
  }

  _setModalListeners() {
    const modalCloseBtn = document.querySelector(".modal-box__close-btn");

    modalCloseBtn.addEventListener("click", this._handleCloseModal);
    document.addEventListener("keydown", this._handleCloseEsc);
    document.addEventListener("click", this._handleCloseOutsideClick);
  }

  _handleOpenModal = (img) => {
    const modalCheckTimeout = 300;
    const modalElement = document.querySelector(".modal-box");
    const formElement = document.querySelector(".popup");
    if (modalElement || formElement) {
      return;
    }
    setTimeout(() => {
      this.generateModal(img);
    }, modalCheckTimeout);
  };

  _handleCloseModal = () => {
    const delayValueMs = 600;
    const noOpacity = 0;
    const modalElement = document.querySelector(".modal-box");
    if (!modalElement) {
      return;
    }
    modalElement.style.transition = "opacity 600ms ease";
    modalElement.style.opacity = noOpacity;
    setTimeout(() => {
      modalElement.remove();
      document.removeEventListener("keydown", this._handleCloseEsc);
      document.removeEventListener("click", this._handleCloseOutsideClick);
    }, delayValueMs);
  };

  _handleCloseEsc = (evt) => {
    if (evt.code === "Escape") {
      this._handleCloseModal();
    }
  };

  _handleCloseOutsideClick = (evt) => {
    const parent = evt.target.closest(".modal-box");
    if (!parent) {
      this._handleCloseModal();
    }
  };
}

export default CardModal;
