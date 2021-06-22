<?php

namespace App\Service;

use Throwable;
use Illuminate\Support\Facades\DB;
use App\Repository\ProductRepository;

class ProductService
{
    public $productRepository;

    function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function getProductCount()
    {
        try {
            return $this->productRepository->getProductCount();
        } catch (Throwable $e) {
            return $e;
        }
    }
    public function getAllChairs($id)
    {

        return $this->productRepository->getAllChairs($id);
    }

    public function getProductDetails($id)
    {
        try {
            return $this->productRepository->getProductDetails($id);
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function editProductDetails($data)
    {
        try {
            if ($data['action'] == 'update') {
                return $this->productRepository->updateProductDetails($data);
            } else {
                return $this->productRepository->deleteProductDetails($data);
            }
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function createProduct($data)
    {
        // return $data;
        $checkItemExists = $this->productRepository->doesProductExists($data['itemname']);
        if ($checkItemExists) {
            return array(
                'type' => 'fail',
                'msg' => 'Product already exists in the system!!'

            );
        }
        $ceateProduct =  $this->productRepository->createProduct($data);
        return array(
            'type' => 'success',
            'msg' => 'Product has been added successfully!!!'
        );
    }


    public function getProductNames()
    {
        try {
            return $this->productRepository->getProductNames();
        } catch (Throwable $e) {
            return $e;
        }
    }

    public function exportProducts()
    {

        return $this->productRepository->exportProducts();
    }
    public function addMultipleProduct($data)
    {
        try {
            DB::beginTransaction();
            for ($i = 1; $i < count($data); $i++) {

                $create = array(
                    "itemname" => $data[$i][1],
                    "itemcode" => $data[$i][0],
                    "count" => $data[$i][2],
                );
                $checkItemExists = $this->productRepository->doesProductExists($create['itemname']);
                if (!$checkItemExists) {
                    $ceateProduct =  $this->productRepository->createProduct($create);
                }
            }
            DB::commit();
            return array(
                'type' => 'success',
                'msg' => 'Product has been added successfully!!!'
            );
        } catch (Throwable $e) {
            DB::rollBack();
            return $e;
        }
    }
}
