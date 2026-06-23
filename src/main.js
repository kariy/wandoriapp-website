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
const successEl = document.getElementById("success");
const honeypot = form.querySelector('[name="_gotcha"]');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setError(text) {
  msg.textContent = text;
}

function setBusy(busy) {
  submitBtn.disabled = busy;
  submitLabel.textContent = busy ? "Joining…" : "Join the waitlist";
}

function showSuccess() {
  form.hidden = true;
  successEl.hidden = false;
  // re-trigger the reveal animation now that it's visible
  successEl.style.animation = "none";
  void successEl.offsetWidth;
  successEl.style.animation = "";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  setError("");

  // bot trap — silently "succeed" without sending
  if (honeypot.value) {
    showSuccess();
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
    showSuccess();
    return;
  }

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });

    if (res.ok) {
      showSuccess();
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
