# SecureCheck Pro 🔐

A privacy-first password security toolkit built with **HTML, CSS and JavaScript**. Analyze password strength, generate secure passwords and passphrases, check known breach exposure, and run local password audits.

## Features

- Password strength score, checklist and smart recommendations
- Entropy estimate and illustrative crack-time model
- Cryptographically secure password generator
- Random multi-word passphrase generator
- Optional breach lookup using Have I Been Pwned k-anonymity
- Local password audit and password-free JSON reports
- Dark / light theme and offline PWA support

## Live Demo

https://codex-inn.github.io/Password-Strength-Checker/

## Run Locally

1. Clone or download this repository.
2. Open the project using a local development server (such as VS Code Live Server).
3. Visit the local URL in a modern browser.

For Web Crypto and offline support, use **HTTPS or localhost**.

## Privacy & Security

- Password analysis, generation and audits run in your browser.
- Passwords are not uploaded or saved in browser storage.
- The optional breach check sends only the first 5 characters of a SHA-1 hash to the Pwned Passwords API—not the password or full hash.
- Exported reports do not contain password values.

**Note:** Entropy and crack-time values are educational estimates, not security guarantees. A clean breach result does not prove a password is safe. Use unique passwords and a trusted password manager.

## Tech Stack

HTML · CSS · JavaScript · Web Crypto API · PWA

## License

MIT
