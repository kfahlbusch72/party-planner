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
    const response = await fetch(`${API}/${events}`);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}

async function getParty(id) {
  try {
    const response = await fetch(`${API}/${events}/${id}`);
    const result = await response.json();
    selectedParty = result.data;
    render();
  } catch (error) {
    console.error(error);
  }
}
