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

$insert = $fetch->insert("production_qty", $dataToInsert);
// echo json_encode(["status" => "success", "message" => "Insert Successful", 'dyeingOrder' => $checkDyeingOrder]);


$find = $fetch->fetchData("dyeingorders", "dyeingOrder = '$checkDyeingOrder'",);
if (is_array($find) && count($find) > 0) {
    if (trim($input['status']) === 'Total Production Qty') {
        foreach ($find as $row) {
            $production_qty = $row['production_qty'] ?? 0;
            $dataToUpdate = [
                "production_qty" => ["RAW" => "production_qty + {$input['productionQty']}"]
            ];

            $fetch->update(
                "dyeingorders",
                $dataToUpdate,
                "dyeingOrder = '$checkDyeingOrder'"
            );
        }
    } else {
        echo json_encode(["status" => "error", "message" => $input['status'], 'dyeingOrder' => $checkDyeingOrder]);
    }
}
