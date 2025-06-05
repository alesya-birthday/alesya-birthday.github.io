<?php
// Получаем данные из формы
$name = $_POST['name'] ?? '';
$attendance = $_POST['attendance'] ?? '';
$allergies = $_POST['allergies'] ?? '';
$allergies_details = $_POST['allergies_details'] ?? '';
$song = $_POST['song'] ?? '';

// Простая валидация (можно расширить)
if (empty($name) || empty($attendance)) {
    // Можно вернуть ошибку или редирект с сообщением
    http_response_code(400);
    echo "Ошибка: Имя и Присутствие обязательны.";
    exit;
}

// Формируем текст письма
$to = "yakov.ersh@yandex.by";
$subject = "RSVP с сайта приглашения";
$message = "Имя: " . htmlspecialchars($name) . "\n";
$message .= "Присутствие: " . htmlspecialchars($attendance) . "\n";
$message .= "Аллергии: " . htmlspecialchars($allergies) . "\n";
if ($allergies === 'yes') {
    $message .= "Детали аллергий: " . htmlspecialchars($allergies_details) . "\n";
}
$message .= "Песня: " . htmlspecialchars($song) . "\n";

// Заголовки письма
// !!! ВАЖНО: На реальном хостинге 'From' лучше указывать существующий email на этом же домене
$headers = "From: noreply@" . ($_SERVER['SERVER_NAME'] ?? 'your-domain.com') . "\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Отправляем письмо
// Проверьте настройки сервера и функции mail() - на некоторых хостингах может потребоваться SMTP
$success = mail($to, $subject, $message, $headers);

// Ответ для пользователя или редирект
if ($success) {
    // Успех: можно вывести сообщение или перенаправить пользователя
    // header('Location: success.html'); // Пример редиректа
    echo "OK"; // Или простой ответ для AJAX
} else {
    // Ошибка отправки
    http_response_code(500);
    echo "Ошибка отправки письма.";
}

?> 