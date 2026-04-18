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

    if (empty($data['id'])) {
        http_response_code(400);
        echo json_encode(["result" => "error", "message" => "id is required"]);
        exit();
    }

    $id = intval($data['id']);

    try {

        $check = $conn->prepare("SELECT id FROM racks WHERE id = :id");
        $check->bindParam(":id", $id);
        $check->execute();

        if ($check->rowCount() === 0) {
            http_response_code(404);
            echo json_encode(["result" => "error", "message" => "Rack not found"]);
            exit();
        }

        $query = "DELETE FROM racks WHERE id = :id";
        $stmt  = $conn->prepare($query);
        $stmt->bindParam(":id", $id);
        $stmt->execute();

        http_response_code(200);
        echo json_encode([
            "result"  => "success",
            "message" => "Rack deleted successfully"
        ]);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            "result"  => "error",
            "message" => "Failed to delete rack: " . $e->getMessage()
        ]);
    }
?>