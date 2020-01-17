@extends('layouts.dashboard')
@push ('style')
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
        <h1>Edit Data Mahasiswa</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/mahasiswa/{{$mahasiswa->id}}/update" method="post" id="form_edtmhs">
                   {{csrf_field()}}
                        <div class="form-group required">
                                <label for="exampleInputEmail1">NIM</label>
                                <input name="nim" type="text" class="form-control" id="nim" aria-describedby="emailHelp" placeholder="NIM" value="{{$mahasiswa->nim}}">
                        </div>

                        <div class="form-group required">
                                <label for="exampleInputEmail1">E-mail</label>
                                <input name="email" type="text" class="form-control" id="email" aria-describedby="emailHelp" placeholder="E-mail" value="{{$mahasiswa->email}}">
                        </div>

                        <div class="form-group required">
                             <label for="exampleInputEmail1">Nama Depan</label>
                             <input name="nama_depan" type="text" class="form-control" id="nama_depan" aria-describedby="emailHelp" placeholder="Nama Depan" value="{{$mahasiswa->nama_depan}}">
                        </div>

                        <div class="form-group required">
                             <label for="exampleInputEmail1">Nama Belakang</label>
                             <input name="nama_belakang" type="text" class="form-control" id="nama_belakang" aria-describedby="emailHelp" placeholder="Nama belakang" value="{{$mahasiswa->nama_belakang}}">
                        </div>
                

                        <div class="form-group required">
                                <label for="exampleInputEmail1">Jurusan</label>
                                <input name="jurusan" type="text" class="form-control" id="jurusan" aria-describedby="emailHelp" placeholder="Jurusan" value="{{$mahasiswa->jurusan}}">
                        </div>   

                        <div class="form-group required">
                                <label for="exampleInputEmail1">Jenis Kelamin</label> <br>
                                @if($mahasiswa->jenis_kelamin == "L")
                                  <input type="radio" name="jenis_kelamin" value="L" checked=""> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P"> Perempuan<br>
                                @else
                                  <input type="radio" name="jenis_kelamin" value="L"> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P" checked=""> Perempuan<br>
                                @endif
                        </div>


                        <div class="form-group required">
                                <label for="exampleInputEmail1">Alamat</label>
                                <input name="alamat" type="text" class="form-control" id="alamat" aria-describedby="emailHelp" placeholder="Alamat" value="{{$mahasiswa->alamat}}">
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

            $("#form_edtmhs").validate({
           
            rules: {
              nama_depan: "required",
              nama_belakang : "required",
              nim : "required",
              alamat : "required",
              jurusan : "required",
              jenis_kelamin : "required" ,
              email : {
                email : true,
                required : true
              } 
            },

            messages: {
              nama_depan: "Please enter your first name",
              nama_belakang : "Please enter your last name",
              nim : "Please enter your NIM",
              alamat : "Please enter your address",
              jurusan : "Please enter your major",
              email: {
                    required: "We need your email address to contact you",
                    email: "Your email address must be in the format of name@domain.com"
                    }  
            },
          });

            });    
    </script>
@endpush           