<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once '../functions/store.php';

$fetch = Store::getInstance();

$data = $fetch->fetchData('dyeingorders', null);


if ($data) {

    $productionStatus = [];

    foreach ($data as $row) {

        $dyeingOrder[] = $row['dyeingOrder'];

        if ($dyeingOrder !== null) {

            $result = $fetch->fetchData('production_qty', "dyeing_order = '" . addslashes($row['dyeingOrder']) . "'");

        } else {

            $result = null;

        }

        $productionStatus[] = $result;
    }

    echo json_encode(["status" => "success", "orders" => $data, "productionStatus" => $productionStatus]);
} else {
    echo json_encode(["status" => "error", "message" => "No data found"]);
}
