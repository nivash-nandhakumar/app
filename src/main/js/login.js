$(document).ready(function () {
  const loginForm = $('#loginForm')[0]; // get raw DOM form

  $('#loginForm').on('submit', function (e) {
    e.preventDefault();  // stop form from submitting
    e.stopPropagation(); // prevent bubbling

    if (loginForm.checkValidity()) {
      const username = $('#username').val();
      const password = $('#password').val();

      console.log("Username:", username);
      console.log("Password:", password);

      $('#loginModal').modal('hide');
     clearValue();

    } else {
      this.classList.add('was-validated'); // show validation errors
    }
  });
});

function clearValue() {
  console.log('first------------------------->');

  // Reset the entire form (this resets fields and removes built-in validation states)
  $('#loginForm')[0].reset(); // Get raw DOM element and call .reset()

  // Optionally clear individual fields again (though reset already does this)
  $('#username').val('');
  $('#password').val('');

  // Remove validation styling
  $('#loginForm').removeClass('was-validated');
}

