# Club Events

Team project for **MIS 457 Web Based Application Programming** (Fall 2026).

Club Events is a website where students can see the events of university clubs and register for them.
This is the Week 2 version: a static prototype made with HTML and CSS only.

## Team

- Hamza Talha Koşak
- Enes Kaan Duran
- Bedirhan Bayır

## Pages

| File | Description |
|------|-------------|
| `index.html` | Home page with the list of upcoming events |
| `register.html` | Sign-up form for an event (every input has a label) |
| `thanks.html` | Page shown after the form is sent |
| `style.css` | All styles (Flexbox header, Grid cards, mobile first) |

## How to open

Open `index.html` in a browser, or use the Live Server extension in VS Code.

## What we used

- **HTML5 semantic tags:** `header`, `nav`, `main`, `section`, `article`, `footer`, `time`
- **Form:** `label for`, `type="email"`, `type="number"`, `required`, `min`/`max`, `pattern`
- **CSS:** box model with `box-sizing: border-box`, CSS variables, Flexbox for the header, Grid for the cards
- **Responsive:** mobile first with one media query (`min-width: 768px`)
- **Accessibility:** skip link, visible focus outline, headings in order, enough color contrast

## How we tested

- Chrome DevTools device toolbar at 375px and 1280px
- Using the site with only the keyboard (Tab and Enter)
- Lighthouse Accessibility report for each page

## Week 2 checklist

- [x] Home page (semantic HTML: header, nav, main, section, article, footer)
- [x] One form page, every input has a `<label>`
- [x] Responsive: 1 column at 375px, 3 columns at 1280px
- [x] Lighthouse Accessibility 90+ (we got 100)

## Lighthouse

Home page:

![Lighthouse home page](docs/lighthouse-home.png)

Register page:

![Lighthouse register page](docs/lighthouse-register.png)

## Next weeks

- Week 3: JavaScript and the DOM
- Week 5: Node.js + Express backend (the form will send a POST request)
- Week 6: PostgreSQL database
