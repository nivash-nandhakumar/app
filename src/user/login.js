$(document).ready(function () {
  $("#loginForm").on("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    console.log("-------------------------");

    const formArray = $(this).serializeArray();
    const jsonData = {};

    $.each(formArray, function (_, field) {
      jsonData[field.name] = field.value;
    });

    console.log("Form Data as JSON:", JSON.stringify(jsonData, null, 2));

    isLoggedIn = true;
    user_mode = formArray[2].value;
    localStorage.setItem("userMode", JSON.stringify(formArray[2].value));
    localStorage.setItem("isLoggedIn", JSON.stringify(true));
    window.location.reload();

    // Reset the form
    this.reset();
    // Blur the currently focused element
    $(document.activeElement).blur();

    // Close the modal using Bootstrap 5 API
    const modalElement = $("#customModal")[0]; // get DOM element from jQuery object
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
  });
});
