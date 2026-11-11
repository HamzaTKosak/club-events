// Club Events - MIS 457
// Week 4: load the events with fetch and async/await, show four states.
// Week 5: the events come from our own API (api/server.js), not data.json.

const API_URL = "http://localhost:3000/api/events";

const list = document.querySelector("#event-list");
const statusText = document.querySelector("#status");
const search = document.querySelector("#search");

let events = [];

// Show a message to the user (loading, empty or error)
function showStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.classList.toggle("error", isError);
}

// "2026-11-20" and "14:00" -> "Fri, Nov 20 · 14:00"
function formatDate(date, time) {
  const day = new Date(date + "T" + time).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  return day + " · " + time;
}

// Make one card for each event
function render(items) {
  list.innerHTML = "";

  for (const event of items) {
    const article = document.createElement("article");

    const title = document.createElement("h2");
    title.textContent = event.title;

    const date = document.createElement("p");
    date.className = "date";
    const time = document.createElement("time");
    time.dateTime = event.date + "T" + event.time;
    time.textContent = formatDate(event.date, event.time);
    date.append(time);

    const place = document.createElement("p");
    place.className = "place";
    place.textContent = event.place;

    const description = document.createElement("p");
    description.textContent = event.description;

    const button = document.createElement("a");
    button.className = "button";
    button.href = "register.html";
    button.textContent = "Register";

    article.append(title, date, place, description, button);
    list.append(article);
  }
}

async function loadEvents() {
  // 1. Loading
  showStatus("Loading events...");

  try {
    const response = await fetch(API_URL);

    // fetch does not go to catch for 404, so we check it here
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }

    events = await response.json();

    // 2. Empty
    if (events.length === 0) {
      showStatus("There are no events right now. Please check again later.");
      return;
    }

    // 3. Success
    showStatus("");
    render(events);
  } catch (error) {
    // 4. Error
    showStatus("Could not load the events. Please try again later. (" + error.message + ")", true);
  }
}

// Live search by event or club name
search.addEventListener("input", () => {
  const text = search.value.toLowerCase().trim();
  const found = events.filter(event =>
    event.title.toLowerCase().includes(text) ||
    event.club.toLowerCase().includes(text)
  );
  render(found);
  showStatus(found.length === 0 ? "No events found." : "");
});

loadEvents();
