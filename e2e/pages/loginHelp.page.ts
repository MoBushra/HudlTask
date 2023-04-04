import {expect, Page} from "@playwright/test";
import CheckYourEmailPage from "./checkYourEmail.page";

export default class LoginHelp {
    page: Page;
    checkYourEmailPage: CheckYourEmailPage;

    constructor(page: Page) {
        this.page = page;
        this.checkYourEmailPage = new CheckYourEmailPage(page);
    }

    //Define our locators
    private passResetEmailInput = () => this.page.getByTestId('password-reset-input');
    private sendPassResetEmailButton = () => this.page.getByTestId('password-reset-submit-btn');
    private passwordResetEmailSentMessage = () => this.page.getByTestId('password-reset-error-display');


    // Define a method to navigate directly to this page
    async navigateToLoginHelp() {
        await this.page.goto('/login/help');
    }

    // Define a method to reset your password
    async validResetPassword(email: string) {
        await this.passResetEmailInput().fill(email);
        await this.sendPassResetEmailButton().click();
        // expect to be taken to 'check your email' page
        await this.checkYourEmailPage.checkHeadlineText('Check Your Email');
    }

    // Define a method to reset your password with an invalid email format
    async invalidResetPasswordInvalidEmailFormat(email: string) {
        await this.passResetEmailInput().fill(email);
        await this.sendPassResetEmailButton().click();
        await expect(this.passwordResetEmailSentMessage()).toHaveText('That isn\'t a valid email address. Make sure to use the email@domain.com format.');
    }

    // Define a method to reset your password with an non-registered email
    async invalidResetPassword(email: string) {
        await this.passResetEmailInput().fill(email);
        await this.sendPassResetEmailButton().click();
        await expect(this.passwordResetEmailSentMessage()).toHaveText('That email address doesn\'t exist in Hudl. Check with your coach to ensure they have the right email address for you.');
    }

}
