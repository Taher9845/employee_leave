# Employee Leave Management System

A comprehensive Leave Management System built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

### Employee
- **Register/Login**: Secure authentication.
- **Dashboard**: View leave balance and status of recent requests.
- **Apply for Leave**: Submit leave requests (Sick, Casual, Vacation).
- **My Requests**: View history and cancel pending requests.

### Manager
- **Dashboard**: Overview of team stats (employees on leave, pending requests).
- **Manage Leaves**: Approve or Reject leave requests.
- **Leave History**: View all employee leave records.

## Tech Stack
- **Frontend**: React, Redux Toolkit, CSS (Premium UI)
- **Backend**: Node.js, Express, MongoDB
- **Authentication**: JWT

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd employee_leave_full
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env file
   cp .env.example .env
   # Update .env with your MongoDB URI
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the App**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/employee_leave
JWT_SECRET=your_jwt_secret_key
```

## Screenshots
(Add screenshots here)
