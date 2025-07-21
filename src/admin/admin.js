
function showOnlySection(sectionId) {
  $("#claimApprovalSection, #roleAssignSection, #claimListSection, #renewalListSection, #customerSection").addClass("admin_part_hidden");
  $(sectionId).removeClass("admin_part_hidden");
}

function renderSimpleTable(data, targetBody) {
  $(targetBody).empty();
  $.each(data, function (index, item) {
    $(targetBody).append(`
      <tr>
        <td>${index + 1}</td>
        <td>${item.customerId}</td>
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
  $.each(data, function (index, agent) {
    const row = `
      <tr>
        <td>${index + 1}</td>
        <td>${agent.agentId}</td>
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

function renderClaims() {
  $("#claimTableBody").empty();
  $.each(claimRequestList, function (i, claim) {
    const row = `
            <tr>
              <td>${i + 1}</td>
              <td>${claim.customerId}</td>
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

function resetForm() {
  $("#agentName").val("");
  $("#agentRole").val("Agent");
  $("#agentDistricts").val([]);
  $("#formTitle").text("Add New Agent");
  $("#btnAddAgent").text("Add");
  editIndex = -1;
}

function renumberSNo(section) {
  $(section).each(function (index) {
    $(this)
      .find("td")
      .eq(0)
      .text(index + 1);
  });
}

function renderCustomerList() {
  $("#customerBody").empty();
  $.each(customers, function (index, customer) {
    $("#customerBody").append(`
          <tr>
            <td>${index + 1}</td>
            <td contenteditable="false">${customer.name}</td>
            <td >${customer.id}</td>
            <td contenteditable="false">${customer.mail}</td>
            <td contenteditable="false">${customer.mobile}</td>
            <td contenteditable="false">${customer.address}</td>
            <td>
              <button class="btn btn-sm btn-warning editBtn">Edit</button>
              <button class="btn btn-sm btn-danger deleteBtn">Delete</button>
            </td>
          </tr>
        `);
  });
}

$(document).ready(function () {
  if (user_mode === "Agent") {
    $("#btnRoleAssign").hide();
  }

  // Claim approval btn
  $("#btnClaimApproval").click(function () {
    showOnlySection("#claimApprovalSection");
    renderClaims();
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

  // customer List Button
  $("#CustomerList").click(function () {
    showOnlySection("#customerSection");
    renderCustomerList();
  });

  // Role assign Button
  $("#btnRoleAssign").click(function () {
    showOnlySection("#roleAssignSection");
    renderAgentsTable(AgentsList);
  });

  $("#btnAddAgentForm").click(function () {
    resetForm();
    $("#addAgentForm").toggleClass("admin_part_hidden");

    $("html, body").animate(
      {
        scrollTop: $("#addAgentForm").offset().top,
      },
      600
    );
  });

  //-------------------------------------------------------------------claim approval section----------------------------------------

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

  //-------------------------------------------------------------------customer edit/delete section----------------------------------------
  $("#customerBody").on("click", ".editBtn", function () {
    const row = $(this).closest("tr");
    row
      .find("td")
      .filter((i) => [1, 3, 4, 5].includes(i))
      .attr("contenteditable", true)
      .addClass("table-warning");
    $(this).text("Save").removeClass("btn-warning").addClass("btn-success").addClass("saveBtn").removeClass("editBtn");
  });

  $("#customerBody").on("click", ".saveBtn", function () {
    const row = $(this).closest("tr");
    row
      .find("td")
      .filter((i) => [1, 3, 4, 5].includes(i))
      .attr("contenteditable", false)
      .removeClass("table-warning");
    $(this).text("Edit").removeClass("btn-success").addClass("btn-warning").addClass("editBtn").removeClass("saveBtn");
  });

  $("#customerBody").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
    renumberSNo("#customerBody tr");
  });

  //-------------------------------------------------------------------add agents section----------------------------------------
  // Inject options into #agentDistricts

  let editIndex = -1;

  $.each(districtOptions, function (i, district) {
    $("#agentDistricts").append(`<option value="${district}">${district}</option>`);
  });
  $("#agentForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#agentName").val();
    const role = $("#agentRole").val();
    const districts = $("#agentDistricts").val();

    const districtText = districts.join(", ");

    if (editIndex === -1) {
      const rowCount = $("#agentTable tbody tr").length + 1;
      const newRow = `
            <tr>
              <td>${rowCount}</td>
              <td>AG000${rowCount}</td>
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
      row.find("td").eq(2).text(name);
      row.find("td").eq(3).text(role);
      row.find("td").eq(4).text(districtText);
      editIndex = -1;
    }

    resetForm();
    $("#addAgentForm").addClass("admin_part_hidden");
  });

  $("#agentTable").on("click", ".editBtn", function () {
    const row = $(this).closest("tr");
    editIndex = row.index();
    const name = row.find("td").eq(2).text();
    const role = row.find("td").eq(3).text();
    const districts = row
      .find("td")
      .eq(4)
      .text()
      .split(",")
      .map((d) => d.trim());

    $("#agentName").val(name);
    $("#agentRole").val(role);
    $("#agentDistricts").val(districts);
    $("#formTitle").text("Edit Agent");
    $("#btnAddAgent").text("Update");
    $("#addAgentForm").removeClass("admin_part_hidden");

    $("html, body").animate(
      {
        scrollTop: $("#addAgentForm").offset().top,
      },
      600
    );
  });

  $("#agentTable").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
    renumberSNo("#agentTable tbody tr");
  });
});
