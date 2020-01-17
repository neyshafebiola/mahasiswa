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
                  <h4 class="p-b-5"><span class="semi-bold">Data Mata Kuliah</span>
                </div>
                <div class="modal-body">
                  <p class="small-text">Masukkan data mata kuliah baru</p>
                  <form action="{{ url('/matakuliah/create') }}" method="post" id="form_matakuliah">
                    {{csrf_field()}}
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Kode</label>
                          <input name="kode" type="text" class="form-control" placeholder="Masukkan kode mata kuliah " autocomplete="off">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Mata Kuliah</label>
                          <input name="matakuliah" type="text" class="form-control" placeholder="Masukkan nama mata kuliah" autocomplete="off">
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group form-group-default required">
                          <label>SKS</label>
                          <input name="sks" type="text" class="form-control" placeholder="Masukkan SKS" autocomplete="off">
                        </div>
                      </div>
                    </div>
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
            <h1 align="center">Daftar Mata Kuliah</h1>
            <!-- START card -->
            <div class="card card-transparent">
              <div class="card-header ">
                <div class="card-title">
                </div>
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
                      <th>Kode</th>
                      <th>Mata Kuliah</th>
                      <th>SKS</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                        <th>Kode</th>
                        <th>Mata Kuliah</th>
                        <th>SKS</th>
                        <th></th>
                    </tr> 
                  </tfoot>
                  <tbody>
                    @foreach($data_matakuliah as $matakuliah)
                    <tr>
                      <td>{{$matakuliah->kode}}</td>
                      <td>{{$matakuliah->matakuliah}}</td>
                      <td>{{$matakuliah->sks}}</td>
                      <td>
                        <a href="/matakuliah/{{$matakuliah->id}}/edit" class="btn btn-warning btn-sm">Edit</a>
                        &nbsp; &nbsp; 
                        <a href="/matakuliah/{{$matakuliah->id}}/delete" class="btn btn-danger btn-sm"onclick="return confirm('Yakin data ingin dihapus?')">Delete</a>
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
              } );
          } );


          $('input[name="sks"]').on('keypress', function(e){
            return (e.which !=8 && e.which !=0 && (e.which < 48 || e.which >57) && e.which !=46) ? false : true;
          }); //js for number only 
  
        $("#form_matakuliah").validate({
           
            rules: {
              kode: 
              {
                required : true,
                remote   :
                  {
                    url  : "{{url('/matakuliah/kode-unique')}}",
                    type : "get"
                  }  
              },
              
              matakuliah :
                  {
                    required : true,
                    remote   :
                      {
                        url  : "{{url('/matakuliah/mk-unique')}}",
                        type : "get"
                      }
                  },
              sks : "required",
            },
            messages: {
              kode:
              {

                 required : "Please enter the course code",
                 remote   : "Kode sudah terdaftar"
              },
              matakuliah : 
                {
                  required : "Please enter the course name",
                  remote   : "Nama mata kuliah sudah tersedia"
                },
              sks : "Please enter SKS",
            },
          });  
      } );

    </script>
@endpush