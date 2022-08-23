/* GLOBAL SELECTORS */

const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* FUNCTIONS */

const closeBtn = (evt) => {
    if (evt.target.tagName == "FORM") {
        evt.target.style.transition = "opacity 600ms ease";
        evt.target.style.opacity = 0;
        setTimeout(function () {
            evt.target.remove();
        }, 600);
    } else {
        evt.target.parentNode.style.transition = "opacity 600ms ease";
        evt.target.parentNode.style.opacity = 0;
        setTimeout(function () {
            evt.target.parentNode.remove();
        }, 600);
    }
};

/* POPUP TEMPLATES AND FUNCTIONS */

function createPopup() {
    const templatePopup = document.querySelector("#template_popup").content;
    const newPopup = templatePopup.cloneNode(true);
    return newPopup;
}

/* TEMPLATE INPUT CHANGER */

const templateInputChanger = (input, title, name, id, placeholder, popup) => {
    let popupTitle = popup.querySelector(".popup__title");
    let firstInput = popup.querySelector("#input-one");
    let secondInput = popup.querySelector("#input-two");
    if (input === 1) {
        popupTitle.textContent = title;
        firstInput.name = name;
        firstInput.id = id;
        firstInput.placeholder = placeholder;
    } else if (input === 2) {
        secondInput.name = name;
        secondInput.id = id;
        secondInput.placeholder = placeholder;
    }
};

/* ADD FORM CREATOR */

addBtn.addEventListener("click", () => {
    const newPopup = createPopup();
    const popup = newPopup.querySelector(".popup");
    const popupClose = popup.querySelector(".popup__close-btn");
    const placeName = popup.querySelector("#input-one");
    const placeLink = popup.querySelector("#input-two");
    templateInputChanger(
        1,
        "Nuevo lugar",
        "place-name",
        "place-name",
        "Título",
        popup
    );
    templateInputChanger(
        2,
        "",
        "place-link",
        "place-link",
        "Enlace a la imagen",
        popup
    );
    popupClose.addEventListener("click", (evt) => closeBtn(evt));
    popup.addEventListener("submit", (evt) => {
        evt.preventDefault();
        console.log(placeName.value);
        addNewCard(placeName.value, placeLink.value);
        closeBtn(evt);
    });
    document.body.prepend(popup);
});

/* EDIT FORM CREATOR */

editBtn.addEventListener("click", () => {
    const newPopup = createPopup();
    const popup = newPopup.querySelector(".popup");
    const popupClose = popup.querySelector(".popup__close-btn");
    let firstInput = popup.querySelector("#input-one");
    let secondInput = popup.querySelector("#input-two");
    templateInputChanger(
        1,
        "Editar perfil",
        "profile-name",
        "profile-name",
        "Usuario",
        popup
    );
    templateInputChanger(
        2,
        "",
        "profile-job",
        "profile-job",
        "Ocupación",
        popup
    );
    firstInput.value = profileName.textContent;
    secondInput.value = profileJob.textContent;
    popupClose.addEventListener("click", (evt) => closeBtn(evt));
    popup.addEventListener("submit", (evt) => {
        evt.preventDefault();
        profileName.textContent = firstInput.value;
        profileJob.textContent = secondInput.value;
        closeBtn(evt);
    });
    document.body.prepend(popup);
});

/* CARD TEMPLATE INJECTOR */

const cards = [
    {
        name: "Times Square",
        link: "./images/elements-img-TimesSquare.jpg",
        alt: "Fotografía de Times Square en NYC",
    },
    {
        name: "Monte Rushmore",
        link: "./images/elements-img-Rushmore.jpg",
        alt: "Fotografía del Monte Rushmore en Dakota del Sur",
    },
    {
        name: "Puerta de las Nubes",
        link: "./images/elements-img-CloudGate.jpg",
        alt: "Fotografía de la Cloud Gate en Chicago",
    },
    {
        name: "Golden Gate",
        link: "./images/elements-img-GoldenGate.jpg",
        alt: "Fotografía del Puente Golden Gate en San Francisco",
    },
    {
        name: "Empire State",
        link: "./images/elements-img-EmpireState.jpg",
        alt: "Fotografía del edificio Empire State en NYC",
    },
    {
        name: "Yellowstone",
        link: "./images/elements-img-Yellowstone.jpg",
        alt: "Fotografía del Parque Nacional Yellowstone",
    },
];

for (let key in cards) {
    let newCardName = cards[key].name;
    let newCardLink = cards[key].link;
    addNewCard(newCardName, newCardLink);
    document.querySelector(".elements__image").alt = cards[key].alt;
}

function addNewCard(placeName, placeLink) {
    const templateCards = document.querySelector("#template_cards").content;
    const cardsContainer = document.querySelector(".elements");
    const newCard = templateCards
        .querySelector(".elements__card")
        .cloneNode(true);
    const cardName = newCard.querySelector(".elements__name");
    const cardImage = newCard.querySelector(".elements__image");
    const cardLike = newCard.querySelector(".elements__like-btn");
    const cardDelete = newCard.querySelector(".elements__del-btn");
    cardName.textContent = placeName;
    cardImage.src = placeLink;
    cardImage.alt = `Fotografía subida por el usuario de ${placeName}`;
    cardLike.addEventListener("click", (evt) =>
        evt.target.classList.toggle("elements__like-btn_active")
    );
    cardDelete.addEventListener("click", (evt) =>
        evt.target.closest("div").remove()
    );
    cardImage.addEventListener("click", (evt) => {
        openModalImage(evt.target);
        evt.target.parentNode.opacity = 0;
    });
    cardsContainer.prepend(newCard);
}

/* MODAL BOX LOGIC */

function openModalImage(img) {
    const templateModal = document.querySelector("#template_modal-box").content;
    const modalBox = templateModal.cloneNode(true);
    const modalImg = modalBox.querySelector(".modal-box__image");
    const modalTitle = modalBox.querySelector(".modal-box__title");
    const modalCloseBtn = modalBox.querySelector(".modal-box__close-btn");
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = img.parentNode.textContent;
    modalCloseBtn.addEventListener("click", (evt) => closeBtn(evt));
    document.body.prepend(modalBox);
}
