<?php

namespace App\Service;

use Maatwebsite\Excel\Facades\Excel;
use App\Repository\ProductRepository;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ExcelExportClass implements FromCollection, WithHeadings, ShouldAutoSize
{
    use Exportable;
    public $productRepository;

    function __construct($productRepository)
    {
        $this->productRepository = $productRepository;
    }
    public function collection()
    {
        $result = $this->productRepository->exportProducts();
        return collect($result);
    }

    public function headings(): array
    {
        return [
            'NUMBER',
            'PRODUCT_NAME',
            'PRODUCT_CODE',
            'STOCK_COUNT',
            'CREATED_AT',
            'LAST_UPDATE',
        ];
    }
}
