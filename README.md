# MongoDB Backup Application

This project provides a web-based interface to back up MongoDB databases and track the progress of the backup process. It uses Next.js with TypeScript, Tailwind CSS, and DaisyUI for the frontend, and a Node.js backend to handle backup operations and manage saved connection details.

## Features

- Backup MongoDB databases with user-provided connection details.
- Save and manage connection details locally.
- Track and display the size of the backup in megabytes (MB).

## Prerequisites

- Node.js (v18.17.1 or later)
- MongoDB (for backup purposes)
- MongoDB tools (like `mongodump`)

## Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/mongo-snap.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd mongo-snap
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```


## Running the Application

1. **Start the development server:**
    ```bash
    npm run dev
    ```

2. **Open your browser and navigate to:**
    ```
    http://localhost:3000
    ```

## How to Use

1. **Backup Database:**
   - Fill in the backup form with your MongoDB connection details.
   - Click the "Backup" button to start the backup process.
   - You can view the progress of the backup and the size of the backed-up data in megabytes.

2. **Manage Connections:**
   - Save connection details by clicking the "Save" button in the form.
   - View, rename, or delete saved connections in the "Saved Connections" section.

## API Endpoints

- **`GET /api/connections/backup-process`**
  - Retrieves the size of the backup folder in megabytes.

## Folder Structure

- **`app/`**: Contains the main application code and API routes.
- **`localDb/`**: Stores local database files and connection details.
- **`public/`**: Static assets such as images and stylesheets.

## Troubleshooting

- **No Progress Displayed:**
  Ensure that the backup command is correctly formatted and that the MongoDB tools are properly installed.

- **Directory Not Found:**
  Verify that the directory paths are correct and that the application has the necessary permissions to read and write files.


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
