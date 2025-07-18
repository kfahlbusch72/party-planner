const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-Karl";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

const RSVPS_API = `${BASE + COHORT}/rsvps`;
const GUESTS_API = `${BASE + COHORT}/guests`;

let parties = [];
let selectedParty;
let rsvps = [];
let guests = [];

async function getParties() {
  try {
    const response = await fetch(API);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(`${API}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getRsvps() {
  try {
    const response = await fetch(RSVPS_API);
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getGuests() {
  try {
    const response = await fetch(GUESTS_API);
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

  const $guests = guestsAtParty.map((guest) => {
    const $guest = document.createElement("li");
    $guest.textContent = guest.name;
    return $guest;
  });
  $ul.replaceChildren(...$guests);

  return $ul;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <main>
        <section>
            <h2>Upcoming Parties</h2>
            <PartyList></PartyList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <SelectedParty></SelectedParty>
        </section>
    </main>
    `;

  $app.querySelector("PartyList").replaceWith(PartyList());
  $app.querySelector("SelectedParty").replaceWith(SelectedParty());
}

async function init() {
  await getParties();
  await getRsvps();
  await getGuests();
  render();
}

init();
