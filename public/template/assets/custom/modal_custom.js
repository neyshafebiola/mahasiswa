// Modal New Shipping Addresss
function new_shippingaddress()
{
  $('#modal-public .modal-body').html('')
  $('#modal-public .title').html('')
  $('#modal-public .modal-footer').html('')
  

  $('#modal-public .title').append('New Shipping Address')
  $('#modal-public .modal-body').append('<text class="alert-msg-new-ship"></text>\
    <form id="new-shipping" role="form" novalidate autocomplete="off">\
    	<div class="row clearfix">\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>First Name</label>\
    				<input type="text" class="form-control" id="fname" placeholder="First name" name="first_name" required>\
    			</div>\
    		</div>\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>Last Name</label>\
    				<input type="text" class="form-control" id="fname" placeholder="Last name" name="last_name" required>\
    			</div>\
    		</div>\
    	</div>\
    	<div class="row clearfix">\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>Province</label>\
    				<select class="full-width form-control province" data-init-plugin="select2" onchange="chooseprovince(this);" id="province" name="province" required>\
	          		<option></option>\
	          		</select>\
    			</div>\
    		</div>\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>City</label>\
    				<select class="form-control full-width city" data-init-plugin="select2" name="city" onchange="choosecity();" required>\
		          <option></option>\
		          </select>\
    			</div>\
    		</div>\
    	</div>\
    	<div class="row clearfix">\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>Kecamatan</label>\
    				<select class="full-width form-control district" data-init-plugin="select2" name="district" onchange="choosedistrict();" required>\
		          	<option></option>\
                </select>\
    			</div>\
    		</div>\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>Kelurahan</label>\
    				<select class="full-width form-control subdistrict" data-init-plugin="select2" name="subdistrict" required>\
            <option></option>\
		          </select>\
    			</div>\
    		</div>\
    	</div>\
      <div class="row clearfix">\
        <div class="col-md-12">\
          <div class="form-group form-group-default required">\
            <label>Street Address</label>\
            <input type="text" class="form-control" id="fname" placeholder="Street Address" name="address" required>\
          </div>\
        </div>\
      </div>\
    	<div class="row clearfix">\
    		<div class="col-md-12">\
    			<div class="form-group form-group-default">\
    				<label>Zipcode</label>\
    				<input onkeypress="validateOnlyNumber(event)" onkeyup="validatePoint2()" id="vpzipcode" name="zipcode" maxlength="5" type="text" class="form-control" id="fname" placeholder="Zipcode" name="zipcode">\
    			</div>\
    		</div>\
    	</div>\
    	<div class="row clearfix">\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default required">\
    				<label>Mobile No</label>\
    				<input onkeypress="validateOnlyNumber(event)" onkeyup="validatePoint2()" id="vpmobilenumber" maxlength="13" type="text" class="form-control" id="fname" placeholder="Mobile No" name="mobile_number" required>\
    			</div>\
    		</div>\
    		<div class="col-md-6">\
    			<div class="form-group form-group-default">\
    				<label>Telephone</label>\
    				<input onkeypress="validateOnlyNumber(event)" onkeyup="validatePoint2()" id="vptelephone" maxlength="13" type="text" class="form-control" id="fname" placeholder="Telephone" name="telephone">\
    			</div>\
    		</div>\
    	</div>\
    </form>\
    <div class="row clearfix">\
      <div class="col-md-6 offset-md-6">\
        <span style="float: right;">\
          <button type="button" data-dismiss="modal" class="btn btn-complete">Cancel</button>\
          <button class="btn btn-complete" onclick="postnewshipping(2795)">Submit</button>\
        </span>\
      </div>\
    </div>\
')
  $('#modal-public').modal('show')

  $('.province').select2({
    placeholder: "Select Province",
    dropdownParent: $('#modal-public'),
    
  });
  // tes style
  $('.city').select2({
    placeholder: "Select City",
    dropdownParent: $('#modal-public')
  });
  $('[name="district"]').select2({
    placeholder: "Select District",
      dropdownParent: $('#modal-public')
    });
  $('[name="subdistrict"]').select2({
    placeholder: "Select Subdistrict",
      dropdownParent: $('#modal-public')
    });

}

