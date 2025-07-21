function checkValidity(i, status){
if (status) {
    $(i).removeClass("is-invalid").addClass("is-valid");
    $("#passwordStrengthFeedback").hide();
    $("#passwordStrengthIcon").show();
  } else {
    $(i).removeClass("is-valid").addClass("is-invalid");
    $("#passwordStrengthFeedback").show();
    $("#passwordStrengthIcon").hide();
  }
}

$(document).ready(function () {


  $("#password").on("input", function () {
  const password = $(this).val();
  const isStrong = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(password);

  checkValidity(this, isStrong);
});

  // Real-time password match validation
  $("#confirmPassword").on("input", function () {
    const password = $("#password").val();
    const confirmPassword = $(this).val();

    checkValidity(this, confirmPassword === password && confirmPassword !== "");
  });

  // Form submission
  $("#signUpForm").on("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const formArray = $(this).serializeArray();
    const jsonData = {};

    $.each(formArray, function (_, field) {
      jsonData[field.name] = field.value;
    });

    console.log("Form Data as JSON:", JSON.stringify(jsonData, null, 2));

    isLoggedIn = true;
    user_mode = "User";
    localStorage.setItem("userMode", JSON.stringify("User"));
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
