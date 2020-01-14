function validateOnlyNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9\b]|\./;
    if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
    }
}
// Payment Method
$('[name="cod"]').on('click', function(){
$('[name="cod-msg"]').show();
$('[name="info-pembayaran"]').hide();
cart['payment_type'] = 'Cash On Delivery';
})

$('[name="cash"]').on('click', function(){
$('[name="cod-msg"]').hide();
$('[name="info-pembayaran"]').show();
cart['payment_type'] = 'Cash On Delivery';
})

function showPaymentMethod()
{
  var merchant         = cart.merchant;
  var temPaymentMethod = '';
  var data = $.map(merchant.payment_method, function (obj) {
  obj.text = obj.name || obj.name; // replace name with the property used for the text
  return obj;
  });

  $('[name="payment-method"]').select2({
    placeholder:"Select Payment Method",
    dropdownAutoWidth : true,
    width: '100%',
    data:data,

  })
}


function showDeliveryMethod()
{
  var merchant         = cart.merchant;
  var data = $.map(merchant.delivery_method, function (obj) {
  obj.text = obj.delivery_name || obj.delivery_name; // replace name with the property used for the text
  return obj;
  });

    $('[name="delivery-method"]').select2({
    placeholder:"Select Delivery Method",
    dropdownAutoWidth : true,
    width: '100%',
    data:data,

  })

}

function selectedPaymentMethod()
{
  var idPayment        = $('[name="payment-method"]').val();
  var merchant         = cart.merchant;
  
  $('[name="payment-method-msg"]').html('');
  $.each(merchant.payment_method, function(i, obj){

     if(parseInt(idPayment) === obj.id)
     {
      cart['payment_method'] = obj;
      $('[name="payment-method-msg"]').append(obj.note);
      $('[name="payment-method-msg"]').hide();
     }
  })
}

function selectedDeliveryMethod()
{
   var idDelivery       = $('[name="delivery-method"]').val();
   var merchant         = cart.merchant;
   $('[name="delivery-method-msg"]').html('');
   $.each(merchant.delivery_method, function(i, obj){

     if(parseInt(idDelivery) === obj.id)
     {
      cart['delivery_method'] = obj;
      cart['delivery_method']['delivery_name'] = encodeURIComponent(obj.delivery_name);
      cart['delivery_method']['text'] = encodeURIComponent(obj.text);
      // cart.delivery_method.delivery_name = encodeURIComponent(obj.delivery_name);
      // cart.delivery_method.text = encodeURIComponent(obj.text);
      $('[name="delivery-method-msg"]').append(obj.note);
      $('[name="delivery-method-msg"]').hide();
     }
  })
}

