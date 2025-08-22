# Shor's Algorithm Explorer

This is an interactive web application that demonstrates and visualizes the process of integer factorization using a simulation of Shor's quantum algorithm. It's designed to be an educational tool for those interested in quantum computing, cryptography, and number theory.

The application breaks down each factorization attempt into clear, understandable steps, from classical pre-checks to the simulated quantum period-finding and final factor calculation. Each step is accompanied by an option to view a detailed explanation.

## Features

- **Interactive Simulation**: Enter an odd composite number and watch the algorithm attempt to find its prime factors in real-time.
- **Step-by-Step Visualization**: Each attempt is displayed on a separate card, showing the progression of the algorithm, including:
  - Co-prime base selection and GCD check.
  - Simulated quantum period finding with a circuit diagram.
  - Continued fraction expansion to find the period candidate.
  - Verification of the period.
  - Final calculation of the factors.
- **In-Depth Explanations**: Click the info icon (`?`) next to any step title to open a modal with a detailed explanation of the underlying concepts and mathematics.
- **Responsive Design**: The user interface is built with Tailwind CSS and is fully responsive, working seamlessly on both desktop and mobile devices.
- **Mathematical Rendering**: Utilizes KaTeX for crisp and clear rendering of all mathematical formulas and equations.

## Technologies Used

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Mathematical Typesetting**: KaTeX (via `react-katex`)
- **Module Loading**: ES Modules served directly from `esm.sh` (no local build step required).

## Project Structure

The project is organized into several directories and files to maintain a clean and scalable codebase.

```
.
├── components/          # Reusable React components
│   ├── AttemptCard.tsx
│   ├── ContinuedFractionDisplay.tsx
│   ├── ExplainButton.tsx
│   ├── GeminiExplanation.tsx
│   ├── InputForm.tsx
│   ├── Modal.tsx
│   └── QuantumCircuitDiagram.tsx
├── services/            # Core application logic
│   └── shor.ts          # Implementation of the Shor's algorithm simulation
├── App.tsx              # Main application component, manages state
├── index.html           # Entry point of the application
├── index.tsx            # Renders the React application
├── metadata.json        # Application metadata
├── types.ts             # TypeScript type definitions
└── README.md            # This file
```

- **`components/`**: Contains all the UI components. Each component is responsible for a specific part of the user interface (e.g., the input form, an attempt card, the explanation modal).
- **`services/shor.ts`**: This is the core of the application. It contains the `runShor` async generator function that simulates the algorithm step by step.
- **`App.tsx`**: The main application component that orchestrates the UI, manages state (like the number to factor, attempts, and results), and handles user interactions.
- **`types.ts`**: Defines all the TypeScript types used throughout the application, ensuring type safety and clarity.

## How to Run Locally

This project is set up to run directly in the browser without a complex build process, thanks to its use of ES modules via an import map.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/shors-algorithm-explorer.git
    cd shors-algorithm-explorer
    ```

2.  **Serve the files:**
    You need a simple local web server to serve the `index.html` and its associated files. If you have Node.js installed, you can use the `serve` package.

    ```bash
    # Install serve globally (if you haven't already)
    npm install -g serve

    # Run the server from the project's root directory
    serve .
    ```

    If you don't have Node.js, you can use Python's built-in HTTP server:

    ```bash
    # For Python 3
    python -m http.server
    ```

3.  **Open in browser:**
    Open your web browser and navigate to the local address provided by the server (usually `http://localhost:3000` for `serve` or `http://localhost:8000` for Python's server). The application should load and be ready to use.
