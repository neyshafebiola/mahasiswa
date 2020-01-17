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
        <h1>Edit Data Mata Kuliah</h1>
            @if(session('Sukses'))
                <div class="alert alert-success" role="alert">
                    {{session('Sukses')}}
                </div>
            @endif
            <div class="row">
            <div class="col-lg-12">
            <form action="/matakuliah/{{$matakuliah->id}}/update" method="post" id="form_edtmk">
                   {{csrf_field()}}
                        <div class="form-group required">
                             <label for="kode">Kode</label>
                            <input name="kode" type="text" class="form-control" id="kode" aria-describedby="emailHelp" placeholder="Kode" value="{{$matakuliah->kode}}">
                        </div>
                        <div class="form-group required">
                              <label for="matakuliah">Mata Kuliah</label>
                              <input name="matakuliah" type="text" class="form-control" id="matakuliah" aria-describedby="emailHelp" placeholder="Mata Kuliah" value="{{$matakuliah->matakuliah}}">
                         </div>
                         <div class="form-group required">
                                <label for="sks">SKS</label>
                                <input name="sks" type="text" class="form-control" id="sks" aria-describedby="emailHelp" placeholder="SKS" value="{{$matakuliah->sks}}">
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

            $("#form_edtmk").validate({
           
            rules: {
                kode: "required",
                matakuliah : "required",
                sks : "required",
            },

            messages: {

                kode: "Please enter the course code",
                matakuliah : "Please enter the course name",
                sks : "Please enter SKS",

            },
          });

            });        

 
    </script>
@endpush           
           