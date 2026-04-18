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
    empty($data['server']) || empty($data['pc']) ||
    empty($data['switch_device']) || empty($data['hub'])
) {
    http_response_code(400);
    echo json_encode(["error" => "All fields are required"]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO asset_types (server, pc, switch_device, hub) VALUES (?, ?, ?, ?)");
$stmt->execute([
    $data['server'],
    $data['pc'],
    $data['switch_device'],
    $data['hub']
]);

echo json_encode(["success" => true, "id" => $conn->lastInsertId()]);
?>