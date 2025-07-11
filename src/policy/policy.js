$(document).ready(function() {
  $('#update-policy-form').submit(function(e) {
    var policyNumber = $('#policy-number').val().trim();
    var email = $('#email').val().trim();
    var emailPattern = /^[^ ]+@[^ ]+\\.[a-z]{2,3}$/;

    if (policyNumber === "") {
      alert("Policy number is required.");
      e.preventDefault();
      return false;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      e.preventDefault();
      return false;
    }

    alert("Policy information submitted successfully!");
    return true;
  });

  $('#add-policy-form').submit(function(e) {
    var owner = $('#owner-name').val().trim();
    var vehicle = $('#vehicle-info').val().trim();
    var coverage = $('#coverage-type').val();

    if (owner === "" || vehicle === "" || coverage === "") {
      alert("All fields are required for adding a new policy.");
      e.preventDefault();
      return false;
    }

    alert("New policy submitted successfully!");
    return true;
  });
});