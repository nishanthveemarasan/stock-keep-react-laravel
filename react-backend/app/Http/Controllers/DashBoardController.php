<?php

namespace App\Http\Controllers;

use App\Service\APIResponseService;
use App\Service\DashboardService;
use Illuminate\Http\Request;
use Throwable;

class DashBoardController extends Controller
{
    public $dashboardService;
    public $apiResponseService;
    function __construct(DashboardService $dashboardService, APIResponseService $apiResponseService)
    {
        $this->dashboardService = $dashboardService;
        $this->apiResponseService = $apiResponseService;
    }
    public function getDashBoardData()
    {
        try {
            $getAllData = $this->dashboardService->getAllData();
            $response =  $this->apiResponseService->success(200, $getAllData);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
