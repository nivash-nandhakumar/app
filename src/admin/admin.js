let editIndex = -1;
// const user_mode = "Admin"; // change this to "Agent" to test role-based visibility

const claimRequestList = [
  { claimId: "CL001", policyId: "POL123", amount: "₹50,000", date: "2025-07-15", status: "Pending",},
  { claimId: "CL002", policyId: "POL456", amount: "₹70,000", date: "2025-07-18", status: "Pending",},
  { claimId: "CL003", policyId: "POL789", amount: "₹35,000", date: "2025-07-20", status: "Pending",},
];

const AgentsList = [
  { name: "Aarav", role: "Agent", districts: ["Hyderabad", "Warangal", "Khammam"] },
  { name: "Meera", role: "Manager", districts: ["Nizamabad", "Karimnagar", "Khammam"] },
  { name: "Rohan", role: "Agent", districts: ["Hyderabad", "Nizamabad", "Karimnagar"] },
  { name: "Sanya", role: "Manager", districts: ["Warangal", "Khammam", "Karimnagar"] },
  { name: "Kunal", role: "Agent", districts: ["Hyderabad", "Warangal", "Nizamabad", "Khammam"] },
  { name: "Neha", role: "Manager", districts: ["Karimnagar", "Khammam", "Hyderabad"] },
  { name: "Vihaan", role: "Agent", districts: ["Warangal", "Nizamabad", "Karimnagar"] },
  { name: "Tanya", role: "Manager", districts: ["Khammam", "Hyderabad", "Warangal"] },
  { name: "Aditya", role: "Agent", districts: ["Karimnagar", "Hyderabad", "Nizamabad"] },
  { name: "Isha", role: "Manager", districts: ["Warangal", "Nizamabad", "Khammam", "Karimnagar"] }
];

const claimList = [
  { claimId: "CL001", policyId: "POL101", amount: "₹45,000", date: "2025-07-01", status: "Approved" },
  { claimId: "CL002", policyId: "POL102", amount: "₹38,000", date: "2025-07-02", status: "Pending" },
  { claimId: "CL003", policyId: "POL103", amount: "₹52,500", date: "2025-07-03", status: "Rejected" },
  { claimId: "CL004", policyId: "POL104", amount: "₹60,000", date: "2025-07-04", status: "Approved" },
  { claimId: "CL005", policyId: "POL105", amount: "₹25,000", date: "2025-07-05", status: "Under Review" },
  { claimId: "CL006", policyId: "POL106", amount: "₹41,000", date: "2025-07-06", status: "Pending" },
  { claimId: "CL007", policyId: "POL107", amount: "₹33,300", date: "2025-07-07", status: "Completed" },
  { claimId: "CL008", policyId: "POL108", amount: "₹47,800", date: "2025-07-08", status: "Approved" },
  { claimId: "CL009", policyId: "POL109", amount: "₹29,000", date: "2025-07-09", status: "Rejected" },
  { claimId: "CL010", policyId: "POL110", amount: "₹55,000", date: "2025-07-10", status: "Submitted" },
];

const RenewalList = [
  { renewalId: "RN001", policyId: "POL201", renewalDate: "2025-07-01", newPremium: "₹12,000", expiryYear: 2026 },
  { renewalId: "RN002", policyId: "POL202", renewalDate: "2025-07-02", newPremium: "₹15,500", expiryYear: 2026 },
  { renewalId: "RN003", policyId: "POL203", renewalDate: "2025-07-03", newPremium: "₹10,800", expiryYear: 2026 },
  { renewalId: "RN004", policyId: "POL204", renewalDate: "2025-07-04", newPremium: "₹13,200", expiryYear: 2026 },
  { renewalId: "RN005", policyId: "POL205", renewalDate: "2025-07-05", newPremium: "₹14,000", expiryYear: 2026 },
  { renewalId: "RN006", policyId: "POL206", renewalDate: "2025-07-06", newPremium: "₹11,250", expiryYear: 2026 },
  { renewalId: "RN007", policyId: "POL207", renewalDate: "2025-07-07", newPremium: "₹12,750", expiryYear: 2026 },
  { renewalId: "RN008", policyId: "POL208", renewalDate: "2025-07-08", newPremium: "₹16,000", expiryYear: 2026 },
  { renewalId: "RN009", policyId: "POL209", renewalDate: "2025-07-09", newPremium: "₹13,750", expiryYear: 2026 },
  { renewalId: "RN010", policyId: "POL210", renewalDate: "2025-07-10", newPremium: "₹15,000", expiryYear: 2026 },
];

const districtOptions = ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"];

function showOnlySection(sectionId) {
  $("#claimApprovalSection, #roleAssignSection, #claimListSection, #renewalListSection").addClass("admin_part_hidden");
  $(sectionId).removeClass("admin_part_hidden");
}

function renderSimpleTable(data, targetBody) {
  $(targetBody).empty();
  $.each(data, function (index, item) {
    $(targetBody).append(`
      <tr>
        <td>${index + 1}</td>
        <td>${targetBody === "#claimListTableBody" ? item.claimId : item.renewalId}</td>
        <td>${item.policyId}</td>
        <td>${targetBody === "#claimListTableBody" ? item.amount : item.renewalDate}</td>
        <td>${targetBody === "#claimListTableBody" ? item.date : item.newPremium}</td>
        <td>${targetBody === "#claimListTableBody" ? (item.status === "Pending" ? "⏳ Awaiting Review" : item.status) : item.expiryYear}</td>
      </tr>
    `);
  });
}

