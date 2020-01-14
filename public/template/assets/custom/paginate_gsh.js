
var selection_pro = [];

function xhrr_getdata(table, url, page, modul='') {
        // body...
        if (window.XMLHttpRequest) {
            // code for modern browsers
            xmlhttp = new XMLHttpRequest();
         } else {
            // code for old IE browsers
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        var selectedData = localforage.getItem(modul);
        console.log(selectedData)
        if(selectedData) {
            
            var myArr = JSON.parse(selectedData);
            
            for(var i in myArr){                
                          table.row.add(myArr[i]).draw();
                        }
        }else{

            xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var response = JSON.parse(this.responseText);

                    var myArr   = response.data;

                    localforage.setItem(modul, JSON.stringify(myArr)); 
                        for(var i in myArr){                
                          table.row.add(myArr[i]).draw();
                        }


                    // if(response.current_page != response.last_page){
                    //     xhr_getdata(table, url, (page + 1))
                    //     // console.log(response.current_page+ ' ' + response.last_page)
                    // }
                }
            };
        }
            

        xmlhttp.open("GET", url, true);    
        xmlhttp.send();                    
}

function xhr_getvoucher(url, modul='', couponInput) {
  var subtotal     = $('.p-grandtotal').val();
      localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var array = $.map(response.data, function(value, index) {
                      return [value];
                    });
          var myArr    = array;
            $.each(myArr, function(i, obj){
                   if(couponInput === obj.name){
                       
                       var grandtotal   = subtotal - obj.discount_amount;
                       $('.p-grandtotal').val(grandtotal);
                       $('.p-coupon').val(obj.discount_amount);
                       $('[name="tcoupon"]').show();
                       cart['voucher'] = obj.discount_amount;
                       console.log(cart.voucher)
                   }

            })
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });
          }, function(error) {
             console.error("Failed!", error);
          })
      }else{
        var response = JSON.parse(response);
        $.each(response, function(i, obj){
          if(couponInput === obj.name){
                       
                       var grandtotal   = subtotal - obj.discount_amount;
                       $('.p-grandtotal').val(grandtotal);
                       $('.p-coupon').val(obj.discount_amount);
                       $('[name="tcoupon"]').show();
                       cart['voucher'] = obj.discount_amount;
                   }
        })

      }
    })


}
function xhr_getdatacity(url, modul='', prov)
{
  var prov_id  = Number(prov);
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;

          $('[name="city"]').empty()
          $.each(response.data, function(i, obj){

            if(obj.provinsi_id === prov_id)
            {
              $('[name="city"]').append('<option value="'+obj.id+'">'+obj.nama_kota+'</option>')
            }
            
          })
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });
          }, function(error) {
             console.error("Failed!", error);
          })
      }else{
        $('[name="city"]').empty()
        var response = JSON.parse(response);
        $.each(response, function(i, obj){
          if(obj.provinsi_id === prov_id)
          {
              $('[name="city"]').append('<option value="'+obj.id+'">'+obj.nama_kota+'</option>')
          }
        })

      }
    })
                   
}


function get(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

function postorder(url, data){	
	post(url, data).then(function(response){
		var response 	= JSON.parse(response)
		if(response.result === 1){
			cart['msg']=response.msg;
			console.log(response.data)
			confirmsucessOrder(response.data);
		} else {
			console.error("Failed!", JSON.stringify(response));
			cart['msg']=response;
			confirmFailedOrder();
		}
		
	}, function(error) {
		console.error("Failed!", error);		
	})
}


function post(url, data) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
	  
	var token = document.querySelector('meta[name="csrf-token"]').content;
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('POST', url);
	//Send the proper header information along with the request
	req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	req.setRequestHeader('X-CSRF-TOKEN', token);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send(data);
  });
}