function validatePoint2()
  {
    // Add New Shipping Address
    var vpzipcode = $('#vpzipcode').val()

    if(vpzipcode.indexOf(".") > -1)
    {
      $('#vpzipcode').val('')
    }

    var vpmobilenumber = $('#vpmobilenumber').val()

    if(vpmobilenumber.indexOf(".") > -1)
    {
      $('#vpmobilenumber').val('')
    }

    var vptelephone = $('#vptelephone').val()

    if(vptelephone.indexOf(".") > -1)
    {
      $('#vptelephone').val('')
    }

  }

// Modal Point Reedem 
function point_reedem()
{
	
	$('#modal-public').modal('show')
	$('#modal-public .title').html('')
	$('#modal-public .title').append('Saldo Point Anda &nbsp;'+  cart.own_point)

	$('#modal-public .modal-body').html('')
	$('#modal-public .modal-body').append('<input type="text" onkeyup="checkPoint()" name="point_use" class="form-control col-md-8" name="point_reedem">\
		<span>&nbsp;<button type="button"name="submitpoint" class="btn btn-complete" onclick="applypoint()">Submit</button></span>\
		<p><i><label name="notif" class="control-label"></label></i></p>')
}

// Modal Detail Customer
function showdetailCustomer(obj, delivery_address, name_outletdeliv, mobile, phone){
  $('#myModal').modal('show')

   // $.each(cart.customer, function(i, obj){   // })
      if(obj.outlettype_id == 1)
      {
        $('.customer-type').html('')
        $('.customer-type').append('Personal')
        
      }else if(obj.outlettype_id == 2){
        $('.customer-type').html('')
        $('.customer-type').append('Toko')
      }else{
        $('.customer-type').html('')
        $('.customer-type').append('Perusahaan')
      }

      if (obj.owner_outlet_lastname == null) 
        {
          lastname = ''
        }else{
          lastname = obj.owner_outlet_lastname
        }

   // Set Null
      $('.email').html('')
      $('.credit-point').html('')
      $('.outlet-name').html('')
      $('.npwp-type').html('')
      $('.billing-address').html('')
      $('.moble-number').html('')
      $('.telephone').html('')
      $('.customer-name').html('')


      $('.customer-name').append(obj.owner_outlet_firstname + (obj.owner_outlet_lastname != null ? ' ' + obj.owner_outlet_lastname : ''))

      // $('.customer-name').append(obj.owner_outlet_firstname +' '+ lastname)


      if (obj.Point == null) 
      {
        $('.credit-point').append('-')  
      }else{
        $('.credit-point').append(obj.Point)
      }

      if (obj.outlet_nama == null) 
      {
        $('.outlet-name').append('-')  
      }else{
        $('.outlet-name').append(obj.outlet_nama)
      }
      
      $('.npwp-type').append(obj.npwp_type)

      var address= [];

      if(obj.npwp_type === 'NON-PKP')
      { 
      
         $('.billing-address').append(delivery_address)
         $.each(obj.Address, function(a, b){
          address['address'] = b.address+', '+b.nama_kelurahan+', '+b.nama_kecamatan+', '+b.nama_kota+', '+b.nama_provinsi;

         })

      }else{
        $('.billing-address').append(obj.npwp_alamat)
        address['address'] = obj.npwp_alamat;
      }
        var alamat = cart.shippingaddress+', '+cart.nama_kelurahan+', '+cart.nama_kecamatan+', '+cart.nama_kota+', '+cart.nama_provinsi;
        var nama_address = name_outletdeliv;

        if (phone_address == null) 
        {
          var phone_address = '';
        } else {
          var phone_address = phone;  
        }

        if (mobile_address == null) 
        {
          var mobile_address = '';
        } else {
          var mobile_address = mobile;  
        }
        
        if(mobile == 'null')
        {
            var mobile_address = '-';
        }else{
            var mobile_address = mobile;
        }
        
      // (obj.name != null ? ','+obj.name : '')
      $('.modal-body .address').html('')
      $('.modal-body .address').append('<div class="row">\
      <div class="col-md-6">\
          <div class="card-block bg-white" style="margin-left : -45px;">\
                  <div class="panel panel-default">\
                      <div class="panel-heading">Shipping Address</div>\
                          <div class="body-detail" style="padding : 5px; height: 190px;">\
                          '+(nama_address != 'null' ? nama_address:'')+'\
                          <br>\
                          '+alamat+'\
                          <br>\
                          '+mobile_address+'\
                          <br>\
                          '+phone_address+'\
                          </div>\
                  </div>\
             </div>\
      </div>\
      <div class="col-md-6">\
      <div class="card-block bg-white" style="margin-right : -50px;">\
                  <div class="panel panel-default">\
                      <div class="panel-heading">Billing Address</div>\
                          <div class="body-detail" style="padding : 5px; height :190px;">\
                          '+(nama_address != 'null' ? nama_address :'')+'\
                          <br>\
                          '+alamat+'\
                          <br>\
                          '+mobile_address+'\
                          <br>\
                          '+phone_address+'\
                          </div>\
                  </div>\
             </div>\
      </div>\
      </div>')
      
      if (obj.owner_hp == null) 
      {
        $('.moble-number').append('-')  
      }else{
        $('.moble-number').append(obj.owner_hp)
      }

      if (obj.owner_telephone == null) 
      {
        $('.telephone').append('-')
      }else{
        $('.telephone').append(obj.owner_telephone)
      }

      if (obj.email == null) 
      {
        $('.email').append('-')
      }else{
        $('.email').append(obj.email)
      }

}

