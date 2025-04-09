# MVC Project Template - using NodeJS, Express, Sequelize and MySQL
Created for educational purposes for the fifth-degree groups of Software Engineering, at UNIPOLI Dgo, for the Client-Server course.

## 🏗️ Getting Started

These instructions will guide you through cloning and installing the project on your local machine for development and testing purposes.

### 📖 Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 22.13.01 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### ⚙️ Installation

1. **Clone the repository**

    Clone the project repository to your local machine using the following command:

    ```bash
    git clone https://github.com/jlbautista/mvc.git
    ```

2. **Navigate to the project directory**

    Change the directory to the project folder:

    ```bash
    cd mvc
    ```

3. **Install dependencies**

    Install the required dependencies using npm:

    ```bash
    npm install
    ```

### 🚀 Running the Project

To run the project, use the following command:

```bash
npm start
```

The application should now be running on [http://localhost:3001](http://localhost:3001).

### 🛠 Additional Scripts

Here are some additional npm scripts you might find useful:

- **Run tests:**

    ```bash
    npm test
    ```

- **Build the project:**

    ```bash
    npm run build
    ```

### ⚙️ Configuration

If there are any environment variables required for your project, make sure to set them up. You can create a `.env` file in the root of the project directory and add your variables there. For example:

```
PORT = 3001

DB_HOST = localhost
DB_USER = your_db_user
DB_PASS = your_db_user_password
DB_NAME = your_database
```

### 🛠 Database creation and configuration

1. **Connect to MySQL as Root User**

    Use the following command to connect:

    ```
    mysql -u root -p
    ````

    Enter the root password when prompted.

2. **Create a New Database**

    Inside the MySQL CLI, run:

    ```
    CREATE DATABASE my_database;
    ````

3. **Create a New User**

    Replace your_password with a strong password:

    ```
    CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'your_password';
    ```

4. **Grant all privileges on the new database:**

    ```
    GRANT ALL PRIVILEGES ON my_database.* TO 'new_user'@'localhost';
    FLUSH PRIVILEGES;
    ```

5. **Connect Using the New User**

    Exit MySQL CLI:

    ```
    exit;
    ```

    Now, log in with the new user:

    ```
    mysql -u new_user -p my_database
    ```

    Enter the password when prompted.

6. **Create the users Table**

    Inside the MySQL CLI, run:

    ```
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
    ```

7. **Verify Table Creation**

    Run the following to check the table structure:

    ```
    DESCRIBE users;
    ```

### 🛠 Configuration for Running Migrations with Sequelize

To successfully run migrations in this project, follow these steps:

**1️⃣ Install Dependencies**

Make sure you have the necessary dependencies installed:

```
npm install sequelize-cli
```

**2️⃣ Config config/config.js to use .env**


Ensure that config/config.js loads the environment variables:

```
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
};
```

**4️⃣ Create a Migration**

If you don't have a migration for a table yet, you can generate a new one with:

```
npx sequelize-cli migration:generate --name create-users-table
```

This command will create a file inside migrations/ folder where you can define the table's structure.

**5️⃣ Run Migrations**

- To run migrations and create tables in the database, use:

```
npx sequelize-cli db:migrate
```

- If you need to undo last migration:

```
npx sequelize-cli db:migrate:undo
```

- To undo all migrations:

```
npx sequelize-cli db:migrate:undo:all
```

### Troubleshooting

If you encounter any issues during installation or running the project, refer to the [Issues](https://github.com/jlbautista/mvc_5a/issues) section on GitHub for solutions or to report a new issue.
