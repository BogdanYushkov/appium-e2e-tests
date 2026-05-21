# Mobile Autotests

Mobile UI automation framework built with **TypeScript**, **WebdriverIO**, **Appium 2.x**, and **Page Object Model**.

Runs against [ApiDemos](https://github.com/nicobailon/android-dev-mcp-server) — a sample Android app covering common UI patterns.

![Tests](https://github.com/BogdanYushkov/MobileAutotests/actions/workflows/android-tests.yml/badge.svg)

## Tech Stack

| Tool | Version |
|------|---------|
| TypeScript | 6.x |
| WebdriverIO | 9.x |
| Appium | 3.4 |
| UiAutomator2 | 7.x |
| Mocha | BDD |
| Allure Reporter | 2.x |

## Project Structure

```
src/
  config/         # Appium capabilities, environment config
  helpers/        # Allure, screenshot, gesture, retry helpers
  pages/          # Page Objects (BasePage + 5 pages)
  tests/          # Test suites (26 tests across 5 suites)
  utils/          # Driver, logger, wait utilities
apps/             # ApiDemos-debug.apk
reports/          # Allure results, screenshots, logs
.github/workflows # GitHub Actions CI pipeline
```

## Test Suites

| Suite | Tests | Description |
|-------|-------|-------------|
| Smoke | 6 | App launch, categories, navigation, forms |
| Login | 5 | AutoComplete form input, suggestions, focus |
| Navigation | 5 | Deep navigation, back button, hierarchy |
| Form Validation | 5 | Checkbox, switch, edit text, list dialogs |
| Negative | 5 | Empty input, special chars, rapid nav, restart |

## Prerequisites

- **Node.js** 22+
- **Java** 17+
- **Android SDK** with platform-tools and an emulator image
- **Appium** installed globally: `npm install -g appium`
- **UiAutomator2** driver: `appium driver install uiautomator2`
- Android emulator running (API 31+)

## Setup

```bash
# Clone
git clone https://github.com/BogdanYushkov/MobileAutotests.git
cd MobileAutotests

# Install dependencies
npm install

# Start emulator (example)
emulator -avd Pixel_6_API_36 -no-audio

# Run all tests (Appium starts automatically via wdio service)
npm test
```

## Running Tests

```bash
# All tests
npm test

# Specific suite
npm run test:smoke
npm run test:login
npm run test:navigation
npm run test:form
npm run test:negative

# Single test by name
npx wdio run wdio.conf.ts --mochaOpts.grep "should launch the app"
```

## Allure Reports

```bash
# Generate and open
npm run allure:report

# Or separately
npm run allure:generate
npm run allure:open
```

## CI/CD

Tests run automatically on GitHub Actions:
- **Trigger**: push to `main`/`develop`, PR to `main`, or manual dispatch
- **Environment**: Ubuntu + KVM-accelerated Android emulator (API 31)
- **Artifacts**: Allure report, screenshots on failure

## Key Design Decisions

- **Accessibility ID selectors** preferred over XPath for stability
- **UiAutomator selectors** for elements without content-desc
- **Explicit waits** everywhere — no implicit waits or sleep
- **Retry logic** for flaky element interactions
- **Screenshots on failure** with Allure attachment
- **Page Object Model** with abstract BasePage
