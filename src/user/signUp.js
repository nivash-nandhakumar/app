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
  $("#signUpForm").on("submit", async function (e) {
    e.preventDefault(); // Prevent form submission

    const submitBtn = $("#signUpSubmitBtn");
    const originalText = submitBtn.html();
    
    try {
      showLoading("signUpSubmitBtn");
      
      const formArray = $(this).serializeArray();
      const signupData = {};

      $.each(formArray, function (_, field) {
        signupData[field.name] = field.value;
      });

      // Set default role as USER
      signupData.role = "USER";
      
      console.log("Attempting signup with:", signupData);

      // Call backend signup API
      const response = await ApiClient.post(API_CONFIG.ENDPOINTS.SIGNUP, signupData);
      
      if (response.success) {
        // Store user data and login state
        localStorage.setItem("user", JSON.stringify(response.user));
        localStorage.setItem("userMode", JSON.stringify(response.user.role));
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        
        // Update global variables
        isLoggedIn = true;
        user_mode = response.user.role;
        
        showSuccess("Account created successfully! Redirecting...");
        
        // Reset the form
        this.reset();
        
        // Close the modal
        const modalElement = $("#customModal")[0];
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        modalInstance.hide();
        
        // Reload page after short delay
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        
      } else {
        showError(response.message || "Signup failed");
      }
      
    } catch (error) {
      console.error("Signup error:", error);
      showError("Signup failed: " + error.message);
    } finally {
      hideLoading("signUpSubmitBtn", originalText);
    }
  });
});
