// $("#formshipping").submit(function(e) {
// e.preventDefault(); // avoid to execute the actual submit of the form.
// $('#formshipping').validate({ // initialize the plugin
//       rules: {
//           name: {
//               required: true
//           },
//           address: {
//               required: true
//           },
//           mobile_number:{
//             required:true,
//             maxlength:13
//           },
//           province :{
//             required: true
//           },
//           city :{
//             required:true
//           },
//           district :{
//             required: true
//           },
//           subdistrict: {
//             required:true
//           }
//       },
//   messages: {

//     name : "The last name field is required.",
//     mobile_number     : "The mobile number field is required.",
//     address   :{ 
//       required: "The address field is required."
//     },
//     // zipcode : "The zipcode field is required.",
//     // telephone : "The kecamatan field is required.",
//     // subdistrict : "The kelurahan field is required.",
//     address: "The address field is required."
//   },

// })
//    if($('#formshipping').valid() == true){
      
//         postnewshipping()
//       }
// });

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

provinsi_shipping()
function provinsi_shipping()
{
  console.log('masuk')
  xhr_getdataprovinsivosp().then( value => {
    $.each(value, function(i, obj){
        $('#province_shipping').append('<option value="'+obj.id+'">'+obj.nama_provinsi+'</option>')
    })
  }, reason => {
    console.log(reason); // Error!
  });
}

$(document).ready(function(){
  $('#province_shipping').select2({
    placeholder: 'Choose Province',
    dropdownParent: $('#new-shipping')
  })

  $('#city_shipping').select2({
    placeholder: 'Choose City',
    dropdownParent: $('#new-shipping')
  })
  $('#district_shipping').select2({
    placeholder: 'Choose Kecamatan',
    dropdownParent: $('#new-shipping')
  })
  $('#subdistrict_shipping').select2({
    placeholder: 'Choose Kelurahan',
    dropdownParent: $('#new-shipping')
  })
})

function chooseprovinceshipping() {
  var prov      = $('#province_shipping').val();
  var prov_id   = Number(prov);
  console.log(prov_id)
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

function choosecityshipping() {
  var city    = $('#city_shipping').val();
  var city_id = Number(city);

  $('[name="district"]').empty().append('<option disabled selected>Choose Kecamatan</option>')
  $('[name="subdistrict"]').empty().append('<option disabled selected>Choose Kelurahan</option>')

  xhr_getdatadistrictescust().then( value => {

    $.each(value, function(a,b){
      if (b.kota_id === city_id) 
      {
        $('#district_shipping').append('<option value="'+b.id+'">'+b.nama_kecamatan+'</option>');
      }
    })
  }, reason => {
    console.log(reason); // Error!
  });
}

function choosedistrictshipping() {
  var district    = $('#district_shipping').val();
  var district_id = Number(district);
  xhr_getdatakelurahanvosp().then( value => {
    $.each(value, function(i, obj){
      if(obj.kecamatan_id === district_id)
      {
        $('#subdistrict_shipping').append('<option value="'+obj.id+'">'+obj.nama_kelurahan+'</option>')
      }
    })
  }, reason => {
    console.log(reason); // Error!
  });
}