$(document).ready(function () {
  let claimCounter = 1;

  // Dummy policy list with key-value pairs
  const policyList = {
    POL1001: 5000,
    POL1002: 7500,
    POL1003: 10000,
    POL1004: 12000,
    POL1005: 15000,
  };

  // Dynamically populate the select options
  $.each(policyList, function (policyId, amount) {
    $("#claim_policyId").append(`<option value="${policyId}">${policyId}</option>`);
  });

  // Auto-fill claim amount based on selected policy
  $("#claim_policyId").on("change", function () {
    const selectedPolicy = $(this).val();
    const amount = policyList[selectedPolicy] || "";
    $("#claimAmount").val(amount);
  });

  $("#claim_browseBtn").click(function () {
    $("#proofFile").click();
  });

  // Show selected file name
  $("#proofFile").change(function () {
    const fileName = $(this).val().split("\\").pop();
    $("#proofFile_name").val(fileName);
  });

  // Handle form submission
  $("#claimForm").on("submit", function (e) {
    e.preventDefault();

    const policyId = $("#claim_policyId").val();
    const claimAmount = $("#claimAmount").val();
    const reason = $("#reason").val();
    const proof = $("#proofFile_name").val();
    const date = new Date().toLocaleDateString();

    // Console log details
    console.log("Policy ID:", policyId);
    console.log("Claim Amount:", claimAmount);
    console.log("Reason:", reason);
    console.log("Proof File:", proof);

    // Append new row to the table
    $("#claimTable tbody").append(`
            <tr>
                <td>${claimCounter++}</td>
                <td>${policyId}</td>
                <td>${claimAmount}</td>
                <td>${date}</td>
                <td>Pending</td>
            </tr>
        `);

    // Reset form
    this.reset();
    $("#claimAmount").val("");
  });
});
