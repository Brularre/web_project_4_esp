const addBtn = document.querySelector(".profile__add-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileJob = document.querySelector(".profile__job");

/* POPUP TEMPLATES AND FUNCTIONS */

const templatePopup = document.querySelector("#template_popup").content;
const newPopup = templatePopup.cloneNode(true);
const popup = newPopup.querySelector(".popup");
const popupTitle = newPopup.querySelector(".popup__title");
const firstInput = newPopup.querySelector("#input-one");
const secondInput = newPopup.querySelector("#input-two");
const popupClose = newPopup.querySelector(".popup__close-btn");

const templateInputChanger = (where, title, name, id, placeholder) => {
    if (where === 1) {
        popupTitle.textContent = title;
        firstInput.name = name;
        firstInput.id = id;
        firstInput.placeholder = placeholder;
    } else if (where === 2) {
        secondInput.name = name;
        secondInput.id = id;
        secondInput.placeholder = placeholder;
    }
};

const closeForm = () => popup.remove();

/* ADD FORM CREATOR */

addBtn.addEventListener("click", () => {
    templateInputChanger(
        1,
        "Nuevo lugar",
        "place-name",
        "place-name",
        "Título"
    );
    templateInputChanger(
        2,
        "",
        "place-link",
        "place-link",
        "Enlace a la imagen"
    );
    popupClose.addEventListener("click", closeForm);
    popup.addEventListener("submit", handleAddFormSubmit);
    document.body.prepend(popup);
});

/* EDIT FORM CREATOR */

editBtn.addEventListener("click", () => {
    templateInputChanger(
        1,
        "Editar perfil",
        "profile-name",
        "profile-name",
        "Usuario"
    );
    templateInputChanger(2, "", "profile-job", "profile-job", "Ocupación");
    firstInput.value = profileName.textContent;
    secondInput.value = profileJob.textContent;
    popupClose.addEventListener("click", closeForm);
    popup.addEventListener("submit", handleProfileFormSubmit);
    document.body.prepend(popup);
});

/* POPUP FORM -> SUBMIT BUTTON LOGIC */

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = firstInput.value;
    profileJob.textContent = secondInput.value;
    closeForm();
    return;
}

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

const cardsContainer = document.querySelector(".elements");
const templateCards = document.querySelector("#template_cards").content;

for (let key in cards) {
    let newCardName = cards[key].name;
    let newCardLink = cards[key].link;
    addNewCard(newCardName, newCardLink);
    document.querySelector(".elements__image").alt = cards[key].alt;
}

function addNewCard(placeName, placeLink) {
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
    cardImage.addEventListener("click", (evt) => modalImage(evt.target));
    cardsContainer.prepend(newCard);
}

function handleAddFormSubmit(evt) {
    evt.preventDefault();
    addNewCard(firstInput.value, secondInput.value);
    closeForm();
    return;
}

function modalImage(img) {
    const modalContainer = document.createElement("div");
    const modalImg = document.createElement("img");
    const modalTitle = document.createElement("p");
    modalContainer.classList.add(".elements__img_modal");
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    modalTitle.textContent = "hola";
    modalContainer.prepend(modalImg);
    modalContainer.append(modalTitle);
    document.body.append(modalContainer);
}
