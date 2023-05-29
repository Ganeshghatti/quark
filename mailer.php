<?php
ini_set('display_errors', 1);
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/autoload.php';

$mail = new PHPMailer(true);
// name email subject phone message
echo "processing..";
echo "processing..";
echo implode(",",$_GET);

if(isset($_GET['name'])&&isset($_GET['email'])&&isset($_GET['subject'])&&isset($_GET['phone'])&&isset($_GET['message'])){
      echo "trying";
echo "processing..";

    try {
      echo "trying";
        $mail->SMTPDebug = 1;
        $mail->isSMTP();
        $mail->Host = 'smtp.hostinger.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'contact@quarkmarketing.in';
        $mail->Password = 'QuackQuack123@';
        $mail->SMTPSecure = 'ssl';
        $mail->Port=465;
        $mail->setFrom('contact@quarkmarketing.in', 'Quark Marketing');
        $mail->addAddress($_GET['email'],$_GET['name']);
        $mail->addCC('contact@quarkmarketing.in', 'Quark Marketing');
        $mail->isHTML(true);
        $mail->Subject = "Thank you for Contacting Us!";
        $mail->Body = "We have received your inquiry, Our team will be back to you soon in 1-2 business days. <br> The details you've filled are : <br>"
        ."Name : " .$_GET["name"] ."<br>" . "Email : " . $_GET["email"] . "<br>" . "Nature of Work: " .  $_GET["subject"].
        "<br>" . "phone : " . $_GET["phone"]."<br>" . "Message : " . $_GET["message"] ;
        $mail->send();
        echo "mail sent";
        header("Location: index.html?success=true");
        die();
    } 
    catch(Exception $e){
      echo "error";
      echo e;
    header("Location: index.html?success=false");
    die();
    }
}


?>
