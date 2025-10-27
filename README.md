# AliExpress Automation Framework

This project is an automation framework built with Playwright and TypeScript for testing AliExpress website functionality.

## Prerequisites

- Node.js (version 14 or higher)
- npm (comes with Node.js)
- A modern web browser (Chrome, Firefox, or Safari)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/chama999/modak.git
cd modak
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Project Structure

```
├── constants/              # Constants and configuration files
│   └── aliexpress.constants.ts
├── pages/                 # Page Object Model files
│   ├── main.page.ts
│   └── product.page.ts
├── tests/                 # Test files
│   └── aliexpress.spec.ts
├── playwright.config.ts   # Playwright configuration
└── package.json          # Project dependencies and scripts
```

## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests with specific browser

```bash
npx playwright test --project=chromium  # For Chrome
npx playwright test --project=firefox   # For Firefox
npx playwright test --project=webkit    # For Safari
```

### Run tests with UI Mode

```bash
npx playwright test --ui
```

### Run tests with specific language

You can run tests in different languages by setting the LANGUAGE environment variable:

```bash
# For English
set LANGUAGE=EN && npx playwright test  # Windows
LANGUAGE=EN npx playwright test         # Mac/Linux

# For Spanish
set LANGUAGE=ES && npx playwright test  # Windows
LANGUAGE=ES npx playwright test         # Mac/Linux
```

## Test Reports

After running the tests, you can find the HTML report in the `playwright-report` directory. To open the last report:

```bash
npx playwright show-report
```

## Key Features

- Page Object Model design pattern
- Multi-language support (EN/ES)
- Parallel test execution
- Automatic wait and retry mechanisms
- Comprehensive test reporting
- Cross-browser testing support

## Main Test Scenarios

Currently implemented test scenarios:

1. Search Product Availability Test:
   - Navigates to AliExpress
   - Searches for "instax mini"
   - Goes to the second page of results
   - Verifies if the second item has stock available

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## Troubleshooting

If you encounter any issues:

1. Make sure all dependencies are installed correctly
2. Verify that Playwright browsers are installed
3. Check if you have the latest version of Node.js
4. Clear the browser cache if you experience stale test data

## License

This project is licensed under the MIT License - see the LICENSE file for details
