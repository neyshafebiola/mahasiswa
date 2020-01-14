$(document).ready(function(){
  $('.form-outlet-name').hide()
  $('[name="province"]').select2({
    placeholder: 'Choose Province',
    dropdownParent: $('#new-customer-vosp')
  })
  $('[name="city"]').select2({
    placeholder: 'Choose City',
    dropdownParent: $('#new-customer-vosp')
  })
  $('[name="district"]').select2({
    placeholder: 'Choose Kecamatan',
    dropdownParent: $('#new-customer-vosp')
  })
  $('[name="subdistrict"]').select2({
    placeholder: 'Choose Kelurahan',
    dropdownParent: $('#new-customer-vosp')
  })

  $('[name="outlet_type"]').select2({
    placeholder: 'Choose Outlet Type',
    dropdownParent: $('#new-customer-vosp')
  })  
  $('[name="type_npwp"]').select2({
    placeholder: 'Choose NPWP Type',
    dropdownParent: $('#new-customer-vosp')
  })
  $('[name="stockpoint_id"]').select2({
    placeholder: 'Choose Stockpoint',
    dropdownParent: $('#new-customer-vosp')
  })
})
// Validasi
$("#new-customer-vosp").submit(function(e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.
  $('#new-cust').validate({ // initialize the plugin
        rules: {
            first_name: {
                required: true
            },
            lastname: {
                required: true
            },
            email: {
                required: true,
                email:true,
                customemail: true
            },
            idktp:{
              required: true,
              maxlength:16
            },
            no_hp:{
              required:true,
              maxlength:13
            },
            outlet_type:{
              required: true
            },
            // outlet_name: {
            //   required : true
            // },
            // telephone :{
            //   required: true,
            //   maxlength: 13
            // },
            province :{
              required : true
            },
            city: {
              required: true
            },
            district: {
              required: true
            },
            subdistrict: {
              required: true
            },
            type_npwp : {
              required: true
            },
            stockpoint_id :{
              required: true
            }
            // npwp_alamat: {
            //   required: true
            // }
            // npwp : {
            //   required: true
            // }

        },
    messages: {
      first_name:{
        required: 'The first name field is required.'
      },
      lastname : "The last name field is required.",
      email : {
        required: "The email field is required.",
        email: "Please enter valid email address"

      },
      no_hp : "The mobile number field is required.",
      province : "The province field is required.",
      city : "The city field is required.",
      district : "The kecamatan field is required.",
      subdistrict : "The kelurahan field is required.",
      alamat: "The address field is required.",
      stockpoint_id : "The Stockpoint is required"
    },
        // submitHandler: function (form) { // for demo
        //     // alert('valid form submitted'); // for demo
        //     return true; // for demo
        //     // form.submit();
        // }
  })
     if($('#new-cust').valid() == true){
          // var district    = $('[name="subdistrict"]').val();
          // xhr_getdataspCoverage('{{route("stockpoint.coverage")}}', 'spcoverage', district, 'post_newcustomer')
          post_newcustomer()
        }
  });

$.validator.addMethod('customemail', function(value, element) 
  {
    if(value != '')
    {
      console.log(value)
      // return  /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
      return  /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
    }
    else
    {
      return true
    }
}, "Please enter valid email address");

$(function() {
    $('#show-npwp').hide(); 
    $('#npwp_alamat').hide();
    $('#type_npwp').change(function(){
        if($('#type_npwp').val() == 'PKP') {
            $('#show-npwp').show(); 
            $('#npwp_alamat').show();
            $('#npwp_alamat .form-group').addClass('required')
            $('#show-npwp .form-group').addClass('required')
            $('#show-npwp input').prop('required', true)
            $('#npwp_alamat textarea').prop('required', true)

        } else {
            $('#show-npwp').hide();
            $('#npwp_alamat').hide(); 
            $('#npwp_alamat .form-group').removeClass('required')
            $('#show-npwp').removeClass('required')
            $('#npwp_alamat textarea').prop('required', false)
            $('#show-npwp input').prop('required', false)
            $('#new-cust').valid()
        } 
    });
});

