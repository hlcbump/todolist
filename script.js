var sidebar = document.getElementById("sidebar");
var toggleBtn = document.querySelector(".toggle-btn");
var pannel = document.getElementById("pannel");
var popup = document.getElementById("popup");

var submitTaskButton = document.getElementById("submitTaskButton");
var form = document.getElementById("taskForm");

updateTaskList()

function toggleSidebar() {
    if (sidebar.classList.contains("open")) {
        closeSidebar();
    } else {
        openSidebar();
    }
}

function openSidebar() {
    sidebar.classList.add("open");
    sidebar.classList.remove("closed");
    pannel.style.transform = "translateX(10%)";
    toggleBtn.style.zIndex = "1";
}


function closeSidebar() {
    sidebar.classList.add("closed");
    sidebar.classList.remove("open");
    pannel.style.transform = "translateX(0%)";
    toggleBtn.style.zIndex = "0";
}

function openPopup(){
    popup.classList.remove("close-popup");
    popup.classList.add("open-popup");
}

function submitFormAndClosePopup() {

    submitFormAjax(form);
    closePopup();
    updateTaskList();
    return false;
}

function submitFormAjax(form) {
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        // Verifica se a solicitação foi bem-sucedida
        if (xhr.status >= 200 && xhr.status < 400) {
            // Pode adicionar código aqui para lidar com a resposta do servidor
            console.log("Formulário enviado com sucesso!");
        } else {
            // Pode adicionar código aqui para lidar com erros
            console.error("Erro ao enviar formulário.");
        }
    };

    // Obtém os dados do formulário
    var formData = new FormData(form);

    // Envia a solicitação AJAX com os dados do formulário
    xhr.send(new URLSearchParams(formData));
    console.log(formData);
}

function closePopup(){
    popup.classList.remove("open-popup");
    popup.classList.add("close-popup");
    updateTaskList()
}

function updateTaskList() {
    var taskListContainer = document.getElementById("taskList");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./db/display.php", true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            taskListContainer.innerHTML = xhr.responseText;
            setUpdateButtonListeners(); // Adiciona listeners após atualizar a lista
        } else {
            console.error("Erro ao carregar a lista de tarefas.");
        }
    };
    xhr.send();
}

function setUpdateButtonListeners() {
    var updateButtons = document.querySelectorAll('.update-button');
    updateButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var taskId = button.getAttribute('data-task-id');
            openEditPopup('editTask' + taskId, taskId);
        });
    });
}

function openEditPopup(editPopupId, taskId) {
    var editPopup = document.getElementById(editPopupId);
    editPopup.style.display = 'block';
    // Carrega dados existentes ou realiza uma solicitação AJAX para buscar os dados
    // Preencha os campos do formulário com os dados existentes
}

function editTask(taskId) {
    // Obtém os dados editados do formulário de edição
    var editedTaskName = document.getElementById('editedTaskName' + taskId).value;
    var editedTaskDescription = document.getElementById('editedTaskDescription' + taskId).value;
    var editedTaskTime = document.getElementById('editedTaskTime' + taskId).value;

    // Realiza uma solicitação AJAX para atualizar os dados no servidor
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "./db/edit.php", true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 400) {
            console.log("Tarefa editada com sucesso!");
            // Atualiza a lista de tarefas após a edição
            updateTaskList();
        } else {
            console.error("Erro ao editar a tarefa.");
        }
    };

    // Constrói os dados a serem enviados
    var formData = new FormData();
    formData.append('task_id', taskId);
    formData.append('edited_task_name', editedTaskName);
    formData.append('edited_task_description', editedTaskDescription);
    formData.append('edited_task_time', editedTaskTime);

    // Envia a solicitação AJAX com os dados editados
    xhr.send(new URLSearchParams(formData));

    // Fecha o popup de edição após o envio bem-sucedido
    closeEditPopup('editTask' + taskId);
}


function closeEditPopup(taskId) {
    var editPopup = document.getElementById('editTask' + taskId);
    editPopup.style.display = 'none';
}

function deleteTask(taskId) {
    if (confirm("Você tem certeza que deseja excluir esta tarefa?")) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./db/delete.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 400) {
                // Atualizar a lista de tarefas após a exclusão
                updateTaskList();
            } else {
                console.error("Erro ao excluir tarefa.");
            }
        };

        xhr.send("id=" + taskId);
    }
}