
$(document).ready(function(){
  $('#detailcust').hide()
  $('#select-address').hide();
  $('[name="info-pembayaran"]').hide();
  $('[name="cod-msg"]').hide();
  $('[name="tcoupon"]').hide();
  $('[name="tPointreedem"]').hide();
  $('[name="payment-method-msg"]').hide();
 
})

// Start Detail Customer
function myFunction(data, modul='') {
  var id = data;
  var NextBtn = $('.next-btn');
  // $('.card-header').hide()
  localforage.getItem(prefix_app+modul).then(function(response) {  
      if(response === null){
          // console.log(1)                                  
      } else {
          // console.log(2)
        $('#detailcust').show()
        $('#select-address').show();
        
        var data = JSON.parse(response);
        $.each(data, function(i, obj){
          // console.log(obj['id'])
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

                cart['owner_name'] = obj.owner_outlet_firstname +' '+obj.owner_outlet_lastname;
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
                  $('.select-shipping').append('<div class="container" style="left: -30px;"><div class="form-group row"><div class="col-md-12"><textarea class="form-control" style="font-size: 15px; margin-top: 0px; margin-bottom: 0px;height: 155px; color:black" placeholder="" disabled="" name="cust-address-'+obj.id+'">'+Fullname+'\
                      \
                      \
                      \
                      '+ obj.address+', '+obj.nama_kelurahan+ ', '+ obj.nama_kecamatan+ ', '+obj.nama_kota+', '+obj.nama_provinsi+'\
                      \
                      \
                      \
                      '+owner_hp+','+owner_telephone+'\
                      \
                      \
                      \
                      Stockpoint\
                      \
                      \
                      \
                      '+obj.nama_stockpoint+'\
                      \
                      \
                      \
                      \
                    </textarea><br>\
                       <p><button class="btn btn-complete" onclick="sp1('+obj.id+')" name="select1">Select</button></p></div></div></div>')

                  cart['nama_stockpoint']     = obj.nama_stockpoint;
                  cart['delivery_address']    = obj.address;
                  cart['nama_outletdeliv']    = obj.name;


                })
                cart['outlet_delivery_address']   = obj.Address;
                cart['owner_hp']                  = obj.owner_hp;
                
                $('.owner_name_c').on('click', function(){
                  showdetailCustomer(cart.customer, cart.delivery_address)
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

// Pilih Product
function chooseproduct(counter, data) {
  
  return    '<td><div class="form-group"><select style="width:243px; font-size:11px;" id="name-'+counter+'"  name="product_id[]" class="full-width form-control select-product" onChange="appendproduct('+counter+', this.value, this)" data-live-search="true" data-live-search-style="startsWith" class="selectpicker" ></select></div></td>' 

          + '<td><input style="width:45px; font-size:11px; color:black;" name="sku[]" id="sku-'+counter+'" readonly="readonly" type="text" value ="" class="form-control" /></td>'
          + '<td><input name="qty[]" style="width:50px; font-size:11px;" id="qty-'+counter+'"  type="text" value ="" class="form-control" onkeyup="hitungTotalBayar(this.value, $(\'#unit_price-'+counter+'\').val(), $(\'#discount-'+counter+'\').val(), \'#subtotal-'+counter+'\', '+counter+',this,$(\'#sku-'+counter+'\').val())" /></td>'
          + '<td><input name="unit_price[]" style="width:70px; font-size:11px; color:black; text-align: right;" id="unit_price-'+counter+'" readonly="readonly" type="text" value ="" class="form-control" /></td>'
          + '<td><input name="price[]" style="width:90px; font-size:11px; color:black; text-align: right;" id="price-'+counter+'" readonly="readonly" type="text" value ="" class="form-control" /></td>'
          + '<td><input name="discount[]" style="width:70px; font-size:11px; text-align: right;" id="discount-'+counter+'"  type="text" value ="0" class="form-control discount" onkeyup="hitungSubtotal(this.value, $(\'#price-'+counter+'\').val(), $(\'#discount-'+counter+'\').val(), \'#subtotal-'+counter+'\', '+counter+',this)" /></td>'
          + '<td><input name="total_discount[]" style="width:70px; font-size:11px; color:black; text-align: right;" id="total_discount-'+counter+'" readonly="readonly" type="text" value ="" class="form-control" /></td>'
          + '<td><input name="subtotal[]" id="subtotal-'+counter+'" value="0" readonly="readonly" type="text" value ="" class="form-control totalprice" style="width:90px; font-size:11px; color:black; text-align: right;" /></td>'
          + '<td width="50"><a href="#" onclick="delrow(this)" id="del_s-'+counter+'" title="Delete"><i style="color:red;font-size:19px" class="glyphicon glyphicon-remove-sign"></i></a></td>'
          + '<td><input name="mwuom[]" id="mwuom-'+counter+'" value="0" readonly="readonly" type="text" value ="" class="form-control mwuom" style="display:none;" /></td>'

          + '<td><input name="productid[]" id="productid-'+counter+'" value="0" readonly="readonly" type="text" value ="" class="form-control productid" style="display:none;" /></td>'

          + '<td><input name="productfe_id[]" id="productfe_id-'+counter+'" value="0" readonly="readonly" type="text" value ="" class="form-control productfe_id" style="display:none;" /></td>'
          + '<td><input name="mwconversion[]" id="mwconversion-'+counter+'" value="0" readonly="readonly" type="text" value ="" class="form-control productfe_id" style="display:none;" /></td>'
}

// Start Hitung Total Bayar   

function hitungTotalBayar(qty, price, discount, total, counter, selector, sku)
{
  var tr_c        = $(selector).closest('tr')
  if(parseInt(qty) > parseInt(sku))
  {
    
   
    $(tr_c).find('#qty-'+counter).val(0)
    $(tr_c).find('#price-'+counter).val(0)
    $(tr_c).find('#subtotal-'+counter).val(0)
  }else{
  // var tr_c        = $(selector).closest('tr')
  var table       = document.getElementById("tableDataP");
  var tr          = $(selector).closest('tr')
  var total_price = ((qty) * (price));
  var totaBayar   = ((qty) * (price)) - discount;
  
  // $('#price-'+counter).val(total_price)
  $(tr_c).find('#price-'+counter).val(total_price)
  // $('#subtotal-'+counter).val(totaBayar)
  $(tr_c).find('#subtotal-'+counter).val(totaBayar)

  var sum = 0;
  $(".totalprice").each(function(){
      sum += +$(this).val();
  });
  var disc = 0;
  $(".discount").each(function(){
      disc += +$(this).val();
  });

  cart['subtotal'] = sum
  cart['discount'] = disc
  $(".subtotal").val(sum);
  $('[name="t_discount"]').val(disc);

  // console.log(cart)

  }
  
}

function hitungSubtotal(qty, price, discount, total, counter, selector)
{

  var tr_c        = $(selector).closest('tr')
  var table       = document.getElementById("tableDataP");
  var tr          = $(selector).closest('tr')
  var total_price = $(tr_c).find('#price-'+counter).val()
  var totaBayar   = (total_price - discount);

  $('#subtotal-'+counter).val(totaBayar)
  $(tr_c).find('#subtotal-'+counter).val(totaBayar)

  var sum = 0;
  $(".totalprice").each(function(){
      sum += +$(this).val();
  });
  var disc = 0;
  $(".discount").each(function(){
      disc += +$(this).val();
  });

  cart['subtotal'] = sum
  cart['discount'] = disc
  $(".subtotal").val(sum);
  $('[name="t_discount"]').val(disc);

  // console.log(cart)

}
// Update Cart
function addcart()
{
    var product = [];
    var i=1;
        $(function () {
            $('.tableDataP .body-product tr').each(function (a, b) {
                if (typeof $('#name-'+i).val() != 'undefined'){
                var name                 = $('#name-'+i).val();
                var sku                  = $('#sku-'+i).val();
                var qty                  = $('#qty-'+i).val();
                var unit_price           = $('#unit_price-'+i).val();
                var price                = $('#price-'+i).val();
                var discount             = $('#discount-'+i).val();
                var total_discount       = $('#total_discount-'+i).val();
                var total_price          = $('#subtotal-'+i).val();
                var mwuom                = $('#mwuom-'+i).val();
                var product_id           = $('#productid-'+i).val();
                var productfe_id           = $('#productfe_id-'+i).val();
                var mwconversion           = $('#productfe_id-'+i).val();
                product[i]  = { name: name, sku: sku, qty:qty, unit_price:unit_price, price:price, discount:discount, total_discount:total_discount,total_price:total_price, mwuom:mwuom, product_id:product_id,productfe_id:productfe_id , mwconversion:mwconversion};
            i++;
                  
                }
            });
            cart.detail = product;
            // console.log(cart)

        });
        $('.updated-success').show();
}


$('#product-tab').click(function(){
  
  if(cart.owner_name != null && cart.shippingaddress != null)
  {
      appendData();
  }
  else
  {
      alert('Please select shipping address first');
      return false;
  }
});

$('#payment-method-tab').click(function(){
  if(cart.detail != null)
  {
      appendData();
  }
  else 
  {
      alert('Please add product first');
      return false;
  }
});

$('#review-order-tab').click(function(){
  if(cart.payment_type != null)
  {
      appendData();
  }
  else
  {
      alert('Please select payment method first');
      return false;
  }
});

$('#shipping-tab').click(function(){
  if(cart.payment_type != null)
  {
      appendData();
  }
  else
  {
      alert('Please select customer first');
      return false;
  }
});

function formatRp(angka)
  {
    return angka.toLocaleString(['ban', 'id']);
  }
// Append Product
function appendproduct(counter, name, selector)
{   console.log(name)
    var tr = $(selector).closest('tr')
    localforage.getItem(prefix_app+"product").then(function(response) {
        if(response === null){                               
        } else {            
            var data = JSON.parse(response);          
            $.each(data, function(i, obj){
               if (name === obj['sku']) {
                   $(tr).find("[name='total_discount[]']").val('0')
                   $(tr).find("[name='mwuom[]']").val(obj['mwuom'])
                   $(tr).find("[name='productid[]']").val(obj['id'])
                   $(tr).find("[name='productfe_id[]']").val(obj['productfe_id'])
                   
                    if(obj['pricebl'] != ''){
                   
                      $.each(obj.pricebl, function(a, b){ 
                         $(tr).find("[name='unit_price[]']").val(formatRp(b['price_package_w']))
                       
                      })
                    }
                    if(obj['inventorybl'] !== '')
                    {
                      $.each(obj.inventorybl, function(a, c){ 
                       $(tr).find("[name='sku[]']").val((c['available_qty_pcs']+c['qty_support']))
                      })
                    }
               }
            }) 
        }
    })
}

//Delete Row

function delrow(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
  window.location = '#tableDataP';
  document.getElementById("tableDataP").focus();
}

//End Delete Row

// Show Informasi Billing dan Shippingaddres
$('.sp').on('click', function(){
    popupbillingshipping(cart.customer)
})

// show informasi customer
$('.owner_name_a').on('click', function(){
    showdetailCustomer(cart.customer)
})
$('.owner_name_b').on('click', function(){
   showdetailCustomer(cart.customer)
})

function getpaymentMethod()
{
  xhr_getpaymentMethod().then( value => {  
  var data = $.map(value, function (obj) {
  obj.text = obj.name || obj.name; // replace name with the property used for the text
  return obj;
  });

  $('[name="payment-method"]').select2({
    placeholder:"Select Payment Method",
    dropdownAutoWidth : true,
    width: '100%',
    data:data,

  })  
  }, reason => {
    console.log(reason); // Error!
  });
}

function selectedPaymentMethod(data)
{
   localforage.getItem(prefix_app+'payment-method').then(function(response) {
    var response = JSON.parse(response);
    $.each(response, function(i, obj){

      if(parseInt(data.value) === obj.id)
        {
          console.log(obj)
          cart['payment_method'] = obj;
          $('[name="payment-method-msg"]').append(obj.note);
          $('[name="payment-method-msg"]').show();
        }
    })
   })
}
