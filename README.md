#Phonebook System

A simple phonebook management system built with **CodeIgniter 3 (PHP)** for the backend and **React** for the frontend.

##Features

- Add, update, delete contacts
- Malaysian phone number format validation
- Pagination with next/previous buttons
- Responsive frontend using Bootstrap
- Backend API with pagination support

##Tech Stack

- **Backend**: PHP (CodeIgniter 3)
- **Frontend**: React + Bootstrap
- **Communication**: REST API (JSON)

## Project Structure
phonebook-system/
backend  ← CodeIgniter 3 project
frontend ← React project

###Backend (CodeIgniter 3)

1. Install PHP, MySQL, Apache (e.g., using XAMPP)
2. Place the `backend/` folder inside your `htdocs` directory
3. Create a MySQL database and import the table structure (create a table named `phonebook`)
4. Edit `application/config/database.php` to match your database settings
5. Access the backend API via:
   http://localhost/backend/index.php/PhonebookController

###Frontend (React)

1. Navigate to the frontend directory:
   cd frontend
  
2. Install dependencies:
   npm install
  
3. Start the development server:
   npm start

4. Open your browser and go to:
   http://localhost:3000

## 🧾 Notes

- Ensure CORS is properly set up if needed
- The pagination limit is set to 4 contacts per page
- Empty rows are displayed for a consistent table height

##Author
- Chai Kah Hoe
