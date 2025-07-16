const cities = ["Hyderabad", "Mumbai", "Delhi", "Chennai", "Bangalore"];

// Populate city dropdown
$(document).ready(function () {
  $('#be_a_agent_city').append(`<option value="" disabled selected>Select a city</option>`);
  cities.forEach(function (city) {
    $("#be_a_agent_city").append(`<option value="${city}">${city}</option>`);
  });

  // Handle form submission
  $("#BecomeAnAgentForm").on("submit", function (e) {
    e.preventDefault();

    // Validate email format
    const email = $("#be_a_agent_email").val();
    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Collect form data
    const formData = {
      name: $("#be_a_agent_name").val(),
      dob: $("#be_a_agent_dob").val(),
      city: $("#be_a_agent_city").val(),
      mobile: $("#be_a_agent_mobile").val(),
      email: email,
    };

    // Display JSON
    console.log("Json Data--->", JSON.stringify(formData, null, 2))
  });
});
