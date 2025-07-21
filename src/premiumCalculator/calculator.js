
  
  $(document).ready(function () {
    $('#years').val(1); // Default year

    
  $('#premiumForm').on('submit', function (e) {
    e.preventDefault();

    const years = parseInt($('#years').val()) || 1;

    // Update each plan's total amount
    $('#plansSection .col-md-6').each(function () {
      const monthlyText = $(this).find('.fw-bold').last().text(); // e.g., "₹167/month"
      const premiumAmount = parseInt(monthlyText.replace(/[^\d]/g, ''));
      const totalAmount = (premiumAmount/10)  * years ;

      // Replace the amount text with "Total Amount: ₹XXXX"
      $(this).find('.btn').text(`${totalAmount}`);
    });

    $('#plansSection').slideDown('slow');
  });


    $('#plansSection .btn').on('click', function () {
      
      const planName = $(this).closest('.col-md-6').find('.fw-bold').first().text();
      const pAmount = parseInt($(this).closest('.col-md-6').find('.fw-bold').last().text().replace(/[^\d]/g, ''));
      const years = parseInt($('#years').val());

      const totalAmount =( pAmount/10 ) * years  ;
      const gst = Math.round(totalAmount * 0.18);
      const totalPayable = totalAmount + gst;

      // Fill vehicle info
      $('#vehicleNameDisplay').text($('#model').val());
      $('#vehicleNoDisplay').text($('#vehicleNo').val());
      $('#yearDisplay').text($('#year').val());

      // Fill plan info
      $('#selectedPlanDisplay').text(planName);
      $('#planYearsDisplay').text(`${years} Years`);
      $('#planAmountDisplay').text(`IDV: ₹${pAmount}`);

      // Premium details
      $('#premiumAmountDisplay').text(totalAmount);
      $('#gstDisplay').text(gst);
      $('#totalPayableDisplay').text(totalPayable);

      $('#ownerModal').modal('show');
    });

    $('#ownerModal').on('show.bs.modal', function () {
      $('.container').css('filter', 'blur(4px)');
    });

    $('#ownerModal').on('hidden.bs.modal', function () {
      $('.container').css('filter', 'none');
    });

    $('#paymentmethod').on('submit', function (e) {
      e.preventDefault();
      $('#successAlert').fadeIn();
      const form=this;
      setTimeout(function () {
        form.submit();
        $('#successAlert').fadeOut();
        $('#ownerModal').modal('hide');
        $('#plansSection').hide();


        // Clear form inputs
        $('#premiumForm')[0].reset();
        $('.container').css('filter', 'none');
      }, 1500);
    });
  });
