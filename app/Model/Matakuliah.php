<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Matakuliah extends Model
{
    protected $table    = 'matakuliah';
    protected $fillable = ['id','kode','matakuliah','sks'];
    
      public function nilai()
    {
        return $this->hasMany('App\Model\Nilai', 'kode', 'kode');
    }
    
}
