<?php

namespace App\Http\Controllers\Service;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Mail;

class MailService extends Controller
{
    public static function sendMailtoMhs($data)
    {
    	Mail::send('email.emailmhs',array(
    		'data' => $data,
    	), function ($e) use ($data)
    	{
    		$e->to($data->email);
    		$e->from('febiolaneysha17@gmail.com', 'Neysha Febiola');
    		$e->subject('Data anda berhasil ditambahkan');
    	});
    }

    public static function sendUpdate($edit)
    {
    	Mail::send('email.emailupdate',array(
    		'edit' => $edit,
    	), function ($u) use ($edit)
    	{
    		$u->to($edit->email);
    		$u->from('febiolaneysha17@gmail.com', 'Neysha Febiola');
    		$u->subject('Data anda berhasil di update');
    	});
    }
}