function renderAgentsTable(data) {
  $("#agentTable tbody").empty();
  $.each(data, function(index, agent) {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${agent.name}</td>
        <td>${agent.role}</td>
        <td>${agent.districts.join(", ")}</td>
        <td>
          <button class="btn btn-sm btn-warning editBtn">Edit</button>
          <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
        </td>
      </tr>`;
    $("#agentTable tbody").append(row);
  });
}

$(document).ready(function () {
  if (user_mode === "Agent") {
    $("#btnRoleAssign").hide();
  }


  // Claim approval
  $("#btnClaimApproval").click(function () {
    showOnlySection("#claimApprovalSection");
    renderClaims();
  });

  // Role assign Button
  $("#btnRoleAssign").click(function () {
     showOnlySection("#roleAssignSection");
     renderAgentsTable(AgentsList);
  });

  // Claim List Button
  $("#btnClaimList").click(function () {
    showOnlySection("#claimListSection");
    renderSimpleTable(claimList, "#claimListTableBody");
  });

  // Renewal List Button
  $("#btnRenewalList").click(function () {
    showOnlySection("#renewalListSection");
    renderSimpleTable(RenewalList, "#renewalListTableBody");
  });

  $("#btnAddAgentForm").click(function () {
    resetForm();
    $("#addAgentForm").toggleClass("admin_part_hidden");
  });

  // Inject options into #agentDistricts
  $.each(districtOptions, function (i, district) {
    $("#agentDistricts").append(`<option value="${district}">${district}</option>`);
  });

  $("#btnAddAgent").click(function () {
    const name = $("#agentName").val();
    const role = $("#agentRole").val();
    const districts = $("#agentDistricts").val();

    console.log("Agent Name:", name);
    console.log("Role:", role);
    console.log("Districts:", districts);

    if (!name || !role || districts.length === 0) {
      alert("Please fill all fields");
      return;
    }

    const districtText = districts.join(", ");

    if (editIndex === -1) {
      const rowCount = $("#agentTable tbody tr").length + 1;
      const newRow = `
            <tr>
              <td>${rowCount}</td>
              <td>${name}</td>
              <td>${role}</td>
              <td>${districtText}</td>
              <td>
                <button class="btn btn-sm btn-warning editBtn">Edit</button>
                <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
              </td>
            </tr>`;
      $("#agentTable tbody").append(newRow);
    } else {
      const row = $("#agentTable tbody tr").eq(editIndex);
      row.find("td").eq(1).text(name);
      row.find("td").eq(2).text(role);
      row.find("td").eq(3).text(districtText);
      editIndex = -1;
    }

    resetForm();
    $("#addAgentForm").addClass("admin_part_hidden");
  });

  $("#agentTable").on("click", ".editBtn", function () {
    const row = $(this).closest("tr");
    editIndex = row.index();
    const name = row.find("td").eq(1).text();
    const role = row.find("td").eq(2).text();
    const districts = row
      .find("td")
      .eq(3)
      .text()
      .split(",")
      .map((d) => d.trim());

    $("#agentName").val(name);
    $("#agentRole").val(role);
    $("#agentDistricts").val(districts);
    $("#formTitle").text("Edit Agent");
    $("#btnAddAgent").text("Update");
    $("#addAgentForm").removeClass("admin_part_hidden");

    $("html, body").animate({
    scrollTop: $("#addAgentForm").offset().top
  }, 600);
  });

  $("#agentTable").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
    renumberAgents();
  });

  $("#claimApprovalSection").on("click", ".submitClaimBtn", function () {
    const row = $(this).closest("tr");
    const action = row.find(".actionSelect").val();

    if (!action) {
      alert("Please select an action before submitting.");
      return;
    }

    row.find("td").eq(5).text("Completed"); // status column
    row.find(".actionSelect").prop("disabled", true);
    $(this).prop("disabled", true);
  });

  function resetForm() {
    $("#agentName").val("");
    $("#agentRole").val("Agent");
    $("#agentDistricts").val([]);
    $("#formTitle").text("Add New Agent");
    $("#btnAddAgent").text("Add");
    editIndex = -1;
  }

  function renumberAgents() {
    $("#agentTable tbody tr").each(function (index) {
      $(this)
        .find("td")
        .eq(0)
        .text(index + 1);
    });
  }

  function renderClaims() {
    $("#claimTableBody").empty();
    $.each(claimRequestList, function (i, claim) {
      const row = `
            <tr>
              <td>${i + 1}</td>
              <td>${claim.claimId}</td>
              <td>${claim.policyId}</td>
              <td>${claim.amount}</td>
              <td>${claim.date}</td>
              <td>${claim.status}</td>
              <td>
                <select class="form-select actionSelect">
                  <option value="">Select</option>
                  <option value="Accept">Accept</option>
                  <option value="Reject">Reject</option>
                </select>
              </td>
              <td>
                <input type="text" class="form-control" placeholder="Enter remark" />
              </td>
              <td>
                <button class="btn btn-sm btn-success submitClaimBtn">Submit</button>
              </td>
            </tr>`;
      $("#claimTableBody").append(row);
    });
  }
});
