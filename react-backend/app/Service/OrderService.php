<?php

namespace App\Service;

use App\Repository\OrderRepository;
use Throwable;

class OrderService
{
    public $orderRepository;
    function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    public function getRecentOrders()
    {

        return $this->orderRepository->getRecentOrders();
    }

    public function getTopOrders()
    {

        return $this->orderRepository->getTopOrders();
    }

    public function getOrderData()
    {

        return $this->orderRepository->getOrderData();
    }

    public function singleOrderData($id)
    {

        return $this->orderRepository->getSingleOrderData($id);
    }

    public function editOrderData($data)
    {

        if ($data['action'] == 'update') {
            return $this->orderRepository->editOrderData($data);
        } else {
            return $this->orderRepository->deleteOrderData($data['id'], $data['itemname']);
        }
    }

    public function trackOrderData($data)
    {

        if ($data['action'] == 'allHistory') {
            return  $this->orderRepository->getOrderHistory($data['itemname']);
        } else {
            $fromDate = $data['fromDate'] . " 00:00:00";
            $toDate = $data['toDate'] . " 23:59:59";

            return $this->orderRepository->getCustomOrderData($data['itemname'], $fromDate, $toDate);
        }
    }

    public function getlatestId()
    {
        $getLatestId =   $this->orderRepository->getlatestId();
        if ($getLatestId) {
            return array('msg' => 'success', 'order_id' => ($getLatestId['order_number'] + 1));
        }
    }

    public function create($data)
    {
        $createOrder =   $this->orderRepository->create($data);
        if ($createOrder) {
            return array('msg' => 'Order has been created successfully!!!');
        }
    }
}
