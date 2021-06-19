<?php

use App\Http\Controllers\commentController;
use App\Http\Controllers\DashBoardController;
use App\Http\Controllers\exportController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\orderController;
use App\Http\Controllers\postController;
use App\Http\Controllers\productController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('get-dashboard-data', [DashBoardController::class, 'getDashBoardData']);
Route::get('get-all-chairs/{id?}/{key?}', [productController::class, 'getAllChairesData']);
Route::get('get-product-details/{id}', [productController::class, 'getProductData']);
Route::post('edit-product-details', [productController::class, 'editProductData']);
Route::post('add-product', [productController::class, 'createProduct']);
Route::get('get-product-names', [productController::class, 'getProductNames']);
Route::get('get-products-without-pagination', [productController::class, 'allProducts']);
Route::get('export-product-excel', [exportController::class, 'generateReport']);
Route::prefix('order')->group(function () {
    Route::get('get-order-data', [orderController::class, 'getOrderData']);
    Route::get('single-order-data/{id}', [orderController::class, 'singleOrderData']);
    Route::post('edit-order-data', [orderController::class, 'editOrderData']);
    Route::post('track-a-product-order-history', [orderController::class, 'trackOrderData']);
    Route::get('get-latest-order-id', [orderController::class, 'getlatestId']);
});

Route::prefix('users')->group(function () {
    Route::get('get-logs', [userController::class, 'getLogs']);
    Route::get('get-users', [userController::class, 'getUsers']);
    Route::get('get-user-logs/{id}', [userController::class, 'getUserLogs']);
    Route::post('edit-user-role', [userController::class, 'editUserRole']);
    Route::post('disable-a-user', [userController::class, 'disableUser']);
    Route::get('get-a-user/{id}', [userController::class, 'getUser']);
});

Route::prefix('posts')->group(function () {
    Route::get('get-posts', [postController::class, 'getAllPosts']);
    Route::get('get-user-posts/{id}', [postController::class, 'getUserPosts']);
    Route::post('create', [postController::class, 'create']);
    Route::post('edit', [postController::class, 'edit']);
    Route::get('delete/{id}', [postController::class, 'delete']);
});

Route::prefix('comments')->group(function () {
    Route::get('get-comments', [commentController::class, 'getAllCommets']);
    Route::get('get-user-comment/{id}', [commentController::class, 'getUserComments']);
    Route::get('get-post-comment/{id}', [commentController::class, 'getPostComments']);
    Route::post('create', [commentController::class, 'create']);
});

Route::prefix('likes')->group(function () {
    Route::post('is-post-liked', [LikeController::class, 'isPostLiked']);
    Route::post('update-user-like', [LikeController::class, 'updateLikes']);
});
