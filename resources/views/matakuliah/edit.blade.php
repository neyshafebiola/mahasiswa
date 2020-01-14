@extends('layouts.dashboard')
@section('content')
        <h1>Edit Data Mata Kuliah</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/matakuliah/{{$matakuliah->id}}/update" method="post">
                   {{csrf_field()}}
                        <div class="form-group">
                             <label for="exampleInputEmail1">Kode</label>
                            <input name="kode" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Kode" value="{{$matakuliah->kode}}">
                        </div>
                        <div class="form-group">
                              <label for="exampleInputEmail1">Mata Kuliah</label>
                              <input name="matakuliah" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mata Kuliah" value="{{$matakuliah->matakuliah}}">
                         </div>
                         <div class="form-group">
                                <label for="exampleInputEmail1">SKS</label>
                                <input name="sks" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="SKS" value="{{$matakuliah->sks}}">
                        </div>
                       
                        <button type="submit" class="btn btn-warning">Update Data</button>       
             </form>
             </div>

            </div> 
@endsection
           