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

    public function getProductData($id)
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
                    'itemcode' => 'required',
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

    public function addMultipleProduct(Request $request)
    {
        try {
            $file = $request->file('file');
            $filename = $file->getClientOriginalName();
            $extension = $file->getClientOriginalExtension();
            $fileSize = $file->getSize();
            $valid_extension = array("csv");
            $location = 'uploads';
            $maxFileSize = 2097152;
            if (!in_array(strtolower($extension), $valid_extension)) {
                return $this->apiResponseService->failed(array('msg' => 'Please Upload CSV file only!!'), 500);
            } elseif ($fileSize >= $maxFileSize) {
                return $this->apiResponseService->failed(array('msg' => 'File size should be lessthan 2MB!!'), 500);
            }
            $file->move($location, $filename);
            $filepath = public_path($location . "/" . $filename);
            $file = fopen($filepath, "r");

            $data = array();
            $i = 0;

            while (($filedata = fgetcsv($file, 1000, ",")) !== FALSE) {
                $num = count($filedata);
                for ($c = 0; $c < $num; $c++) {
                    $data[$i][] = $filedata[$c];
                }
                $i++;
            }
            fclose($file);

            $createProduct = $this->productService->addMultipleProduct($data);
            $response =  $this->apiResponseService->success(200, $createProduct);
            return $response;
        } catch (Throwable $e) {
            return $this->apiResponseService->failed($e->getMessage(), 500);
        }
    }
}
