<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "../../config/db.php";
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (
    empty($data['rack_id']) || empty($data['ip_address']) ||
    empty($data['asset_type']) || empty($data['rack_tier']) ||
    empty($data['responsible_person']) || empty($data['phone_number'])
) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO assets 
    (rack_id, ip_address, asset_type, rack_tier, responsible_person, phone_number) 
    VALUES (?, ?, ?, ?, ?, ?)");

$stmt->execute([
    $data['rack_id'],
    $data['ip_address'],
    $data['asset_type'],
    $data['rack_tier'],
    $data['responsible_person'],
    $data['phone_number']
]);

echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
?>