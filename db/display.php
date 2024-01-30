<?php
require_once 'connection.php';

$sql = "SELECT * FROM tasks";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "<p>{$row['task_name']} - {$row['task_description']} - {$row['task_time']}</p>";
    }
} else {
    echo "Nenhuma tarefa encontrada.";
}

$connection->close();
?>