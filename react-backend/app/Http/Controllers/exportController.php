<?php

namespace App\Http\Controllers;

use Excel;
use Illuminate\Http\Request;
use App\Service\ExcelExportClass;
use App\Repository\ProductRepository;

class exportController extends Controller
{
    public function generateReport()
    {
        $productRepository = new ProductRepository();
        $fileName = 'Report_.xlsx';
        return Excel::download(new ExcelExportClass($productRepository), $fileName);
    }
}
