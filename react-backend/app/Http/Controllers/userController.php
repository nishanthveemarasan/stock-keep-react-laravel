<?php

namespace App\Http\Controllers;

use Throwable;
use App\Service\UserService;
use Illuminate\Http\Request;
use App\Service\APIResponseService;
use Illuminate\Support\Facades\Auth;

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
    public function checkUsername(Request $request)
    {
        try {
            $data = $request->all();
            $editUserRole = $this->userService->checkUsername($data);
            $response =  $this->apiResponseService->success(200, $editUserRole);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
    public function create(Request $request)
    {
        try {
            $data = $request->all();
            $editUserRole = $this->userService->create($data);
            $response =  $this->apiResponseService->success(200, $editUserRole);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function updateProfileImage(Request $request)
    {
        try {
            $imagePath = $request->file('file');
            $imageName = $imagePath->getClientOriginalName();
            $userId = $request['userId'];
            $path = $request->file('file')->storeAs('profileImage', $imageName, 'public');
            $imageUrl = "http://relaxreact.test/react-backend/storage/app/public/" . $path;
            $data = array(
                'userId' => $userId,
                'imageUrl' => $imageUrl
            );
            $editUserRole = $this->userService->updateProfileImage($data, $path);
            $response =  $this->apiResponseService->success(200, $editUserRole);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $username = $request['userName'];
            $password = $request['password'];
            if (Auth::attempt([
                'username' => $username,
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

    public function logout(Request $request)
    {
        $token = $request->user()->token();
        $token->revoke();
        $response = ['message' => 'You have been successfully logged out!'];
        return response($response, 200);
    }

    public function error()
    {
        return $this->apiResponseService->failed(array('error' => "unAuthorised Access"), 201);
    }
}
