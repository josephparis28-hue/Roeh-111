# ROEH 111 — Digital Revamp (VS Code Project)

**CMPA 4304 · Senior Capstone · Project 01**  
**Project type:** Responsive, multi-page website prototype  
**Technology:** HTML5, CSS3, vanilla JavaScript  
**Design system:** Ocean Depth

## Folder layout

```text
ROEH111-VSCode/
├── .vscode/
│   ├── extensions.json        # Optional VS Code extensions
│   └── settings.json          # Editor formatting preferences
├── assets/                    # ROEH 111 logos and visual assets
├── docs/                      # Business/pricing planning references
├── index.html                 # Home
├── digital.html               # ROEH Digital
├── restore.html               # ROEH Restore
├── life.html                  # ROEH Life
├── pricing.html               # Prices and estimators
├── work.html                  # Work / prototype case study
├── about.html                 # About
├── contact.html               # Inquiry interface
├── privacy.html               # Privacy draft
├── 404.html                   # Not-found page
├── styles.css                 # Shared responsive styles
├── script.js                  # Navigation, estimators, interactions
├── config.js                  # Public form-service configuration
├── .editorconfig              # Indentation and newline preferences
├── .gitignore                 # Ignore local-only files
├── .nojekyll                  # Prevent GitHub Pages Jekyll transforms
└── README.md                  # Project documentation
```

## Project overview

ROEH 111 Digital Revamp is a redesign of the ROEH 111 website. The project brings three distinct areas of service into one cohesive, accessible digital experience:

- **ROEH Digital:** Website design, web development, and ongoing digital support.
- **ROEH Restore:** Property maintenance, home repairs, and improvement inquiries.
- **ROEH Life:** Faith-centered resources, reflection, and personal-growth encouragement.

The site is intended to help visitors identify the correct division, understand the available services, review indicative pricing where applicable, and reach an appropriate inquiry form.

**Project preview:** <https://josephparis28-hue.github.io/Roeh-111/>  
**Repository:** <https://github.com/josephparis28-hue/Roeh-111>

### Problem statement

A business offering several different kinds of services needs a website that communicates those differences without losing a consistent brand identity. Visitors should not have to guess where to find information, whether a service is relevant to them, or how to start an inquiry.

This redesign addresses that challenge through clearer information architecture, distinct division pages, consistent visual design, responsive layouts, and more direct calls to action.

### Project objectives

1. Create a unified visual identity for ROEH 111 while making each division recognizable.
2. Improve service discovery and navigation for first-time visitors.
3. Design layouts that adapt to mobile, tablet, and desktop screens.
4. Build semantic, keyboard-friendly interfaces with accessible form labels and navigation.
5. Explain services and proposed prices in clear, customer-focused language.
6. Provide a path from each service page to the appropriate customer inquiry flow.
7. Document what is implemented and what still requires testing or production configuration.

### Intended audiences

| Division | Primary audience | Main user action |
| --- | --- | --- |
| **Digital** | Small businesses and organizations looking for web services | Explore a package and request a consultation |
| **Restore** | Property owners seeking eligible maintenance or improvement work | Review services and request an estimate |
| **Life** | Visitors seeking faith-centered learning and reflection resources | Explore resources or request a conversation |

These audiences inform the prototype's design; they are not a claim that formal user research has validated each segment.

### Pages and project files

| File | Purpose |
| --- | --- |
| `index.html` | Homepage introducing the ROEH 111 brand and three divisions |
| `digital.html` | Digital services, website packages, care options, and inquiry links |
| `restore.html` | Restore services, estimating approach, service-area disclaimer, and inquiry links |
| `life.html` | Faith-centered mission, reflection prompts, and starter resources |
| `pricing.html` | Proposed pricing information and interactive Digital/Restore estimators |
| `work.html` | Project work and the ROEH 111 redesign case-study framework |
| `about.html` | Brand purpose, values, and approach |
| `contact.html` | Division-specific inquiry form |
| `privacy.html` | Draft privacy information; requires review before production use |
| `404.html` | Not-found page |
| `styles.css` | Shared Ocean Depth visual system and responsive styles |
| `script.js` | Mobile menu, calculators, inquiry interactions, and UI behaviors |
| `config.js` | Public settings for inquiry delivery and service-area display |
| `assets/` | SVG brand marks and associated logo assets |
| `docs/` | Supporting design guide and project/business planning documents, where included |
| `.nojekyll` | Keeps GitHub Pages from processing static files through Jekyll |

