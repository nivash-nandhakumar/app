$(document).ready(function () {
  // Load modular content
  $("#header").load("header.html");
  $("#footer").load("footer.html");
  $("#home").load("../home/home.html");
});


// Delegate click event to dynamically loaded About Us button

// $(document).on("click", "#homeBtn", function () {
//   $("#home").show();
//   $("#aboutUs").hide();
//   $("#contact").hide();
// });


// $(document).on("click", "#aboutUsBtn", function () {
//   $("#aboutUs").show();
//   $("#home").hide();
//   $("#contact").hide();
// });


// $(document).on("click", "#contactBtn", function () {
//   $("#contact").show();
//   $("#aboutUs").hide();
//   $("#home").hide();
// });

