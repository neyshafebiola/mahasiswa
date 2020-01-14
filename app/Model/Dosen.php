<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Dosen extends Model
	{
	    protected $table    = 'dosen';
	   	protected $fillable = ['id','nip','nama_dosen','jenis_kelamin','alamat'];

		   	public function nilai()
	 	{
	        return $this->hasMany('App\Model\Dosen', 'nip', 'nip');
	    }

	}


