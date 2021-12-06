<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language');
    $mail->isHTML(true);

    //От кого письмо
    $mail->setFrom('site@fasad.ru');
    //Кому отправить
    $mail->addAddress('Ist.3184082@gmail.com');
    //Тема письма
    $mail->Subject = 'Новая заявка с сайта фасадные-решения-мск.рф';

    //Тело письма
    $body = '<h1>Пришла новая заявка с сайта!</h1>';
    
    if(trim(!empty($_POST['name']))){
        $body .= '<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['phone']))){
        $body .= '<p><strong>Номер телефона:</strong> '.$_POST['phone'].'</p>';
    }

    $mail->Body = $body;

    //Отправка письма
    if (!$mail->send()) {
        $message = 'Ошибка';
    } else {
        $message = 'Данные отправлены!';
    }

    $response = ['message' => $message];

    header('Content-type: application/json');
    echo json_encode($response);
?>