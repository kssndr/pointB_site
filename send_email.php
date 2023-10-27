<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $toEmail = "Innessa.romanovskaya@gmail.com"; // Email-адрес получателя
    $subject = "Запрос программы"; // Тема письма

    // Получение данных из POST-запроса
    $username = $_POST["username"];
    $meetingFrequency = $_POST["meetingFrequency"];
    $contacts = $_POST["contacts"];
    $notes = $_POST["notes"];
    $timeResult = $_POST["timeResult"];
    $moneyResult = $_POST["moneyResult"];
    $currency = $_POST["currency"];

    // Сообщение, которое будет отправлено
    $message = "Имя: $username\n";
    $message .= "Частота встреч: $meetingFrequency\n";
    $message .= "Контакты: $contacts\n";
    $message .= "Примечания: $notes\n";
    $message .= "Время: $timeResult\n";
    $message .= "Деньги: $moneyResult $currency\n";

    // Дополнительные заголовки
    $headers = "From: webmaster@example.com\r\n";
    $headers .= "Reply-To: webmaster@example.com\r\n";

    // Отправка письма
    mail($toEmail, $subject, $message, $headers);
}
?>
