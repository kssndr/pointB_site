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
                       $selectedCheckboxes = json_decode($decoded['selectedCheckboxes'], true);

                       // Проверка на успешное декодирование JSON и что результат является массивом
                       if (json_last_error() === JSON_ERROR_NONE && is_array($selectedCheckboxes)) {
                           // Преобразуем данные в удобочитаемый текст
                           $messageText = "";
                           foreach ($selectedCheckboxes as $question => $answer) {
                               $messageText .= $question . ": \n";
                               if (is_array($answer)) { // Если ответ это массив
                                   $messageText .= implode(", ", $answer); // Объединяем элементы массива в строку
                               } else { // Если ответ это строка
                                   $messageText .= $answer;
                               }
                               $messageText .= "\n\n"; // Добавляем перенос строки после каждого вопроса-ответа
                           }
   
                           // Отправка сообщения на электронную почту
                           sendEmail('alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com', "Новый заполненная анкета", $messageText);
                        } else {
                            // Обработка ошибок декодирования JSON или несоответствия типов
                            error_log("Ошибка декодирования JSON или selectedCheckboxes не является массивом");
                        }
                    break;
                case 'module':
                    $username = $decoded['username'];
                    $contacts = $decoded['contacts'];
                    sendEmail('alexander.khimchenko@gmail.com, innessa.romanovskaya@gmail.com', "Новый запрос на собеседование с сайта", "Имя пользователя: $username\nКонтакты: $contacts");

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