function showdetailCust(data, delivery_address){
    // console.log(delivery_address)
    $('#myModal').modal('show')
    var id = data;

    localforage.getItem(prefix_app+modul).then(function(response) {  
     
      var data = JSON.parse(response);
      $.each(data, function(i, obj){
         // console.log(obj.Point)
        if (id === obj['Fullname']) {
        cart['customer'] = obj;

        if(obj.outlettype_id == 1)
        {
          $('.customer-type').html('')
          $('.customer-type').append('Personal')
          
        }else if(obj.outlettype_id == 2){
          $('.customer-type').html('')
          $('.customer-type').append('Toko')
        }else{
          $('.customer-type').html('')
          $('.customer-type').append('Perusahaan')
        }

        if (obj.owner_outlet_lastname == null) 
        {
          lastname = '';
        }else{
          lastname = obj.owner_outlet_lastname;
        }

       // Set Null
        $('.email').html('')
        $('.credit-point').html('')
        $('.outlet-name').html('')
        $('.npwp-type').html('')
        $('.billing-address').html('')
        $('.moble-number').html('')
        $('.telephone').html('')
        $('.customer-name').html('')

        $('.customer-name').append(obj.owner_outlet_firstname +' '+ lastname)
        $('.credit-point').append(obj.Point)
        $('.outlet-name').append(obj.outlet_nama)
        $('.npwp-type').append(obj.npwp_type)
        if(obj.npwp_type === 'NON-PKP')
        {
          $('.billing-address').append(delivery_address)
        }else{
          $('.billing-address').append(obj.npwp_alamat)
        }
        
        $('.moble-number').append(obj.owner_hp)
        $('.telephone').append(obj.owner_telephone != null ? obj.owner_telephone : '-')
        $('.email').append(obj.email)

        }
      })
    });
         
  }

