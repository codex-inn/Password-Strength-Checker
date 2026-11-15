(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);
  const passwordInput = $("password");
  const strengthText = $("strengthText");
  const strengthBar = $("strengthBar");
  const strengthMeter = $("strengthMeter");
  const scoreText = $("scoreText");
  const securityTips = $("securityTips");
  const actionStatus = $("actionStatus");

  const rules = [
    { id: "rule-length", test: (value) => value.length >= 12, tip: "Use at least 12 characters." },
    { id: "rule-upper", test: (value) => /[A-Z]/.test(value), tip: "Add an uppercase letter." },
    { id: "rule-lower", test: (value) => /[a-z]/.test(value), tip: "Add a lowercase letter." },
    { id: "rule-number", test: (value) => /[0-9]/.test(value), tip: "Include a number." },
    { id: "rule-symbol", test: (value) => /[^A-Za-z0-9]/.test(value), tip: "Include a special character." }
  ];

  const commonPatterns = [
    { pattern: /password|passw0rd|admin|welcome|letmein|qwerty/i, tip: "Avoid common words and keyboard patterns." },
    { pattern: /0123|1234|2345|3456|4567|5678|6789|abcd|qwer/i, tip: "Avoid predictable sequences." },
    { pattern: /(.)\1{2,}/, tip: "Avoid repeating the same character several times." }
  ];

  function updateRule(rule, passed) {
    const item = $(rule.id);
    item.classList.toggle("is-valid", passed);
    item.querySelector(".rule-icon").textContent = passed ? "✓" : "○";
  }

  function estimateStrength(value, passedCount) {
    if (!value) return { score: 0, label: "Not checked", color: "#8994a6" };

    // This is a transparent heuristic, not a crack-time or entropy calculation.
    let score = 0;
    score += Math.min(value.length / 20, 1) * 45;
    score += (passedCount / rules.length) * 35;

    const characterTypes = [
      /[a-z]/.test(value),
      /[A-Z]/.test(value),
      /[0-9]/.test(value),
      /[^A-Za-z0-9]/.test(value)
    ].filter(Boolean).length;
    score += characterTypes * 5;

    if (value.length < 8) score -= 25;
    if (commonPatterns.some((item) => item.pattern.test(value))) score -= 25;
    if (/(.)\1{3,}/.test(value)) score -= 10;

    score = Math.max(0, Math.min(100, Math.round(score)));

    if (score < 35) return { score, label: "Weak", color: "#df5b65" };
    if (score < 60) return { score, label: "Fair", color: "#d99132" };
    if (score < 80) return { score, label: "Good", color: "#4779d8" };
    return { score, label: "Strong", color: "#15966b" };
  }

  function analyzePassword() {
    const value = passwordInput.value;
    const passed = rules.map((rule) => rule.test(value));
    passed.forEach((result, index) => updateRule(rules[index], result));
    $("checksCount").textContent = passed.filter(Boolean).length + " of 5";

    if (!value) {
      strengthText.textContent = "Not checked";
      strengthText.style.color = "#8994a6";
      scoreText.textContent = "— / 100";
      strengthBar.style.width = "0%";
      strengthMeter.setAttribute("aria-valuenow", "0");
      securityTips.textContent = "Your personalized recommendations will appear here as you type.";
      return;
    }

    const estimate = estimateStrength(value, passed.filter(Boolean).length);
    strengthText.textContent = estimate.label;
    strengthText.style.color = estimate.color;
    scoreText.textContent = estimate.score + " / 100";
    strengthBar.style.width = estimate.score + "%";
    strengthBar.style.background = estimate.color;
    strengthMeter.setAttribute("aria-valuenow", String(estimate.score));

    const suggestions = rules
      .filter((rule, index) => !passed[index])
      .map((rule) => rule.tip);

    commonPatterns.forEach((item) => {
      if (item.pattern.test(value)) suggestions.push(item.tip);
    });

    if (value.length < 16) suggestions.push("Consider a longer passphrase of 16 or more characters.");
    if (!suggestions.length) suggestions.push("Good checklist coverage. Use a unique password and store it in a password manager.");

    securityTips.textContent = suggestions.join(" ");
  }

  passwordInput.addEventListener("input", analyzePassword);

  $("togglePassword").addEventListener("click", () => {
    const button = $("togglePassword");
    const show = passwordInput.type === "password";
    passwordInput.type = show ? "text" : "password";
    button.setAttribute("aria-label", show ? "Hide password" : "Show password");
    button.setAttribute("aria-pressed", String(show));
    button.innerHTML = show
      ? '<svg class="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m3 3 18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M9.9 5.2A10.8 10.8 0 0 1 12 5c6.1 0 9.5 7 9.5 7a16 16 0 0 1-3 3.8M6.2 6.2C3.8 7.8 2.5 12 2.5 12s3.4 7 9.5 7c1.2 0 2.3-.3 3.3-.7" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
      : '<svg class="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.7" stroke="currentColor" stroke-width="1.7"/></svg>';
  });

  $("clearButton").addEventListener("click", () => {
    passwordInput.value = "";
    passwordInput.type = "password";
    $("togglePassword").setAttribute("aria-label", "Show password");
    $("togglePassword").setAttribute("aria-pressed", "false");
    $("togglePassword").innerHTML = '<svg class="eye-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="1.7"/><circle cx="12" cy="12" r="2.7" stroke="currentColor" stroke-width="1.7"/></svg>';
    analyzePassword();
    passwordInput.focus();
  });

  const lengthInput = $("passwordLength");
  lengthInput.addEventListener("input", () => {
    $("lengthValue").textContent = lengthInput.value;
  });

  function secureRandomIndex(max) {
    if (!Number.isSafeInteger(max) || max < 1 || max > 256) {
      throw new RangeError("Character set size must be between 1 and 256.");
    }
    if (!globalThis.crypto || typeof globalThis.crypto.getRandomValues !== "function") {
      throw new Error("A browser with Web Crypto support is required. Open this site over HTTPS or localhost.");
    }

    // Rejection sampling avoids modulo bias.
    const limit = Math.floor(256 / max) * max;
    const random = new Uint8Array(1);
    do {
      crypto.getRandomValues(random);
    } while (random[0] >= limit);
    return random[0] % max;
  }

  function secureShuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const swapIndex = secureRandomIndex(index + 1);
      [items[index], items[swapIndex]] = [items[swapIndex], items[index]];
    }
    return items;
  }

  function generatePassword(length, groups) {
    const allCharacters = groups.join("");
    if (!groups.length) throw new Error("Choose at least one character type.");
    if (length < groups.length) throw new Error("Increase the length to fit every selected character type.");

    const characters = groups.map((group) => group[secureRandomIndex(group.length)]);
    while (characters.length < length) {
      characters.push(allCharacters[secureRandomIndex(allCharacters.length)]);
    }
    return secureShuffle(characters).join("");
  }

  $("generateButton").addEventListener("click", () => {
    const groups = [];
    if ($("genUpper").checked) groups.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    if ($("genLower").checked) groups.push("abcdefghijklmnopqrstuvwxyz");
    if ($("genNumbers").checked) groups.push("0123456789");
    if ($("genSymbols").checked) groups.push("!@#$%^&*()-_=+[]{}?");

    try {
      const generated = generatePassword(Number(lengthInput.value), groups);
      $("generatedPassword").value = generated;
      actionStatus.textContent = "A new password has been generated.";
      actionStatus.style.color = "var(--green)";
    } catch (error) {
      actionStatus.textContent = error.message;
      actionStatus.style.color = "var(--red)";
    }
  });

  async function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return;
    }

    // Fallback for browsers without the Clipboard API.
    const temporary = document.createElement("textarea");
    temporary.value = value;
    temporary.setAttribute("readonly", "");
    temporary.style.position = "fixed";
    temporary.style.opacity = "0";
    document.body.appendChild(temporary);
    temporary.select();
    const copied = document.execCommand("copy");
    temporary.remove();
    if (!copied) throw new Error("Clipboard access is unavailable. Select and copy the password manually.");
  }

  $("copyButton").addEventListener("click", async () => {
    const generated = $("generatedPassword").value;
    if (!generated) {
      actionStatus.textContent = "Generate a password first.";
      actionStatus.style.color = "var(--red)";
      return;
    }

    try {
      await copyText(generated);
      actionStatus.textContent = "Password copied to your clipboard.";
      actionStatus.style.color = "var(--green)";
    } catch (error) {
      actionStatus.textContent = error.message || "Could not copy. Please copy it manually.";
      actionStatus.style.color = "var(--red)";
    }
  });

  analyzePassword();
})();