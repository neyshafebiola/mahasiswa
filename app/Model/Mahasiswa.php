<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
      protected $table    = 'mahasiswa';
      protected $fillable = ['id','nama_depan','nama_belakang','nim','jurusan','jenis_kelamin','alamat'];

      public function nilai()
    {
        return $this->hasMany('App\Model\Nilai', 'nim', 'nim');
    }
    
}
