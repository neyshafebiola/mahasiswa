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
              
                if($current == 1 && cart.merchant != null){
                    console.log('disable')
                    $('#rootwizard').find('.pager .previous').show().removeClass('disabled');
                }
                // If it's the last tab then hide the last button and show the finish instead
                if ($current == $total) {
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
                if ($current > 2 && $current < $total) {

                    $('.previous').show()
                    var nextIcon = li.next().find('.fa');
                    // var nextIconClass = nextIcon.attr('class').match(/fa-[\w-]*/).join();
                    var nextIconClass = 'fa-arrow-circle-right';

                    removeIcons(btnNext);
                    btnNext.addClass(nextIconClass + ' btn-animated from-left fa');

                    var prevIcon = li.prev().find('.fa');
                    // var prevIconClass = prevIcon.attr('class').match(/fa-[\w-]*/).join();
                    var prevIconClass = 'fa-arrow-circle-left';
                    removeIcons(btnPrev);
                    btnPrev.addClass(prevIconClass + ' btn-animated from-left fa');
                
                } else if ($current == 2) {
                    // remove classes needed for button animations from previous button
                    btnPrev.removeClass('btn-animated from-left fa');
                    removeIcons(btnPrev);
                    $('.finish').show()
                    $('.previous').show()
                    $('.next-btn').hide()
                } else if ($current == 1) {
                    // remove classes needed for button animations from previous button
                    btnPrev.removeClass('btn-animated from-left fa');
                    removeIcons(btnPrev);
                    $('.previous').hide()
                    $('.next-btn').show()
                 }   
                 else {
                    // remove classes needed for button animations from next button
                    console.log('coba finish')
                    btnNext.removeClass('btn-animated from-left fa');
                    removeIcons(btnNext);
                }
            },
            onNext: function(tab, navigation, index) {
                // console.log("Showing next tab" + index);
                 switch(index){
                        case 1:
                           cart['firstName']   = $('[name="first_name"]').val();
                           cart['lastName']    = $('[name="last_name"]').val();
                           cart['email']       = $('[name="email"]').val();
                           cart['ktp']         = $('[name="idktp"]').val();
                           cart['no_hp']       = $('[name="no_hp"]').val();
                           cart['npwp_type']   = $('[name="type_npwp"]').val();
                           cart['outlet_type'] = $('[name="outlet_type"]').val();
                           cart['valemail']    = $('.email-error').text();
                           cart['valmp']       = $('.no_hp-error').text();
                           cart['valktp']      = $('.idktp-error').text();
                           cart['valnpwp']     = $('.npwp_number-error').text();
                           $('.first_name-error').empty();
                           $('.last_name-error').empty();
                           $('.npwp_number-error').empty();
                           $('.outlet_name-error').empty();
                           // $('.email-error').empty();
                           // $('.idktp-error').empty();
                           // $('.no_hp-error').empty();

                           if (cart['npwp_type'] == 'PKP') 
                           {
                             cart['npwp_number'] = $('[name="npwp"]').val();
                           }

                           if (cart['outlet_type'] == 2 || cart['outlet_type'] == 6) 
                           {
                             cart['outlet_name'] = $('[name="outlet_name"]').val();
                           }


                           if(cart.firstName != "" && cart.lastName != "" && cart.email != "" && cart.no_hp != "" )
                            {
                                // IMPOR ORDER
                                if (cart.npwp_type == "PKP") 
                                {
                                    if (cart.npwp_number == "") 
                                    {
                                        // alert('Please Input NPWP Number')
                                        $('.npwp_number-error').append('Please Input NPWP Number').css({"color": "red", "font-size": "11px"});
                                        return false;
                                    } 

                                    if (cart.valnpwp == "NPWP number of at least 15 digits") 
                                    {
                                        $('.npwp_number-error').append('NPWP number of at least 15 digits').css({"color": "red", "font-size": "11px"});
                                        return false;
                                    }

                                } else {
                                    appendData();
                                }

                                if (cart.outlet_type == 2 || cart.outlet_type == 6) 
                                {
                                    if (cart.outlet_name == "") 
                                    {
                                        $('.outlet_name-error').append('Please Input Outlet Name').css({"color": "red", "font-size": "11px"});
                                        return false;
                                    }
                                }

                                if (cart.valemail == "Please enter valid email address") 
                                {
                                    $('.email-error').empty();
                                    $('.email-error').append('Please enter valid email address').css({"color": "red", "font-size": "11px"});
                                    return false;
                                }

                                if (cart.valmp == "Mobile number of at least 10 digits") 
                                {
                                    $('.no_hp-error').empty();
                                    $('.no_hp-error').append('Mobile number of at least 10 digits').css({"color": "red", "font-size": "11px"});
                                    return false;
                                }

                                if (cart.valktp == "ID KTP must be 16 digits") 
                                {
                                    $('.idktp-error').empty();
                                    $('.idktp-error').append('ID KTP must be 16 digits').css({"color": "red", "font-size": "11px"});
                                    return false;
                                }

                            }
                            else
                            { 
                                if (cart.firstName == "") 
                                {
                                    // alert('Please Input First Name')
                                    $('.first_name-error').append('Please Input First Name').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.lastName == "") 
                                {
                                    // alert('Please Input Last Name')
                                    $('.last_name-error').append('Please Input Last Name').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.email == "") 
                                {
                                    // alert('Please Input Email')
                                    $('.email-error').empty();
                                    $('.email-error').append('Please Input Email').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.no_hp == "") 
                                {
                                    // alert('Please Input Mobile Number')
                                    $('.no_hp-error').empty();
                                    $('.no_hp-error').append('Please Input Mobile Number').css({"color": "red", "font-size": "11px"});
                                }
                                // if (cart.ktp == "") 
                                // {
                                //     // alert('Please Input KTP')
                                //     $('.idktp-error').empty();
                                //     $('.idktp-error').append('Please Input KTP').css({"color": "red", "font-size": "11px"});
                                // }
                                if (cart.npwp_type == "PKP") 
                                {
                                    if (cart.npwp_number == "") 
                                    {
                                        // alert('Please Input NPWP Number')
                                        $('.npwp_number-error').append('Please Input NPWP Number').css({"color": "red", "font-size": "11px"});
                                    } 

                                    if (cart.valnpwp == "NPWP number of at least 15 digits") 
                                    {
                                        $('.npwp_number-error').append('NPWP number of at least 15 digits').css({"color": "red", "font-size": "11px"});
                                    }
                                }
                                if (cart.outlet_type == 2 || cart.outlet_type == 6) 
                                {
                                    if (cart.outlet_name == "") 
                                    {
                                        $('.outlet_name-error').append('Please Input Outlet Name').css({"color": "red", "font-size": "11px"});
                                        return false;
                                    }
                                }
                                if (cart.valemail == "Please enter valid email address") 
                                {
                                    $('.email-error').empty();
                                    $('.email-error').append('Please enter valid email address').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.valmp == "Mobile number of at least 10 digits") 
                                {
                                    $('.no_hp-error').empty();
                                    $('.no_hp-error').append('Mobile number of at least 10 digits').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.valktp == "ID KTP must be 16 digits") 
                                {
                                    $('.idktp-error').empty();
                                    $('.idktp-error').append('ID KTP must be 16 digits').css({"color": "red", "font-size": "11px"});
                                }
                                return false;
                            }
                            break;
                        case 2:
                            cart['stockpoint'] = $('[name="stockpoint_id"]').val();
                            cart['address']    = $('[name="alamat"]').val();
                            cart['province']   = $('[name="provinsi"]').val();
                            cart['city']       = $('[name="kota"]').val();
                            cart['kecamatan']  = $('[name="kecamatan"]').val();
                            cart['kelurahan']  = $('[name="kelurahan"]').val();
                            cart['valzc']      = $('.zipcode-error').text();
                            $('.stockpoint-error').empty();
                            $('.address-error').empty();
                            $('.province-error').empty();
                            $('.city-error').empty();
                            $('.district-error').empty();
                            $('.subdistrict-error').empty();
                            $('.zipcode-error').empty();

                            if (cart.stockpoint == '' || cart.address == '' || cart.province == '' || cart.province == null || cart.city == '' || cart.city == null || cart.kecamatan == '' || cart.kecamatan == null || cart.kelurahan == '' || cart.kelurahan == null || cart.valzc == "Zipcode of at least 5 digits") 
                            {
                                if (cart.stockpoint == "") 
                                {
                                    // alert('Please Select Stockpoint')
                                    $('.stockpoint-error').append('Please Select Stockpoint').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.address == "") 
                                {
                                    // alert('Please Input Address')
                                    $('.address-error').append('Please Input Address').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.province == "" || cart.province == null) 
                                {
                                    // alert('Please Input Province')
                                    $('.province-error').append('Please Select Province').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.city == "" || cart.city == null) 
                                {
                                    // alert('Please Input City')
                                    $('.city-error').append('Please Select City').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.kecamatan == "" || cart.kecamatan == null) 
                                {
                                    // alert('Please Input Kecamatan')
                                    $('.district-error').append('Please Select Kecamatan').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.kelurahan == "" || cart.kelurahan == null) 
                                {
                                    // alert('Please Input Kelurahan')
                                    $('.subdistrict-error').append('Please Select Kelurahan').css({"color": "red", "font-size": "11px"});
                                }
                                if (cart.valzc == "Zipcode of at least 5 digits") 
                                {
                                    $('.zipcode-error').append('Zipcode of at least 5 digits').css({"color": "red", "font-size": "11px"});
                                }

                                return false;
                            } else {
                                if (cart.valzc == "Zipcode of at least 5 digits") 
                                {
                                    $('.zipcode-error').append('Zipcode of at least 5 digits').css({"color": "red", "font-size": "11px"});
                                } else {

                                    confirmsave();
                                }
                            }
                            
                            break;       
                    }
            },
            onPrevious: function(tab, navigation, index) {
                var current = index + 1;
                switch(index)
                {
                    case 2:
                        cart.refforder = null
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