<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Matakuliah;

class MatakuliahController extends Controller
{
      public function index()
    {
        $data_matakuliah = Matakuliah::all();
        return view('matakuliah.matakuliah',[ 'data_matakuliah'=> $data_matakuliah]);
    }  

     public function create(request $request)
    {
        //return $request->all();
        // $storeMahasiswa = Mahasiswa::create($request->all());
        $storeMatakuliah               = new Matakuliah();
        $storeMatakuliah->kode    	   = $request->input('kode');
        $storeMatakuliah->matakuliah   = $request->input('matakuliah');
        $storeMatakuliah->sks          = $request->input('sks');
       
        $storeMatakuliah->save();
        return redirect('/matakuliah')->with('Sukses','Data Berhasil Ditambahkan');
    }
    
    public function edit($id)
    {
        $matakuliah = Matakuliah::find($id);
        return view('matakuliah/edit',['matakuliah'=> $matakuliah]);
    }

    public function update(Request $request,$id)
    {
        $matakuliah = Matakuliah::find($id);
        $matakuliah->kode         = $request->input('kode');
        $matakuliah->matakuliah   = $request->input('matakuliah');
        $matakuliah->sks          = $request->input('sks');
        $matakuliah->update();
        return redirect('/matakuliah')->with('Sukses','Data Berhasil Diubah');

        // $matakuliah->update($request->all());  
    }

    public function delete($id)
    {
        $matakuliah = Matakuliah::find($id);
        $matakuliah->delete($matakuliah);
        return redirect('/matakuliah')->with('Sukses','Data Berhasil Dihapus');
    } 

    public function kodeunique(Request $request)
    {
        $kode_unique = $request->input('kode');
        $check = Matakuliah::where('kode', $kode_unique)->count();

        if ($check > 0) {
            echo 'false';
        } else {
            echo 'true';
        }
    }

    public function mkunique(Request $request)
    {
        $mk_unique = $request->input('matakuliah');
        $check = Matakuliah::where('matakuliah', $mk_unique)->count();

        if ($check > 0) {
            echo 'false';
        } else {
            echo 'true';
        }
    }      
      
}