function xhr_getdata(table, url, page, modul='', radios='') {
    // body...        

    localforage.getItem(prefix_app+modul).then(function(response) {        
        if(response === null){       
            get(url).then(function(response) {    
                    // console.log(response)
                    var response = JSON.parse(response);       
                    var myArr    = response.data;
                    localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];            

            get(url+'?updated_at='+lastarr.updated_at+'&id_merchant='+radios).then(function(response) {
                    var response = JSON.parse(response);
                    
                    var myArr    = response.data;

                    if(myArr.length > 1){                        
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }

                    localforage.setItem(prefix_app+modul, JSON.stringify(data)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })

            // addrowtotable(table, JSON.parse(response))
        }
    })
}

function addrowtotable(table,myArr) {
    // body...
    for(var i in myArr){                
       table.row.add(myArr[i]).draw();
    }
}

function xhr_getdataproduct(url, page, modul='', num, pilih) {
    // body...
    // console.log(i)
    var counter = num;
    // counter     = counter + 1;
    var div     = $("<tr />");

    $("[name='body-product']").append(div);

    localforage.getItem(prefix_app+modul).then(function(response) {
        if(response === null){
            // console.log(1)  
            console.log(url)          
            get(url).then(function(response) {                
                    var response = JSON.parse(response);
                    var array = $.map(response.data, function(value, index) {
                      return [value];
                    });
                    var myArr    = array;
                    localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      div.html(chooseproduct(counter, response));                                        
                      $('.select-product').select2({
                        placeholder: "Select a Product",
                        allowClear: true
                      });
                      // console.log(counter)
                      $.each(myArr, function(i, obj){
                        $('.select-product').append('\
                        <option value="'+obj.sku+'">'+obj.sku + ' - ' +obj.nama+'</option>\
                        ')
                      })
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];          
            // console.log(url)
            get(url+'?updated_at='+lastarr.updated_at).then(function(response) {
                    var response = JSON.parse(response);
                    var array = $.map(response.data, function(value, index) {
                      return [value];
                    });
                    var myArr    = array;

                    if(myArr.length > 1){
              
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }
                    
              
                    localforage.setItem(prefix_app+modul, JSON.stringify(data)).then(function (value) { 
                     
                      var test = div.html(chooseproduct(counter, data));
                      var selection   = $(test).find( ".select-product" )
                                            
                      selection.select2({
                        placeholder: "Select a Product",
                        allowClear: true
                      });
                      $.each(data, function(i, obj){
                          selection.append('<option value="'+obj.sku+'">'+obj.sku + ' - ' +obj.nama+'</option>')
                        // if(pilih.includes(obj.nama)){
                        //     selection.append('\
                        // <option value="'+obj.nama+'" disabled>'+obj.sku+' - '+obj.nama+'</option>\
                        // ')
                        // }else{
                        //     selection.append('\
                        // <option value="'+obj.nama+'">'+obj.sku+' - '+obj.nama+'</option>\
                        // ')
                        // }
                        
                      })
                        // i++;
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })
        }
    })
}

function xhr_getdataproductvosp(url, page, modul='', num, pilih, merchant_id) {
    // body...
    // console.log(i)
    var counter = num;
    // counter     = counter + 1;
    var div     = $("<tr />");

    $("[name='body-product']").append(div);

    localforage.getItem(prefix_app+modul).then(function(response) {
        if(response === null){
            // console.log(1)  
            console.log(url)          
            get(url+'?merchant_id='+merchant_id).then(function(response) {                
                    var response = JSON.parse(response);
                    var array = $.map(response.data, function(value, index) {
                      return [value];
                    });
                    var myArr    = array;
                    localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      div.html(chooseproduct(counter, response));                                        
                      $('.select-product').select2({
                        placeholder: "Select a Product",
                        allowClear: true
                      });
                      // console.log(counter)
                      $.each(myArr, function(i, obj){
                        $('.select-product').append('\
                        <option value="'+obj.sku+'">'+obj.sku + ' - ' +obj.nama+'</option>\
                        ')
                      })
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];          
            // console.log(url)
            get(url+'?updated_at='+lastarr.updated_at+'&merchant_id='+merchant_id).then(function(response) {
                    var response = JSON.parse(response);
                    var array = $.map(response.data, function(value, index) {
                      return [value];
                    });
                    var myArr    = array;

                    if(myArr.length > 1){
              
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }
                    
              
                    localforage.setItem(prefix_app+modul, JSON.stringify(data)).then(function (value) { 
                     
                      var test = div.html(chooseproduct(counter, data));
                      var selection   = $(test).find( ".select-product" )
                                            
                      selection.select2({
                        placeholder: "Select a Product",
                        allowClear: true
                      });
                      $.each(data, function(i, obj){
                          selection.append('<option value="'+obj.sku+'">'+obj.sku + ' - ' +obj.nama+'</option>')
                        // if(pilih.includes(obj.nama)){
                        //     selection.append('\
                        // <option value="'+obj.nama+'" disabled>'+obj.sku+' - '+obj.nama+'</option>\
                        // ')
                        // }else{
                        //     selection.append('\
                        // <option value="'+obj.nama+'">'+obj.sku+' - '+obj.nama+'</option>\
                        // ')
                        // }
                        
                      })
                        // i++;
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })
        }
    })
}
var subdistrict=[];
function xhr_getdataspCoverage(url, modul='', kel, action)
{
  var kel_id = Number(kel);
  console.log(kel_id)
  localforage.getItem(prefix_app+'subdistrict').then(function(response) {
      var response = JSON.parse(response);
      $.each(response, function(i, obj){
        if(obj.id === kel_id)
        {
          subdistrict['kode_kelurahan'] = obj.kode_kelurahan;
           console.log(obj)
        }
      })

      $.ajax({
      type   : "POST",
      url    : url,
      data   : 'kode_kelurahan='+subdistrict.kode_kelurahan,
      success: function(response){
          var response = JSON.parse(response);
          var myArr = response.data;
          console.log(myArr)
          if(myArr != null)
          {
            if(action ===  'post_newcustomer')
            {
              post_newcustomer(myArr.stockpoint_id)
            }else{
              postnewshipping(myArr.stockpoint_id)
            }
          }else{
             $('.alert-msg').html('')
             $('.cov-alert-msg').html('')

             $('.alert-msg').append('<div class="alert alert-info">\
                       Coverage Not Found\
                      </div>')  
             $('.cov-alert-msg').append('<div class="alert alert-info">\
                       Coverage Not Found\
                      </div>')         
             
          }
      }
    })
  })                     
}


function xhr_getdataprovince(url, modul='')
{
    new_shippingaddress()
    localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;
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
          // end tes style
          $.each(response.data, function(i, obj){
            $('[name="province"]').append('<option value="'+obj.id+'">'+obj.nama_provinsi+'</option>')
          })
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });
          }, function(error) {
             console.error("Failed!", error);
          })
      }else{
        var response = JSON.parse(response);
        $('.province').select2({
          placeholder: "Select Province",
          dropdownParent: $('#modal-public')
        });
        // tes style
        $('.city').select2({
          placeholder: "Select City",
          dropdownParent: $('#modal-public')
        });
        $('[name="district"]').select2({
          placeholder: "Kecamatan",
            dropdownParent: $('#modal-public')
          });
        $('[name="subdistrict"]').select2({
          placeholder: "Kelurahan",
            dropdownParent: $('#modal-public')
          });
        // end tes style

        $.each(response, function(i, obj){
          $('.province').append('<option value="'+obj.id+'">'+obj.nama_provinsi+'</option>')
          // $('[name="province"]').append('<option value="'+obj.id+'">'+obj.nama_provinsi+'</option>')
        })

      }
    })


}
function xhr_getdatacity(url, modul='', prov)
{
  var prov_id  = Number(prov);
  console.log(prov_id)
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;

          $('[name="city"]').empty()
          $('.city').select2({
            placeholder: "Select City",
            dropdownParent: $('#modal-public')
          });
          $('[name="city"]').append('<option disabled selected value="">Select City</option>')
          $.each(response.data, function(i, obj){
            if(obj.provinsi_id === prov_id)
            {
              $('[name="city"]').append('<option value="'+obj.id+'">'+obj.nama_kota+'</option>')
            }
            
          })
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });
          }, function(error) {
             console.error("Failed!", error);
          })
      }else{
        $('[name="city"]').empty()
        var response = JSON.parse(response);
        $('[name="city"]').select2({
          dropdownParent: $('#modal-public')
        });
        $('[name="city"]').append('<option disabled selected value="">Select City</option>')
        $.each(response, function(i, obj){
          
          if(obj.provinsi_id === prov_id)
          {
              $('[name="city"]').append('<option value="'+obj.id+'">'+obj.nama_kota+'</option>')
          }
        })

      }
    })
}

