<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $contacts = $_POST['contacts'];
    $meetingFrequency = $_POST['meeting-frequency'];
    $notes = $_POST['notes'];
    $timeResult = $_POST['time-result'];
    $moneyResult = $_POST['money-result'];
    $currency = $_POST['currency'];

    // Проверка: поля "username" и "contacts" не должны быть пустыми
    // Эта проверка должна идти сразу после сбора данных из полей
    $isValid = true;

    if (empty($username)) {
        $isValid = false;
        echo json_encode(['success' => false, 'message' => 'Имя обязательно для заполнения']);
        exit;
    }

    if (empty($contacts)) {
        $isValid = false;
        echo json_encode(['success' => false, 'message' => 'Контакты обязательны для заполнения']);
        exit;
    }

    // Теперь, если все поля валидны, продолжаем выполнение кода

    $to = 'Innessa.romanovskaya@gmail.com'; // Замените на свой адрес электронной почты
    $subject = 'Запрос программы';
    $message = "Имя: $username\nКонтакты: $contacts\n... (остальные поля)";

    $headers = 'From: ваш_email@gmail.com' . "\r\n" .
               'Reply-To: ваш_email@gmail.com' . "\r\n" .
               'X-Mailer: PHP/' . phpversion();

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Письмо успешно отправлено']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ошибка отправки письма']);
    }
} else {
    // Обработка ситуации, когда запрос не является POST-запросом
    echo json_encode(['success' => false, 'message' => 'Недопустимый запрос']);
}
?>
