<?php

namespace App\Http\Controllers;

use Throwable;
use App\Service\UserService;
use Illuminate\Http\Request;
use App\Service\APIResponseService;

class userController extends Controller
{
    public $userService;
    public $apiResponseService;

    function __construct(UserService $userService, APIResponseService $apiResponseService)
    {
        $this->userService = $userService;
        $this->apiResponseService = $apiResponseService;
    }
    public function getLogs()
    {
        try {
            $getUserLogs = $this->userService->getLogs();
            $response =  $this->apiResponseService->success(200, $getUserLogs);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function getUserLogs($id)
    {
        try {
            $getUserLogs = $this->userService->getUserLogs($id);
            $response =  $this->apiResponseService->success(200, $getUserLogs);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function getUser($id)
    {
        try {
            $getUserLogs = $this->userService->getUser($id);
            $response =  $this->apiResponseService->success(200, $getUserLogs);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getUsers()
    {
        try {
            $getUserLogs = $this->userService->getUsers();
            $response =  $this->apiResponseService->success(200, $getUserLogs);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function editUserRole(Request $request)
    {
        try {
            $data = $request->all();
            $editUserRole = $this->userService->editUserRole($data);
            $response =  $this->apiResponseService->success(200, $editUserRole);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function disableUser(Request $request)
    {

        try {
            $data = $request->all();
            $disableUser = $this->userService->disableUser($data);
            $response =  $this->apiResponseService->success(200, $disableUser);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function changeProfilePicture(Request $request)
    {

        try {
            $data = $request->all();
            $disableUser = $this->userService->disableUser($data);
            $response =  $this->apiResponseService->success(200, $disableUser);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateUser(Request $request)
    {
        try {
            $data = $request->all();
            $editUserRole = $this->userService->updateUser($data);
            $response =  $this->apiResponseService->success(200, $editUserRole);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
