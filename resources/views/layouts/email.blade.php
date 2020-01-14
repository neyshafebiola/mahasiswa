<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />

<style>
    
    @media only screen and (min-width: 906px) {
        table tr td {
            padding: 2px 0px;
        }
        .logo {
            width: 60%;
        }
        .alamat {
            width:40%;
            padding:0px 15px;
        }
        .image-logo {
            width: 50%;
        }

        
    }
    
    @media only screen and (max-width: 905px) {
        table tr td {
            padding: 2px 0px;
        }
        .logo {
            width: 60%;
        }
        .alamat {
            width:40%;
            padding:0px 5px;
        }
        .image-logo {
            width: 50%;
        }
        

      }

    @media only screen and (max-width: 700px) {
        table tr td {
            padding: 2px 0px;
        }
        .logo {
            width: 50%;
        }
        .alamat {
            width:50%;
            padding:0px 0px;
        }
        .image-logo {
            width: 75%;
        }

      }


</style>

</head>
<body>
<!-- Begin wrapper table -->


<table width="100%" cellpadding="0" cellspacing="0" border="0" id="background-table">
    <tr>
        <td valign="top" class="container-td" align="center">
            <table bgcolor="white" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" class="container-table" >
                <tr>
                    <td>
                        <table cellpadding="0" cellspacing="0" border="0" class="logo-container">
                            <tr>
                                <td class="logo">
                                    <!-- <a href="">
                                        <img src="http://idmarco.com/media/photoemail/Template%20Konfirmasi%20Verifikasi%20Pendaftaran.png" class="image-logo" 
                                            border="0" width="150px" />
                                    </a> -->
                                </td>                            
                                <td class ="alamat" align="right" > 
                                    <br> <br>Ada Pertanyaan? Hubungi kami di: <br>Email: halo@idmarco.co.id <br>Telp: (021) 8066 8889 <br>Senin - Jumat pukul 08.00-18.00 WIB <br></td> 
                                <td align="right"><h3 style="color:white">_</h3></td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td valign="top" class="top-content">
                    <!-- Begin Content -->

                        <center>
                        <!-- <img src="http://idmarco.com/media/photoemail/garis%20atas.png" width="96%">  -->
                        </center>

                        @yield('content')

                                      
                                    </td>
                                </tr>
                            </table>
                            <!-- <a href= "https://www.idmarco.com/topskor-web" target="_blank"></a>
                             -->

                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                <tr>
                          <td align="center">
                            <!-- <img src="http://idmarco.com/media/photoemail/garis%20bawah.png" width="100%"> -->
                        </td>
                      </tr>
                                      <td align="right" colspan="5" style="font-family: Segoe UI; font-size: 11px;">*Email ini dibuat secara otomatis. Mohon untuk tidak mengirimkan balasan ke email ini</td>
                                  </tr>
                              </table>
                          </td>
                      </tr>
                  </table>
             </td>    
          </td>                    
     </tr>    
 </td>
</tr>
</table>
</body>
</html>