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
                    $buttonId = $decoded['buttonId'];
                    $selectedCheckboxes = $decoded['selectedCheckboxes'];
                    $selectedCheckboxesString = implode(", ", $selectedCheckboxes);

                    sendEmail('alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com', "Новый запрос на собеседование с сайта", "Имя пользователя: $username\nКонтакты: $contacts\nСпособ связи: $selectedCheckboxesString\nМесто формы: $buttonId");
                    break;
                case 'interviewRequestMF':
                    // Обработка данных из формы запроса
                    $username = $decoded['username'];
                    $contacts = $decoded['contacts'];
                    $buttonId = $decoded['buttonId'];
                    $selectedCheckboxes = $decoded['selectedCheckboxes'];

                    sendEmail('alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com', "Новый запрос на собеседование с сайта", "Имя пользователя: $username\nКонтакты: $contacts\nСпособ связи: $selectedCheckboxes\nМесто формы: $buttonId");
                    break;    
                case 'anketa15':
                    // Обработка данных из формы обратной связи
                    // $username = $decoded['username-input'];
                    // $contacts = $decoded['contacts-input'];
                    sendEmail('alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com', "Новый заполненная анкета");
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

