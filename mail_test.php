<?php
$to = 'your_email@example.com'; // Замените на ваш реальный email адрес для тестирования
$subject = 'Тест отправки почты';
$message = 'Это тестовое сообщение.';
$headers = 'From: webmaster@example.com' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)) {
    echo 'Сообщение отправлено успешно';
} else {
    echo 'Ошибка при отправке сообщения';
}
?>
