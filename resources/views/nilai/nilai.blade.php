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
                  <h4 class="p-b-5"><span class="semi-bold">Data Nilai Baru</span>
                </div>
                <div class="modal-body">
                  <p class="small-text">Masukkan data nilai mahasiswa</p>
                  <form action="{{ url('/nilai/create') }}" method="post" id="form_nilai">
                    {{csrf_field()}}
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Nama Mahasiswa</label>
                          <select class="form-control" name="nama_mahasiswa">
                            <option value=""> Pilih Mahasiswa </option>
                            @foreach($data_mahasiswa as $mahasiswa)
                              <option value="{{ $mahasiswa->nim }}"> {{ $mahasiswa->nama_depan }} {{ $mahasiswa->nama_belakang }} </option>
                            @endforeach
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Nama Dosen</label>
                         <select class="form-control" name="nama_dosen">
                            <option value=""> Pilih Dosen </option>
                            @foreach($data_dosen as $dosen)
                              <option value="{{ $dosen->nip }}"> {{ $dosen->nama_dosen }} </option>
                            @endforeach
                          </select>
                      </div>
                    </div>
                  </div>
                     <div class="row">
                      <div class="col-sm-12">
                        <div class="form-group form-group-default required">
                          <label>Mata Kuliah</label>
                           <select class="form-control" name="nama_matakuliah">
                            <option value=""> Pilih Mata Kuliah </option>
                            @foreach($data_matakuliah as $matakuliah)
                              <option value="{{ $matakuliah->kode }}"> {{ $matakuliah->matakuliah }} </option>
                            @endforeach
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-6">
                        <div class="form-group form-group-default required">
                          <label>Nilai</label>
                          <input name="nilai" type="text" class="form-control" placeholder="Masukkan nilai" onkeyup="getMutu(this.value)">
                        </div>
                      </div>

                      <div class="col-sm-6">
                        <div class="form-group form-group-default ">
                          <label>Mutu</label>
                          <input name="mutu" type="text" class="form-control"  readonly="">
                        </div>
                      </div>
                    </div>
                  
                </div>
                <div class="modal-footer">
                  <button id="add-app" type="submit" class="btn btn-primary  btn-cons">Add</button>
                  <button type="button" class="btn btn-cons" data-dismiss="modal">Close</button>
                </div>
                </form>
              </div>
              <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
          </div> 


       <div class=" container-fluid   container-fixed-lg bg-white">
       <!-- START CONTAINER FLUID -->
          <div class=" container-fluid   container-fixed-lg bg-white">
            <h1 align="center">Daftar Nilai</h1>
            <!-- START card -->
            <div class="card card-transparent">
              <div class="card-header ">
                <div class="card-title">
                </div>
               <!--  <div class="pull-right">
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
                      <th>Nama Mahasiswa</th>
                      <th>NIP</th>
                      <th>Nama Dosen</th>
                      <th>Mata Kuliah</th>
                      <th>Nilai</th>
                      <th>Mutu</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>NIM</th>
                      <th>Nama Mahasiswa</th>
                      <th>NIP</th>
                      <th>Nama Dosen</th>
                      <th>Mata Kuliah</th>
                      <th>Nilai</th>
                      <th>Mutu</th>
                      <th></th>
                    </tr> 
                  </tfoot>
                  <tbody>
                
                    @foreach($data_nilai as $nilai)
                    <tr>
                      <td>{{ $nilai->mahasiswa ? $nilai->mahasiswa->nim : '-' }}</td>
                      <td>{{ $nilai->mahasiswa ? $nilai->mahasiswa->nama_depan : '-'}} {{$nilai->mahasiswa ? $nilai->mahasiswa->nama_belakang : '-'}}</td>
                      <td>{{$nilai->dosen ? $nilai->dosen->nip : '-'}}</td>
                      <td>{{$nilai->dosen ? $nilai->dosen->nama_dosen : '-'}}</td>
                      <td>{{$nilai->matakuliah->matakuliah}}</td>
                      <td>{{$nilai->nilai}}</td>
                      <td>{{$nilai->mutu}}</td>
                       <td>
                        <a href="/nilai/{{$nilai->id}}/edit" class="btn btn-warning btn-sm">Edit</a>
                        &nbsp; &nbsp; 
                        <a href="/nilai/{{$nilai->id}}/delete" class="btn btn-danger btn-sm"onclick="return confirm('Yakin data ingin dihapus?')">Delete</a>
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

           $("#form_nilai").validate({
           
            rules: {
              nama_mahasiswa: "required",
              nama_dosen : "required",
              nama_matakuliah : "required",
              nilai : "required",
            },
            messages: {
              nama_mahasiswa: "Please select college student name",
              nama_dosen : "Please select lecturer name",
              nama_matakuliah : "Please select course ",
              nilai : "Please enter the score",
            },
          });

          $('input[name="nilai"]').on('keypress', function(e){
            return (e.which !=8 && e.which !=0 && (e.which < 48 || e.which >57) && e.which !=46) ? false : true;
          }); //js for number only 

      } );

      function getMutu($val){
        if ($val >= 0 && $val <= 20) 
        {
          var mutu = 'E';
        }
        else if($val>=21 && $val<=55)
        {
          var mutu = 'D';
        }  

        else if($val>=56 && $val<=65)
        {
          var mutu = 'C-';
        }  

        else if($val>=66 && $val<=70)
        {
          var mutu = 'C';
        }  

        else if($val>=71 && $val<=80)
        {
          var mutu = 'B-';
        }  

        else if($val>=81 && $val<=89)
        {
          var mutu = 'B';
        }  

        else if($val>=90 && $val<=94)
        {
          var mutu = 'A-';
        } 

        else
        {
          var mutu = 'A'
        }  

        $('[name="mutu"]').val(mutu);
      }



    </script>
@endpush