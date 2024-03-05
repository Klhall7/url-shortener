# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Project Setup
This is the frontend React portion of the URL Shortener Application. It is a vite project setup with the standard React-Javascript library installation along with REACT Router DOM for client navigation and page rendering. This frontend directory relies on the database table setup in api/ primarily for authentication and managing user-specific data.

## Front End Prerequisites
- PostgreSQL (16)
- FastAPI (0.1.0 OAS 3.1)
- Python (3.12)
- React Router DOM library installed along with standard Vite project setup installs (check package.json for current version)

### Testing
1. Ensure PostgreSQL server is running and the SQLAlchemy Engine is connecting to the right database server (Postgres should be running and POSTGRES_DB in api/.env should match database with tables for this url shortener application)
2. Ensure virtual environment is active, and Uvicorn is running to serve the FastAPI project file: $uvicorn main:app 
3. Ensure FastAPI routes are working correctly when tested in Swagger UI
3. Run development server to preview and debug front end client view: $npm run dev
4. React Router Routes are now testable via: 'http://localhost:5173/'

### Client FrontEnd connection to FAST API backend:
Database table content should be filled with user interaction, filling the place of Swagger UI testing.

#### User Authentication:
- When a user logs in, the front end sends a request to the FastAPI backend.
- FastAPI uses SQLAlchemy and Alembic to interact with the database tables to verify the user's credentials (e.g., username/password) against the stored user data.
- If the credentials are valid, FastAPI generates an authentication token (e.g., JWT) and sends it back to the front end.
- The front end stores this token (usually in local storage or a cookie) for subsequent requests to authenticate the user.

#### URL Generation and Management:
- After authentication, the user interacts with the front end to generate shortened URLs.
- When the user submits a URL to shorten, the front end sends a request to the FastAPI backend.
- FastAPI, using SQLAlchemy and Alembic, interacts with the database tables to associate the generated short URL with the authenticated user. This involves creating records in the appropriate tables to store the mapping between the original URL, the shortened URL, and the user who generated it.
- The front end receives the shortened URL from the backend and displays it to the user.

#### User-specific Features- user viewing their URLs:
- When a user wants to view their generated URLs, the front end sends a request to the FastAPI backend. FastAPI queries the database tables to retrieve the URLs associated with the authenticated user and sends the data back to the front end for display.
- In version one plan for this application, urls users created on autogenerate on their homepage.



