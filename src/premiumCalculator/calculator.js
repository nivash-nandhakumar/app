
    $('#premiumForm').on('submit', function(e) {
      e.preventDefault();

      const vehicleAge = parseInt($('#vehicleAge').val());
      const cubicCapacity = parseInt($('#cubicCapacity').val());
      const ownerAge = parseInt($('#ownerAge').val());
      const drivingExperience = parseInt($('#drivingExperience').val());
      const ownerName = $('#ownerName').val();

      // Basic premium calculation logic
      let premium = 5000 + (vehicleAge * 100) + (cubicCapacity * 0.5) - (drivingExperience * 50) + (ownerAge * 20);
      $('#premiumAmount').text(premium.toFixed(2));
      $('#ownerDisplay').text(ownerName);
      $('#result').show();
    });
  