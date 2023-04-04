import {expect, Page} from "@playwright/test";

// Define a class to represent the Organisation Login page
export default class LoginSsoPage {
    page: Page;

    // Constructor initialises the class with a Playwright Page object
    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private emailInput = () => this.page.locator('input#uniId_1'); //
    private loginSsoButton = () => this.page.getByTestId('log-in-with-sso');
    private errorDisplay = () => this.page.getByTestId('error-display');

    // Define a method to navigate to the page directly if needed by adding '/app/auth/login/organization' to the base URL
    async navigateToSsoLogin() {
        await this.page.goto('/app/auth/login/organization');
    }

    /*
    Verify login works with SSO using an email parameter and that the error message is not visible
    */
    async loginWithSso(email) {
        await this.emailInput().fill(email);
        await this.loginSsoButton().click();
        await expect(this.errorDisplay()).not.toBeVisible();
    }

    // Verify that we receive an error message when we log in with non-ss0 email
    async loginWithInvalidSso(email) {
        await this.emailInput().fill(email);
        await this.loginSsoButton().click();
        await this.checkErrorDisplayText('This account can\'t log in with an organization yet. Please log in using your email and password.');
    }

    async checkErrorDisplayText(text: string) {
        await expect(this.errorDisplay()).toHaveText(text);
    }
}