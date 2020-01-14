<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Nilai extends Model
	{
	    protected $table = 'nilai';
	    protected $fillable = ['id','nim','kode','nip','nilai','mutu','created_at','updated_at'];

	    public function mahasiswa()
	    {
	        return $this->belongsTo('App\Model\Mahasiswa', 'nim', 'nim');
	    }

	    public function dosen()
	    {
	        return $this->belongsTo('App\Model\Dosen', 'nip', 'nip');
	    }

	    public function matakuliah()
	    {
	        return $this->belongsTo('App\Model\Matakuliah', 'kode', 'kode');
	    }

	}



