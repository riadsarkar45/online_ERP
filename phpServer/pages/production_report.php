<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../functions/store.php';

$fetch = Store::getInstance();

$checkDyeingOrder = $_GET['dyeingOrder'] ?? null;

if (!$checkDyeingOrder) {
    echo json_encode(["status" => "error", "message" => "Invalid Action"]);
    exit;
}

$input = json_decode(file_get_contents("php://input"), true);

if (!$input) {
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

$existing = $fetch->fetchData(
    "production_qty",
    "dyeing_order = '$checkDyeingOrder' AND status = '{$input['status']}' AND production_qty = '{$input['productionQty']}'"
);

if (is_array($existing) && count($existing) > 0) {
    echo json_encode(["status" => "error", "message" => "No changes made", "dyeingOrder" => $checkDyeingOrder]);
    exit;
}

$dataToInsert = [
    "status" => $input['status'],
    "production_qty" => $input['productionQty'],
    "dyeing_order" => $checkDyeingOrder
];

$fetch->insert("production_qty", $dataToInsert);

echo json_encode(["status" => "success", "message" => "Insert Successful", 'dyeingOrder' => $checkDyeingOrder]);
