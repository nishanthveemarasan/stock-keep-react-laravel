<?php

namespace App\Http\Controllers;

use Throwable;
use App\Service\LikeService;
use Illuminate\Http\Request;
use App\Service\APIResponseService;

class LikeController extends Controller
{
    public $likeService;
    public $apiResponseService;

    function __construct(LikeService $likeService, APIResponseService $apiResponseService)
    {
        $this->likeService = $likeService;
        $this->apiResponseService = $apiResponseService;
    }
    public function isPostLiked(Request $request)
    {
        try {
            $data = $request->all();
            $getLikeDetails =   $this->likeService->isPostLiked($data);
            $response =  $this->apiResponseService->success(200, $getLikeDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function updateLikes(Request $request)
    {
        try {
            $data = $request->all();
            $getLikeDetails =   $this->likeService->updateLikes($data);
            $response =  $this->apiResponseService->success(200, $getLikeDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
