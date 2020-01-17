@extends('layouts.dashboard')
@push('style')

<link href="{{asset('template/assets/plugins/jquery-datatable/media/css/dataTables.bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('template/assets/plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('template/assets/plugins/datatables-responsive/css/datatables.responsive.css')}}" rel="stylesheet" type="text/css" media="screen" />
<style type="text/css">
  tfoot {
      display: table-header-group;
  }

 .form-group-default.required label:after {
    color: #f55753;
    content: "*";
    font-family: arial;
    font-size: 20px;
    position: absolute;
    right: 12px;
    top: 6px;
   } 
</style>
@endpush
@section('content')
        @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
        @endif
        <div class="page-content-wrapper ">
        <!-- START PAGE CONTENT -->
        <div class="content ">
          <!-- MODAL STICK UP  -->
          <div class="modal fade stick-up" id="addNewAppModal" tabindex="-1" role="dialog" aria-labelledby="addNewAppModal" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header clearfix ">
                  <button type="button" class="close" data-dismiss="modal" aria-hidden="true"><i class="pg-close fs-14"></i>
                  </button>
                  <h4 class="p-b-5"><span class="semi-bold">Data Mahasiswa</span>
                </div>
                <div class="modal-body">
                  <p class="small-text">Masukkan mahasiswa baru</p>
                  
                  <form action="{{ url('/mahasiswa/create') }}" method="post" id="form_mahasiswa">
                  {{csrf_field()}}
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>NIM</label>
                          <input name="nim" type="text" class="form-control" placeholder="Masukkan NIM" autocomplete="off">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>E-mail</label>
                          <input name="email" type="email" class="form-control" placeholder="Masukkan E-mail" autocomplete="off">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Nama Depan</label>
                          <input name="nama_depan" type="text" class="form-control" placeholder="Masukkan nama depan mahasiswa">
                        </div>
                      </div>
                    </div>
                      <div class="row">
                       <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Nama Belakang</label>
                          <input name="nama_belakang" type="text" class="form-control" placeholder="Masukkan nama belakang mahasiswa">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Jurusan</label>
                          <input name="jurusan" type="text" class="form-control" placeholder="Masukkan jurusan">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Jenis Kelamin</label>
                          <input type="radio" name="jenis_kelamin" value="L"> Laki-laki<br>
                          <input type="radio" name="jenis_kelamin" value="P"> Perempuan<br>
                          <label id="jenis_kelamin-error" class="error" for="jenis_kelamin"></label>
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Alamat</label>
                          <textarea name="alamat" class="form-control" rows="4" cols="50" placeholder="Masukkan alamat"></textarea>  
                        </div>
                      </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="modal-footer">
                      <button id="add-app" type="submit" class="btn btn-primary  btn-cons">Add</button>
                      <button type="button" class="btn btn-cons" data-dismiss="modal">Close</button>
                    </div>
                  </form>
                </div>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div> 
       <div class=" container-fluid   container-fixed-lg bg-white">
       <!-- START CONTAINER FLUID -->
          <div class=" container-fluid   container-fixed-lg bg-white">
            <h1 align="center">Daftar Mahasiswa</h1>
            <!-- START card -->
            <div class="card card-transparent">
              <div class="card-header ">
                <div class="card-title">
                </div>
                <!-- <div class="pull-right">
                  <div class="col-xs-12">
                    <input type="text" id="search-table" class="form-control pull-right" placeholder="Search">
                  </div>
                </div> -->
                <div class="pull-left">
                 <div class="col-xs-12">
                    <button id="show-modal" class="btn btn-primary btn-cons" data-toggle="modal" data-target="#addNewAppModal"><i class="fa fa-plus"></i> Tambah Data
                    </button>
                  </div>
                  </div>
                <div class="clearfix"></div>
              </div>
              <div class="card-block">
                <table class="table table-hover demo-table-search table-responsive" id="tableWithSearch">
                  <thead>
                    <tr>
                      <th>NIM</th>
                      <th>Email</th>
                      <th>Nama Depan</th>
                      <th>Nama Belakang</th>
                      <th>Jurusan</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>NIM</th>
                      <th>Email</th>
                      <th>Nama Depan</th>
                      <th>Nama Belakang</th>
                      <th>Jurusan</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th></th>
                    </tr> 
                  </tfoot>
                  <tbody>
                    @foreach($data_mahasiswa as $mahasiswa)
                    <tr>
                      <td>{{$mahasiswa->nim}}</td>
                      <td>{{$mahasiswa->email}}</td>
                      <td>{{$mahasiswa->nama_depan}}</td>
                      <td>{{$mahasiswa->nama_belakang}}</td>
                      <td>{{$mahasiswa->jurusan}}</td>
                      <td>
                        @if($mahasiswa->jenis_kelamin == "L")
                            Laki-laki
                          @else
                            Perempuan
                        @endif
                      </td>
                      <td>{{$mahasiswa->alamat}}</td>
                      <td>
                        <a href="/mahasiswa/{{$mahasiswa->id}}/edit" class="btn btn-warning btn-sm">Edit</a>
                        &nbsp;&nbsp;
                        <a href="/mahasiswa/{{$mahasiswa->id}}/delete" class="btn btn-danger btn-sm"onclick="return confirm('Yakin data ingin dihapus?')">Delete</a>
                      </td>
                    </tr>
                    @endforeach

                  </tbody>
                </table>
              </div>
            </div>
            <!-- END card -->
          </div>
          <!-- END CONTAINER FLUID -->
