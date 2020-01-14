<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Nilai;
use App\Model\Mahasiswa;
use App\Model\Dosen;
use App\Model\Matakuliah;


class NilaiController extends Controller
{
    public function index()
    {
        $data_nilai          = Nilai::all();
        $data_mahasiswa      = Mahasiswa::all();
        $data_dosen          = Dosen::all();
        $data_matakuliah     = Matakuliah::all();
        
        return view('nilai.nilai', [ 'data_nilai'=> $data_nilai, 'data_mahasiswa'=> $data_mahasiswa , 'data_dosen' => $data_dosen , 'data_matakuliah' => $data_matakuliah ]);

    }  


  public function create(request $request)
    {
        // return $request->all();
        // $storeMahasiswa = Mahasiswa::create($request->all());
        $storeNilai               = new Nilai();
        $storeNilai->nim    	  = $request->input('nama_mahasiswa');
        $storeNilai->kode   	  = $request->input('nama_matakuliah');
        $storeNilai->nip          = $request->input('nama_dosen');
        $storeNilai->nilai        = $request->input('nilai');
        $storeNilai->mutu         = $request->input('mutu');
         
       
        $storeNilai->save();
        return redirect('/nilai')->with('Sukses','Data Berhasil Ditambahkan');
    }

    public function edit($id)
    {
        $nilai     		= Nilai::find($id);
        $mahasiswa 		= Mahasiswa::all();
        $dosen     		= Dosen::all();
        $matakuliah     = Matakuliah::all();
        return view('nilai/edit',['nilai'=> $nilai, 'mahasiswa' => $mahasiswa ,'dosen'=>$dosen ,'matakuliah'=>$matakuliah]);
    }

    public function update(Request $request,$id)
    {
        $nilai               = Nilai::find($id);
        $nilai->nim          = $request->input('nama_mahasiswa');
        $nilai->kode         = $request->input('nama_matakuliah');
        $nilai->nip          = $request->input('nama_dosen');
        $nilai->nilai        = $request->input('nilai');
        $nilai->mutu         = $request->input('mutu');

        $nilai->update();
        return redirect('/nilai')->with('Sukses','Data Berhasil Diubah');

        // $matakuliah->update($request->all());  
    }

     public function delete($id)
    {
        $nilai = Nilai::find($id);
        $nilai->delete($nilai);
        return redirect('/nilai')->with('Sukses','Data Berhasil Dihapus');
    }    
}    