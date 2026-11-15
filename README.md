# SecureCheck Pro

Privacy-first password toolkit built with HTML, CSS and vanilla JavaScript.

## Features
- Live strength score, checklist, pattern warnings and smart suggestions.
- Theoretical entropy estimate and illustrative offline guessing-time model.
- Cryptographically random password generation with Web Crypto and rejection sampling.
- Local multi-word passphrase generator.
- Optional Have I Been Pwned range lookup using k-anonymity: only the first 5 SHA-1 hex characters are sent; the full password and full hash are not.
- In-memory password list audit, duplicate detection and aggregate-only JSON export.
- Password-free JSON report and print / Save PDF.
- Dark/light theme and installable offline PWA.
- No backend, accounts, analytics or browser storage.

## Run
Use HTTPS or localhost for Web Crypto, clipboard and service-worker support. GitHub Pages: Settings → Pages → Deploy from a branch → main → /(root).

URL: https://codex-inn.github.io/Password-Strength-Checker/

## Privacy
Analysis, generation and audits run locally. No password is persisted. Optional breach lookup contacts api.pwnedpasswords.com with only a 5-character SHA-1 prefix; request metadata is still visible to that service. Do not submit sensitive live credentials. Reports omit password text. The service worker caches only static app files.

## Limitations
Entropy is an upper-bound estimate based on character classes and assumes random selection; human-chosen patterns reduce real entropy. Guessing time assumes 10 billion guesses/second and half the search space; actual rates vary by hashing algorithm, hardware, salts and attacker knowledge. A clean breach lookup is not proof of safety. The built-in passphrase list is small; prefer a reputable password manager.

Use unique passwords and passkeys where supported.