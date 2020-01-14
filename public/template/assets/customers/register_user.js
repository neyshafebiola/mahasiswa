function openUnverifiedCustomer()
{
$('#new-customer-sp').modal({show:true});
}

function selectCustomer(id, password){
  $.ajax({
    type   : "GET",
    url    : window.location.pathname+'/'+ id + '/json?customer_id=' + id,
    success: function(response){
      var response = JSON.parse(response);
      $('#reg-customer').find($('#email')).val(response['data'][0].email).attr('readonly', 'readonly');
      $('#reg-customer').find($('#username')).val(response['data'][0].email).attr('readonly', 'readonly');
      $('#reg-customer').find($('#password')).val(password).attr('readonly', 'readonly');
      $('#reg-customer').find($('#confirm_password')).val(password).attr('readonly', 'readonly');
      $('#reg-customer').find($('#name')).val(response['data'][0]['owner_outlet_firstname'] + ' ' + response['data'][0]['owner_outlet_lastname']).attr('readonly', 'readonly');
      $('#outlet_id').val(response['data'][0]['id'])
      $('#reg-customer').find($('#email')).parent().addClass('disabled');
      $('#new-customer-sp').modal('hide');
    }
  })
}

function editCustomer(id){
  window.location.href = '/user/customers/' + id + '/edit';
}