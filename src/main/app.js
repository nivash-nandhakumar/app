$(document).ready(function () {
  // Load modular content
  $("#header").load("header.html");
  $("#footer").load("footer.html");
  $("#home").load("../home/home.html");
  $("#policy").load("../policy/policy.html").hide();
  $("#claim").load("../claim/claim.html").hide();
  $("#renewal").load("../renewal/renewal.html").hide();
  $("#calculator").load("../premiumCalculator/calculator.html").hide();
  $("#about").load("../about/about.html").hide();
  $("#contact_us").load("../about/contact_us.html").hide();
});


$(document).on("click", "#homeBtn", function () {
  $("#home").show();
  $("#policy, #claim, #renewal, #calculator").hide();
});

$(document).on("click", "#policyBtn", function () {
  $("#policy").show();
  $("#home, #claim, #renewal, #calculator").hide();
});

$(document).on("click", "#claimBtn", function () {
  $("#claim").show();
  $("#home, #policy, #renewal, #calculator").hide();
});

$(document).on("click", "#renewalBtn", function () {
  $("#renewal").show();
  $("#home, #policy, #claim, #calculator").hide();
});

$(document).on("click", "#calculatorBtn", function () {
  $("#calculator").show();
  $("#home, #policy, #claim, #renewal").hide();
});

$(document).on("click", "#aboutBtn", function () {
  $("#about").show();
  $("#home, #policy, #claim, #renewal, #calculator").hide();
});

$(document).on("click", "#contactBtn", function () {
  $("#contact_us").show();
  $("#home, #policy, #claim, #renewal, #calculator").hide();
});
 
