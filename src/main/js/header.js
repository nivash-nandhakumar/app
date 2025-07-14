$(document).ready(function () {
  function activateTab(tabName) {
    // Remove active class from all tabs and sections
    $(".nav-link").removeClass("active");
    $(".tab-section").removeClass("active");

    // Add active class to selected tab and section
    $(`.nav-link[data-tab="${tabName}"]`).addClass("active");
    $(`.tab-section[data-content="${tabName}"]`).addClass("active");
  }

  // Initial tab
  activateTab("home");

  // Tab click handler
  $(".nav-link").on("click", function () {
    const tabName = $(this).data("tab");
    console.log(tabName,"-------------------------------->")
    activateTab(tabName);
  });
});