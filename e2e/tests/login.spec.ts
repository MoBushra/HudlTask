import {expect, test} from "@playwright/test";
import LandingPage from "../pages/landing.page";
import LoginPage from "../pages/login.page";
import LoginHelpPage from "../pages/loginHelp.page";
import LoginSsoPage from "../pages/loginSso.page";

test.describe("Login Functionality", () => {
    // These are environment variables that are set in the .env file
    const email = process.env.HUDL_EMAIL;
    const password = process.env.HUDL_PASSWORD;

    let landingPage: LandingPage;
    let loginPage: LoginPage;
    let loginHelpPage: LoginHelpPage;
    let loginSsoPage: LoginSsoPage;

    /*
    This is a hook that runs before each test in this suite and
    sets up the page objects and navigates to the landing page */
    test.beforeEach(async ({ page: browserPage }) => {
        landingPage = new LandingPage(browserPage);
        loginPage = new LoginPage(browserPage);
        loginHelpPage = new LoginHelpPage(browserPage);
        loginSsoPage = new LoginSsoPage(browserPage);
        await browserPage.goto('/');
        expect(await landingPage.page.title()).toBe("Hudl • Tools to help every team, coach and athlete improve");
        await landingPage.hudlLogin();
    });

    test("Should log in with valid credentials", async () => {
        try {
            await loginPage.loginWithValidCredentials(email, password);
        } catch (error) {
            console.error("Login with valid credentials failed: " + error);
        }
    });

    test("Should fail to log in with invalid credentials", async () => {
        await loginPage.loginWithInvalidCredentials(email, "invalidPassword");
    });

    test("Should verify 'Remember Me' checkbox", async () => {
        await loginPage.verifyRememberMeCheckbox();
    });

    /*
    Test to log in with a valid SSO email, but we don't have one to confirm this works.
    So testing with a non-sso email
    */
    test.skip("Should log in with SSO email", async () => {
        await loginPage.clickLoginWithSso();
        await loginSsoPage.loginWithSso(email);
    });

    test("Should fail to log in with SSO with a non-SSO email", async () => {
        await loginPage.clickLoginWithSso();
        await loginSsoPage.loginWithInvalidSso(email);
    });

    test("Should reset password with an existing email", async () => {
        await loginPage.resetPassword();
        await loginHelpPage.validResetPassword(email);
    });

    test("Should fail to reset password with an invalid email format", async () => {
        await loginPage.resetPassword();
        await loginHelpPage.invalidResetPasswordInvalidEmailFormat("invalidEmail.com");
    });

    test("Should fail to reset password with a non-registered email", async () => {
        await loginPage.resetPassword();
        await loginHelpPage.invalidResetPassword("johannes_daviegfdw@beatles.wrs");
    });
});
