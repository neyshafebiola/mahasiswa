<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Model\Mahasiswa;
use App\Http\Controllers\Service\MailService;

class MahasiswaController extends Controller
{
 	 public function index()
    {
        $data_mahasiswa = Mahasiswa::all();
        return view('mahasiswa.mahasiswa',[ 'data_mahasiswa'=> $data_mahasiswa]);
    }  
    public function create(request $request)
    {
        //return $request->all();
        // $storeMahasiswa = Mahasiswa::create($request->all());
        $storeMahasiswa                = new Mahasiswa();
        $storeMahasiswa->nama_depan    = $request->input('nama_depan');
        $storeMahasiswa->nama_belakang = $request->input('nama_belakang');
        $storeMahasiswa->nim           = $request->input('nim');
        $storeMahasiswa->jurusan       = $request->input('jurusan');
        $storeMahasiswa->jenis_kelamin = $request->input('jenis_kelamin');
        $storeMahasiswa->alamat        = $request->input('alamat');
        $storeMahasiswa->email         = $request->input('email');
     
        $storeMahasiswa->save();

        //send mail to mhs
        $sendMailMhs = MailService::sendMailtoMhs($storeMahasiswa);

        return redirect('/mahasiswa')->with('Sukses','Data Berhasil Ditambahkan');
    }
    
     public function edit($id)
    {
        $mahasiswa = Mahasiswa::find($id);
        return view('mahasiswa/edit',['mahasiswa'=> $mahasiswa]);
    }
    public function update(Request $request,$id)
    {
        // return $request->all();
        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa->nama_depan    = $request->input('nama_depan');
        $mahasiswa->nama_belakang = $request->input('nama_belakang');
        $mahasiswa->nim           = $request->input('nim');
        $mahasiswa->jurusan       = $request->input('jurusan');
        $mahasiswa->jenis_kelamin = $request->input('jenis_kelamin');
        $mahasiswa->alamat        = $request->input('alamat');
        $mahasiswa->email         = $request->input('email');

        $mahasiswa->update();  

        $sendMailMhs = MailService::sendUpdate($mahasiswa);
        return redirect('/mahasiswa')->with('Sukses','Data Berhasil Diubah');
        
        // $mahasiswa->update($request->all());
    }

     public function delete($id)
    {
        $mahasiswa = Mahasiswa::find($id);
        $mahasiswa->delete($mahasiswa);
        return redirect('/mahasiswa')->with('Sukses','Data Berhasil Dihapus');
    } 

    public function emailunique(Request $request)
    {
        $email_unique = $request->input('email');
        $check = Mahasiswa::where('email', $email_unique)->count();

        if ($check > 0) {
            echo 'false';
        } else {
            echo 'true';
        }
    }   

    public function nimunique(Request $request)
    {
        $nim_unique = $request->input('nim');
        $check = Mahasiswa::where('nim', $nim_unique)->count();

        if ($check > 0) {
            echo 'false';
        } else {
            echo 'true';
        }
    }   
}
