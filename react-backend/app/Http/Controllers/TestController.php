<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Service\APIResponseService;
use Facade\Ignition\DumpRecorder\Dump;

class TestController extends Controller
{
    public function store(Request $request)
    {
        $imagePath = $request->file('file');
        $imageName = $imagePath->getClientOriginalName();
        $userId = $request['userId'];
        $path = $request->file('file')->storeAs('profileImage', $imageName, 'public');
        $imageUrl = "http://relaxreact.test/react-backend/storage/app/public/" . $path;
        $updateImage = User::find($userId);
        $updateImage->profile_photo_path = $imageUrl;
        $updateImage->save();
        return $updateImage;
        if ($updateImage) {
            return array('msg' => "http://relaxreact.test/react-backend/storage/app/public/" . $path);
        }
    }

    public function csv(Request $request)
    {
        $file = $request->file('file');
        $filename = $file->getClientOriginalName();
        $extension = $file->getClientOriginalExtension();
        $tempPath = $file->getRealPath();
        $fileSize = $file->getSize();
        $mimeType = $file->getMimeType();
        $valid_extension = array("csv");

        $location = 'uploads';

        // 2MB in Bytes
        $maxFileSize = 2097152;
        $valid_extension = array("csv");
        // Check file extension
        if (!in_array(strtolower($extension), $valid_extension)) {
            
        } elseif ($fileSize >= $maxFileSize) {
        }else{

        }
        // Upload file
        $file->move($location, $filename);

        // Import CSV to Database
        $filepath = public_path($location . "/" . $filename);

        // Reading file
        $file = fopen($filepath, "r");

        $importData_arr = array();
        $i = 0;

        while (($filedata = fgetcsv($file, 1000, ",")) !== FALSE) {
            $num = count($filedata);


            for ($c = 0; $c < $num; $c++) {
                $importData_arr[$i][] = $filedata[$c];
            }
            $i++;
        }
        fclose($file);
        return $importData_arr[0];
    }
}
