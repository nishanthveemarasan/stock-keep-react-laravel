<?php

namespace App\Service;

use App\Repository\ProductRepository;
use Throwable;

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
        try {
            return $this->productRepository->createProduct($data);
        } catch (Throwable $e) {
            return $e;
        }
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
}