function xhr_getdatadistrict(url, modul='', city)
{
  var city_id  = Number(city);
  $('[name="district"]').empty()
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;

          $('[name="district"]').select2({
            dropdownParent: $('#modal-public')
          });
          $('[name="district"]').append('<option disabled selected value="">Kecamatan</option>')
          $.each(response.data, function(i, obj){
            if(obj.kota_id === city_id)
            {
              $('[name="district"]').append('<option value="'+obj.id+'">'+obj.nama_kecamatan+'</option>')
            }
            
          })
            localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      }).catch(function(err) {                  
                        console.log(err);
                      });
            }, function(error) {
               console.error("Failed!", error);
          })
      }else{
        var response = JSON.parse(response);
        $('[name="district"]').select2({
            dropdownParent: $('#modal-public')
        });
        $('[name="district"]').append('<option disabled selected value="">Kecamatan</option>')
        $.each(response, function(i, obj){
          if(obj.kota_id === city_id)
          {
              $('[name="district"]').append('<option value="'+obj.id+'">'+obj.nama_kecamatan+'</option>')
          }
        })

      }
    })
}

function xhr_getdatasubdistrict(url, modul='', district)
{
  var district_id  = Number(district);
  $('[name="subdistrict"]').empty()
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;
          $('[name="subdistrict"]').select2({
            dropdownParent: $('#modal-public')
          });
          $('[name="subdistrict"]').append('<option disabled selected value="">Kelurahan</option>')
          $.each(response.data, function(i, obj){
            if(obj.kecamatan_id === district_id)
            {
              $('[name="subdistrict"]').append('<option value="'+obj.id+'">'+obj.nama_kelurahan+'</option>')
            }
            
          })
            localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      }).catch(function(err) {                  
                        console.log(err);
                      });
            }, function(error) {
               console.error("Failed!", error);
          })
      }else{
        var response = JSON.parse(response);
        $('[name="subdistrict"]').select2({
            dropdownParent: $('#modal-public')
        });
        $('[name="subdistrict"]').append('<option disabled selected value="">Kelurahan</option>')
        $.each(response, function(i, obj){
          if(obj.kecamatan_id === district_id)
          {
              $('[name="subdistrict"]').append('<option value="'+obj.id+'">'+obj.nama_kelurahan+'</option>')
              var nama_kelurahan = obj.nama_kelurahan;
          }
        })

      }
    })
}
function xhr_getdatasubdistrictforcust(url, modul='', district)
{
  var district_id  = Number(district);
  $('[name="subdistrict"]').empty().append('<option disabled selected>Choose Kelurahan</option>')
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;
          
          $.each(response.data, function(i, obj){
            if(obj.kecamatan_id === district_id)
            {
              $('[name="subdistrict"]').append('<option value="'+obj.id+'">'+obj.nama_kelurahan+'</option>')
            }
            
          })
            localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      }).catch(function(err) {                  
                        console.log(err);
                      });
            }, function(error) {
               console.error("Failed!", error);
          })
      }else{
        var response = JSON.parse(response);
        
        $.each(response, function(i, obj){
          if(obj.kecamatan_id === district_id)
          {
              $('[name="subdistrict"]').append('<option value="'+obj.id+'">'+obj.nama_kelurahan+'</option>')
              var nama_kelurahan = obj.nama_kelurahan;
          }
        })

      }
    })
}
function xhr_getdatamyorder(table, url, page, modul='') {
    // body...        

    localforage.getItem(prefix_app+modul).then(function(response) {        
        if(response === null){       
            get(url).then(function(response) {    
                    var response = JSON.parse(response);       
                    var myArr    = response.data;
                    var myArr    = myArr.data;
                    table.clear()
                    localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            localforage.removeItem(prefix_app+modul);
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];            

            get(url).then(function(response) {
                    var response = JSON.parse(response);
                    
                    var myArr    = response.data;
                    var myArr    = myArr.data;

                    if(myArr.length > 1){                        
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }
                    table.clear()
                    localforage.setItem(prefix_app+modul, JSON.stringify(data)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })

            // addrowtotable(table, JSON.parse(response))
        }
    })
}

function xhr_getdataorderppal(table, url, page) {
    // body...        
    console.log(page)
    localforage.getItem(prefix_app).then(function(response) {        
        if(response === null){       
            get(url).then(function(response) {    
                    var response = JSON.parse(response);       
                    var myArr    = response.data;
                    localforage.setItem(prefix_app, JSON.stringify(myArr)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            localforage.removeItem(prefix_app);
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];            

            get(url).then(function(response) {
                    var response = JSON.parse(response);
                    
                    var myArr    = response.data;
                    // var myArr    = myArr.data;

                    if(myArr.length > 1){                        
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }

                    localforage.setItem(prefix_app, JSON.stringify(data)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })

            // addrowtotable(table, JSON.parse(response))
        }
    })
}

function xhr_getdatamerchant(url, page, modul='') {
    // body...        

    localforage.getItem(prefix_app+modul).then(function(response) {        
        if(response === null){       
            get(url).then(function(response) {    
                    // console.log(response)
                    var response = JSON.parse(response);       
                    var myArr    = response.data;
                    localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      merchantList(JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];            

            get(url+'?updated_at='+lastarr.updated_at).then(function(response) {
                    var response = JSON.parse(response);
                    
                    var myArr    = response.data;

                    if(myArr.length > 1){                        
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }

                    localforage.setItem(prefix_app+modul, JSON.stringify(data)).then(function (value) {                      
                      merchantList(JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })

            // addrowtotable(table, JSON.parse(response))
        }
    })
}

function xhr_getdatacitycust(url, modul='', prov)
{
  var prov_id  = Number(prov);
  $('[name="city"]').empty()
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;

          // $('[name="city"]').empty()
          $('[name="city"]').append('<option disabled selected value="">City</option>')
          $('[name="district"]').empty().append('<option disabled selected>Choose Kecamatan</option>')
          $('[name="subdistrict"]').empty().append('<option disabled selected>Choose Kelurahan</option>')
          $.each(response.data, function(i, obj){

            if(obj.provinsi_id === prov_id)
            {
              $('[name="city"]').append('<option value="'+obj.id+'">'+obj.nama_kota+'</option>')
            }
            
          })
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });
          }, function(error) {
             console.error("Failed!", error);
          })
      }else{
        $('[name="city"]').append('<option disabled selected value="">City</option>')
        $('[name="district"]').empty().append('<option disabled selected>Choose Kecamatan</option>')
        $('[name="subdistrict"]').empty().append('<option disabled selected>Choose Kelurahan</option>')
        var response = JSON.parse(response);
        $.each(response, function(i, obj){
          if(obj.provinsi_id === prov_id)
          {
              $('[name="city"]').append('<option value="'+obj.id+'">'+obj.nama_kota+'</option>')
          }
        })

      }
    })
                   
}

function xhr_getdatadistrictcust(url, modul='', city)
{
  var city_id  = Number(city);
  $('[name="district"]').empty()
  localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;

          // $('[name="district"]').select2({
          //   dropdownParent: $('#modal-public')
          // });
          $('[name="district"]').append('<option disabled selected value="">Kecamatan</option>')
          $('[name="subdistrict"]').append('<option disabled selected value="">Kelurahan</option>')
          $('[name="subdistrict"]').empty()
          $.each(response.data, function(i, obj){
            if(obj.kota_id === city_id)
            {
              $('[name="district"]').append('<option value="'+obj.id+'">'+obj.nama_kecamatan+'</option>')
            }
            
          })
            localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      }).catch(function(err) {                  
                        console.log(err);
                      });
            }, function(error) {
               console.error("Failed!", error);
          })
      }else{
        var response = JSON.parse(response);
        // $('[name="district"]').select2({
        //     dropdownParent: $('#modal-public')
        // });
        $('[name="district"]').append('<option disabled selected value="">Kecamatan</option>')
        $('[name="subdistrict"]').append('<option disabled selected value="">Kelurahan</option>')
        $('[name="subdistrict"]').empty()
        $.each(response, function(i, obj){
          if(obj.kota_id === city_id)
          {
              $('[name="district"]').append('<option value="'+obj.id+'">'+obj.nama_kecamatan+'</option>')
          }
        })

      }
    })
}


