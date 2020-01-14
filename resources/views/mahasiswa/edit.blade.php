@extends('layouts.dashboard')
@section('content')
        <h1>Edit Data Mahasiswa</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/mahasiswa/{{$mahasiswa->id}}/update" method="post">
                   {{csrf_field()}}
                        <div class="form-group">
                                <label for="exampleInputEmail1">NIM</label>
                                <input name="nim" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="NIM" value="{{$mahasiswa->nim}}">
                        </div>

                        <div class="form-group">
                                <label for="exampleInputEmail1">E-mail</label>
                                <input name="email" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="E-mail" value="{{$mahasiswa->email}}">
                        </div>

                        <div class="form-group">
                             <label for="exampleInputEmail1">Nama Depan</label>
                            <input name="nama_depan" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nama Depan" value="{{$mahasiswa->nama_depan}}">
                        </div>

                        <div class="form-group">
                             <label for="exampleInputEmail1">Nama Belakang</label>
                            <input name="nama_belakang" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nama belakang" value="{{$mahasiswa->nama_belakang}}">
                        </div>
                

                        <div class="form-group">
                                <label for="exampleInputEmail1">Jurusan</label>
                                <input name="jurusan" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Jurusan" value="{{$mahasiswa->jurusan}}">
                        </div>   

                        <div class="form-group">
                                <label for="exampleInputEmail1">Jenis Kelamin</label> <br>
                                @if($mahasiswa->jenis_kelamin == "L")
                                  <input type="radio" name="jenis_kelamin" value="L" checked=""> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P"> Perempuan<br>
                                @else
                                  <input type="radio" name="jenis_kelamin" value="L"> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P" checked=""> Perempuan<br>
                                @endif
                        </div>


                        <div class="form-group">
                                <label for="exampleInputEmail1">Alamat</label>
                                <input name="alamat" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Alamat" value="{{$mahasiswa->alamat}}">
                        </div> 
                        <button type="submit" class="btn btn-warning">Update Data</button>       
             </form>
             </div>

            </div> 
@endsection
           