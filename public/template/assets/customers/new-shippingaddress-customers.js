$("#new-shipping-vosp").submit(function(e) {
e.preventDefault(); // avoid to execute the actual submit of the form.
$('#new-shipping').validate({ // initialize the plugin
      rules: {
          first_name: {
              required: true
          },
          last_name: {
              required: true
          },
          address: {
              required: true
          },
          mobile_number:{
            required:true,
            maxlength:13
          },
          province :{
            required: true
          },
          city :{
            required:true
          },
          district :{
            required: true
          },
          subdistrict: {
            required:true
          }
      },
  messages: {
    first_name:{
      required: 'The first name field is required.'
    },
    last_name : "The last name field is required.",
    mobile_number     : "The mobile number field is required.",
    address   :{ 
      required: "The address field is required."
    },
    // zipcode : "The zipcode field is required.",
    // telephone : "The kecamatan field is required.",
    // subdistrict : "The kelurahan field is required.",
    address: "The address field is required."
  },

})
   if($('#new-shipping').valid() == true){
        postnewshipping()
        $('#btncustomer').attr('disabled', true);
      }
});

$('[name="mobile_number"]').on('keypress', function(e){
return e.metaKey || // cmd/ctrl
  e.which <= 0 || // arrow keys
  e.which == 8 || // delete key
  /[0-9]/.test(String.fromCharCode(e.which)); // numbers
})
$('[name="telephone"]').on('keypress', function(e){
return e.metaKey || // cmd/ctrl
  e.which <= 0 || // arrow keys
  e.which == 8 || // delete key
  /[0-9]/.test(String.fromCharCode(e.which)); // numbers
})
$('[name="zipcode"]').on('keypress', function(e){
return e.metaKey || // cmd/ctrl
  e.which <= 0 || // arrow keys
  e.which == 8 || // delete key
  /[0-9]/.test(String.fromCharCode(e.which)); // numbers
})

$(document).ready(function(){

  $('#province_shipping').select2({
    placeholder: 'Choose Province',
    dropdownParent: $('#new-shipping-vosp')
  })

  $('#city_shipping').select2({
    placeholder: 'Choose City',
    dropdownParent: $('#new-shipping-vosp')
  })
  $('#district_shipping').select2({
    placeholder: 'Choose Kecamatan',
    dropdownParent: $('#new-shipping-vosp')
  })
  $('#subdistrict_shipping').select2({
    placeholder: 'Choose Kelurahan',
    dropdownParent: $('#new-shipping-vosp')
  })
})

