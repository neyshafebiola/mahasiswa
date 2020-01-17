@extends('layouts.dashboard')
@section('content')
        <h1>Edit Data Nilai Mahasiswa</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/nilai/{{$nilai->id}}/update" method="post" id="form_edtnilai">
                   {{csrf_field()}}
                          <div class="form-group">
                                <label>Nama Mahasiswa</label>
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
                                <label>Nama Dosen</label>
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
                                <label>Mata Kuliah</label>
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
                                <label for="nilai">Nilai</label>
                                <input name="nilai" type="text" class="form-control" id="nilai" aria-describedby="emailHelp" placeholder="Nilai" value="{{$nilai->nilai}}" onkeyup="getMutu(this.value)">
                        </div> 
                        
                        <div class="form-group">
                                <label for="mutu">Mutu</label>
                                <input name="mutu" type="text" class="form-control" id="mutu" aria-describedby="emailHelp" placeholder="Mutu nilai" value="{{$nilai->mutu}}">
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

          $("#form_edtnilai").validate({
           
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

     });   
        
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
           