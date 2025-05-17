# 🐂 Cattle Management Application

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Angular](https://img.shields.io/badge/Angular-v16+-dd0031.svg)
![Node](https://img.shields.io/badge/Node-v14+-339933.svg)

> A modern Angular application for managing cattle inventory during Eid-ul-Adha festivities

## ✨ Features

- 🔐 **Secure Authentication** - JWT token-based login system
- 📋 **Inventory Management** - View and manage your entire cattle inventory
- 🔄 **Status Updates** - Toggle availability status (Sold/Available) in real-time
- ➕ **Add New Inventory** - Easily add new cattle with comprehensive details
- 💰 **Custom Formatting** - Price formatting with PKR currency symbol
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🧩 **Standalone Components** - Modern architecture for better maintainability

## 📋 Prerequisites

- **Node.js** (v14 or later)
- **Angular CLI** (v16 or later)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd cattle_management
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the mock API server

```bash
# Install json-server globally if you don't have it
npm install -g json-server
#change directory
cd mock-api
# Start the server using the mock data
json-server --watch mock-api/db.json
```

> The server will run on http://localhost:3000

### 4. Launch the application

```bash
ng serve
```

> The application will be available at http://localhost:4200

## 🔑 Login Credentials

| Username | Password |
|----------|----------|
| admin    | 1234     |

## 🏗️ Architecture

### Key Components

- **Login Component** - Handles user authentication
- **Cattle List Component** - Displays all cattle with management options
- **Add Cattle Component** - Form to add new cattle to the inventory
- **Header Component** - Navigation with user controls

### Services

| Service | Description |
|---------|-------------|
| `AuthService` | Manages authentication, token storage, and user state |
| `CattleService` | Handles cattle data operations through API |

### Custom Pipes

- **PriceFormatPipe** - Formats prices with PKR currency symbol
- **AvailabilityStatusPipe** - Converts boolean values to human-readable status text

## 🛠️ Implementation Details

### Authentication & Authorization

The application implements a secure token-based authentication system. Upon successful login, a JWT token is stored in localStorage and automatically attached to subsequent API requests via an HTTP interceptor. Protected routes are secured with a route guard.

### Standalone Components

All components are implemented using Angular's standalone components architecture, declaring their own dependencies directly rather than using NgModule. This approach enhances maintainability and improves application performance through better tree-shaking.

### State Management

A service-based state management approach is used, with services providing observables that components can subscribe to for real-time updates.

### Error Handling

Comprehensive error handling has been implemented with user-friendly error messages when operations fail.
