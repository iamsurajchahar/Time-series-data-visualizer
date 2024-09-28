# Time Series Data Visualizer

## Project Overview

The **Time Series Data Visualizer** is a desktop application built using **Next.js** and **Tauri** that allows users to visualize time series data from CSV files. This tool is specifically designed for handling large datasets, like analog signal data sampled at high frequencies (e.g., 4 MHz), making it ideal for use cases involving millions of data points.

The application supports interactive exploration of the data with dynamic granularity selection, sliders for navigating through the time series, and an animated chart rendering experience.

## Features

- **File Upload**: Upload large CSV files containing time series data.
- **Time Series Visualization**: View the data over a user-selected time range.
- **Dynamic Granularity**: Adjust the level of detail displayed on the graph.
- **Light/Dark Mode**: Switch between light and dark themes.
- **Smooth Animations**: Animated transitions, loading indicators, and data rendering.
- **Cross-Platform Compatibility**: The app works on Windows, macOS, and Linux, powered by Tauri.
  
## Technologies Used

- **Frontend**: Next.js, React.js
- **Backend**: Tauri
- **Visualization**: Chart.js, React-Chartjs-2
- **CSV Parsing**: PapaParse
- **Styling**: Tailwind CSS, ShadCN UI components
- **Package Management**: NPM
- **Language**: TypeScript

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/time-series-visualizer.git
cd time-series-visualizer

Install Dependencies
Make sure to install all dependencies for both the web application and Tauri:
npm install

Tauri Setup
Ensure Tauri is properly configured for your platform. Refer to Tauri Setup for any additional setup needed.

Development Server
To run the development environment, you can use the following command:
npm run tauri dev

Building the Project
To build the project for production:
npm run build
npm run tauri build

File Structure
|-- .next
|-- node_modules
|-- src                # Next.js application source code
|   |-- components     # React components for the application
|   |-- pages          # Pages served by Next.js
|-- src-tauri          # Tauri configuration and Rust-based backend code
|-- .eslintrc.json     # ESLint configuration
|-- package.json       # NPM scripts and dependencies
|-- tailwind.config.js # Tailwind CSS configuration
|-- tsconfig.json      # TypeScript configuration

Future Enhancements
Data Export: Add functionality to export filtered or modified data.
Additional Chart Types: Implement other visualization types like scatter plots or histograms.
Performance Optimizations: Further improve performance for extremely large datasets.
Issues and Troubleshooting
If the app doesn’t start on http://localhost:1420/, ensure the frontend server is running and try restarting the Tauri application.
For performance issues with large datasets, ensure that you're parsing the CSV in chunks and efficiently rendering only the visible data on the chart.

Contributing
Contributions are welcome! Please submit a pull request or open an issue on GitHub if you have suggestions or improvements.


