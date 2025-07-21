$(document).ready(function () {
  $("#browseBtn").click(function () {
    $("#licenseFile").click();
  });

  // Show selected file name
  $("#licenseFile").change(function () {
    const fileName = $(this).val().split("\\").pop();
    $("#licenseFileName").val(fileName);
  });

  // Real-time password match validation
  $("#confirmPassword").on("input", function () {
    const password = $("#password").val();
    const confirmPassword = $(this).val();

    if (confirmPassword === password && confirmPassword !== "") {
      $(this).removeClass("is-invalid").addClass("is-valid");
      $("#passwordMatchFeedback").hide();
      $("#passwordMatchIcon").show();
    } else {
      $(this).removeClass("is-valid").addClass("is-invalid");
      $("#passwordMatchFeedback").show();
      $("#passwordMatchIcon").hide();
    }
  });

  // Form submission
  $("#signUpForm").on("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    const formArray = $(this).serializeArray();
    const jsonData = {};

    $.each(formArray, function (_, field) {
      jsonData[field.name] = field.value;
    });

    // Add license file name manually
    jsonData.licenseFile = $("#licenseFileName").val();

    // Password match check
    if (jsonData.password !== jsonData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

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
