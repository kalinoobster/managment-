# SwiftStock Inventory Management

This is a Next.js application built with Firebase Studio. It's an inventory management system called SwiftStock that helps you track products, orders, sales, and suppliers. It also features an AI-powered analytics report generator.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)

### Installation

1.  Clone the repository to your local machine (if you have connected it to GitHub) or download the source code.
2.  Navigate to the project's root directory in your terminal.
3.  Install the necessary dependencies using npm:
    ```bash
    npm install
    ```

## Running the Application Locally

This project consists of two main parts: the Next.js frontend and the Genkit AI backend. You'll need to run both for all features to work correctly.

### 1. Run the Frontend (Next.js)

To start the main application development server, run the following command:

```bash
npm run dev
```

This will start the application on `http://localhost:9002` by default. You can open this URL in your browser to see the app.

### 2. Run the Backend (Genkit)

The AI features (like the analytics report generation) are powered by Genkit. To run the Genkit development server, open a **new terminal window** and run:

```bash
npm run genkit:watch
```

This command starts the Genkit flows and will automatically restart if you make any changes to the AI-related files in `src/ai/`.

With both servers running, you'll have full access to all application features locally.
