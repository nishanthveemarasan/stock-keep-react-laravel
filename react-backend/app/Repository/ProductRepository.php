<?php

namespace App\Repository;

use App\Models\Products;

class ProductRepository
{
    public function getProductCount()
    {
        $count = Products::get()->count();
        return $count;
    }

    public function getAllChairs($id)
    {
        $getItems = Products::where('itemname', 'NOT LIKE', 'cushions%')->paginate($id);
        return $getItems;
    }

    public function getProductDetails($id)
    {
        $getProductDetails = Products::where('id', $id)->get()->toArray();
        return $getProductDetails;
    }

    public function updateProductDetails($data)
    {
        $updateProduct = Products::where('id', $data['itemId'])->update(['count' => $data['itemCount']]);
        if ($updateProduct) {
            return array(
                'msg' => 'Product Has Been Updated Successfully!!!'
            );
        }
    }

    public function deleteProductDetails($data)
    {
        $deleteProduct = Products::find($data['itemId'])->delete();
        if ($deleteProduct) {
            return array(
                'msg' => 'Product Has Been Deleted Successfully!!!'
            );
        }
    }

    public function createProduct($data)
    {
        $createProduct = Products::create($data);
        if ($createProduct) {
            return array(
                'msg' => 'Product Has Been Created Successfully!!!'
            );
        }
    }


    public function getProductNames()
    {
        $getNames = Products::pluck('itemname')->toArray();
        return $getNames;
    }
    public function exportProducts()
    {
        $getItems = Products::get()->toArray();
        return $getItems;
    }

    public function doesProductExists($itemname)
    {
        $checkItem = Products::where('itemname', $itemname)->exists();
        return $checkItem;
    }
}
