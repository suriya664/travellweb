document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("[data-booking-form]");
  if (!form || !window.jQuery) return;

  const $ = window.jQuery;
  const $steps = $(form).find("[data-step]");
  const $progress = $(form).find("[data-progress]");
  const $summary = $(form).find("[data-summary]");
  let currentStep = 0;

  const renderStep = (index) => {
    $steps.removeClass("is-active").eq(index).addClass("is-active");
    const percentage = Math.round(((index + 1) / $steps.length) * 100);
    $progress.css("width", `${percentage}%`).attr("aria-valuenow", percentage);
    $(form)
      .find("[data-step-index]")
      .text(`${index + 1} / ${$steps.length}`);
  };

  const collectSummary = () => {
    const summary = {};
    $(form)
      .serializeArray()
      .forEach(({ name, value }) => {
        summary[name] = value;
      });
    return summary;
  };

  $(form).on("click", "[data-step-next]", (evt) => {
    evt.preventDefault();
    if (!validateStep($steps.eq(currentStep))) return;
    currentStep = Math.min(currentStep + 1, $steps.length - 1);
    renderStep(currentStep);
    updateSummary();
  });

  $(form).on("click", "[data-step-prev]", (evt) => {
    evt.preventDefault();
    currentStep = Math.max(currentStep - 1, 0);
    renderStep(currentStep);
  });

  $(form).on("change input", "input, select, textarea", updateSummary);

  $(form).on("submit", (evt) => {
    evt.preventDefault();
    if (!validateStep($steps.eq(currentStep))) return;

    const $button = $(form).find("button[type='submit']");
    const payload = collectSummary();

    $button.prop("disabled", true).text("Processing…");

    $.ajax({
      url: "https://httpbin.org/post",
      method: "POST",
      data: payload,
    })
      .done(() => {
        $(form)[0].reset();
        currentStep = 0;
        renderStep(currentStep);
        updateSummary();
        $button.text("Booking Confirmed!");
        setTimeout(() => {
          $button.prop("disabled", false).text("Complete Booking");
        }, 2500);
      })
      .fail(() => {
        $button.prop("disabled", false).text("Try Again");
      });
  });

  const validateStep = ($step) => {
    let isValid = true;
    $step.find("[required]").each(function () {
      const $field = $(this);
      const $error = $field.siblings(".form-error");
      if (!$field.val()) {
        isValid = false;
        $field.addClass("has-error");
        $error.text("This field is required").show();
      } else {
        $field.removeClass("has-error");
        $error.hide();
      }
    });
    return isValid;
  };

  const updateSummary = () => {
    if (!$summary.length) return;
    const summary = collectSummary();
    const items = Object.entries(summary)
      .map(
        ([key, value]) =>
          `<div class="summary-row"><span>${key.replace(/_/g, " ")}</span><strong>${value || "—"}</strong></div>`
      )
      .join("");
    $summary.html(items || "<p>No selections yet.</p>");
  };

  renderStep(currentStep);
  updateSummary();
});

