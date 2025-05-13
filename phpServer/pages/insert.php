<?php
// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Handle preflight request (CORS OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include the Store logic (this will load the `Store` class)
require_once '../functions/store.php';

// Get JSON input
$input = json_decode(file_get_contents("php://input"), true);

if (!$input || !isset($input['data'])) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$table = 'dyeingorders';  // Specify your table name
$data = $input['data'][0];  // Access the first object in the array
$store = Store::getInstance();  // This gets the instance of the Store class
$success = $store->insert($table, $data);  // Insert the data into the table

if($success) {
    echo json_encode(["status" => "success", "message" => "Data inserted successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to insert data"]);
}

