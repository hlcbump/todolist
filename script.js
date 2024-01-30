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
}

function updateTaskList() {
    var taskListContainer = document.getElementById("taskList");
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "./db/display.php", true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 400) {
            taskListContainer.innerHTML = xhr.responseText;
            console.error("diplay funcionando");
        } else {
            console.error("Erro ao carregar a lista de tarefas.");
        }
    };
    xhr.send();
}