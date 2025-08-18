$(document).ready(function() {
  // Load user policies on page load
  loadUserPolicies();

  $('#update-policy-form').submit(async function(e) {
    e.preventDefault();
    
    const submitBtn = $("#updatePolicyBtn");
    const originalText = submitBtn.html();
    
    try {
      showLoading("updatePolicyBtn");
      
      var policyNumber = $('#policy-number').val().trim();
      var email = $('#email').val().trim();
      var emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

      if (policyNumber === "") {
        showError("Policy number is required.");
        return false;
      }

      if (!emailPattern.test(email)) {
        showError("Please enter a valid email address.");
        return false;
      }

      // Get policy details from backend
      const policy = await ApiClient.get(API_CONFIG.ENDPOINTS.POLICIES + '/policy/' + policyNumber);
      
      if (policy) {
        showSuccess("Policy information retrieved successfully!");
        // You can populate form fields with policy data here
      }
      
    } catch (error) {
      console.error("Policy lookup error:", error);
      showError("Policy not found or error occurred: " + error.message);
    } finally {
      hideLoading("updatePolicyBtn", originalText);
    }
  });

  $('#add-policy-form').submit(async function(e) {
    e.preventDefault();
    
    const submitBtn = $("#addPolicyBtn");
    const originalText = submitBtn.html();
    
    try {
      showLoading("addPolicyBtn");
      
      var owner = $('#owner-name').val().trim();
      var vehicle = $('#vehicle-info').val().trim();
      var coverage = $('#coverage-type').val();
      var startDate = $('#start-date').val();
      var endDate = $('#end-date').val();
      var premiumAmount = $('#premium-amount').val();
      var coverageAmount = $('#coverage-amount').val();

      if (owner === "" || vehicle === "" || coverage === "") {
        showError("All fields are required for adding a new policy.");
        return false;
      }

      // Get current user data
      const currentUser = JSON.parse(localStorage.getItem("user"));
      if (!currentUser) {
        showError("Please login first to create a policy.");
        return false;
      }

      const policyData = {
        customerId: currentUser.customerId,
        vehicleType: coverage,
        vehicleNumber: vehicle,
        premiumAmount: premiumAmount || 5000,
        coverageAmount: coverageAmount || 100000,
        startDate: startDate || new Date().toISOString().split('T')[0],
        endDate: endDate || new Date(Date.now() + 365*24*60*60*1000).toISOString().split('T')[0]
      };

      // Call backend to create policy
      const response = await ApiClient.post(API_CONFIG.ENDPOINTS.POLICIES, policyData);
      
      if (response.success) {
        showSuccess("New policy created successfully!");
        this.reset();
        loadUserPolicies(); // Refresh policy list
      } else {
        showError(response.message || "Policy creation failed");
      }
      
    } catch (error) {
      console.error("Policy creation error:", error);
      showError("Policy creation failed: " + error.message);
    } finally {
      hideLoading("addPolicyBtn", originalText);
    }
  });
});

// Function to load user policies
async function loadUserPolicies() {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser || !currentUser.customerId) {
      return;
    }

    const policies = await ApiClient.get(API_CONFIG.ENDPOINTS.POLICIES_BY_CUSTOMER + '/' + currentUser.customerId);
    
    // Update policy display in UI
    displayPolicies(policies);
    
  } catch (error) {
    console.error("Error loading policies:", error);
  }
}

// Function to display policies in UI
function displayPolicies(policies) {
  const policyContainer = $("#policyListContainer");
  if (policyContainer.length === 0) return;
  
  policyContainer.empty();
  
  if (policies && policies.length > 0) {
    policies.forEach(policy => {
      const policyCard = `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Policy #${policy.policyId}</h5>
            <p class="card-text">
              <strong>Vehicle:</strong> ${policy.vehicleType} - ${policy.vehicleNumber}<br>
              <strong>Premium:</strong> ₹${policy.premiumAmount}<br>
              <strong>Coverage:</strong> ₹${policy.coverageAmount}<br>
              <strong>Valid:</strong> ${policy.startDate} to ${policy.endDate}
            </p>
          </div>
        </div>
      `;
      policyContainer.append(policyCard);
    });
  } else {
    policyContainer.html('<p class="text-muted">No policies found.</p>');
  }
}