document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
    loadProjects();
    loadTasks();
});

function loadUsers() {
    fetch("/api/users/", {
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        const usersList = document.getElementById("users");
        usersList.innerHTML = '<option value="">Select User</option>';
        const assignedToSelect = document.getElementById("assigned-to");
        assignedToSelect.innerHTML = '<option value="">Select User</option>';
        
        data.forEach(user => {
            usersList.innerHTML += `<option value="${user.id}">${user.id}->${user.username}</option>`;
            assignedToSelect.innerHTML += `<option value="${user.id}">${user.username}</option>`;
        });
    })
    .catch(error => console.error("Error:", error));
}

function registerUser() {
    window.location.href = "api/register";
}

function loadProjects() {
    fetch('/api/projects/', {
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        const projectsDiv = document.getElementById('projects');
        const projectSelect = document.getElementById("projects-to");
        projectsDiv.innerHTML = '';
        projectSelect.innerHTML = '<option value="">Select Project</option>';
        
        data.forEach(project => {
            projectsDiv.innerHTML += `
                <div class="p-4 mb-4 bg-white rounded-lg shadow-md border border-gray-200">
                    <h3 class="text-lg font-semibold">${project.title}</h3>
                    <p class="text-gray-700">${project.description}</p>
                    <p class="text-sm text-gray-500">Start Date: <span class="font-semibold">${project.start_date}</span></p>
                    <p class="text-sm text-gray-500">End Date: <span class="font-semibold">${project.end_date}</span></p>
                    <p class="text-sm text-gray-500">Progress: <span class="font-semibold">${project.progress}%</span></p>
                    <p class="text-sm text-gray-500">Assigned User: <span class="font-semibold">${project.assigned_users}</span></p>
                    <div class="flex space-x-2 mt-2">
                        <button onclick="editProject(${project.id})" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Edit</button>
                        <button onclick="deleteProject(${project.id})" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                    </div>
                </div>
            `;
            projectSelect.innerHTML += `<option value="${project.id}">${project.title}</option>`;
        });
    })
    .catch(error => console.error('Error:', error));
}

function loadTasks() {
    fetch('/api/tasks/', {
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        const tasksDiv = document.getElementById('tasks');
        tasksDiv.innerHTML = '';
        
        data.forEach(task => {
            tasksDiv.innerHTML += `
                <div class="p-4 mb-4 bg-white rounded-lg shadow-md border border-gray-200">
                    <h4 class="text-lg font-semibold">${task.title}</h4>
                    <p class="text-gray-700">${task.description}</p>
                    <p class="text-sm text-gray-500">Status: <span class="font-semibold">${task.status}</span></p>
                    <p class="text-sm text-gray-500">Due Date: <span class="font-semibold">${task.due_date}</span></p>
                    <p class="text-sm text-gray-500">Assigned User ID: <span class="font-semibold">${task.assigned_to}</span></p>
                    <p class="text-sm text-gray-500">Assigned Project ID: <span class="font-semibold">${task.project}</span></p>
                    <div class="flex space-x-2 mt-2">
                        <button onclick="editTask(${task.id})" class="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600">Edit</button>
                        <button onclick="deleteTask(${task.id})" class="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600">Delete</button>
                    </div>
                </div>
            `;
        });
    })
    .catch(error => console.error('Error:', error));
}

function showCreateProjectForm() {
    document.getElementById('create-project-form').style.display = 'block';
}

function showCreateTaskForm() {
    document.getElementById('create-task-form').style.display = 'block';
}

function submitProjectForm(event) {
    event.preventDefault();
    const projectId = document.getElementById('project-id').value;
    const url = projectId ? `/api/projects/${projectId}/` : '/api/projects/';
    const method = projectId ? 'PUT' : 'POST';
    
    fetch(url, {
        method: method,
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            title: document.getElementById('project-title').value,
            description: document.getElementById('project-description').value,
            start_date: document.getElementById('project-start-date').value,
            end_date: document.getElementById('project-end-date').value,
            assigned_users: document.getElementById('assigned-to').value,
        })
    })
    .then(response => response.json())
    .then(data => {
        loadProjects();
        document.getElementById('create-project-form').style.display = 'none';
        document.getElementById('project-form').reset();
    })
    .catch(error => console.error('Error:', error));
}

function submitTaskForm(event) {
    event.preventDefault();
    const taskId = document.getElementById('task-id').value;
    const url = taskId ? `/api/tasks/${taskId}/` : '/api/tasks/';
    const method = taskId ? 'PUT' : 'POST';
    
    fetch(url, {
        method: method,
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        },
        body: JSON.stringify({
            title: document.getElementById('task-title').value,
            description: document.getElementById('task-description').value,
            status: document.getElementById('task-status').value,
            due_date: document.getElementById('task-due-date').value,
            assigned_to: document.getElementById('assigned-to').value,
            project: document.getElementById('projects-to').value,
        })
    })
    .then(response => response.json())
    .then(data => {
        loadTasks();
        document.getElementById('create-task-form').style.display = 'none';
        document.getElementById('task-form').reset();
    })
    .catch(error => console.error('Error:', error));
}

function editProject(projectId) {
    fetch(`/api/projects/${projectId}/`, {
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('project-id').value = data.id;
        document.getElementById('project-title').value = data.title;
        document.getElementById('project-description').value = data.description;
        document.getElementById('project-start-date').value = data.start_date;
        document.getElementById('project-end-date').value = data.end_date;
        document.getElementById('assigned-to').value = data.assigned_users;
        document.getElementById('create-project-form').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

function editTask(taskId) {
    fetch(`/api/tasks/${taskId}/`, {
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('task-id').value = data.id;
        document.getElementById('task-title').value = data.title;
        document.getElementById('task-description').value = data.description;
        document.getElementById('task-status').value = data.status;
        document.getElementById('task-due-date').value = data.due_date;
        document.getElementById('assigned-to').value = data.assigned_to;
        document.getElementById('projects-to').value = data.project;
        document.getElementById('create-task-form').style.display = 'block';
    })
    .catch(error => console.error('Error:', error));
}

function deleteProject(projectId) {
    fetch(`/api/projects/${projectId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(() => {
        loadProjects();
    })
    .catch(error => console.error('Error:', error));
}

function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}/`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Token ' + localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
        }
    })
    .then(() => {
        loadTasks();
    })
    .catch(error => console.error('Error:', error));
}

function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}
