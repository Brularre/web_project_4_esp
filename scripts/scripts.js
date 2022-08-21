const pu = document.querySelector(".popup");
const puCloseBtn = document.querySelector(".popup__close-btn");
const editBtn = document.querySelector(".profile__edit-btn");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-job");

/* EDIT FORM -> EDIT BUTTON LOGIC */

editBtn.addEventListener("click", function () {
    let username = document.querySelector(".profile__name").textContent;
    let userJob = document.querySelector(".profile__job").textContent;
    pu.classList.add("popup_opened");
    nameInput.value = username;
    jobInput.value = userJob;
});

/* EDIT FORM -> CLOSE BUTTON LOGIC */

function closeEdit() {
    pu.classList.remove("popup_opened");
}

puCloseBtn.addEventListener("click", closeEdit);

/* EDIT FORM -> SUBMIT BUTTON LOGIC */

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    document.querySelector(".profile__name").textContent = nameInput.value;
    document.querySelector(".profile__job").textContent = jobInput.value;
    closeEdit();
    return;
}

pu.addEventListener("submit", handleProfileFormSubmit);

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
const templateCards = document.querySelector("#template__cards").content;

for (let key in cards) {
    const elementsCard = templateCards
        .querySelector(".elements__card")
        .cloneNode(true);
    elementsCard.querySelector(".elements__name").textContent = cards[key].name;
    elementsCard.querySelector(".elements__image").src = cards[key].link;
    elementsCard.querySelector(".elements__image").alt = cards[key].alt;
    cardsContainer.append(elementsCard);
}
