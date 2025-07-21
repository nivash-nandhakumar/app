 let renewalCount = 0;
  const validPolicyIds = ['P1001', 'P1002', 'P1003']; // Simulated valid IDs

  $('#renewal_policyId').on('input', function () {
    const policyId = $(this).val().trim();
    if (validPolicyIds.includes(policyId)) {
      $('#expiryDate').val('2025-12-31'); // Simulated expiry date
      $('#policyError').hide();
    } else {
      $('#expiryDate').val('');
      $('#policyError').show();
    }
  });

  $('#extendPeriod, #package').on('input change', function () {
    const years = parseInt($('#extendPeriod').val());
    const packageRate = parseFloat($('#package').val());

    if (years > 0 && packageRate > 0) {
      const planAmount = years * packageRate;
      const gstAmount = planAmount * 0.18;
      const totalPremium = planAmount + gstAmount;

      $('#planAmount').text(planAmount.toFixed(2));
      $('#gstAmount').text(gstAmount.toFixed(2));
      $('#totalPremium').text(totalPremium.toFixed(2));
      $('#paymentDetails').removeClass('d-none');
    } else {
      $('#paymentDetails').addClass('d-none');
    }
  });

  $('#renewForm').on('submit', function (e) {
  e.preventDefault();

  const policyId = $('#renewal_policyId').val().trim();
  const expiryDate = $('#expiryDate').val();
  const years = parseInt($('#extendPeriod').val());
  const packageRate = parseFloat($('#package').val());
  const packageName = $(this).find('option:selected').text().split(' ')[0];


  if (!validPolicyIds.includes(policyId)) {
    $('#policyError').show();
    return;
  }

  const planAmount = years * packageRate;
  const gstAmount = planAmount * 0.18;
  const totalPremium = planAmount + gstAmount;
  const expiryYear = new Date(expiryDate).getFullYear() + years;

  renewalCount++;
  const renewalId = 'R' + String(renewalCount).padStart(3, '0');
  const renewalDate = new Date().toISOString().split('T')[0];

  $('#renewalTable tbody').append(`
    <tr>
      <td>${renewalCount}</td>
      <td>${renewalId}</td>
      <td>${policyId}</td>
      <td>${renewalDate}</td>
      <td>₹${totalPremium.toFixed(2)}</td>
      <td>${expiryYear}</td>
    </tr>
  `);

  // Return form data as JSON
  const formData = {
    renewalId: renewalId,
    policyId: policyId,
    renewalDate: renewalDate,
    expiryDate: expiryDate,
    extendPeriod: years,
    packageName:packageName,
    packageRate: packageRate,
    planAmount: planAmount.toFixed(2),
    gstAmount: gstAmount.toFixed(2),
    totalPremium: totalPremium.toFixed(2),
    expiryYear: expiryYear
  };

  console.log("Form submitted as JSON:", JSON.stringify(formData, null, 2));

  // Show toast
  const toast = new bootstrap.Toast($('#successToast'));
  toast.show();

  // Reset form
  this.reset();
  $('#expiryDate').val('');
  $('#paymentDetails').addClass('d-none');
  $('#policyError').hide();
});
