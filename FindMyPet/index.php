<?php
require_once('index.php');
$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPSecure='ssl';
$mail->Host = 'smtp.gmail.com';
$mail->Port = '465';
$mail->isHTML();
$mail->Username = 'findmypetservice@gmail.com';
$mail->Password = 'Bullard1234';
$mail->Subject = 'Contact Us';
$mail->Body = '?????????';
$mail->AddAddress('findmypetservice@gmail.com');
$mail->Send();
?>