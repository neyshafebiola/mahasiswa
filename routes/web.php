<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('auth.login');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
//dosen
Route::get('/dosen', 'DosenController@index')->name('dosen.index');
Route::post('/dosen/create','DosenController@create')->name('dosen.create');
Route::get('/dosen/{id}/edit','DosenController@edit')->name('dosen.edit');
Route::post('/dosen/{id}/update','DosenController@update')->name('dosen.update');
Route::get('/dosen/{id}/delete','DosenController@delete')->name('dosen.delete');
Route::get('/dosen/nip-unique','DosenController@nipunique')->name('dosen.nip');

//mahasiswa
Route::get('/mahasiswa', 'MahasiswaController@index')->name('mahasiswa.index');
Route::post('/mahasiswa/create','MahasiswaController@create')->name('mahasiswa.create');
Route::get('/mahasiswa/{id}/edit','MahasiswaController@edit')->name('mahasiswa.edit');
Route::post('/mahasiswa/{id}/update','MahasiswaController@update')->name('mahasiswa.update');
Route::get('/mahasiswa/{id}/delete','MahasiswaController@delete')->name('mahasiswa.delete');
Route::get('/mahasiswa/email-unique','MahasiswaController@emailunique')->name('mahasiswa.email');
Route::get('/mahasiswa/nim-unique','MahasiswaController@nimunique')->name('mahasiswa.nim');

//mata kuliah
Route::get('/matakuliah', 'MatakuliahController@index')->name('matakuliah.index');
Route::post('/matakuliah/create','MatakuliahController@create')->name('matakuliah.create');
Route::get('/matakuliah/{id}/edit','MatakuliahController@edit')->name('matakuliah.edit');
Route::post('/matakuliah/{id}/update','MatakuliahController@update')->name('matakuliah.update');
Route::get('/matakuliah/{id}/delete','MatakuliahController@delete')->name('matakuliah.delete');
Route::get('/matakuliah/kode-unique','MatakuliahController@kodeunique')->name('matakuliah.kode');
Route::get('/matakuliah/mk-unique','MatakuliahController@mkunique')->name('matakuliah.mk');

//nilai
Route::get('/nilai', 'NilaiController@index')->name('nilai.index');
Route::post('/nilai/create', 'NilaiController@create')->name('nilai.create');
Route::get('/nilai/{id}/edit','NilaiController@edit')->name('nilai.edit');
Route::post('/nilai/{id}/update','NilaiController@update')->name('nilai.update');
Route::get('/nilai/{id}/delete','NilaiController@delete')->name('nilai.delete');

