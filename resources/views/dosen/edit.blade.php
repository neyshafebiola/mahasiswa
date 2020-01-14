@extends('layouts.dashboard')
@section('content')
        <h1>Edit Data Dosen</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/dosen/{{$dosen->id}}/update" method="post">
                   {{csrf_field()}}
                          <div class="form-group">
                                <label for="exampleInputEmail1">NIP</label>
                                <input name="nip" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="NIP" value="{{$dosen->nip}}">
                        </div>
                        <div class="form-group">
                             <label for="exampleInputEmail1">Nama Dosen</label>
                            <input name="nama_dosen" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nama Dosen" value="{{$dosen->nama_dosen}}">
                        </div>
                        <div class="form-group">
                                <label for="exampleInputEmail1">Jenis Kelamin</label> <br>
                                @if($dosen->jenis_kelamin == "L")
                                  <input type="radio" name="jenis_kelamin" value="L" checked=""> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P"> Perempuan<br>
                                @else
                                  <input type="radio" name="jenis_kelamin" value="L"> Laki-laki<br>
                                  <input type="radio" name="jenis_kelamin" value="P" checked=""> Perempuan<br>
                                @endif
                        </div>
                          <div class="form-group">
                                <label for="exampleInputEmail1">Alamat</label>
                                <input name="alamat" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Alamat" value="{{$dosen->alamat}}">
                        </div> 
                        <button type="submit" class="btn btn-warning">Update Data</button>       
             </form>
             </div>

            </div> 
@endsection
           