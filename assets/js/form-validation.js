document.addEventListener("DOMContentLoaded", () => {
  if (!window.jQuery) return;

  const $ = window.jQuery;

  const validators = {
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    password: (value) => value.length >= 6,
    name: (value) => value.trim().length >= 2,
  };

  $("[data-validate-form]").each(function () {
    const $form = $(this);
    const rules = $form.data("rules")?.split(",") || [];

    $form.on("input blur", "input", function () {
      validateField($(this));
    });

    $form.on("submit", function (evt) {
      evt.preventDefault();
      let isValid = true;

      $form.find("input[required]").each(function () {
        if (!validateField($(this))) {
          isValid = false;
        }
      });

      if (!isValid) return;

      const $button = $form.find("button[type='submit']");
      const payload = $form.serialize();

      $button.prop("disabled", true).text("Submitting…");

      $.ajax({
        url: "https://httpbin.org/post",
        method: "POST",
        data: payload,
      })
        .done(() => {
          $form[0].reset();
          $button.text("Success!");
          setTimeout(() => $button.text("Continue"), 2000);
        })
        .fail(() => {
          $button.text("Please retry");
        })
        .always(() => {
          setTimeout(() => $button.prop("disabled", false), 1800);
        });
    });

    function validateField($input) {
      const value = $input.val();
      const type = $input.attr("type");
      const required = $input.prop("required");
      const $error = $input.siblings(".form-error");

      let valid = true;

      if (required && !value) {
        valid = false;
        setError($input, $error, "This field is required");
      } else if (type === "email" && !validators.email(value)) {
        valid = false;
        setError($input, $error, "Provide a valid email address");
      } else if (type === "password") {
        if (rules.includes("strong-password") && value.length < 8) {
          valid = false;
          setError($input, $error, "Password must be at least 8 characters");
        } else if (!validators.password(value)) {
          valid = false;
          setError($input, $error, "Password must contain 6+ characters");
        } else {
          clearError($input, $error);
        }
      } else if (type === "text" && $input.data("rule") === "name" && !validators.name(value)) {
        valid = false;
        setError($input, $error, "Please enter at least 2 characters");
      } else {
        clearError($input, $error);
      }

      return valid;
    }

    function setError($input, $error, message) {
      $input.addClass("has-error");
      $error.text(message).show();
    }

    function clearError($input, $error) {
      $input.removeClass("has-error");
      $error.hide();
    }
  });
});

