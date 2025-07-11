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

      $('#loginModal').modal('hide'); // hide only if valid
    } else {
      this.classList.add('was-validated'); // show validation errors
    }
  });
});