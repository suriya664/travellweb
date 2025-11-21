# TRAVEL-HUB

Responsive multi-page travel and tour booking website template covering marketing, booking, and user dashboard experiences. Built with semantic HTML5, modular CSS, and progressive enhancement from vanilla JavaScript, jQuery, and AJAX utilities.

## Features

- Two distinct home page layouts (classic + cinematic)
- Destination, packages, services, gallery, and blog sections
- Booking workflow with progress tracker and AJAX form submission
- Authentication pages with client-side validation
- User dashboard including bookings, profile, and messages
- Reusable responsive components, grids, and typography scale
- Integration hooks for Swiper, AOS, Bootstrap, and Font Awesome

## Tech Stack

- HTML5 with accessible landmarks and consistent navigation
- CSS (utility variables + responsive + dashboard modules)
- JavaScript ES6 modules with jQuery helpers and AJAX examples
- Vendor-ready folders for third-party libraries

## Getting Started

1. Clone or download the repository.
2. Serve the root directory (`TRAVEL-HUB/`) with your preferred static server.
   ```bash
   npx serve
   ```
3. Ensure the following CDNs are reachable via internet connection:
   - Google Fonts
   - jQuery 3.x
   - Swiper.js
   - AOS (Animate On Scroll)
   - Font Awesome

## Structure

```
TRAVEL-HUB/
├── *.html                 # Page templates
├── assets/
│   ├── css/               # Global + page-specific styles
│   ├── js/                # Global + feature scripts
│   ├── images/            # Organised image directories
│   ├── fonts/             # Custom / downloaded fonts
│   └── vendor/            # Vendor bundles (empty placeholders)
└── README.md
```

## Customisation Tips

- Update brand colours via `assets/css/style.css` root variables.
- Extend breakpoints via `assets/css/responsive.css`.
- Activate sliders/animations by adding scripts to `assets/vendor/` or referencing CDNs.
- Replace image URLs with locally hosted assets in `assets/images/`.
- Wire AJAX endpoints to your backend for booking, contact, and auth flows.

## Accessibility & Performance

- Landmark tags (`header`, `nav`, `main`, `footer`) for screen readers
- Keyboard-friendly interactive elements and focus states
- Lightweight animations with reduced-motion guards
- Mobile-first responsive grid system

## License

This template is provided as-is for personal or commercial projects. Attribution is appreciated but not required.

