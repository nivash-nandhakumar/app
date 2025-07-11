$(document).ready(function () {
      $('#initiateRenewal').click(function () {
        alert('Renewal process initiated!');
      });

      $('.updateStatus').click(function () {
        const row = $(this).closest('tr');
        row.find('td:eq(4)').html('<span class="badge bg-success">Completed</span>');
        $(this).text('Completed').removeClass('btn-success').addClass('btn-secondary').prop('disabled', true);
      });
    });