### Design system

The site follows the established **ROEH 111 Ocean Depth** design guide.

| Design element | Specification |
| --- | --- |
| Ocean Navy | `#0A2540` — primary brand color |
| Deep Blue | `#172B4D` — supporting brand color and text |
| Ocean Teal | `#00D4AA` — key accents and calls to action |
| Soft Gray | `#F6F9FC` — background |
| White | `#FFFFFF` — surfaces and contrast |
| Headings | Poppins, weights 600–700 |
| Body and controls | Inter, weights 400–600 |

The overall appearance is intentionally modern, professional, readable, and consistent. Branch-specific visual cues distinguish Digital, Restore, and Life while retaining the parent brand.

### Responsive design and accessibility

Responsive behavior is implemented using CSS Grid, Flexbox, fluid sizing, and media queries. The navigation changes to a compact mobile menu on narrower screens, and many content grids stack into fewer columns.

The code includes accessibility-oriented features such as semantic page sections, a skip link, labeled form fields, keyboard focus states, and reduced-motion styling. **These are implementation measures, not a claim of verified WCAG compliance.**

Recommended review widths:

- **375px and 430px:** Common mobile layouts
- **768px:** Tablet layout
- **1366px and 1920px:** Laptop and desktop layouts

Use browser developer tools and real devices where available to verify page overflow, tap targets, navigation, forms, and text scaling.

### Run locally

No framework, package installation, or build step is required.

1. Download or clone the project.
2. Keep all HTML, CSS, JavaScript, and `assets/` files in their original relative locations.
3. Open `index.html` in a browser for a basic preview.
4. For a more reliable local development environment, start a web server in the project directory:

   ```bash
   python -m http.server 8000
   ```

5. Open `http://localhost:8000/`.

The project should function as a static site. Internet access may be required to load the Google Fonts used in the design.

## Inquiry form status — Formspree configured (testing still required)

The `contact.html` form uses your public Formspree POST endpoint:

```text
https://formspree.io/f/xvkaawre
```

- `config.js` sets `formEndpoint` to that address.
- `contact.html` includes the same address as its HTML form `action`, so normal POST works if JavaScript is unavailable.
- `script.js` sends `FormData` via `fetch()` with `Accept: application/json`, displays success or error feedback, and keeps a copy-text fallback when submission fails.
- One form handles Digital, Restore, and Life. Only the selected branch's fields are enabled. A subject field indicates the selected branch.
- The `_gotcha` honeypot is included to discourage simple bot submissions.

### Project 01 scope and current status

**Implemented in this project:**

- Ten static HTML pages, including the 404 page
- Shared branding and design tokens
- Three distinct division experiences
- Responsive navigation and content layouts
- Digital service packages and illustrative pricing
- Digital and Restore pricing estimators
- A division-specific customer inquiry interface
- Initial accessibility-oriented markup and behaviors

**Still to complete or verify:**

- Final customer-facing content, real service availability, and approved pricing
- Actual project examples or client work, when available
- Independently verified Formspree submissions and finalized privacy documentation
- Mobile, tablet, and desktop browser testing
- Lighthouse, WAVE, keyboard, zoom, and screen-reader checks
- User feedback, documented usability findings, and iteration
- Final capstone case-study presentation and submission materials

The interactive price estimates are **illustrative only**, not binding quotes. The website is a project prototype and should not be presented as a fully operational business platform.

### Next development steps

1. Review each page's text, navigation, and branch-specific customer journey.
2. Conduct usability and accessibility tests, then record findings.
3. Apply changes based on testing and peer feedback.
4. Confirm real business details before any public commercial launch.
5. Package the problem statement, research, implementation evidence, and concept presentation for Project 01.

---

**ROEH 111** — *Simple. Accessible. Professional.*
