import {expect, Page} from "@playwright/test";

export default class LoginPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    // Locators
    private emailInput = () => this.page.getByTestId('email-input');
    private passwordInput = () => this.page.getByTestId('password-input');
    private loginButton = () => this.page.getByTestId('login-btn');
    private loginWithSsoButton = () => this.page.getByTestId('log-in-with-organization-btn');
    private errorDisplay = () => this.page.getByTestId('error-display');
    private rememberMeCheckbox = () => this.page.getByTestId('remember-me-checkbox-label');
    private needsHelpLink = () => this.page.getByTestId('need-help-link');


    // Actions
    // We can use this to navigate to the login page directly if needed by adding '/login' to the base URL
    async navigateToLoginPage() {
        await this.page.goto('/login');
    }

    async navigateToSsoLoginPage() {
        await this.loginWithSsoButton().click();
    }

    // Verify that we can log in with valid credentials and expect the error message to not be visible
    async loginWithValidCredentials(email: string, password: string) {
        await expect(this.loginButton()).toBeVisible();
        await this.emailInput().fill(email);
        await this.passwordInput().fill(password);
        await this.loginButton().click();
        await expect(this.errorDisplay()).not.toBeVisible();
    }

    // Verify that we receive an error message when we log in with invalid credentials
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