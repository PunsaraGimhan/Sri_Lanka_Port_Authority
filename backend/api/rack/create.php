<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json");

    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
        http_response_code(200);
        exit();
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        http_response_code(405);
        echo json_encode(["result" => "error", "message" => "Method not allowed"]);
        exit();
    }

    include_once "../../config/db.php";

    $data = json_decode(file_get_contents("php://input"), true);

    if (
        empty($data['Rack_Name']) ||
        empty($data['Location'])
    ) {
        http_response_code(400);
        echo json_encode(["result" => "error", "message" => "Rack_Name and Location are required"]);
        exit();
    }

    $rack_name = trim($data['Rack_Name']);
    $location  = trim($data['Location']);

    try {
        $query = "INSERT INTO racks (rack_name, location) VALUES (:rack_name, :location)";
        $stmt  = $conn->prepare($query);
        $stmt->bindParam(":rack_name", $rack_name);
        $stmt->bindParam(":location",  $location);
        $stmt->execute();

        $new_id = $conn->lastInsertId();

        http_response_code(201);
        echo json_encode([
            "result"  => "success",
            "message" => "Rack created successfully",
            "id"      => $new_id
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "result"  => "error",
            "message" => "Failed to create rack: " . $e->getMessage()
        ]);
    }
?>