function xhr_getdataprovincecust() {
  return new Promise(function (resolve, reject) {
    var modul   = 'province';
    var url     = base_url+'/coverage/province-list';

      localforage.getItem(prefix_app+modul).then(function(response) {
        if(response === null){
          get(url).then(function(response){
            var response = JSON.parse(response); 
            var myArr    = response.data;
            
            localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      }).catch(function(err) {                  
                        console.log(err);
                      });

            resolve(myArr);

            }, function(error) {
               console.error("Failed!", error);
            })

        }else{

          var response = JSON.parse(response);        
          resolve(response)
          
        }
      })
  })
} 


function xhr_getdatacistiescust() {
  return new Promise(function (resolve, reject) {
  var modul   = 'cities';
  var url     = base_url+'/coverage/city-list';

    localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;
          
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });

          resolve(myArr);

          }, function(error) {
             console.error("Failed!", error);
          })

      }else{

        var response = JSON.parse(response);        
        resolve(response)
        
      }
    })
  })
} 


function xhr_getdatadistrictescust() {
  return new Promise(function (resolve, reject) {
  var modul   = 'districtes';
  var url     = base_url+'/coverage/district-list';

    localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;
          
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });

          resolve(myArr);

          }, function(error) {
             console.error("Failed!", error);
          })

      }else{

        var response = JSON.parse(response);        
        resolve(response)
        
      }
    })
  })
} 


