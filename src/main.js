import "./style.css";

/* ------------------------------------------------------------------
   Waitlist form → Formspree (AJAX, no redirect).

   SETUP: create a free form at https://formspree.io (send to
   ammr.arf@gmail.com) and paste its endpoint below. Until then the
   form runs in DEMO mode and just shows the success state locally.
   ------------------------------------------------------------------ */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xgojegra";
const DEMO_MODE = FORMSPREE_ENDPOINT.includes("REPLACE_ME");

const form = document.getElementById("waitlist");
const emailInput = document.getElementById("email");
const msg = document.getElementById("form-msg");
const submitBtn = form.querySelector(".submit");
const submitLabel = form.querySelector(".submit__label");
const honeypot = form.querySelector('[name="_gotcha"]');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Relative path works on both the dev server (/) and the
// GitHub Pages project base (/wandoriapp-website/).
const THANKS_URL = "thanks.html";

function setError(text) {
  msg.textContent = text;
}

function setBusy(busy) {
  submitBtn.disabled = busy;
  submitLabel.textContent = busy ? "Joining…" : "Join the waitlist";
}

function goToThanks() {
  window.location.assign(THANKS_URL);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setError("");

  // bot trap — silently "succeed" without sending
  if (honeypot.value) {
    goToThanks();
    return;
  }

  const email = emailInput.value.trim();
  if (!EMAIL_RE.test(email)) {
    setError("Please enter a valid email address.");
    emailInput.focus();
    return;
  }

  setBusy(true);

  if (DEMO_MODE) {
    // No endpoint wired yet — simulate a successful round-trip.
    await new Promise((r) => setTimeout(r, 650));
    setBusy(false);
    goToThanks();
    return;
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (res.ok) {
      goToThanks();
    } else {
      const data = await res.json().catch(() => null);
      const detail = data?.errors?.map((x) => x.message).join(", ");
      setError(detail || "Something went wrong. Please try again.");
    }
  } catch {
    setError("Network error — check your connection and try again.");
  } finally {
    setBusy(false);
  }
});

// clear the error as soon as the user starts fixing it
emailInput.addEventListener("input", () => setError(""));
