import {expect, Page} from "@playwright/test";

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private readonly emailInput = () => this.page.getByTestId('email-input');
    private readonly passwordInput = () => this.page.getByTestId('password-input');
    private readonly loginButton = () => this.page.getByTestId('login-btn');
    private readonly loginWithSsoButton = () => this.page.getByTestId('log-in-with-organization-btn');
    private readonly errorDisplay = () => this.page.getByTestId('error-display');
    private readonly rememberMeCheckbox = () => this.page.getByTestId('remember-me-checkbox-label');
    private readonly needsHelpLink = () => this.page.getByTestId('need-help-link');


    // Actions
    // We can use this to navigate to the login page directly if needed by adding '/login' to the base URL
    async navigateToLoginPage() {
        await this.page.goto('/login');
    }

    /**
     * Logs in with valid credentials and expects the error message to not be visible.
     * @param email - The email to log in with.
     * @param password - The password to log in with.
     */
    async loginWithValidCredentials(email: string, password: string) {
        await expect(this.loginButton()).toBeVisible();
        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
        await expect(this.errorDisplay()).not.toBeVisible();
    }

    /**
     * Logs in with invalid credentials and expects an error message to be displayed.
     * @param email - The email to log in with.
     * @param password - The password to log in with.
     */
    async loginWithInvalidCredentials(email: string, password: string) {
        await expect(this.loginButton()).toBeVisible();
        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
        await this.checkErrorDisplayText('We didn\'t recognize that email and/or password.Need help?');
    }

    async clickLoginWithSso() {
        await this.loginWithSsoButton().click();
    }

    // Verify that 'Remember Me' checkbox has been checked after being clicked
    async verifyRememberMeCheckbox() {
        await this.rememberMeCheckbox().click();
        await expect(this.rememberMeCheckbox()).toBeChecked();
    }

    // Verify we can reset our password by clicking the 'Need Help?' link and enter
    async resetPassword() {
        await this.needsHelpLink().click();
        await expect(this.page.url()).toBe('https://www.hudl.com/login/help#');
    }

    async checkErrorDisplayText(text: string) {
        await expect(this.errorDisplay()).toHaveText(text);
    }
}