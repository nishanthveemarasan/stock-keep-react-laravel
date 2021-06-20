<?php

namespace App\Repository;

use App\Models\Orders;
use App\Models\Products;
use Illuminate\Support\Facades\DB;
use Throwable;

class OrderRepository
{

    public function getRecentOrders()
    {
        $getRecentOrders = Orders::orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
        return $getRecentOrders;
    }

    public function getTopOrders()
    {
        $getTopOrders = Orders::select(DB::raw('sum(sellcount) as total , itemname'))
            ->groupBy('itemname')
            ->orderBy('total', 'desc')
            ->limit(10)
            ->get()
            ->toArray();
        return $getTopOrders;
    }

    public function getOrderData()
    {
        $getOrderOdata = Orders::orderBy('created_at', 'desc')->paginate(10);
        return ($getOrderOdata);
    }

    public function getSingleOrderData($id)
    {
        $getResult = Orders::where('id', $id)->get()->toArray();
        return $getResult;
    }

    public function editOrderData($data)
    {

        try {
            DB::beginTransaction();
            $currentCount = $this->getCurrentSellStock($data['id']);
            $editData = Orders::where('id', $data['id'])->update([
                'sell_type' => $data['sell_type'],
                'sellcount' => $data['sellcount'],
                'note' => $data['note']
            ]);
            if ($editData) {
                $model = Products::where('itemname', $data['itemname'])->first();
                $model->count = $model->count + $currentCount - $data['sellcount'];
                $model->save();
                DB::commit();
                return array('msg' => 'Order has been updated successfully');
            }
        } catch (Throwable $e) {
            DB::rollback();
            return $e;
        }
    }

    public function deleteOrderData($id, $name)
    {
        try {
            DB::beginTransaction();
            $currentCount = $this->getCurrentSellStock($id);
            return array('msg' => 'Order has been deleted successfully');
            $deleteData = Orders::find($id)->delete();
            if ($deleteData) {
                $model = Products::where('itemname', $name)->first();
                $model->count = $model->count + $currentCount;
                $model->save();
                DB::commit();
                return array('msg' => 'Order has been deleted successfully');
            }
        } catch (Throwable $e) {
            DB::rollback();
            return $e;
        }
    }

    public function getCurrentSellStock($id)
    {

        $stock =  Orders::find($id)->sellcount;
        return $stock;
    }

    public function getCustomOrderData($product, $fromDate, $toDate)
    {
        //  dd($fromDate, $toDate);
        $getData = Orders::where('itemname', $product)
            ->whereBetween('created_at', [$fromDate, $toDate])
            ->orderBy('created_at', 'desc')
            ->paginate(10);
        return $getData;
    }

    public function getOrderHistory($product)
    {
        $getData = Orders::where('itemname', $product)->orderBy('created_at', 'desc')->paginate(10);
        return $getData;
    }

    public function getlatestId()
    {
        $getLatestId = Orders::latest()->first()->toArray();
        return $getLatestId;
    }

    public function create($data)
    {

        foreach ($data['list'] as $list) {
            try {
                DB::beginTransaction();
                $create = Orders::create([
                    'order_number' => $data['orderId'],
                    'itemname' => $list['name'],
                    'sell_type' => $list['status'],
                    'sellcount' => $list['quantity'],

                ]);
                if ($create) {
                    $model = Products::where('itemname', $list['name'])->first();
                    $model->count = $model->count - $list['quantity'];
                    $model->save();
                }
                DB::commit();
            } catch (Throwable $e) {
                DB::rollback();
                return $e;
            }
        }
        return true;
    }
}
