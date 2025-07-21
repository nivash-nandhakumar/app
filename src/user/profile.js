function setAvatar(){
      $('#avatar').attr('src', defaultAvatar);
}

$(document).ready(function() {
      // Default avatar if none uploaded
      setAvatar()

      // Handle avatar upload
      $('#avatarUpload').on('change', function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            $('#avatar').attr('src', e.target.result);
            localStorage.setItem('avatar', JSON.stringify(e.target.result))
          };
          reader.readAsDataURL(file);
        }
      });
    });