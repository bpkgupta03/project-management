# Project Management System

A web-based project management system that allows users to manage projects, tasks, and users. Built with Django as the backend framework and Tailwind CSS for styling.

## Features

- **User Management**: Register and manage users.
- **Project Management**: Create, update, and delete projects. Track project details such as title, description, start and end dates, and progress.
- **Task Management**: Create, update, and delete tasks. Assign tasks to users and link them to projects.

## Technologies Used

- **Frontend**: HTML, JavaScript, Tailwind CSS
- **Backend**: Django
- **Database**: SQLite (default, configurable to other databases)
- **Authentication**: Token-based authentication
- **API**: RESTful APIs for CRUD operations

## Installation

### Prerequisites

- Python 3.x
- Django 3.x or newer

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/project-management-system.git
    cd project-management-system
    ```

2. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

3. **Apply migrations:**

    ```bash
    python manage.py migrate
    ```

4. **Run the server:**

    ```bash
    python manage.py runserver
    ```

5. **Access the application:**

    Open your browser and go to `http://localhost:8000`.

## Usage

- **Register Users:** Use the `/register` endpoint to register new users.
- **Manage Projects and Tasks:** After logging in, you can create, edit, and delete projects and tasks using the web interface.
- **Authentication:** Obtain a token by logging in, and include it in your API requests for protected routes.

## API Endpoints

- **Users:**
  - `GET /api/users/` - List all users
  - `POST /api/register/` - Register a new user

- **Projects:**
  - `GET /api/projects/` - List all projects
  - `POST /api/projects/` - Create a new project
  - `PUT /api/projects/{id}/` - Update a project
  - `DELETE /api/projects/{id}/` - Delete a project

- **Tasks:**
  - `GET /api/tasks/` - List all tasks
  - `POST /api/tasks/` - Create a new task
  - `PUT /api/tasks/{id}/` - Update a task
  - `DELETE /api/tasks/{id}/` - Delete a task

***
You can also view the whole functionality on ui , and implement crud operation there itself.

  Open your browser and go to `http://localhost:8000`.
***