<?php

namespace App\Service;

use Throwable;
use App\Service\PostService;
use App\Service\UserService;
use App\Service\OrderService;
use App\Service\CommentService;
use App\Service\ProductService;

class DashboardService
{
    public $postService;
    public $userService;
    public $productService;
    public $commentService;
    public $orderService;
    function __construct(
        PostService $postService,
        UserService $userService,
        ProductService $productService,
        CommentService $commentService,
        OrderService $orderService
    ) {
        $this->postService = $postService;
        $this->userService = $userService;
        $this->productService = $productService;
        $this->commentService = $commentService;
        $this->orderService = $orderService;
    }
    public function getAllData()
    {
        try {
            $getPostCount = $this->postService->getPostCount();
            $getUserCount = $this->userService->getUserCount();
            $getProductCount = $this->productService->getProductCount();
            $comments = $this->commentService->getCommentCount();
            $getRecentOrders = $this->orderService->getRecentOrders();
            $getTopOrders = $this->orderService->getTopOrders();

            $data = array(
                'posts' => $getPostCount,
                'users' => $getUserCount,
                'totalProducts' => $getProductCount,
                'comments' => $comments,
                'recentOrders' => $getRecentOrders,
                'topOrders' => $getTopOrders
            );
            return $data;
        } catch (Throwable $e) {
            return $e;
        }
    }
}
