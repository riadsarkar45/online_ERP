<?php
// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../functions/store.php';

$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['data'])) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$table = 'dyeingorders';
$data = $input['data'][0];
$store = Store::getInstance();
$success = $store->insert($table, $data);

if ($success) {
    // inserting data in to yarn_types table for uniq data 
    $dataToInsert = [
        "yarn_type" => $data['yarn_type'], //yarn type from data
        "unit_price" => $data['unit_price'], //unit price from data
    ];
    $store->insert('yarn_types', $dataToInsert); // Insert into yarn table
    //attempting to insert into production table for production data
    $dataToInsert = [
        "dyeing_order" => $data['dyeingOrder'], //dyeing order from data
    ];
    $store->insert('production_qty', $dataToInsert); // Insert into production table
    echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to insert data"]);
}
