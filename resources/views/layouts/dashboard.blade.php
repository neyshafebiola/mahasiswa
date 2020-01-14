<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
    <meta charset="utf-8" />
    <title>Pages - Admin Dashboard UI Kit - Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no" />
    <link rel="apple-touch-icon" href="{{asset('template/pages/ico/60.png')}}">
    <link rel="apple-touch-icon" sizes="76x76" href="{{asset('template/pages/ico/76.png')}}">
    <link rel="apple-touch-icon" sizes="120x120" href="{{asset('template/pages/ico/120.png')}}">
    <link rel="apple-touch-icon" sizes="152x152" href="{{asset('template/pages/ico/152.png')}}">
    <link rel="icon" type="image/x-icon" href="{{asset('template/favicon.ico')}}" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-touch-fullscreen" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta content="" name="description" />
    <meta content="" name="author" />
    <link href="{{asset('template/assets/plugins/pace/pace-theme-flash.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('template/assets/plugins/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('template/assets/plugins/font-awesome/css/font-awesome.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('template/assets/plugins/jquery-scrollbar/jquery.scrollbar.css')}}" rel="stylesheet" type="text/css" media="screen" />
    <link href="{{asset('template/assets/plugins/select2/css/select2.min.css')}}" rel="stylesheet" type="text/css" media="screen" />
    <link href="{{asset('template/assets/plugins/switchery/css/switchery.min.css')}}" rel="stylesheet" type="text/css" media="screen" />'
    <link href="{{asset('template/assets/plugins/nvd3/nv.d3.min.css')}}" rel="stylesheet" type="text/css" media="screen" />
    <link href="{{asset('template/assets/plugins/mapplic/css/mapplic.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('template/assets/plugins/rickshaw/rickshaw.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('template/assets/plugins/bootstrap-datepicker/css/datepicker3.css')}}" rel="stylesheet" type="text/css" media="screen">
    <link href="{{asset('template/assets/plugins/jquery-metrojs/MetroJs.css')}}" rel="stylesheet" type="text/css" media="screen" />
    <link href="{{asset('template/pages/css/pages-icons.css')}}" rel="stylesheet" type="text/css">
    <link class="main-stylesheet" href="{{asset('template/pages/css/pages.css')}}" rel="stylesheet" type="text/css" />

    @stack('style')

  </head>
  <body class="fixed-header dashboard">
    <!-- BEGIN SIDEBPANEL-->
    <nav class="page-sidebar" data-pages="sidebar">
      <!-- BEGIN SIDEBAR MENU TOP TRAY CONTENT-->
      <!-- END SIDEBAR MENU TOP TRAY CONTENT-->
      <!-- BEGIN SIDEBAR MENU HEADER-->
      <div class="sidebar-header">
        <img src="{{asset('template/assets/img/logo_white.png')}}" alt="logo" class="brand" data-src="{{asset('template/assets/img/logo_white.png')}}" data-src-retina="{{asset('template/assets/img/logo_white_2x.png')}}" width="78" height="22">
        <div class="sidebar-header-controls">
         <!--  <button type="button" class="btn btn-link hidden-md-down" data-toggle-pin="sidebar"><i class="fa fs-12"></i>
          </button> -->
        </div>
      </div>
      <!-- END SIDEBAR MENU HEADER-->
      <!-- START SIDEBAR MENU -->
      <div class="sidebar-menu">
        <!-- BEGIN SIDEBAR MENU ITEMS-->
        <ul class="menu-items">
          <li class="m-t-30 ">
            <a href="{{url('/home')}}" class="detailed">
              <span class="title">Dashboard</span>
             <!--  <span class="details">12 New Updates</span> -->
            </a>
            <span class="bg-success icon-thumbnail"><i class="pg-home"></i></span>
          </li>
          <li class="">
            <a href="{{ route('dosen.index') }}" class="detailed">
              <span class="title">Dosen</span>
              <!-- <span class="details">234 New Emails</span> -->
            </a>
            <span class="icon-thumbnail">D</span>
          </li>
          <li class="">
            <a href="{{ route('mahasiswa.index') }}"><span class="title">Mahasiswa</span></a>
            <span class="icon-thumbnail">M</span>
          </li>
          <li class="">
            <a href="{{ route('matakuliah.index') }}"><span class="title">Mata Kuliah</span></a>
            <span class="icon-thumbnail"><i class="pg-note"></i></span>
          </li>
          <li class="">
            <a href="{{ route('nilai.index') }}"><span class="title">Laporan Nilai</span></a>
            <span class="icon-thumbnail"><i class="pg-tables"></i></span>
          </li>
      
      
            </ul>
          </li>
        </ul>
        <div class="clearfix"></div>
      </div>
      <!-- END SIDEBAR MENU -->
    </nav>
    <!-- END SIDEBAR -->
    <!-- END SIDEBPANEL-->
    <!-- START PAGE-CONTAINER -->
    <div class="page-container ">
      <!-- START HEADER -->
      <div class="header ">
        <!-- START MOBILE SIDEBAR TOGGLE -->
        <a href="#" class="btn-link toggle-sidebar hidden-lg-up pg pg-menu" data-toggle="sidebar">
        </a>
        <!-- END MOBILE SIDEBAR TOGGLE -->
        <div class="">
          <div class="brand inline   ">
            <img src="{{asset('template/assets/img/logo_2x.png')}}" alt="logo" data-src="{{asset('template/assets/img/logo_2x.png')}}" data-src-retina="{{asset('template/assets/img/logo_2x.png')}}" width="78" height="22">
          </div>
          <!-- START NOTIFICATION LIST -->
         
          <!-- END NOTIFICATIONS LIST -->
         
        </div>
        <div class="d-flex align-items-center">
          <!-- START User Info-->
          <div class="pull-left p-r-10 fs-14 font-heading hidden-md-down">
            @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item">
                                <a id="semi-bold" class="text-master" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                
                            </li>
              @endguest
            <!-- <span class="semi-bold">David</span> <span class="text-master">Nest</span> -->
          </div>
          <div class="dropdown pull-right hidden-md-down">
            <button class="profile-dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="thumbnail-wrapper d32 circular inline">
              <img src="{{asset('template/assets/img/profiles/avatar.jpg')}}" alt="" data-src="{{asset('template/assets/img/profiles/avatar.jpg')}}" data-src-retina="{{asset('template/assets/img/profiles/avatar_small2x.jpg')}}" width="32" height="32">
              </span>
            </button>
            <div class="dropdown-menu dropdown-menu-right profile-dropdown" role="menu">
              <a href="#" class="dropdown-item"><i class="pg-settings_small"></i> Settings</a>
              <a href="#" class="dropdown-item"><i class="pg-outdent"></i> Feedback</a>
              <a href="#" class="dropdown-item"><i class="pg-signals"></i> Help</a>
              <a href="#" class="clearfix bg-master-lighter dropdown-item">
                <!-- <span class="pull-left">Logout</span> -->

                     <span class="pull-left" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                      </span>

                      <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                             @csrf
                      </form>
                      

                <span class="pull-right"><i class="pg-power"></i></span>
              </a>
            </div>
          </div>
          <!-- END User Info-->
          
        </div>
      </div>
      <!-- END HEADER -->
      <!-- START PAGE CONTENT WRAPPER -->
      <div class="page-content-wrapper ">
        <!-- START PAGE CONTENT -->
        <div class="content sm-gutter">
          <!-- START CONTAINER FLUID -->
          <div class="container-fluid padding-25 sm-padding-10">
            <!-- START ROW -->

            @yield('content')

          <!-- END PAGE CONTENT -->
          <!-- START COPYRIGHT -->
          <!-- START CONTAINER FLUID -->
          <!-- START CONTAINER FLUID -->
          <!-- END COPYRIGHT -->
        </div>
        <!-- END PAGE CONTENT WRAPPER -->
      </div>
    </div>
      <!-- END PAGE CONTAINER -->
      <!--START QUICKVIEW -->
   
    <!-- END QUICKVIEW-->
    <!-- START OVERLAY -->
    <!-- END OVERLAY -->
    <!-- BEGIN VENDOR JS -->

    
    
    <script src="{{asset('template/assets/plugins/pace/pace.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery/jquery-1.11.1.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/modernizr.custom.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-ui/jquery-ui.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/tether/js/tether.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/bootstrap/js/bootstrap.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery/jquery-easy.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-unveil/jquery.unveil.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-ios-list/jquery.ioslist.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-actual/jquery.actual.min.js')}}"></script>
    <script src="{{asset('template/assets/plugins/jquery-scrollbar/jquery.scrollbar.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('template/assets/plugins/select2/js/select2.full.min.js')}}"></script>
    <script type="text/javascript" src="{{asset('template/assets/plugins/classie/classie.js')}}"></script>
    <script src="{{asset('template/assets/plugins/switchery/js/switchery.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/lib/d3.v3.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/nv.d3.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/src/utils.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/src/tooltip.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/src/interactiveLayer.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/src/models/axis.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/src/models/line.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/nvd3/src/models/lineWithFocusChart.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/mapplic/js/hammer.js')}}"></script>
    <script src="{{asset('template/assets/plugins/mapplic/js/jquery.mousewheel.js')}}"></script>
    <script src="{{asset('template/assets/plugins/mapplic/js/mapplic.js')}}"></script>
    <script src="{{asset('template/assets/plugins/rickshaw/rickshaw.min.js')}}"></script>
    <script src="{{asset('template/assets/plugins/jquery-metrojs/MetroJs.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-sparkline/jquery.sparkline.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/skycons/skycons.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.js')}}" type="text/javascript"></script>
    <!-- END VENDOR JS -->
    <!-- BEGIN CORE TEMPLATE JS -->
    <script src="{{asset('template/pages/js/pages.min.js')}}"></script>
    <!-- END CORE TEMPLATE JS -->
    <!-- BEGIN PAGE LEVEL JS -->
    <script src="{{asset('template/assets/js/dashboard.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/js/scripts.js')}}" type="text/javascript"></script>
    <!-- END PAGE LEVEL JS -->
    @stack('script')
  </body>
</html>