<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Throwable;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        try {
            $username = $request['userName'];
            $password = $request['password'];
            if (Auth::attempt([
                'email' => $username,
                'password' => $password
            ])) {
                $user = Auth::user();
                $resArr['token'] = $user->createToken('api-application')->accessToken;
                $resArr['name'] = $user->name;
                $resArr['id'] = $user->id;
                return response()->json($resArr, 200);
            } else {
                return response()->json(['error' => "unAuthorised Access"], 203);
            }
        } catch (Throwable $e) {
        }
    }
}
