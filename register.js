// Club Events - MIS 457
// Week 3: form validation with JavaScript. Every field shows a clear error message.
// Week 5: the event list comes from our API and the form sends a POST request.

const API = "http://localhost:3000/api";

const form = document.querySelector("#register-form");
const message = document.querySelector("#message");
const formError = document.querySelector("#form-error");
const button = form.querySelector("button");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const eventSelect = document.querySelector("#event");
const seatsInput = document.querySelector("#seats");

// Write (or clear) the error message under one field
function setError(field, text) {
  const error = document.querySelector("#" + field.id + "-error");
  error.textContent = text;

  if (text === "") {
    field.removeAttribute("aria-invalid");
  } else {
    field.setAttribute("aria-invalid", "true");
  }
}

// Check all fields. Returns true if everything is OK.
function validate() {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const seats = Number(seatsInput.value);
  let ok = true;

  if (name === "") {
    setError(nameInput, "Please write your full name.");
    ok = false;
  } else {
    setError(nameInput, "");
  }

  if (email === "") {
    setError(emailInput, "Please write your email.");
    ok = false;
  } else if (!email.includes("@") || !email.includes(".")) {
    setError(emailInput, "Please write a valid email, for example name@example.com.");
    ok = false;
  } else {
    setError(emailInput, "");
  }

  if (eventSelect.value === "") {
    setError(eventSelect, "Please choose an event.");
    ok = false;
  } else {
    setError(eventSelect, "");
  }

  if (!Number.isInteger(seats) || seats < 1 || seats > 5) {
    setError(seatsInput, "Seats must be a number from 1 to 5.");
    ok = false;
  } else {
    setError(seatsInput, "");
  }

  return ok;
}

// Put the events from the API into the select
async function loadEvents() {
  try {
    const response = await fetch(API + "/events");
    if (!response.ok) {
      throw new Error("HTTP " + response.status);
    }
    const events = await response.json();

    for (const event of events) {
      const option = document.createElement("option");
      option.value = event.id;
      option.textContent = event.title + " (" + event.date + ")";
      eventSelect.append(option);
    }
  } catch (error) {
    formError.textContent = "Could not load the events. Please try again later.";
  }
}

form.addEventListener("submit", async (event) => {
  // stop the page from reloading
  event.preventDefault();
  message.textContent = "";
  formError.textContent = "";

  if (!validate()) {
    // go to the first field with an error
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }

  const registration = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    eventId: Number(eventSelect.value),
    seats: Number(seatsInput.value)
  };

  button.disabled = true;

  try {
    const response = await fetch(API + "/registrations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration)
    });
    const data = await response.json();

    if (!response.ok) {
      // the server sends { "error": "..." } (for example 400)
      formError.textContent = data.error;
      return;
    }

    message.textContent = "Your registration has been created.";
    form.reset();
  } catch (error) {
    formError.textContent = "Could not connect to the server. Please try again later.";
  } finally {
    button.disabled = false;
  }
});

loadEvents();
