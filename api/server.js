// Club Events API - MIS 457 Week 5
// Our own server with Express. The data is in arrays,
// so it resets when the server restarts (we add a database later).

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// the frontend runs on another port (Live Server), so we allow it with cors
app.use(cors());
// read JSON from the request body (req.body)
app.use(express.json());

// logger: show every request in the terminal
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

let events = [
  { id: 1, title: "Robotics Workshop", club: "Robotics Club", date: "2026-11-20", time: "14:00", place: "Engineering Building, Lab B-104", description: "Build a small robot with the Robotics Club. You do not need any experience." },
  { id: 2, title: "CV Writing Workshop", club: "Career Club", date: "2026-11-24", time: "12:30", place: "Library, Seminar Room", description: "The Career Club will help you write a better CV. Bring your own CV if you have one." },
  { id: 3, title: "Photography Walk", club: "Photography Club", date: "2026-11-28", time: "10:00", place: "Meeting point: Ulus Square", description: "Take photos of old Ankara with the Photography Club. A phone camera is enough." },
  { id: 4, title: "Hackathon Info Session", club: "Software Club", date: "2026-12-01", time: "18:00", place: "Computer Lab 2", description: "The Software Club explains the rules of this year's hackathon. You can find a team here." },
  { id: 5, title: "Board Game Night", club: "Board Game Club", date: "2026-12-03", time: "19:00", place: "Student Center Cafe", description: "Play board games with other students. Tea is free and beginners are welcome." },
  { id: 6, title: "Winter Concert", club: "Music Club", date: "2026-12-10", time: "19:00", place: "Campus Concert Hall", description: "The Music Club and the university choir give a concert before the winter break." }
];

let registrations = [];

// ---------- Events ----------

// GET all events
app.get("/api/events", (req, res) => {
  res.json(events);
});

// GET one event
app.get("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json(event);
});

// POST a new event
app.post("/api/events", (req, res) => {
  const { title, club, date, time, place, description } = req.body;
  if (!title || !date || !place) {
    return res.status(400).json({ error: "title, date and place are required" });
  }
  const event = {
    id: Date.now(),
    title,
    club: club ?? "",
    date,
    time: time ?? "",
    place,
    description: description ?? ""
  };
  events.push(event);
  res.status(201).json(event);
});

// PUT: update an event
app.put("/api/events/:id", (req, res) => {
  const event = events.find(e => e.id === Number(req.params.id));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  event.title = req.body.title ?? event.title;
  event.club = req.body.club ?? event.club;
  event.date = req.body.date ?? event.date;
  event.time = req.body.time ?? event.time;
  event.place = req.body.place ?? event.place;
  event.description = req.body.description ?? event.description;
  res.json(event);
});

// DELETE an event
app.delete("/api/events/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!events.some(e => e.id === id)) {
    return res.status(404).json({ error: "Event not found" });
  }
  events = events.filter(e => e.id !== id);
  res.status(204).end();
});

// ---------- Registrations (the form on register.html) ----------

// GET all registrations
app.get("/api/registrations", (req, res) => {
  res.json(registrations);
});

// POST a new registration
app.post("/api/registrations", (req, res) => {
  const { name, email, eventId, seats } = req.body;
  if (!name || !email || !eventId || !seats) {
    return res.status(400).json({ error: "name, email, eventId and seats are required" });
  }
  if (!email.includes("@")) {
    return res.status(400).json({ error: "email is not valid" });
  }
  const seatCount = Number(seats);
  if (!Number.isInteger(seatCount) || seatCount < 1 || seatCount > 5) {
    return res.status(400).json({ error: "seats must be a number from 1 to 5" });
  }
  const event = events.find(e => e.id === Number(eventId));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  const registration = { id: Date.now(), name, email, eventId: event.id, seats: seatCount };
  registrations.push(registration);
  res.status(201).json(registration);
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
