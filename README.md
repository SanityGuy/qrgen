# QR Code Generator

A lightweight, responsive web app that generates QR codes from any text or URL — no backend, no API key, no dependencies beyond a CDN.

## Features

- ⚡ Instant QR code generation via [GoQR.me API](https://goqr.me/api/)
- 📱 Fully responsive — works on mobile, tablet, and desktop
- 🌐 Browser auto-translation ready
- 📋 One-click copy of the encoded text
- ⬇️ Direct PNG download (blob-based, no new tab)
- 🎨 Clean dark UI built with Tailwind CSS

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 |
| Styling | [Tailwind CSS](https://tailwindcss.com) (CDN) |
| Icons | [Font Awesome 7](https://fontawesome.com) (CDN) |
| Logic | Vanilla JavaScript (ES6+) |
| QR Generation | [GoQR.me REST API](https://goqr.me/api/) |

## Getting Started

No build step, no `npm install`. Just open the file:

```bash
# Option 1: Open directly
open index.html

# Option 2: Local server (recommended)
npx serve .
# or
python -m http.server 8000
```

Then navigate to `http://localhost:8000`.

## Project Structure

```
├── index.html      # Markup + Tailwind CDN
├── index.js        # All logic (generate, copy, download)
└── README.md
```

## How It Works

1. User types text/URL into the input field.
2. On **Generate**, the app calls:
   ```
   https://api.qrserver.com/v1/create-qr-code/?size=400x400&data={encoded_text}
   ```
3. The returned PNG is displayed inline.
4. **Copy Text** writes the original string to the clipboard.
5. **Download** fetches the image as a `Blob` and triggers a native file download.

## Browser Support

- Chrome / Edge / Firefox / Safari — latest 2 versions
- Mobile: iOS Safari 14+, Android Chrome 80+

## Notes

- The QR API is free and requires **no API key**.
- Input is URL-encoded via `encodeURIComponent` to handle special characters.
- Touch targets meet Apple HIG (≥ 44 px) for comfortable mobile use.

## License

This project is licensed under the MIT License.

