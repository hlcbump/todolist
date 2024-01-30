<?php
require_once 'connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id'])) {
    $taskId = $_POST['id'];

    $sql = "DELETE FROM tasks WHERE id = $taskId";
    if ($connection->query($sql)) {
        echo "Tarefa excluída com sucesso.";
    } else {
        echo "Erro ao excluir a tarefa: " . $connection->error;
    }
} else {
    echo "Solicitação inválida.";
}

$connection->close();
?>