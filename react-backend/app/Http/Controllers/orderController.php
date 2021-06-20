<?php

namespace App\Http\Controllers;

use Throwable;
use Illuminate\Http\Request;
use App\Service\OrderService;
use App\Service\APIResponseService;

class orderController extends Controller
{
    public $orderService;
    public $apiResponseService;
    function __construct(OrderService $orderService, APIResponseService $apiResponseService)
    {
        $this->orderService = $orderService;
        $this->apiResponseService = $apiResponseService;
    }

    public function getOrderData()
    {
        try {
            $getOrderData = $this->orderService->getOrderData();
            $response =  $this->apiResponseService->success(200, $getOrderData);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function singleOrderData($id)
    {

        try {
            $getOrderDetails = $this->orderService->singleOrderData($id);
            $response =  $this->apiResponseService->success(200, $getOrderDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function editOrderData(Request $request)
    {
        try {
            $data = $request->all();
            $editOrderDetails = $this->orderService->editOrderData($data);
            $response =  $this->apiResponseService->success(200, $editOrderDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function trackOrderData(Request $request)
    {
        try {
            $data = $request->all();
            // dd();
            $editOrderDetails = $this->orderService->trackOrderData($data);

            $response =  $this->apiResponseService->success(200, $editOrderDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getlatestId()
    {
        try {
            $getLastedId = $this->orderService->getlatestId();

            $response =  $this->apiResponseService->success(200, $getLastedId);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function create(Request $request)
    {
        try {
            $data = $request->all();
            $create = $this->orderService->create($data);
            $response =  $this->apiResponseService->success(200, $create);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
