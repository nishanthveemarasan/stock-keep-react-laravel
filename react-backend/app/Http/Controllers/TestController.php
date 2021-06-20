<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Service\APIResponseService;
use Facade\Ignition\DumpRecorder\Dump;

class TestController extends Controller
{
    public $apiResponseService;
    function __construct(APIResponseService $apiResponseService)
    {
        $this->apiResponseService = $apiResponseService;
    }

    public function test()
    {
        $array = array(
            'msg' => 'Product Has Been Created Successfully!!!'
        );
        $response =  $this->apiResponseService->success(200, $array);
        return $response;
    }
}
