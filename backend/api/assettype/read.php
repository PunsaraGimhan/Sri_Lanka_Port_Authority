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

$stmt = $conn->query("SELECT * FROM asset_types ORDER BY created_at DESC");
$types = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($types);
?>