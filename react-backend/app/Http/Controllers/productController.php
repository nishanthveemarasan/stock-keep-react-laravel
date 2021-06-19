<?php

namespace App\Http\Controllers;

use Throwable;
use Illuminate\Http\Request;
use App\Service\ProductService;
use App\Service\APIResponseService;
use Illuminate\Support\Facades\Validator;

class productController extends Controller
{
    public $productService;
    public $apiResponseService;
    function __construct(ProductService $productService, APIResponseService $apiResponseService)
    {
        $this->productService = $productService;
        $this->apiResponseService = $apiResponseService;
    }
    public function getAllChairesData($id = 10)
    {
        try {
            $getAllProducts = $this->productService->getAllChairs($id);
            $response =  $this->apiResponseService->success(200, $getAllProducts);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getProductData($id, $key)
    {
        try {

            $getProductDetails = $this->productService->getProductDetails($id);
            $response =  $this->apiResponseService->success(200, $getProductDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function editProductData(Request $request)
    {

        try {
            $data = $request->all();
            $getProductDetails = $this->productService->editProductDetails($data);
            $response =  $this->apiResponseService->success(200, $getProductDetails);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function createProduct(Request $request)
    {
        try {
            $data = $request->all();
            $validation = Validator::make(
                $data,
                [
                    "itemname" => "required",
                    'itemcode' => 'required|',
                    "count" => "required|integer|min:1",

                ],
                $messages = [],
                [
                    'itemname' => 'Product Name',
                    "itemcode" => "Product Code",
                    "count" => "Product Stock Count",

                ]
            );
            if ($validation->fails()) {
                return $this->apiResponseService->failed($validation->errors(), 500);
            }
            $createProduct = $this->productService->createProduct($data);
            $response =  $this->apiResponseService->success(200, $createProduct);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function getProductNames()
    {
        try {
            $getAllProductsName = $this->productService->getProductNames();
            $response =  $this->apiResponseService->success(200, $getAllProductsName);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }

    public function allProducts()
    {
        try {
            $getAllProducts = $this->productService->exportProducts();

            return $getAllProducts;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
