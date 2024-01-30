<?php
require_once 'connection.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $taskId = $_POST['task_id'];
    $editedTaskName = $_POST['edited_task_name'];
    $editedTaskDescription = $_POST['edited_task_description'];
    $editedTaskTime = $_POST['edited_task_time'];

    // Atualiza os dados da tarefa no banco de dados
    $sql = "UPDATE tasks SET task_name = '$editedTaskName', task_description = '$editedTaskDescription', task_time = '$editedTaskTime' WHERE id = $taskId";

    if ($connection->query($sql)) {
        echo "Tarefa editada com sucesso.";
    } else {
        echo "Erro ao editar a tarefa: " . $connection->error;
    }
} else {
    echo "Método de requisição inválido.";
}

$connection->close();
?>
