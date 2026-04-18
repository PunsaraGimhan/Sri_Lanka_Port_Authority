<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
        http_response_code(405);
        echo json_encode(["result" => "error", "message" => "Method not allowed"]);
        exit();
    }

    include_once "../../config/db.php";

    try {
        $query = "SELECT id, rack_name, location, created_at FROM racks ORDER BY id DESC";
        $stmt  = $conn->prepare($query);
        $stmt->execute();

        $racks = $stmt->fetchAll();

        http_response_code(200);
        echo json_encode($racks);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "result"  => "error",
            "message" => "Failed to fetch racks: " . $e->getMessage()
        ]);
    }
?>