function xhr_getdatasubdistrictescust() {
  return new Promise(function (resolve, reject) {
  var modul   = 'subdistrictes';
  var url     = base_url+'/coverage/subdistrict-list';

    localforage.getItem(prefix_app+modul).then(function(response) {
      if(response === null){
        get(url).then(function(response){
          var response = JSON.parse(response); 
          var myArr    = response.data;
          
          localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                    }).catch(function(err) {                  
                      console.log(err);
                    });

          resolve(myArr);

          }, function(error) {
             console.error("Failed!", error);
          })

      }else{

        var response = JSON.parse(response);        
        resolve(response)
        
      }
    })
  })
} 

function xhr_getpaymentMethod(){
  return new Promise(function (resolve, reject) {
    var modul   = 'payment-method';
    var url     = base_url+'/orderstockpoint/payment-method';

      localforage.getItem(prefix_app+modul).then(function(response) {
        if(response === null){
          get(url).then(function(response){
            var response = JSON.parse(response); 
            var myArr    = response.data;
            
            localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {                      
                      }).catch(function(err) {                  
                        console.log(err);
                      });

            resolve(myArr);

            }, function(error) {
               console.error("Failed!", error);
            })

        }else{
          // console.log('masuk sini')
          var response = JSON.parse(response);        
          resolve(response)
          
        }
      })
  })
} 

