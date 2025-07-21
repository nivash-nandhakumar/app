
let editIndex = -1;

$(document).ready(function () {

  console.log("user_mode--------->", user_mode)
  // Show/hide Role Assign button
    if (user_mode === "Agent") {
      $("#btnRoleAssign").hide();
    } else {
      $("#btnRoleAssign").show();
    }

  // Hide Role Assign button if user is Agent
  if (user_mode === "Agent") {
    $("#btnRoleAssign").hide();
  }

  // Toggle sections
  $("#btnClaimApproval").click(function () {
    $("#claimApprovalSection").removeClass("admin_part_hidden");
    $("#roleAssignSection").addClass("admin_part_hidden");
  });

  $("#btnRoleAssign").click(function () {
    $("#roleAssignSection").removeClass("admin_part_hidden");
    $("#claimApprovalSection").addClass("admin_part_hidden");
  });

  // Toggle agent form
  $("#btnAddAgentForm").click(function () {
    resetForm();
    $("#addAgentForm").toggleClass("admin_part_hidden");
  });

  // Add or update agent
  $("#btnAddAgent").click(function () {
    const name = $("#agentName").val();
    const role = $("#agentRole").val();
    const districts = $("#agentDistricts").val();

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

  // Edit agent
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
  });

  // Delete agent
  $("#agentTable").on("click", ".deleteBtn", function () {
    $(this).closest("tr").remove();
    renumberAgents();
  });

  // Submit claim action
  $("#claimApprovalSection").on("click", ".submitClaimBtn", function () {
    const row = $(this).closest("tr");
    const action = row.find(".actionSelect").val();

    if (!action) {
      alert("Please select an action before submitting.");
      return;
    }

    row.find("td").eq(5).text("Completed"); // Status column
    row.find(".actionSelect").prop("disabled", true);
    $(this).prop("disabled", true);
  });

  // Reset agent form
  function resetForm() {
    $("#agentName").val("");
    $("#agentRole").val("Agent");
    $("#agentDistricts").val([]);
    $("#formTitle").text("Add New Agent");
    $("#btnAddAgent").text("Add");
    editIndex = -1;
  }

  // Renumber agent table after deletion
  function renumberAgents() {
    $("#agentTable tbody tr").each(function (index) {
      $(this)
        .find("td")
        .eq(0)
        .text(index + 1);
    });
  }
});
