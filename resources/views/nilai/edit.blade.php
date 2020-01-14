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
            <form action="/nilai/{{$nilai->id}}/update" method="post">
                   {{csrf_field()}}
                          <div class="form-group">
                                <label for="exampleInputEmail1">Nama Mahasiswa</label>
                                <select class="form-control" name="nama_mahasiswa">
                                    <option value="{{ $nilai->nim }}">{{ $nilai->mahasiswa->nama_depan }} {{ $nilai->mahasiswa->nama_belakang }}</option>
                                    @foreach($mahasiswa as $mhs)
                                        @if($mhs->nim !== $nilai->nim)
                                            <option value="{{ $mhs->nim }}">{{$mhs->nama_depan}} {{$mhs->nama_belakang}}</option>
                                        @endif
                                    @endforeach
                                </select>
                            </div>

                        <div class="form-group">
                                <label for="exampleInputEmail1">Nama Dosen</label>
                                <select class="form-control" name="nama_dosen">
                                <option value="{{ $nilai->nip }}">{{ $nilai->dosen->nama_dosen }}</option>
                                    @foreach($dosen as $dsn)
                                        @if($dsn->nip !== $nilai->nip)
                                            <option value="{{ $dsn->nip }}">{{$dsn->nama_dosen}}</option>
                                        @endif
                                    @endforeach
                                </select>
                        </div>


                        <div class="form-group">
                                <label for="exampleInputEmail1">Mata Kuliah</label>
                                 <select class="form-control" name="nama_matakuliah">
                                <option value="{{ $nilai->kode }}">{{ $nilai->matakuliah->matakuliah }}</option>
                                    @foreach($matakuliah as $mk)
                                        @if($mk->kode !== $nilai->kode)
                                            <option value="{{ $mk->kode }}">{{$mk->matakuliah}}</option>
                                        @endif
                                    @endforeach
                                </select>
                        </div>        

                        <div class="form-group">
                                <label for="exampleInputEmail1">Nilai</label>
                                <input name="nilai" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nilai" value="{{$nilai->nilai}}">
                        </div> 
                        
                        <div class="form-group">
                                <label for="exampleInputEmail1">Mutu</label>
                                <input name="mutu" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Mutu nilai" value="{{$nilai->mutu}}">
                        </div> 
                        

                        <button type="submit" class="btn btn-warning">Update Data</button>       
             </form>
             </div>

            </div> 
@endsection
           