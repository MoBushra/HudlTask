import {expect, Page} from "@playwright/test";

export default class LandingPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /*
    Define locators that return page elements using their test-id attribute.
    This is a good practice because it allows you to change the element,
    and it will be updated in all the tests that use it.
    */
    private loginButton = () => this.page.getByTestId('login-select');
    private loginWithHudl = () => this.page.getByTestId('login-hudl');

    // Actions
    // We're navigating to the landing page here by using the BaseURL from the config file
    async goto() {
        await this.page.goto('/');
    }

    async hudlLogin() {
        await this.loginButton().click();
        await this.loginWithHudl().click();
    }
}