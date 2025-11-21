document.addEventListener("DOMContentLoaded", () => {
  if (!window.jQuery) return;

  const $ = window.jQuery;

  $(".dashboard-filter").on("change", "select", function () {
    const $select = $(this);
    const value = $select.val();
    const target = $select.data("target");

    if (!target) return;

    $(`${target} [data-filtered]`).each(function () {
      const $item = $(this);
      const match = $item.data("filter") === value || value === "all";
      $item.toggle(match);
    });
  });

  $("[data-toggle-quickview]").on("click", function () {
    const target = $(this).data("toggle-quickview");
    $(target).toggleClass("is-open");
  });

  $(".message-card").on("click", "[data-reply]", function () {
    const $btn = $(this);
    const $form = $btn.closest(".message-card").find("form");
    $form.toggleClass("is-open").slideToggle(180);
  });

  $(".profile-form").on("submit", function (evt) {
    evt.preventDefault();
    const $form = $(this);
    const $button = $form.find("button[type='submit']");
    const data = $form.serialize();

    $button.prop("disabled", true).text("Saving…");

    $.ajax({
      url: "https://httpbin.org/post",
      method: "POST",
      data,
    })
      .done(() => {
        $button.text("Saved!");
        setTimeout(() => $button.text("Save Changes"), 1800);
      })
      .fail(() => {
        $button.text("Try Again");
      })
      .always(() => {
        setTimeout(() => $button.prop("disabled", false), 1400);
      });
  });
});

