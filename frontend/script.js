const API_URL = 'http://localhost:5000/tarefas';

async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        
        const taskList = document.getElementById('taskList');
        const completedList = document.getElementById('completedList');
        
        taskList.innerHTML = '';
        completedList.innerHTML = '';

        tasks.forEach(task => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed-item');

            li.innerHTML = `
                <span>${task.title}</span>
                <div class="actions">
                    <button class="btn-edit" onclick="editTask('${task._id}', '${task.title}')">✏️</button>
                    <button class="btn-check" onclick="toggleTask('${task._id}', ${!task.completed})">
                        ${task.completed ? '↩️' : '✅'}
                    </button>
                    <button class="btn-delete" onclick="deleteTask('${task._id}')">🗑️</button>
                </div>
            `;
            
            if (task.completed) {
                completedList.appendChild(li);
            } else {
                taskList.appendChild(li);
            }
        });
    } catch (err) {
        console.error("Erro ao carregar:", err);
    }
}

async function addTask() {
    const input = document.getElementById('taskInput');
    if (!input.value.trim()) return;

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input.value })
    });

    input.value = '';
    loadTasks();
}

// aqui edita o texto da tarefa
async function editTask(id, currentTitle) {
    const newTitle = prompt("Edite sua tarefa:", currentTitle);
    
    if (newTitle !== null && newTitle.trim() !== "" && newTitle !== currentTitle) {
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });
        loadTasks();
    }
}

async function toggleTask(id, status) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: status })
    });
    loadTasks();
}

async function deleteTask(id) {
    if (confirm("Deseja realmente excluir esta tarefa?")) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadTasks();
    }
}

loadTasks();