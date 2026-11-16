<?php
// public/api/quote.php
// Handles Request a Quote Modal Submissions to Hostinger MySQL Database

require_once __DIR__ . '/config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$company_name = trim($input['company'] ?? $input['company_name'] ?? '');
$contact_person = trim($input['contact'] ?? $input['contact_person'] ?? '');
$email = trim($input['email'] ?? '');
$phone = trim($input['phone'] ?? '');
$fuel_product = trim($input['product'] ?? $input['fuel_product'] ?? 'Diesel Fuel');
$quantity = trim($input['volume'] ?? $input['quantity'] ?? '');
$delivery_location = trim($input['location'] ?? $input['delivery_location'] ?? '');
$emirate = trim($input['emirate'] ?? 'Dubai');
$notes = trim($input['notes'] ?? $input['message'] ?? '');

if (empty($contact_person) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Please provide contact person, email, and phone number']);
    exit;
}

try {
    $pdo = getDbConnection();
    $stmt = $pdo->prepare("
        INSERT INTO quote_requests 
        (company_name, contact_person, email, phone, fuel_product, quantity, delivery_location, emirate, notes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $company_name,
        $contact_person,
        $email,
        $phone,
        $fuel_product,
        $quantity,
        $delivery_location,
        $emirate,
        $notes
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Quote request submitted successfully! An account manager will contact you within 15 minutes.',
        'id' => $pdo->lastInsertId()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Could not save quote request']);
}