function postGRN(url, data){ 
  var grn = []; 
  $('.pace').removeClass('pace-inactive');
  $('.pace').addClass('pace-active');
  post(url, data).then(function(response){
    $('.pace').removeClass('pace-active');
    $('.pace').addClass('pace-inactive');
    var response  = JSON.parse(response)
    if(response.result === 1){
      grn['msg']=response.msg;
      confirmsucess(response);
    } else {
      console.error("Failed!", JSON.stringify(response));
      grn['msg']=response;
      confirmFailed();
    }
    
  }, function(error) {
    $('.pace').removeClass('pace-active');
    $('.pace').addClass('pace-inactive');
    console.error("Failed!", error);    
  })
}

function xhr_getdatavosp(table, url, page, modul='', kode_sp) {
    // body...      
    localforage.getItem(prefix_app+modul).then(function(response) {        
        if(response === null){   
        
            get(url +'?kode_sp='+kode_sp).then(function(response) {    
                    // console.log(response)
                    var response = JSON.parse(response);       
                    var myArr    = response.data;
                    localforage.setItem(prefix_app+modul, JSON.stringify(myArr)).then(function (value) {
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });
                }, function(error) {
                    console.error("Failed!", error);
                })                
        } else {
            var data     = JSON.parse(response);
            var lastarr  = data[data.length - 1];            
            // '?updated_at='+lastarr.updated_at+ +'?kode_sp='+kode_sp
            get(url +'?kode_sp='+kode_sp).then(function(response) {
                    
                    var response = JSON.parse(response);
                    
                    var myArr    = response.data;

                    if(myArr.length > 1){                        
                        for (var i in myArr) {                          
                          for (var j in data){
                            if(data[j].id == myArr[i].id){                              
                              data.splice(j, 1)          
                              data.push(myArr[i])                              
                              break; //Stop this loop, we found it!
                            }
                          }
                        }
                    }

                    localforage.setItem(prefix_app+modul, JSON.stringify(data)).then(function (value) {                      
                      addrowtotable(table, JSON.parse(value))
                    }).catch(function(err) {                  
                      console.log(err);
                    });

            }, function(error) {
                console.error("Failed!", error);
            })

            addrowtotable(table, JSON.parse(response))
        }
    })
}

