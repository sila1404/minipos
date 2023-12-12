<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Store;

class StoreController extends Controller
{
    //

    public function add(Request $request) {
        try {

            $store = new Store([
                "name" => $request->name,
                "image" => $request->image,
                "amount" => $request->amount,
                "price_buy" => $request->price_buy,
                "price_sell" => $request->price_sell,
            ]);

            $store->save();
            
            $success = true;
            $message = 'ບັນທຶກສຳເລັດ';
        } catch (\Illuminate\Database\QueryException $ex) {
            $success = false;
            $message = $ex->getMessage();
        }
        
        $response = [
            'success' => $success,
            'message' => $message,
        ];
        return response()->json($response); 
    }
}
