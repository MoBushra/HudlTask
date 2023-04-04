import {expect, Page} from "@playwright/test";

export default class CheckYourEmailPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    //Define our locators
    private headlineText = () => this.page.getByRole('heading', { name: 'Check Your Email' });


    // Define a method to navigate directly to this page
    async navigateToCheckYourEmailPage() {
        await this.page.goto('/login/help');
    }

    // Check that the text provided by the user matches that of headline text
    async checkHeadlineText(text: string) {
        await expect(this.headlineText()).toHaveText(text);
    }

}
