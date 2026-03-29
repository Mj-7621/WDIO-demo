# WebDriverIO BDD Test Automation Framework

A cross-browser test automation framework built with **WebDriverIO**, **Cucumber BDD**, and **TypeScript**. Demonstrates the Page Object Model pattern with Gherkin-based scenario definitions and HTML reporting.

## Tech Stack

| Tool | Purpose |
|------|---------|
| [WebDriverIO v8](https://webdriver.io/) | Browser automation framework |
| [Cucumber](https://cucumber.io/) | BDD framework with Gherkin syntax |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe test code |
| [multiple-cucumber-html-reporter](https://github.com/WasiqB/multiple-cucumber-html-reporter) | HTML report generation |
| [Jenkins](https://www.jenkins.io/) | CI/CD pipeline |

## Project Structure

```
WDIO-demo/
├── tests/
│   ├── features/              # Gherkin feature files
│   │   └── 01-login-scenarios.feature
│   ├── page-objects/          # Page Object Model classes
│   │   ├── login.page.ts
│   │   └── secure.page.ts
│   └── step-definitions/      # Cucumber step implementations
│       └── login.steps.ts
├── wdio.conf.ts               # WebDriverIO configuration
├── tsconfig.json              # TypeScript configuration
├── Jenkinsfile                # CI/CD pipeline definition
└── package.json
```

## Prerequisites

- **Node.js** >= 18
- **Chrome** and/or **Firefox** installed locally

## Getting Started

```bash
# Install dependencies
npm install

# Run all tests (headless, Chrome + Firefox)
npm test

# Run in headed mode (see the browser)
npm run test:headed
```

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `HEADLESS` | `true` | Set to `false` to run browsers in headed mode |
| `TAG` | _(empty)_ | Cucumber tag expression to filter scenarios (e.g. `@smoke`) |

### Browsers

Tests run on both **Chrome** and **Firefox** by default. Both browsers respect the `HEADLESS` flag.

## Test Scenarios

The framework covers login functionality on [the-internet.herokuapp.com](https://the-internet.herokuapp.com/login):

| Scenario | Username | Password | Expected Result |
|----------|----------|----------|-----------------|
| Valid credentials | `tomsmith` | `SuperSecretPassword!` | Success message |
| Invalid username | `invalid` | `SuperSecretPassword!` | Username error |
| Invalid password | `tomsmith` | `WrongPassword` | Password error |
| Both invalid | `invalid` | `WrongPassword` | Username error |

## Reports

After test execution, an HTML report is generated at `.tmp/report/index.html` with:

- Per-browser results
- Pass/fail status per scenario
- Execution duration
- Platform metadata (OS, device)

## CI/CD - Jenkins Pipeline

The included `Jenkinsfile` defines a pipeline with:

1. **Install Dependencies** - `npm ci`
2. **Run Tests** - Executes the full suite with configurable `HEADLESS` and `TAG` parameters
3. **Publish Report** - Archives and publishes the Cucumber HTML report

### Jenkins Parameters

- **HEADLESS** (boolean) - Run browsers in headless mode
- **TAG** (string) - Cucumber tag expression for selective test execution

## Design Patterns

- **Page Object Model** - Each page is encapsulated in its own class with private selectors and public action methods
- **BDD with Gherkin** - Human-readable feature files that serve as living documentation
- **Cross-Browser Testing** - Single test suite runs against multiple browsers
- **Configurable Execution** - Environment variables control headless mode and tag filtering
