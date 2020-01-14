@extends('layouts.email')
@section('content')

	<h1>Data Anda telah ditambah</h1>
	<hr>
	Selamat {{ $data->nama_depan }} {{ $data->nama_belakang }}, data anda berhasil ditambah

	<table  cellspacing="10" cellpadding="1">
		<thead>
			<tr>
				<th>NIM</th>
				<th>Jurusan</th>
				<th>Jenis Kelamin</th>
				<th>Alamat</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{$data->nim}}</td>
				<td>{{$data->jurusan}}</td>
				<td>
					 @if($data->jenis_kelamin == "L")
                            Laki-laki
                          @else
                            Perempuan
                        @endif
				</td>
				<td>{{$data->alamat}}</td>
				
			</tr>
		</tbody>
	</table>

@endsection