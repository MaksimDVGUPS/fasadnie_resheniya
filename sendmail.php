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
//     $mail->addAddress('Ist.3184082@gmail.com');
    $mail->addAddress('maksim000072@gmail.com');
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

    if(trim(!empty($_POST['calc_glass-type']))){
        $body .= '<h2>Данные для расчета стоимости</h2>';
        $body .= '<p><strong>Тип остекления:</strong> '.$_POST['calc_glass-type'].'</p>';
        $body .= '<p><strong>Вид фасада:</strong> '.$_POST['calc_fasad'].'</p>';
        $body .= '<p><strong>Тип створок:</strong> '.$_POST['calc_door-type'].'</p>';
        $body .= '<p><strong>Количество створок:</strong> '.$_POST['calc_doors-count'].'</p>';
        $body .= '<p><strong>Ширина:</strong> '.$_POST['calc_width'].'</p>';
        $body .= '<p><strong>Высота:</strong> '.$_POST['calc_height'].'</p>';
        $body .= '<p><strong>Дополнительная комплектация:</strong> '.$_POST['calc_additional[]'].'</p>';
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