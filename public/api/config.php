<?php
// public/api/config.php
// Dubai Diesel Trading L.L.C. Database Configuration (Hostinger MySQL)

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$db_host = '194.59.164.108'; // or 'srv547.hstgr.io' / 'localhost' if running on Hostinger
$db_user = 'u136421965_dieseluser';
$db_pass = '8CIB1^gN';
$db_name = 'u136421965_dieseldb';

function getDbConnection() {
    global $db_host, $db_user, $db_pass, $db_name;
    try {
        $pdo = new PDO("mysql:host={$db_host};dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_TIMEOUT => 5
        ]);
        return $pdo;
    } catch (PDOException $e) {
        // Fallback to localhost if deployed on the same Hostinger server
        try {
            $pdo = new PDO("mysql:host=localhost;dbname={$db_name};charset=utf8mb4", $db_user, $db_pass, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 5
            ]);
            return $pdo;
        } catch (PDOException $ex) {
            http_response_code(500);
            echo json_encode(['success' => false, 'error' => 'Database connection failed']);
            exit;
        }
    }
}
