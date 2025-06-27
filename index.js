const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-Karl";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

let parties = [];
let selectedParty;
let rsvp = [];
let guests = [];

async function getParties() {
  try {
    const response = await fetch(`${API}/${"events"}`);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(`${API}/${"events"}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getRsvps() {
  try {
    const response = await fetch(`${API}/${"rsvps"}`);
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getGuests() {
  try {
    const response = await fetch(`${API}/${"guests"}`);
    const result = await response.json();
    guests = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

function PartyListItem(party) {
  const $li = document.createElement("li");

  if (party.id === selectedParty?.id) {
    $li.classList.add("selected");
  }

  $li.innerHTML = `
    <a href="#selected">${party.name}</a>
    `;
  $li.addEventListener("click", () => getParty(party.id));
  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("parties");

  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);

  return $ul;
}

function SelectedParty() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Please pick a party to get more information";
    return $p;
  }

  const $party = document.createElement("section");
  $party.innerHTML = `
    <h3>${selectedParty.name} #${selectedParty.id}</h3>
    <time datetime="${selectedParty.date}">
        ${selectedParty.date.slice(0, 10)}
</time>
<address>${selectedParty.location}</address>
<p>${selectedParty.description}</p>
<GuestList></GuestList>
`;
  $party.querySelector("GuestList").replaceWith(GuestList());

  return $party;
}

function GuestList() {
  const $ul = document.createElement("ul");
  const guestsAtParty = guests.filter((guest) =>
    rsvps.find(
      (rsvp) => rsvp.guestId === guest.id && rsvp.eventId === selectedParty.id
    )
  );

  const $guests = guestsAtParty.map((guests) => {
    const $guest = document.createElement("li");
    $guest.textContent = guest.name;
    return $guest;
  });
  $ul.replaceChildren(...$guests);

  return $ul;
}


function