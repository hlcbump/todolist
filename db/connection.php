<?php
    $localhost = "localhost";
    $user = "root";
    $password = "usbw";
    $db = "todolist";
    $connection = new mysqli($localhost, $user, $password, $db);

    if ($connection->connect_error) {
        die("Connection error: " . $connection->connect_error);
    }

?>