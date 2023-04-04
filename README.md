# Hudl Web Test Automation — Playwright

## What is Playwright?
Playwright is a framework for Web Testing and Automation, it accommodates the needs of end-to-end testing.
It allows testing [Chromium](https://www.chromium.org/Home),
[Firefox](https://www.mozilla.org/en-US/firefox/new/) and [WebKit](https://webkit.org/) with a single API.

### General requirements

- Latest version of [Node.js](https://nodejs.org/es/download/)
- Latest version of [Visual Studio Code](https://code.visualstudio.com/download) or your favorite IDE
- Latest Yarn package manager

### Installation of Yarn

bash command

        npm install -g yarn

On macOS with Homebrew, this will also install Node.js if it is not already installed:

        brew install yarn

Check the version of Yarn

        yarn -v

### Installation of the testing framework

#### **Clone the repository:**

    git clone https://github.com/MoBushra/HudlTask.git

#### **Install dependencies.**

    yarn install

### Running the tests

#### **Create a .env file in the root of the project**
Containing the following:
    
        HUDL_EMAIL=''
        HUDL_PASSWORD=''
        INVALID_CREDENTIALS_MESSAGE=''


#### **To run the tests, run the following command (headless mode)**

    yarn playwright test

I added a script in package.json to run the above but with a simpler command:

    npm test

#### **To run the tests in headed mode**

    yarn playwright test --headed

#### **To run the tests only on a specific browser e.g. Firefox**

    yarn playwright test --project=firefox

#### **To run the tests on mobile e.g. Chrome on mobile**

    yarn playwright test --project='Mobile Chrome'

#### **To open Playwright's unified Html report of test results**

    npx playwright show-report

#### **IMPORTANT**

Upgrading **Playwright** can be done with the command:
    
        yarn upgrade playwright --latest

After each upgrade of **Playwright**, the project must be restarted locally with the command (update the browsers as well):
    
        yarn playwright install

### Further improvements for the framework

- **Integrate with CI/CD:** Jenkins, CircleCI, TravisCI, etc.
- **Integrate with Docker:** Dockerise the framework to run the tests in CI/CD.
- **Integrate with Reporting tools:** Allure, ReportPortal, etc.
- **Integrate with Code Coverage tools:** Nyc (Istanbul), SonarQube, etc.
- **Integrate with BrowserStack:** Run the tests on (real) different browsers and devices.
- **Make better use of environment variables:** Use environment variables to store the URLs, credentials, error messages etc.
- **Mock the API:** Mock the API to test the login form and endpoint

### Further improvements for the type of tests
- **Add more tests:** Add more tests to cover more scenarios.
- **Add accessibility tests:** Add accessibility tests to cover the accessibility of the website.
- **Think about load testing:** Think about load testing to cover the performance of the login form and endpoint.