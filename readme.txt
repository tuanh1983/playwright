# Playwright Automation Framework

## Overview
This repository contains an automation testing framework built using **Playwright**, designed for efficient, scalable, and maintainable end-to-end testing. It employs the **Page Object Model (POM)** design pattern and integrates with **Allure** for detailed test reporting.

## Features
- **Playwright Integration**: Supports multiple browsers (Chromium, Firefox, WebKit).
- **Page Object Model (POM)**: Modular and reusable test design.
- **Allure Reports**: Generates detailed test execution reports.
- **Utilities and Helpers**: Common utilities for enhanced test development.
- **ESLint & Prettier**: Ensures code quality and consistent formatting.

## Prerequisites
- **Node.js**: v16.x or higher.
- **npm**: Installed with Node.js.
- A supported operating system (Windows, macOS, or Linux).

## Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/tuanh1983/playwright.git
   cd playwright
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run tests to ensure the setup is correct:
   ```bash
   npx playwright test
   ```

## Folder Structure
```
playwright/
├── tests/              # Test cases
├── pageobjects/        # Page Object classes
├── utils/              # Utility functions
├── data/               # Test data
├── allure-results/     # Test results for Allure
├── playwright.config.js # Playwright configuration file
├── package.json        # Project metadata and dependencies
```

### Key Components
- **`tests/`**: Contains test files organized by features or modules.
- **`pageobjects/`**: Implements the Page Object Model for managing web elements and actions.
- **`utils/`**: Contains reusable helper functions.
- **`data/`**: Stores test data (e.g., JSON, Excel).
- **`playwright.config.js`**: Configuration for browsers, test timeouts, and more.

## Usage
### Running Tests
To execute all tests:
```bash
npx playwright test
```

To run tests with specific tags:
```bash
npx playwright test --grep "@smoke"
```

### Generating Reports
1. Run tests and save results:
   ```bash
   npx playwright test --reporter=line,allure
   ```

2. Generate and view the Allure report:
   ```bash
   npx allure generate allure-results --clean
   npx allure open
   ```

### Debugging Tests
Launch tests in debug mode:
```bash
npx playwright test --debug
```

## Contributing
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Support
For any questions or issues, please open an issue in this repository or contact the maintainer.
