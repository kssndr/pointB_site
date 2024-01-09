<?php
$userIp = $_SERVER['REMOTE_ADDR']; // Получаем IP адрес пользователя

// Здесь можно использовать сторонний API для определения страны по IP адресу
$url = "http://ip-api.com/json/" . $userIp;
$response = file_get_contents($url);
$data = json_decode($response, true);

if ($data && $data['status'] == 'success') {
    //echo json_encode(['country' => $data['countryCode']]);
} else {
    //echo json_encode(['error' => 'Страна не найдена']);
}
?>