function postordervosp(url, data){  
  post(url, data).then(function(response){
    // console.log(response)
    var response  = JSON.parse(response)
    if(response.result === 1){
      cart['msg']=response.msg;
      
      confirmsucessOrderVOSP(response.data);
    } else {
      console.error("Failed!", JSON.stringify(response));
      cart['msg']=response;
      confirmFailedOrderVOSP();
    }
    
  }, function(error) {
    console.error("Failed!", error);    
  })
}

function xhr_getdatastockpointvosp() {
  return new Promise(function (resolve, reject) {
    var url     = base_url+'/ordervosp/stockpoint-vosp';
    get(url).then(function(response){
        var response = JSON.parse(response); 
        var myArr    = response.data;         

        resolve(myArr);

    }, function(error) {
        console.error("Failed!", error);
    })
  })
} 

function xhr_getdataprovinsivosp() {
  return new Promise(function (resolve, reject) {
    var url     = base_url+'/ordervosp/provinsi-vosp';
    get(url).then(function(response){
        var response = JSON.parse(response); 
        var myArr    = response.data;         

        resolve(myArr);

    }, function(error) {
        console.error("Failed!", error);
    })
  })
} 

function xhr_getdatakelurahanvosp() {
  return new Promise(function (resolve, reject) {
  var url     = base_url+'/ordervosp/kelurahan-vosp';
  get(url).then(function(response){
      var response = JSON.parse(response); 
      var myArr    = response.data;         

      resolve(myArr);

  }, function(error) {
      console.error("Failed!", error);
    })
  })
} 

  

