DJANGO REST + React Task Manager

This is a full-stack web application built for managing tasks, demonstrating full CRUD (Create, Read, Update, Delete) functionality. The backend is powered by Django REST Framework (DRF), and the frontend is a single-page application built with React using Vite.

Setup and Running the Application

Follow these sequential steps to set up and start both the backend and frontend servers.

1. Backend Setup (Django API)

1. Navigate to the backend directory:
    cd backend

2. Create and activate a virtual environment (Recommended):
    python -m venv venv
    source venv/bin/activate  # macOS/Linux
    # venv\Scripts\activate  # Windows

3. Install dependencies:
    pip install -r requirements.txt

4. Run migrations:
    python manage.py migrate

5. Start the Django server:
    python manage.py runserver
    The API will be available at http://127.0.0.1:8000/. Keep this terminal window open.

2. Frontend Setup (React)

1. Open a new terminal window and navigate to the frontend directory:
    cd ../frontend

2. Install Node dependencies:
    npm install

3. Start the development server:
    npm run dev
    The Task Manager Web App will typically open in your browser at http://localhost:5173/.

API Endpoint Summary

The Django REST API is configured under the /api/ prefix and exposes the following endpoints using a SimpleRouter with a custom TaskViewSet:

| HTTP Method | Endpoint | Description | Frontend Usage |
| GET | /api/tasks/ | Retrieves the list of all tasks. | Initial data fetch (R) |
| POST | /api/tasks/ | Creates a new task resource. | TaskForm submission (C) |
| GET | /api/tasks/{id}/ | Retrieves a single task instance. | Implicit |
| PUT | /api/tasks/{id}/ | Full update of task details (Title/Description). | TaskForm submission (U) |
| PATCH | /api/tasks/{id}/ | Partial update (Used primarily to toggle completed status). | Toggle button (U) |
| DELETE | /api/tasks/{id}/ | Deletes a task resource. | Delete button (D) |

Notes and Assumptions

* Frontend Framework: The user interface was built using React with Vite and Axios.
* CORS Configuration: The django-cors-headers package is installed and configured in settings.py to allow the frontend running on port 5173 to safely communicate with the backend running on port 8000.
* State Management: Task data is managed locally within the main TaskList component using React's useState and useEffect hooks to ensure immediate UI synchronization after all API operations.
* View Implementation: The backend uses rest_framework.viewsets.ViewSet with manual overrides for the CRUD methods, which gives explicit control over status codes and logic.