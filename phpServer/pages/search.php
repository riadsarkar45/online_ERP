<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once '../functions/store.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $searchType = $_GET['searchType'] ?? null;
    $searchValue = $_GET['searchValue'] ?? null;

    if (empty($searchType) || empty($searchValue)) {
        echo json_encode([
            "status" => "error",
            "message" => "Something went wrong. Please don't leave any field empty."
        ]);
        exit;
    }

    $store = Store::getInstance();
    $data = null;

    if ($searchType === 'dyeingOrder') {
        $data = $store->find('dyeingorders', 'dyeingOrder', $searchValue);
    } elseif ($searchType === 'factoryName') {
        $data = $store->find('dyeingorders', 'factory_name', $searchValue);
    }elseif($searchType === 'piNo'){
        $data = $store->find('dyeingorders', 'PI_No', $searchValue);
    }
     else {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid search type"
        ]);
        exit;
    }

    echo json_encode([
        "status" => "success",
        "data" => $data
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid request method"
    ]);
    exit;
}
