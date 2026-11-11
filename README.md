# Club Events

Team project for **MIS 457 Web Based Application Programming** (Fall 2026).

A website where students can see student club events and register for them.

## Team

- Hamza Talha Koşak
- Enes Kaan Duran
- Bedirhan Bayır

## Files

- `index.html` - home page with the event list
- `register.html` - registration form
- `style.css` - all styles
- `app.js` - loads the events and makes the event cards
- `register.js` - form validation and sending the form
- `api/` - our Express API (Week 5)
- `postman/` - Postman collection with all API requests (Week 5)

## How to run

1. Start the API:

   ```
   cd api
   npm install
   npm start
   ```

   The terminal shows `Server on http://localhost:3000`.

2. Open `index.html` with Live Server.

## Week 3: JavaScript and the DOM

- `register.js` checks the form and shows a clear error message under each field
- The event cards are made with JavaScript from an array

## Week 4: Fetch and async/await

- The event data was moved from the HTML into a JSON file
- `app.js` loads it with `fetch` and `async/await`
- The page shows four states: **loading**, **success**, **empty** and **error**
- Live search by event or club name

## Week 5: Node.js, Express and REST API

The data is in arrays in `api/server.js`, so it resets when the server restarts.

| Method | URL | Meaning | Success | Errors |
|--------|-----|---------|---------|--------|
| GET | `/api/events` | List all events | 200 | - |
| GET | `/api/events/:id` | One event | 200 | 404 |
| POST | `/api/events` | Create an event | 201 | 400 |
| PUT | `/api/events/:id` | Update an event | 200 | 404 |
| DELETE | `/api/events/:id` | Delete an event | 204 | 404 |
| GET | `/api/registrations` | List all registrations | 200 | - |
| POST | `/api/registrations` | Register for an event (the form) | 201 | 400, 404 |

- The frontend uses the API now, not `data.json`: `app.js` loads the events and `register.js` sends the form with `POST`
- Errors always have the same format: `{ "error": "message" }`
- Postman: Import `postman/club-events.postman_collection.json`

## Lighthouse Accessibility (Week 2)

Home page:

![Lighthouse home page](docs/lighthouse-home.png)

Register page:

![Lighthouse register page](docs/lighthouse-register.png)
