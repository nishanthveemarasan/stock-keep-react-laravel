<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function sendMail()
    {
        $to_name = "Nishanth Vemmarasan";
        $to_email = "iamnishanthveema@gmail.com";
        $data = array("name" => "Ogbonna Vitalis(sender_name)", "body" => "A test mail");
        Mail::send("emails.email", $data, function ($message) use ($to_name, $to_email) {
            $message->to($to_email, $to_name)
                ->subject("Laravel Test Mail");
        });
        dd('hello');
    }
}
