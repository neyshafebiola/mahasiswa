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
                  <h4 class="p-b-5"><span class="semi-bold">Data Dosen</span>
                </div>
                <div class="modal-body">
                  <p class="small-text">Masukkan dosen baru</p>
                  
                  <form action="{{ url('/dosen/create') }}" method="post" id="form_dosen">
                  {{csrf_field()}}
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>NIP</label>
                          <input name="nip" type="text" class="form-control" placeholder="Masukkan NIP" autocomplete="off">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Nama Dosen</label>
                          <input name="nama_dosen" type="text" class="form-control" placeholder="Masukkan nama dosen" autocomplete="off">
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Jenis Kelamin</label>
                          <input type="radio" name="jenis_kelamin" value="L"> Laki-laki<br>
                          <input type="radio" name="jenis_kelamin" value="P"> Perempuan<br>
                        </div>
                      </div>
                    </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Alamat</label>
                          <textarea name="alamat" class="form-control" rows="4" cols="50" placeholder="Masukkan alamat" autocomplete="off"></textarea>  
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
       <!-- START CONTAINER FLUID -->
          <div class=" container-fluid   container-fixed-lg bg-white">
            <h1 align="center">Daftar Dosen</h1>
            <!-- START card -->
            <div class="card card-transparent">
              <div class="card-header ">
                <div class="card-title">
                </div>
                <div class="pull-right">
                  <div class="col-xs-12">
                    <input type="text" id="search-table" class="form-control pull-right" placeholder="Search">
                  </div>
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
                      <th>NIP</th>
                      <th>Nama Dosen</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>NIP</th>
                      <th>Nama Dosen</th>
                      <th>Jenis Kelamin</th>
                      <th>Alamat</th>
                      <th></th>
                    </tr> 
                  </tfoot>
                  <tbody>
                    @foreach($data_dosen as $dosen)
                    <tr>
                      <td>{{$dosen->nip}}</td>
                      <td>{{$dosen->nama_dosen}}</td>
                      <td>
                        @if($dosen->jenis_kelamin == "L")
                            Laki-laki
                          @else
                            Perempuan
                        @endif
                      </td>
                      <td>{{$dosen->alamat}}</td>
                       <td>
                        <a href="/dosen/{{$dosen->id}}/edit" class="btn btn-warning btn-sm">Edit</a>
                        &nbsp; &nbsp;
                        <a href="/dosen/{{$dosen->id}}/delete" class="btn btn-danger btn-sm"onclick="return confirm('Yakin data ingin dihapus?')">Delete</a>
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

          $("#form_dosen").validate({
           
            rules: {
              nama_dosen: "required",
              jenis_kelamin : "required",
              nip : 
                {
                  required: true,
                  remote  :
                    {
                      url: "{{url('/dosen/nip-unique')}}",
                      type : "get"
                    }
                },
              alamat : "required",
            },
            messages: {
              nama_dosen: "Please enter your name",
              nip : 
                { 
                  required :"Please enter your NIP",
                  remote   :"NIP tersebut sudah tersedia"
                },
              alamat : "Please enter your address",
            },
          });
      } );

    </script>
@endpush