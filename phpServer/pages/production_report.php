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

    echo json_encode(["status" => "error", "message" => "Invalid request", "dyeingOrder" => $checkDyeingOrder]);

    exit;
}

$data = $fetch->fetchData("production_qty",  "dyeing_order = '$checkDyeingOrder'");

if (is_array($data) && count($data) > 0) {

    $dataToUpdate1 = [
        "production_qty" => $input['productionQty'],
        "status" => $input['status'],
    ];

    $allRowsSame = true;

    foreach ($data as $row) {

        if ($row['status'] === $input['status'] && $row['production_qty'] === $input['productionQty']) {

            $allRowsSame = true;
        } else {
            
            $allRowsSame = false;
            break;
        }

        if($row['production_qty'] >= $input['productionQty']) {

            echo json_encode(["status" => "error", "message" => "Production quantity cannot be less than the previous value"]);

            exit;
        }
    }

    if ($allRowsSame) {

        

        echo json_encode(["status" => "error", "message" => "No changes detected but data updated"]);

        exit;
    }

    $update = $fetch->update("production_qty", $dataToUpdate1, "dyeing_order = '$checkDyeingOrder'");

    if ($update) {

        echo json_encode(["status" => "success", "message" => $input]);

    } else {

        echo json_encode(["status" => "error", "message" => "Failed to update data", "dyeingOrder" => $checkDyeingOrder]);

    }
} else {

    $dataToUpdate1 = [
        "status" => $input['status'],
        "production_qty" => $input['productionQty'],
        "dyeing_order" => $checkDyeingOrder,
    ];

    $fetch->insert("production_qty", $dataToUpdate1);

    echo json_encode(["status" => "success", "message" => "Insert Successful"]);
}
