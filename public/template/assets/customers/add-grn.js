// var grn           = [];
$('[name="qty_grn"]').on('keypress', function(e){
  return e.metaKey || // cmd/ctrl
    e.which <= 0 || // arrow keys
    e.which == 8 || // delete key
    /[0-9]/.test(String.fromCharCode(e.which)); // numbers
  })
$('.price_grn').on('keypress', function(e){
  return e.metaKey || // cmd/ctrl
    e.which <= 0 || // arrow keys
    e.which == 8 || // delete key
    /[0-9]/.test(String.fromCharCode(e.which)); // numbers
})

$(function() {
$('[name="grn_number"]').on('keypress', function(e) {
          if (e.which == 32)
              return false;
      });
});
// Modal Backdrop
$(document).ready(function(){
   $("body").on("contextmenu",function(e){
        return false;
    });
  $("[name='qty_grn']").on("cut copy paste",function(e) {
        e.preventDefault();
    });
  $('#noGRN').modal({backdrop: 'static', keyboard: false}) 
  $('#frmDetailPO').validate({
    /* other validation */
  })



})

function hitungQtyGrn(data, qty, i, url, sku, event)
{
  if(data.value.indexOf(',') > -1)
  {
    document.getElementById('qty_alert['+i+']').style.display = 'block';
    document.getElementById('qty_alert['+i+']').innerHTML = 'Please don\'t input QTY with comma';
    $('#pushGRN').prop('disabled', true) 
  }else{
    $('#pushGRN').prop('disabled', false)
    document.getElementById('qty_alert['+i+']').style.display = 'none';
    if(data.value != '')
    {
      if(Number(data.value) > Number(qty))
      {
        $('#qty_grn_'+i).val('')

      }else{
        var hitung = Number(qty) - Number(data.value) ;
        
        $('#trans_'+i).html('').append(hitung)
        $('#quantity_'+i).val(hitung)
        $('#status_'+i).val('fulfill')
        $('#validate').val('true')
        if(hitung != 0)
        {
          
          $('#status_po_'+i).val('Partly Fulfill')
        }else{
          
          $('#status_po_'+i).val('Fulfilled')
        }

        // validasi isiUnit
        $.ajax({
          url: url,
          data: 'sku=' + sku
        }).done(function(resp) {
          resp = JSON.parse(resp)
          product = resp.data
          if((product.unit == 'F') && (data.value % product.isiUnit != 0))
          {
            document.getElementById('qty_alert['+i+']').style.display = 'block';
            document.getElementById('qty_alert['+i+']').innerHTML = 'Quantity must be multiple of '+product.isiUnit;
            $('#pushGRN').prop('disabled', true)
          }
          else
          {
            $('#pushGRN').prop('disabled', false)
            document.getElementById('qty_alert['+i+']').style.display = 'none';
          }
        })

      }
    }else{
      $('#status_'+i).val('')
      $('#trans_'+i).html('').append(qty)
      $('#validate').val('false')
    }
  }
    
}


$('#pushGRN').click(function(){
  var result = checkdetailproductGrn();
  
    if(result == 0)
    {
      $('#message-submit-grn').modal('show')
    }else{
      $('#detailPO #tBody tr th  .price_grn').each(function (a, b) {
          var tr      = b.closest('tr');
          var qty_grn = $(tr).find('#qty_grn_'+a).val()
          $('[name="price_grn['+ a +']"]').rules("add", {
                    required: {
                      depends: function(element){
                        if(qty_grn != "")
                        {
                          return true;
                        }else{
                          return false;
                        }
                      }
                    },
                    messages: {
                      required: "Please insert  Price"
                    }
          })    
      })
      if($('#frmDetailPO').valid() == true){
          submitGRN()
      }
 
    }  

 })

$('#next_grn').click(function(){
    var grn_number = $('[name="grn_number"]').val();
    if(grn_number != '')
    {
      checkNumberGrn(grn_number)
    }else{
      alert('Please Input GRN Number')
    }
})

function confirmFailed()
{
   $('.alert-msg').html('')
   $.each(grn.msg, function(i, obj){
       $('.alert-msg').append('<div class="alert alert-info">\
                     '+obj+'\
                    </div>')
    })
}

function checkNumberGrn(grn_number)
{
  // xhr_getcheckGrnNo(grn_number)
  var url = base_url+'/ordervosp/check-grn-no'
  get(url+'?grn_no='+grn_number).then(function(response){
      var response = JSON.parse(response);       
      if(response.status === 1)
      {
        grn['grn_no'] = grn_number;
        grn['asn_no'] = $('[name="asn_no"]').val();
        $('.ref_order').html('').append('('+grn_number+')')
        $('#noGRN').modal('toggle');
      }else{
        alert(response.message)
        return false;
      }

  }, function(error) {
      console.error("Failed!", error);
  })
}
function checkdetailproductGrn()
{
  var result = 0;
  var i = 0;
  $('#detailPO #tBody tr').each(function (a, b) {
      var qty    = $('#qty_grn_'+i).val();

      result+=+ qty;
      
  i++;
  })
  return result;
  
}
