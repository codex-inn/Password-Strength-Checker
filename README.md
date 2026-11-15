# SecureCheck — Password Strength Checker

A clean, responsive, privacy-first password strength checker and password generator built with **HTML, CSS and vanilla JavaScript**.

## Features

- Live password checklist and estimated strength meter
- Weak, Fair, Good and Strong labels with a score out of 100
- Show/hide password control
- Contextual security recommendations
- Cryptographically random password generator (8–64 characters)
- Configurable uppercase, lowercase, number and symbol character sets
- Copy generated password with a clipboard fallback
- Responsive layout for desktop, tablet and mobile
- No backend, account, database, analytics or browser storage

## Project files

```text
Password-Strength-Checker/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Run locally

1. Clone or download this repository.
2. Open the project folder.
3. Open `index.html` in a modern browser.

For the most consistent Web Crypto and clipboard support, serve the folder over localhost (for example, with VS Code Live Server) or use the deployed HTTPS GitHub Pages site.

## Deploy with GitHub Pages

1. Open this repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the `main` branch and `/(root)` folder.
5. Click **Save** and wait for the Pages deployment to finish.

The site will be available at:

`https://codex-inn.github.io/Password-Strength-Checker/`

## Privacy and security

- Password analysis is performed in the browser tab.
- The application does not send passwords to a server.
- The application does not write passwords to localStorage, sessionStorage or cookies.
- Password generation uses the browser Web Crypto API (`crypto.getRandomValues`) and rejection sampling to avoid modulo bias.
- No third-party analytics or external password-checking APIs are used.
- Google Fonts are loaded for typography; no password data is sent to the font provider.

**Important:** Do not enter a real, currently used password into demonstration or educational tools. Use a password manager to create and store unique passwords for your accounts.

## About the strength estimate

The strength meter is a simple educational heuristic based on length, character variety and a few common patterns. It is not a password-cracking simulation, does not calculate reliable crack times, and cannot guarantee that a password is secure. A long, unique passphrase generated and stored with a reputable password manager is generally preferable to a short, complex password that is reused.

## Browser support

Use a modern browser with Web Crypto support. Password generation requires a secure context such as HTTPS or localhost.

## License

This project is available under the MIT License. See [LICENSE](LICENSE) if included in this repository.

---

**Author:** Kowshik S  
**Project:** Cybersecurity learning project
