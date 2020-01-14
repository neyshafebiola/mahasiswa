@extends('layouts.email')
@section('content')

	<h1>Data Anda telah berhasil di <i>Update </i> </h1>
	<hr>

	<table  cellspacing="10" cellpadding="1">
		<thead>
			<tr>
				<th>NIM</th>
                <th>Email</th>
                <th>Nama Depan</th>
                <th>Nama Belakang</th>
                <th>Jurusan</th>
                <th>Jenis Kelamin</th>
                <th>Alamat</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>{{$edit->nim}}</td>
				<td>{{$edit->email}}</td>
				<td>{{$edit->nama_depan}}</td>
				<td>{{$edit->nama_belakang}}</td>
				<td>{{$edit->jurusan}}</td>
				<td>
					 @if($edit->jenis_kelamin == "L")
                            Laki-laki
                          @else
                            Perempuan
                        @endif
				</td>
				<td>{{$edit->alamat}}</td>
				
			</tr>
		</tbody>
	</table>

@endsection