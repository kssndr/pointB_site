<?php
$to = 'alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com'; 
$subject = 'Тест отправки почты';
$message = 'Это тестовое сообщение.';
$headers = `From: "PointB: Order" <webmaster@example.com>' . "\r\n" .
    'Reply-To: webmaster@example.com' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();

if(mail($to, $subject, $message, $headers)) {
    echo 'Сообщение отправлено успешно';
} else {
    echo 'Ошибка при отправке сообщения';
}
?>
