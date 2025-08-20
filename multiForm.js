document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form[data-form='multistep']");
  if (!form) return;

  const steps = Array.from(form.querySelectorAll("[data-form-step]"));
  const totalSteps = steps.length;

  let activeStep = Math.max(
    0,
    steps.findIndex((s) => s.style.display !== "none")
  );

  function clamp(i) {
    return Math.max(0, Math.min(i, totalSteps - 1));
  }

  function updateNextButton(index) {
    const step = steps[index];
    if (!step) return;
    step.querySelectorAll("[data-form='next-btn']").forEach((btn) => {
      btn.classList.remove("disabled");
      btn.style.pointerEvents = "auto";
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
      btn.setAttribute("aria-disabled", "false");
    });
  }

  function updateProgressUI() {
    form
      .querySelectorAll(".multi-form20_progress-wrapper")
      .forEach((wrapper) => {
        wrapper
          .querySelectorAll("[data-form='custom-progress-indicator']")
          .forEach((btn) => {
            const n = parseInt(btn.getAttribute("data-edit-step"), 10);
            const idx = isNaN(n) ? -1 : n - 1;
            btn.classList.remove("progress-current", "completed");

            if (idx > -1) {
              if (idx < activeStep) btn.classList.add("completed");
              if (idx === activeStep) btn.classList.add("progress-current");
              if (activeStep === totalSteps - 1) btn.classList.add("completed");
            }

            btn.style.cursor = "pointer";
          });
      });
  }

  function showStep(index) {
    const i = clamp(index);
    steps.forEach((s, j) => (s.style.display = j === i ? "block" : "none"));
    activeStep = i;
    updateProgressUI();
    updateNextButton(i);
  }

  form.addEventListener("click", (e) => {
    const indicator = e.target.closest(
      "[data-form='custom-progress-indicator']"
    );
    if (indicator && form.contains(indicator)) {
      e.preventDefault();
      const n = parseInt(indicator.getAttribute("data-edit-step"), 10);
      if (isNaN(n)) return;

      const target = clamp(n - 1);
      showStep(target);
      return;
    }

    const nextBtn = e.target.closest("[data-form='next-btn']");
    if (nextBtn) {
      e.preventDefault();
      showStep(activeStep + 1);
      return;
    }

    const prevBtn = e.target.closest("[data-form='previous-btn']");
    if (prevBtn) {
      e.preventDefault();
      showStep(activeStep - 1);
      return;
    }
  });

  showStep(activeStep);
});
