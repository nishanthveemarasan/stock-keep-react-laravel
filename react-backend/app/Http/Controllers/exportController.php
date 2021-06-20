<?php

namespace App\Http\Controllers;

use Excel;
use PDF;
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

    public function generatePdfReport()
    {
        $productRepository = new ProductRepository();
        $getProducts = $productRepository->exportProducts();
        $pdf = PDF::loadView('admin.product-pdf', compact('getProducts'));
        return $pdf->download('student_details.pdf');
    }
}