@endsection

@push('script')
    <script src="{{asset('template/assets/plugins/jquery-datatable/media/js/jquery.dataTables.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-datatable/media/js/dataTables.bootstrap.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js')}}" type="text/javascript"></script>
    <script type="text/javascript" src="{{asset('template/assets/plugins/datatables-responsive/js/datatables.responsive.js')}}"></script>
    <script type="text/javascript" src="{{asset('template/assets/plugins/datatables-responsive/js/lodash.min.js')}}"></script>
    <script src="{{asset('template/assets/js/datatables.js')}}" type="text/javascript"></script>
    <script src="{{asset('template/assets/plugins/jquery-validation/js/jquery.validate.min.js')}}" type="text/javascript"></script>
    <script type="text/javascript">

      $(document).ready(function() {
          // Setup - add a text input to each footer cell
          $('#tableWithSearch tfoot th').each( function () {
              var title = $(this).text();
              $(this).html( '<input type="text" placeholder=" '+title+'" />' );
          } );
       
          // DataTable
          var table = $('#tableWithSearch').DataTable();
       
          // Apply the search
          table.columns().every( function () {
              var that = this;
       
              $( 'input', this.footer() ).on( 'keyup change clear', function () {
                  if ( that.search() !== this.value ) {
                      that
                          .search( this.value )
                          .draw();
                  }
              });
          });

          $("#form_mahasiswa").validate({
           
            rules: 
            {
              nama_depan: "required",
              nama_belakang : "required",
              nim :
              {
                required:true,
                remote  :
                {
                  url  : "{{url('/mahasiswa/nim-unique')}}",
                  type : "get"
                }
              }, 
              alamat : "required",
              jurusan : "required",
              jenis_kelamin : "required" ,
              email : 
              {
                email : true,
                required : true,
                remote : 
                  {
                    url: "{{url('/mahasiswa/email-unique')}}",
                    type : "get"
                  }
              }
             
            },
            messages: {
              nama_depan: "Please enter your first name",
              nama_belakang : "Please enter your last name",
              nim : {
                      required : "Please enter your NIM",
                      remote   : "NIM tersebut sudah tersedia"
                    }, 
                      
              alamat : "Please enter your address",
              jurusan : "Please enter your major",
              email: {
                      required: "We need your email address to contact you",
                      email: "Your email address must be in the format of name@domain.com",
                      remote  : "Alamat email sudah tersedia" 
                     }  
            },
          });
      });

    </script>
@endpush