// Start Detail Customer
function myFunction(data, modul='') {
  var id = data;
  var NextBtn = $('.next-btn');
  
  localforage.getItem(prefix_app+modul).then(function(response) {  
      if(response === null){
          // console.log(1)                                  
      } else {
          // console.log(2)
        $('#detailcust').show()
        $('#select-address').show();
        var data = JSON.parse(response);
        console.log(data)
        $.each(data, function(i, obj){
          // console.log(data)
           if (Number(id) === obj['id']) {
                cart['customer'] = obj;
                NextBtn.click()

                if(obj.outlettype_id == 1)
                {
                  var outlet_type = 'Personal';
                }else if(obj.outlettype_id == 2){
                 var outlet_type = 'Toko';
                }else{
                  var outlet_type = 'Perusahaan';
                }

                if (obj.Point == null) 
                {
                  var Point = '-';
                }else{
                  var Point = obj.Point;
                }

                if (obj.outlet_nama == null) 
                {
                  var outlet_nama = '-';
                }else{
                  var outlet_nama = obj.outlet_nama;
                }

                if (obj.npwp_type == null) 
                {
                  var npwp_type = '-';
                }else{
                  var npwp_type = obj.npwp_type;
                }

                if (obj.owner_hp == null) 
                {
                  var owner_hp = '-';
                }else{
                  var owner_hp = obj.owner_hp;
                }

                if (obj.owner_telephone == null) 
                {
                  var owner_telephone = '-';
                }else{
                  var owner_telephone = obj.owner_telephone;
                }

                if (obj.email == null) 
                {
                  var email = '-';
                }else{
                  var email = obj.email;
                }

                $('.body-detail').html('')
                $('.body-detail').append('<br><div class="form-group row"><div class="col-md-4"><text><strong>Customer Type</strong></text></div><div class="col-md-5"><span>'+outlet_type+'</span></div></div>\
                  <div class="form-group row"><div class="col-md-4"><strong>Customer Name </strong></div><div class="col-md-5"><span class="" style="color: black;">'+obj.Fullname+'</span></div></div>\
                  <div class="form-group row"><div class="col-md-4"><strong>NPWP Type </strong></div><div class="col-md-5"><a href="#"><span class="" style="color: black;">'+npwp_type+'</span></a></div></div>\
                  <div class="form-group row"><div class="col-md-4"><strong>Mobile Number </strong></div><div class="col-md-5"><a href="#"><span class="" style="color: black;">'+owner_hp+'</span></a></div></div>\
                  <div class="form-group row"><div class="col-md-4"><strong>Telephone </strong></div><div class="col-md-5"><a href="#"><span class="" style="color: black;">'+owner_telephone+'</span></a></div></div>\
                  <div class="form-group row"><div class="col-md-4"><strong>Email </strong></div><div class="col-md-5"><a href="#"><span class="" style="color: black;">'+email+'</span></a></div></div>\
                  <br>')
                // <div class="form-group row"><div class="col-md-4"><strong>Credit Point </strong></div><div class="col-md-5"><a href="#"><span class="" style="color: black;">'+Point+'</span></a></div></div>\
                //   <div class="form-group row"><div class="col-md-4"><strong>Outlet Name </strong></div><div class="col-md-5"><a href="#"><span class="" style="color: black;">'+outlet_nama+'</span></a></div></div>\

                cart['owner_name'] = obj.owner_outlet_firstname + (obj.owner_outlet_lastname != null ? ' ' + obj.owner_outlet_lastname : '');
                cart['outlet_id'] = obj.id;
                cart['npwp_type'] = obj.npwp_type;
                if(obj.owner_telephone != null)
                {
                  var owner_telephone = obj.owner_telephone;
                }else
                {
                  var owner_telephone = '';
                }

                
                var owner_hp =  obj.owner_hp;
                var Fullname =  obj.owner_outlet_firstname +' '+obj.owner_outlet_lastname;
                $('.select-shipping').html('')
                $.each(obj.Address, function(i, obj){  

                  if (obj.name == null) 
                  {
                    var name_obj = '';
                  } else {
                    var name_obj = obj.name;  
                  }

                  if (obj.mobile == null) 
                  {
                    var mobile_obj = '';
                  } else {
                    var mobile_obj = obj.mobile;  
                  }
                  $('.select-shipping').append('<div class="container" style="left: -30px;"><div class="form-group row" style="background-color: #f8f8f8;padding-bottom: 2%;margin-left: 1%;"><div class="col-md-12"><textarea class="form-control" style="resize:none ;font-size: 15px; margin-top: 0px; margin-bottom: 0px;height: 112px; color:black; padding: 0; border: none; padding-top: 27px;" placeholder="" disabled="" name="cust-address-'+obj.id+'">'+(obj.name != null ? obj.name : '')+'\
                    \
                      \
                      \
                      \
                      \
                      \
                      '+ obj.address+', '+obj.nama_kelurahan+ ', '+ obj.nama_kecamatan+ ', '+obj.nama_kota+', '+obj.nama_provinsi+'\
                      \
                      \
                      \
                      '+(obj.mobile != null ? obj.mobile : '')+(obj.phone != null ? ', ' + obj.phone : '')+'\
                      \
                      \
                      \
                      \
                      \
                      \
                      \
                      \
                      \
                      \
                      \
                      \
                    </textarea><br>\
<button class="btn btn-complete" onclick="sp1('+obj.id+',\''+obj.name+'\',\''+obj.mobile+'\',\''+obj.phone+'\')" name="select1">Select</button><br>\
                       </div></div></div>')

                  cart['nama_stockpoint']  = obj.nama_stockpoint;
                  // cart['delivery_address'] = obj.address;
                  cart['stockpoint_id']    = obj.stockpoint_id;
                  cart['nama_outletdeliv']    = obj.name;
                  cart['mobile']           = obj.mobile;
                  cart['phone']           = obj.phone;
                })

                cart['outlet_delivery_address']   = obj.Address;

                cart['owner_hp']                  = obj.owner_hp;
                
                $('.owner_name_c').on('click', function(){
                  showdetailCustomer(cart.customer, cart.delivery_address, cart.nama_outletdeliv, cart.mobile, cart.phone)
                })

                if(obj.Point != '0')
                {
                  cart['own_point'] = obj.Point;
                } else{
                  cart['own_point'] = obj.Point;
                }

           }
         })        
      }
  })
  
}


// select point transaction type
function selectPoint()
{
  cart['transaction_type'] = 1;
  $('.next-btn').click()
  $('#tab-select-cust').show()
  $('[name="cod"]').prop('disabled', true)
  $('[name="cash"]').prop('disabled', true)
}

// select non point transaction type
function selectNonPoint()
{
  cart['transaction_type'] = 0;
  $('.next-btn').click()
  $('#tab-select-cust').show()
}

// cek operator
function checkSalesRuleOperator(operator, data, value){
  var cek = 0;
  if(operator == '==')
  {
    if(data == value)
    {
      cek = 1;
    }
  }
  else if(operator == '<')
  {
    if(data < value)
    {
      cek = 1;
    }
  }
  else if(operator == '>')
  {
    if(data > value)
    {
      cek = 1;
    }
  }
  else if(operator == '<=')
  {
    if(data <= value)
    {
      cek = 1;
    }
  }
  else if(operator == '>=')
  {
    if(data >= value)
    {
      cek = 1;
    }
  }
  return cek;
}

function checkNoSku()
{   
    var cekSku = [];
    var i=1;
    $(function () 
    {
      $('.tableDataP .body-product tr').each(function (a, b) {
          if (typeof $('#name-'+i).val() != 'undefined'){
          var sku = $('#sku_no-'+i).val();
          cekSku[i]  = { sku: sku };
      i++;
            
        }
      });
    });
}