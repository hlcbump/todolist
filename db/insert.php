<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Insert</title>
</head>
<body>
</body>
</html>
<?php
    require_once 'connection.php';

    var_dump($_POST);


    if(isset($_POST['task_name'], $_POST['task_description'], $_POST['task_time'])){
        $task_name = $_POST['task_name'];
        $task_description = $_POST['task_description'];
        $task_time = $_POST['task_time'];
    
        $sql = "INSERT INTO tasks (task_name, task_description, task_time) VALUES ('$task_name', '$task_description', '$task_time')";
    
        if($connection->query($sql)){
            echo "Criado com sucesso.";
        } else {
            echo "Erro ao criar tarefa: " . $connection->error;
        }
    }

    error_log("Mensagem de erro: Alguma coisa aconteceu.", 0);

?>