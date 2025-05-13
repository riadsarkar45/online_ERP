<?php
// Allow CORS for development
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../functions/store.php';

// ✅ Correct way to get Store instance
$fetch = Store::getInstance(); 

$data = $fetch->fetchData('dyeingorders', null);

if ($data) {
    echo json_encode($data);
} else {
    echo json_encode(["status" => "error", "message" => "No data found"]);
}
