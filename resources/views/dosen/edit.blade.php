@extends('layouts.dashboard')

@push('style')
    
    <style type="text/css">
        .form-group.required label:after {
           color: #f55753;
           content: "*";
           font-family: arial;
           font-size: 20px;
           right: 12px;
           top: 6px;
          } 
    </style>

@endpush

@section('content')
        <h1>Edit Data Dosen</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/dosen/{{$dosen->id}}/update" method="post" id="form_edtdsn">
                   {{csrf_field()}}
                          <div class="form-group required">
                                <label for="nip">NIP</label>
                                <input name="nip" type="text" class="form-control" id="nip" aria-describedby="emailHelp" placeholder="NIP" value="{{$dosen->nip}}">
                        </div>
                        <div class="form-group required">
                             <label for="nama_dosen">Nama Dosen</label>
                            <input name="nama_dosen" type="text" class="form-control" id="nama_dosen" aria-describedby="emailHelp" placeholder="Nama Dosen" value="{{$dosen->nama_dosen}}">
                        </div>
                        <div class="form-group required">
                                <label>Jenis Kelamin</label> <br>
                                @if($dosen->jenis_kelamin == "L")
                                  <input type="radio" name="jenis_kelamin" value="L" checked=""> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P"> Perempuan<br>
                                @else
                                  <input type="radio" name="jenis_kelamin" value="L"> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P" checked=""> Perempuan<br>
                                @endif
                        </div>
                          <div class="form-group required">
                                <label for="alamat">Alamat</label>
                                <input name="alamat" type="text" class="form-control" id="alamat" aria-describedby="emailHelp" placeholder="Alamat" value="{{$dosen->alamat}}">
                        </div> 
                        <button type="submit" class="btn btn-warning">Update Data</button>       
             </form>
             </div>

            </div> 
@endsection

@push('script')
     <script src="{{asset('template/assets/plugins/jquery-validation/js/jquery.validate.min.js')}}" type="text/javascript"></script>
     <script type="text/javascript">
        
         $(document).ready(function() {

            $("#form_edtdsn").validate({
           
            rules: {
              nip: "required",
              nama_dosen : "required",
              jenis_kelamin : "required",
              alamat : "required",

            },

            messages: {

              nama_dosen: "Please enter your name",
              nip : "Please enter your NIP",
              alamat : "Please enter your address",

            },
          });

            });        

 
    </script>
@endpush           

           