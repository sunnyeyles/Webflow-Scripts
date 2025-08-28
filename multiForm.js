document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(document.querySelectorAll("[data-form-step]"));

  let currentStepIndex = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
      step.style.display = i === index ? "" : "none";
    });
    currentStepIndex = index;
  };

  showStep(currentStepIndex);
  // Sync handlers
  document.querySelectorAll("[data-form-src]").forEach((srcInput) => {
    srcInput.addEventListener("blur", () => {
      const form = srcInput.closest("form");

      const targetElements = form.querySelectorAll("[data-form-target]");
      targetElements.forEach((targetElement) => {
        if (targetElement.dataset.formTarget === srcInput.dataset.formSrc) {
          if (
            targetElement.tagName === "INPUT" ||
            targetElement.tagName === "TEXTAREA" ||
            targetElement.tagName === "SELECT"
          ) {
            targetElement.value = srcInput.value;
          } else {
            targetElement.textContent = srcInput.value;
          }
        }
      });
    });
  });

  document.querySelectorAll('[data-form="next-btn"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStepIndex < steps.length - 1) {
        showStep(currentStepIndex + 1);
      }
    });
  });
  const previewBtn = document.querySelector('[data-form="preview-btn"]');
  previewBtn.addEventListener("click", () => {});

  document.querySelectorAll('[data-form="previous-btn"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStepIndex > 0) {
        showStep(currentStepIndex - 1);
      }
    });
  });

  document.querySelectorAll("[data-edit-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetStepValue = btn.dataset.editStep;

      const targetIndex = steps.findIndex(
        (step) => step.dataset.formStep === targetStepValue
      );
      if (targetIndex !== -1) {
        if (targetIndex <= currentStepIndex) {
          showStep(targetIndex);
        }
      }
    });
  });
});