function showdetailCustPpal(data, delivery_address){
    // console.log(delivery_address)
    $('#myModal').modal('show')
    var id = data;

    localforage.getItem(prefix_app+modul).then(function(response) {  
     
      var data = JSON.parse(response);
      $.each(data, function(i, obj){
         // console.log(obj.Point)
        if (id === obj['ordernofe']) {
        cart['customer'] = obj;

        if(obj.outlettype_id == 1)
        {
          $('.customer-type').html('')
          $('.customer-type').append('Personal')
          
        }else if(obj.outlettype_id == 2){
          $('.customer-type').html('')
          $('.customer-type').append('Toko')
        }else{
          $('.customer-type').html('')
          $('.customer-type').append('Perusahaan')
        }

       // Set Null
        $('.email').html('')
        $('.credit-point').html('')
        $('.outlet-name').html('')
        $('.npwp-type').html('')
        $('.billing-address').html('')
        $('.moble-number').html('')
        $('.telephone').html('')
        $('.customer-name').html('')

        $('.customer-name').append(obj.owner_outlet_firstname +' '+ obj.owner_outlet_lastname)
        $('.credit-point').append(obj.Point)
        $('.outlet-name').append(obj.outlet_nama)
        $('.npwp-type').append(obj.npwp_type)
        if(obj.npwp_type === 'NON-PKP')
        {
          $('.billing-address').append(delivery_address)
        }else{
          $('.billing-address').append(obj.npwp_alamat)
        }
        
        $('.moble-number').append(obj.owner_hp)
        $('.telephone').append(obj.owner_telephone)
        $('.email').append(obj.email)

        }
      })
    });
         
  }




function checkPoint()
{
	var saldo_point = cart.own_point;
	var point_use = $('[name="point_use"]').val();
	if(Number(point_use) > Number(saldo_point))
	{
		$('[name="notif"]').html('')
		$(':input[name="submitpoint"]').prop('disabled', true);
		$('[name="notif"]').append('poin yang digunakan tidak boleh melebihi saldo point')
	}else{
		$(':input[name="submitpoint"]').prop('disabled', false);
		$('[name="notif"]').html('')
	}
} 

function applypoint()
{	
	var subtotal	 = cart.subtotal;
	var saldo_point  = cart.own_point;
	var point_use	 = $('[name="point_use"]').val();

	var grandtotal 	 = subtotal - point_use;
	var own_point 	 = saldo_point - point_use;

	// cart['subtotal']  = grandtotal;
	// cart['own_point'] = own_point;
	// console.log(cart)
	$('.p-grandtotal').val(grandtotal);
	$('.p-pointreedem').val(point_use);
	$('[name="tPointreedem"]').show()
}


function apply_coupon(){
	$('#modal-public').modal('show')
	$('#modal-public .title').html('')
  $('#modal-public .modal-footer').html('')
	$('#modal-public .title').append('Apply Coupon Code')

	$('#modal-public .modal-body').html('')
	$('#modal-public .modal-body').append('<input type="text" name="coupon" class="form-control col-md-8" name="point_reedem">\
		<span>&nbsp;<button type="button"  class="btn btn-complete" onclick="applyCoupon()">Submit</button></span>\
		<p><label name="notif" class="col-md-9 control-label"></label></p>')
}

function popupbillingshipping(cust)
{
	var address= [] ;
	if(cust.npwp_type === 'NON-PKP')
	{	

		 $.each(cust.Address, function(a, b){
		 	address['address'] = b.alamat_stockpoint;
		 })
		console.log(cust)
	}else{
		address['address'] = cust.npwp_alamat;
	}
  console.log(address)
	$('#modal-public').modal('show')
	$('#modal-public .title').html('')
  $('#modal-public .modal-footer').html('')
	$('#modal-public .title').append('')
  $('#modal-public .modal-body').empty()
	$('#modal-public .modal-body').append('<div class="row">\
    <div class="col-md-12">\
          <span class="semi-bold">Stockpoint Address</span>\
    <div>\
    </div>\
    <div class="row">\
    <div class="col-md-12">\
          '+address.address+'\
    </div>\
		</div>')
}