$('.outlet-type').change(function() {
  if($('.outlet-type').val() == '1') {
    $('.form-outlet-name').hide()
    $('#outlet-name .form-group').removeClass('required')
    $('.outlet-name').prop('required', false)

    $('#show-npwp').hide();
    $('#npwp_alamat').hide(); 
    $('#npwp_alamat .form-group').removeClass('required')
    $('#show-npwp').removeClass('required')
    $('#npwp_alamat textarea').prop('required', false)
    $('#show-npwp input').prop('required', false)
    $('#new-cust').valid()
    // $('.form-outlet-name').removeClass('required')
  } else {
    $('.form-outlet-name').show()
    $('.outlet-name').prop('required', true)
    // $('.form-outlet-name').addClass('required')
  }
})

function validateOnlyNumber(evt) {
    var theEvent = evt || window.event;
    console.log(theEvent)
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9\b]|\./;
    if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
    }
}

// function selectOutletType(data)
// {

//   if(data.value != 1)
//   {
//     $('[name="type_npwp"]').prop('disabled', false)

//   }else{
//     $('[name="type_npwp"]').prop('disabled', true)
//   }
// }

$('[name="no_hp"]').on('keypress', function(e){
  return e.metaKey || // cmd/ctrl
  e.which <= 0 || // arrow keys
  e.which == 8 || // delete key
  /[0-9]/.test(String.fromCharCode(e.which)); // numbers
  $('#new-cust').valid()
})
$('[name="idktp"]').on('keypress', function(e){
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
$('[name="npwp"]').on('keypress', function(e){
return e.metaKey || // cmd/ctrl
  e.which <= 0 || // arrow keys
  e.which == 8 || // delete key
  /[0-9]/.test(String.fromCharCode(e.which)); // numbers
})

stockpoint()
function stockpoint()
{
    xhr_getdatastockpointvosp().then( value => {
    $.each(value, function(i, obj){
        $('[name="stockpoint_id"]').append('<option value="'+obj.id+'">'+obj.nama_stockpoint+'</option>')
    })
  }, reason => {
    console.log(reason); // Error!
  });
}

provinsi()
function provinsi()
{
  xhr_getdataprovinsivosp().then( value => {
    $.each(value, function(i, obj){
        $('#newcust-province').append('<option value="'+obj.id+'">'+obj.nama_provinsi+'</option>')
    })
  }, reason => {
    console.log(reason); // Error!
  });
}

function choosedistrict() {
  var district    = $('[name="district"]').val();
  var district_id = Number(district);
  xhr_getdatakelurahanvosp().then( value => {
    $.each(value, function(i, obj){
      if(obj.kecamatan_id === district_id)
      {
        $('[name="subdistrict"]').append('<option value="'+obj.id+'">'+obj.nama_kelurahan+'</option>')
      }
    })
  }, reason => {
    console.log(reason); // Error!
  });
}
function chooseprovince() {
  var prov      = $('[name="province"]').val();
  var prov_id   = Number(prov);

  $('[name="city"]').empty().append('<option disabled selected>Choose City</option>')
  $('[name="district"]').empty().append('<option disabled selected>Choose Kecamatan</option>')
  $('[name="subdistrict"]').empty().append('<option disabled selected>Choose Kelurahan</option>')
  xhr_getdatacistiescust().then( value => {
    $.each(value, function(a,b){

      if (b.provinsi_id === prov_id) 
      {
        $('[name="city"]').append('<option value="'+b.id+'">'+b.nama_kota+'</option>');
      }
    })
  }, reason => {
    console.log(reason); // Error!
  });
}

function choosecity() {
  var city    = $('[name="city"]').val();
  var city_id = Number(city);

  $('[name="district"]').empty().append('<option disabled selected>Choose Kecamatan</option>')
  $('[name="subdistrict"]').empty().append('<option disabled selected>Choose Kelurahan</option>')

  xhr_getdatadistrictescust().then( value => {

    $.each(value, function(a,b){
      if (b.kota_id === city_id) 
      {
        $('[name="district"]').append('<option value="'+b.id+'">'+b.nama_kecamatan+'</option>');
      }
    })
  }, reason => {
    console.log(reason); // Error!
  });
}
