<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных JSON из запроса
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    // Проверка на наличие данных
    if (is_array($decoded)) {
        // Проверка типа запроса
        if (isset($decoded['type'])) {
            switch ($decoded['type']) {
                case 'interviewRequest':
                    // Обработка данных из формы запроса
                    $username = $decoded['username'];
                    $contacts = $decoded['contacts'];
                    sendEmail('alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com', "Новый запрос на собеседование с сайта", "Имя пользователя: $username\nКонтакты: $contacts");
                    break;
                case 'feedbackForm':
                    // Обработка данных из формы обратной связи
                    $feedback = $decoded['feedback'];
                    sendEmail('feedback@mail.ru', "Новое сообщение обратной связи", "Сообщение: $feedback");
                    break;
                // Другие типы форм
                // ...
            }
        }

        echo json_encode(["message" => "Данные успешно отправлены"]);
    } else {
        echo json_encode(["message" => "Ошибка при отправке данных"]);
    }
}

function sendEmail($to, $subject, $message) {
    $headers = 'From: "PointB: Order" <webmaster@example.com>' . "\r\n" .
               'Reply-To: "PointB: Order" <webmaster@example.com>'. "\r\n" .
               'X-Mailer: PHP/' . phpversion();
    mail($to, $subject, $message, $headers);
}
?>

