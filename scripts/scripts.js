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
        name: "Yellowstone",
        link: "./images/elements-img-Yellowstone.jpg",
        alt: "Fotografía del Parque Nacional Yellowstone",
    },
    {
        name: "Empire State",
        link: "./images/elements-img-EmpireState.jpg",
        alt: "Ftografía del edificio Empire State en NYC",
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
        name: "Times Square",
        link: "./images/elements-img-TimesSquare.jpg",
        alt: "Fotografía de Times Square en NYC",
    },
];

const cardsContainer = document.querySelector(".elements");
const templateCards = document.querySelector("#template_cards").content;

for (let key in cards) {
    const elementsCard = templateCards
        .querySelector(".elements__card")
        .cloneNode(true);
    elementsCard.querySelector(".elements__name").textContent = cards[key].name;
    elementsCard.querySelector(".elements__image").src = cards[key].link;
    elementsCard.querySelector(".elements__image").alt = cards[key].alt;
    cardsContainer.append(elementsCard);
}
