<?php
require_once 'connection.php';

$sql = "SELECT * FROM tasks";
$result = $connection->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $taskId = $row['id'];
        echo "<p>{$row['task_name']} - {$row['task_description']} - {$row['task_time']} 
              <button onclick=\"openEditPopup('editTask{$taskId}', '{$row['task_name']}', '{$row['task_description']}', '{$row['task_time']}', {$taskId})\">Update</button>
              <button onclick=\"deleteTask({$taskId})\">Delete</button>
              </p>";
        echo "<div id='editTask{$taskId}' class='edit-popup' style='display:none;'>
            <input type='text' placeholder='Task Name' name='edited_task_name' id='editedTaskName{$taskId}' value='{$row['task_name']}'>
            <input type='text' placeholder='Description' name='edited_task_description' id='editedTaskDescription{$taskId}' value='{$row['task_description']}'>
            <input type='number' placeholder='Time' name='edited_task_time' id='editedTaskTime{$taskId}' value='{$row['task_time']}'>
            <button onclick='editTask({$taskId})'>Save</button>
            <button onclick='closeEditPopup({$taskId})'>Cancel</button>
        </div>";
    }
} else {
    echo "Nenhuma tarefa encontrada.";
}

$connection->close();
?>
