# Car Management Frontend

This is the frontend repository for the **Car Management** application, a platform that allows users to manage car listings by adding, updating, viewing, and deleting entries. The frontend is built using modern web technologies and interacts with the backend API for data management.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Setup and Installation](#setup-and-installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- User authentication (sign up, login, password reset with OTP verification).
- Manage car listings: add, update, delete, and view cars.
- Secure interactions with backend APIs.
- Responsive and user-friendly interface.

## Tech Stack
- **Frontend**: React, HTML, CSS, JavaScript
- **Backend**: Nodejs, ExpressJs, MongoDB
- **State Management**: React Context API
- **HTTP Client**: Axios

## Live Demo
- **Application**: [https://mycarmanagement.netlify.app/](https://mycarmanagement.netlify.app/)  
  *(Note: Backend is hosted on a free server, which may cause a delay in responses)*

## Backend Repository
- [Backend GitHub Repository](https://github.com/Venkat5452/Car-Management-Backend)

## Setup and Installation

### Prerequisites
- Node.js and npm installed on your machine.

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Venkat5452/Car-Management-FrontEnd.git
   cd Car-Management-FrontEnd
2. **Install dependencies:**
   ```bash
   npm install
3. **Update Helper.js File with backend URL:**
   ```bash
   export const BASE_URL="https://car-management-backend-vquj.onrender.com";
4. **Usage:**
   ```bash
   npm start
### Folder Structure
```bash
MYCARFRONTEND/
├── build/                          # Production build output
├── node_modules/                   # Dependencies
├── public/
│   └── index.html                  # Main HTML template
├── src/
│   ├── Components/                 # Reusable components
│   │   ├── AddCar/                 # AddCar component
│   │   │   ├── AddCar.css
│   │   │   └── AddCar.js
│   │   ├── CarDetails/             # CarDetails component
│   │   │   ├── CarDetails.css
│   │   │   └── CarDetails.js
│   │   ├── Dashboard/              # Dashboard component
│   │   │   ├── Dashboard.css
│   │   │   └── Dashboard.js
│   │   ├── Footer/                 # Footer component
│   │   │   ├── Footer.css
│   │   │   └── Footer.js
│   │   ├── ForgotPassword/         # ForgotPassword component
│   │   │   ├── ForgotPassword.css
│   │   │   └── ForgotPassword.js
│   │   ├── Header/                 # Header component
│   │   │   ├── Header.css
│   │   │   └── Header.js
│   │   ├── Home/                   # Home component
│   │   │   ├── Home.css
│   │   │   └── Home.js
│   │   ├── Login/                  # Login component
│   │   │   ├── Login.css
│   │   │   └── Login.js
│   │   ├── Signup/                 # Signup component
│   │   │   ├── Signup.css
│   │   │   └── Signup.js
│   │   ├── UpdateCar/              # UpdateCar component
│   │   │   ├── UpdateCar.css
│   │   │   └── UpdateCar.js
│   │   └── helper.js               # Helper functions
│   ├── App.css                     # Main CSS for the app
│   ├── App.js                      # Main application component
│   ├── App.test.js                 # Test file for App component
│   ├── index.css                   # Global CSS styles
│   ├── index.js                    # Entry point of the application
│   ├── logo.svg                    # Application logo
│   ├── reportWebVitals.js          # Performance reporting
│   └── setupTests.js               # Test setup
├── .gitattributes                  # Git attributes
├── .gitignore                      # Git ignore file
├── package-lock.json               # Lockfile for npm dependencies
├── package.json                    # Project dependencies and scripts
└── README.md                       # Project documentation

