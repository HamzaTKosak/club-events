// Club Events - MIS 457 Week 3
// Form validation with JavaScript. Every field shows a clear error message.

const form = document.querySelector("#register-form");
const message = document.querySelector("#message");

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

form.addEventListener("submit", (event) => {
  // stop the page from reloading
  event.preventDefault();
  message.textContent = "";

  if (!validate()) {
    // go to the first field with an error
    form.querySelector("[aria-invalid='true']").focus();
    return;
  }

  message.textContent = "Your registration has been created.";
  form.reset();
});
