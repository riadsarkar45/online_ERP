<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'functions/store.php';

$fetch = Store::getInstance();

// Fetch all dyeing orders
$data = $fetch->fetchData('dyeingorders', null);

if ($data) {
    $dyeingOrder = [];
    $productionStatus = [];

    foreach ($data as $row) {
        $dyeingOrder[] = $row['dyeingOrder'];

        if (!empty($row['dyeingOrder'])) {
            $result = $fetch->fetchData(
                'production_qty',
                "dyeing_order = '" . addslashes($row['dyeingOrder']) . "'"
            );
        } else {
            $result = [];
        }

        $productionStatus[] = $result;
    }

    echo json_encode([
        "status" => "success",
        "orders" => $data,
        "productionStatus" => $productionStatus
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "No data found"
    ]);
}
