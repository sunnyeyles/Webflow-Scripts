

document.addEventListener("DOMContentLoaded", () => {
  const steps = Array.from(document.querySelectorAll("[data-form-step]"));
  let currentStepIndex = 0;

  const showStep = (index) => {
    steps.forEach((step, i) => {
    console.log("Current step index: ", currentStepIndex)
      const isActive = i === index;
      step.style.display = isActive ? "" : "none";
      step.classList.toggle("active", isActive);
    });

    currentStepIndex = index;

    const reviewCard = document.querySelector('[data-form-final="review"]');
    if (reviewCard) {
      if (index === steps.length - 1) {
        reviewCard.style.display = "";
        reviewCard.classList.add("active");
      } else {
        reviewCard.style.display = "none";
        reviewCard.classList.remove("active");
      }
    }
  };

  showStep(currentStepIndex);

  document.querySelectorAll("[data-form-src]").forEach((srcInput) => {
    if (srcInput.type === 'radio') {
      srcInput.addEventListener("change", () => {
        const form = srcInput.closest("form");
        const targetElement = form.querySelector(`[data-form-target="${srcInput.dataset.formSrc}"]`);
        if (targetElement && srcInput.checked) targetElement.textContent = srcInput.value;
      });
    } else {
      srcInput.addEventListener("blur", () => {
        const form = srcInput.closest("form");
        const targetElements = form.querySelectorAll("[data-form-target]");
        targetElements.forEach((targetElement) => {
          if (targetElement.dataset.formTarget === srcInput.dataset.formSrc) {
            if (["INPUT","TEXTAREA","SELECT"].includes(targetElement.tagName)) {
              targetElement.value = srcInput.value;
            } else {
              targetElement.textContent = srcInput.value;
            }
          }
        });
      });
    }
  });

  document.querySelectorAll('[data-form="next-btn"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      const currentStep = steps[currentStepIndex];
      const requiredInputs = currentStep.querySelectorAll("[required]");
      let allValid = true;
      requiredInputs.forEach((input) => {
        if (!input.checkValidity()) {
          allValid = false;
          input.reportValidity();
        }
      });
      if (allValid && currentStepIndex < steps.length - 1) {
        showStep(currentStepIndex + 1);
      }
    });
  });

  document.querySelectorAll('[data-form="previous-btn"]').forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStepIndex > 0) showStep(currentStepIndex - 1);
    });
  });

  document.querySelectorAll("[data-edit-step]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetStepValue = btn.dataset.editStep;
      const targetIndex = steps.findIndex(step => step.dataset.formStep === targetStepValue);
      if (targetIndex !== -1 && targetIndex <= currentStepIndex) showStep(targetIndex);
    });
  });


  const submitBtn = document.querySelector('[data-form="submit-btn"]');
  if (submitBtn) {
  console.log(submitBtn,"button is there")
    submitBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const form = submitBtn.closest("form");
      steps.forEach(step => {
      	step.querySelectorAll("input, textarea, select").forEach(input => input.disabled = false);
    });
		console.log("Running submit form function")
      form.submit();
    });
  }
});