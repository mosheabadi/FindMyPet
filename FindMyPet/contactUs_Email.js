
 $(document).ready(function() {
    $('#contact-form').submit(function(e) {
      var fullName    = document.getElementById('fullName')
      var email   = document.getElementById('email')
      var phone = document.getElementById('phone')
      var message = document.getElementById('message')

      if (!fullName.value || !email.value || !phone.value || !message.value) {
        alertify.error("Please check your entries");
        return false;
      } else {
        $.ajax({
          method: 'POST',
          url: '//formspree.io/findmypetservice@gmail.com',
          data: $('#contact-form').serialize(),
          datatype: 'json'
        });
        e.preventDefault();
        $(this).get(0).reset();
        alertify.success("Message sent");
      }
    });
  });


 