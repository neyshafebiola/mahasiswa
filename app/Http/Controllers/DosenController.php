<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Dosen;

class DosenController extends Controller
{
     public function index()
    {
        $data_dosen = Dosen::all();
        return view('dosen.dosen',[ 'data_dosen'=> $data_dosen]);
    }  

     public function create(request $request)
    {
        //return $request->all();
        // $storeDosen = Dosen::create($request->all());
        $storeDosen                = new Dosen();
        $storeDosen->nama_dosen    = $request->input('nama_dosen');
        $storeDosen->nip           = $request->input('nip');
        $storeDosen->jenis_kelamin = $request->input('jenis_kelamin');
        $storeDosen->alamat        = $request->input('alamat');
     
        $storeDosen->save();
        return redirect('/dosen')->with('Sukses','Data Berhasil Ditambahkan');
    }
    
     public function edit($id)
    {
        $dosen = Dosen::find($id);
        return view('dosen/edit',['dosen'=> $dosen]);
    }
    public function update(Request $request,$id)
    {
        // return $request->all();
        $dosen = Dosen::find($id);
        $dosen->nama_dosen    = $request->input('nama_dosen');
        $dosen->nip           = $request->input('nip');
        $dosen->jenis_kelamin = $request->input('jenis_kelamin');
        $dosen->alamat        = $request->input('alamat');
        $dosen->update();    
        return redirect('/dosen')->with('Sukses','Data Berhasil Diubah');
        
        // $mahasiswa->update($request->all());
    }

     public function delete($id)
    {
        $dosen = Dosen::find($id);
        $dosen->delete($dosen);
        return redirect('/dosen')->with('Sukses','Data Berhasil Dihapus');
    }    


}
