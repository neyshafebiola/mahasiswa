/* ============================================================
 * Form Wizard
 * Multistep form wizard using Bootstrap Wizard Plugin
 * For DEMO purposes only. Extract what you need.
 * ============================================================ */
(function($) {

    'use strict';

    $(document).ready(function() {

        $('#rootwizard').bootstrapWizard({
            onTabShow: function(tab, navigation, index) {

                var $total = navigation.find('li').length;
                var $current = index + 1;
                // console.log('current '+$current)
                // console.log('total '+$total)
                if($current == 1 && cart.merchant != null){
                    console.log('disable')
                    $('#rootwizard').find('.pager .previous').show().removeClass('disabled');
                }
                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $('#rootwizard').find('.pager .next').hide();
                    $('#rootwizard').find('.pager .finish').show().removeClass('disabled hidden');
                } else {
                    $('#rootwizard').find('.pager .next').show();
                    $('#rootwizard').find('.pager .finish').hide();
                }

                var li = navigation.find('li a.active').parent();

                var btnNext = $('#rootwizard').find('.pager .next').find('button');
                var btnPrev = $('#rootwizard').find('.pager .previous').find('button');

                // remove fontAwesome icon classes
                function removeIcons(btn) {
                    btn.removeClass(function(index, css) {
                        return (css.match(/(^|\s)fa-\S+/g) || []).join(' ');
                    });
                }

                // if ($current > 2 && $current < $total) 
                // {
                //     if ($current == 3) 
                //     {
                //         console.log('current' + $current);
                //         if (cart.refforder == null) 
                //         {
                //             inputNoReffOrder();                     
                //         }
                        
                //     }
                // }

                if ($current > 2 && $current < $total) {


                    if ($current == 3) 
                    {
                        $('.next').hide()
                        inputReqDeliveryDate();                     
                    }

                    $('.previous').show()
                    var nextIcon = li.next().find('.fa');
                    // var nextIconClass = nextIcon.attr('class').match(/fa-[\w-]*/).join();
                    var nextIconClass = '';

                    removeIcons(btnNext);
                    btnNext.addClass(nextIconClass + 'fa');

                    var prevIcon = li.prev().find('.fa');
                    // var prevIconClass = prevIcon.attr('class').match(/fa-[\w-]*/).join();
                    //var prevIconClass = 'fa-arrow-circle-left';
                    var prevIconClass = '';
                    removeIcons(btnPrev);
                    //btnPrev.addClass(prevIconClass + ' btn-animated from-left fa');
                    btnPrev.addClass(prevIconClass + '');
                
                } else if ($current == 3) {
                   $('.next').hide() 
                   $('.finish').hide() 
                } else if ($current == 2) {
                    // remove classes needed for button animations from previous button
                    btnPrev.removeClass('');
                    removeIcons(btnPrev);
                    $('.previous').show()
                    $('.next').show()
                } else if ($current == 1) {
                    // remove classes needed for button animations from previous button
                    btnPrev.removeClass('');
                    removeIcons(btnPrev);
                    $('.previous').hide()
                    $('.next').hide()
                 }   
                 else {
                    // remove classes needed for button animations from next button
                    btnNext.removeClass('');
                    removeIcons(btnNext);
                }
            },
            onNext: function(tab, navigation, index) {
                // console.log("Showing next tab" + index);
                 switch(index){
                        case 1:
                            $('#next').show();
                            $('#next').removeAttr('disabled');
                            if(cart.email != null)
                            {
                                console.log(index);
                                // appendData();
                            }
                            else
                            {
                                alert('Please select customer');
                                return false;
                            }
                            break;
                        case 2:
                            var y = 1;
                            var flag_error = 0
                            // for (var i = 0, len = $('[name = "price[]"]').length; i < len; i++) {
                                

                            //     y++;
                            // } 
                            $.each($('[name = "price[]"]'), function(i, obj) {
                                var y = obj.id.substring(6, 7)
                                var tes = $("#name-"+y+" option:selected").text()
                                $('.sku_customer-error'+y).empty();
                                $('.qty-error'+y).empty();

                                if ($('[name = "price[]"]')[i].value == 0) {
                                    // if(document.getElementById('sku_alert['+y+']').innerHTML != 'none')
                                    // {
                                    //     alert('Please delete product ' +tes)  
                                    //     return false;
                                    //     break;
                                    // }else 
                                    if($('#name-'+y).val() == ""){
                                        alert('Please select product ' +tes)
                                        flag_error++;
                                        return false;
                                        // break;
                                    }else{
                                        $('.qty-error'+y).append('Please Input Qty ').css({"color": "red", "font-size": "11px"});
                                        flag_error ++; 
                                        return false;
                                    }
                                // return false;
                                // break;
                                }

                                if ($('[name = "sku_customer[]"]')[i].value == "") {

                                  $('.sku_customer-error'+y).append('SKU customer not found').css({"color": "red", "font-size": "11px"});
                                  flag_error ++;
                                  // return false;
                                  // break;
                                }
                            })
                            if(flag_error > 0) {
                                return false;
                                break;
                            }
                            
                           if(cart.subtotal != null)
                                {
                                    // IMPOR ORDER
                                    if(cart.tanda_imporsingleorder == '1')
                                    {
                                        appendData();

                                    }
                                    else if(cart.subtotal > 0 && cart.tanda_imporsingleorder == '0')
                                    {
                                        addcart();
                                        appendData();
                                    } else {

                                        alert('Please add product first');
                                        return false;
                                    }

                                }
                                else
                                {
                                    if(cart.subtotal > 0 && cart.tanda_imporsingleorder == '0')
                                    {
                                        addcart();
                                        appendData();
                                    } else {

                                        alert('Please add product first');
                                        return false;
                                    }

                                }
                            break;
                        case 3:
                            if(cart.owner_name != null && cart.shippingaddress != null)
                            {
                                console.log(index);
                                appendData();
                            }
                            else
                            {
                                console.log(cart)
                                alert('Please select shipping address first');

                                return false;
                            }
                            break;

                        case 4:
                            confirmsave();
                            break;                            
                    }
            },
            onPrevious: function(tab, navigation, index) {
                // console.log("Showing previous tab" + index);
                var current = index + 1;
                switch(current)
                {
                    case 1:
                        if(confirm('Are you sure want to cancel order and want to start from first step?'))
                        {
                            cart = [];
                            selected_product = [];
                            $('#tambahproduct').show();
                            $('#btnUploadProduct').show();
                            $('#tableDataP .body-product tr').remove();
                            $('#tableDataP_ajax .body-product-ajax tr').remove();
                            $('#tableDataP_ajax').css('visibility', 'hidden');
                            $('#tableDataP').css('visibility', 'visible');
                            $('.select-shipping').empty()
                            $('[name="t_subtotal"]').val(0);
                            $('[name="t_grandtotal"]').val(0);
                        }
                        else
                        {
                            return false
                        }
                        break;
                }
            },
            onInit: function() {
                $('#rootwizard ul').removeClass('nav-pills');
            }

        });

        $('.remove-item').click(function() {
            $(this).parents('tr').fadeOut(function() {
                $(this).remove();
            });
        });

    });

})(window.jQuery);