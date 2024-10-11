import { expect } from '@playwright/test';
import { Base } from '../utility/Base';
const testdata = require('../data/testdata');

class loginPage extends Base{
    constructor(page) {    
        super();   
        this.page = page;
        this.welcome_title = page.locator("(//h2[normalize-space()='Welcome back to Trust your Supplier'])[1]");
        this.emailaddress_label = page.locator("(//span[normalize-space()='Email Address'])[1]");
        this.emailaddress_input = page.locator("//input[@id='username']");
        this.password_label = page.locator("(//span[normalize-space()='Password'])[1]");
        this.password_input = page.locator("//input[@id='password']");
        this.remember_me_checkbox = page.locator("(//p[@class='chakra-text css-h6z8rd'])[1]");
        this.forgot_password_button = page.locator("(//button[normalize-space()='Forgot Password'])[1]");
        this.submit_button = page.locator("(//button[normalize-space()='Sign In'])[1]");
        this.need_help_link = page.locator("(//p[@class='chakra-text css-f43mga'])[1]");
    }

    async gotoBuyerLoginPage() {
        await this.page.goto(testdata.testURL.buyerURL);
    }

    async gotoLoginPage() {
        await this.page.goto(testdata.testURL.URL);
    }

    async verifyWelcomeTitle() {
        await expect(this.welcome_title).toHaveText("Welcome back to Trust your Supplier");
    }

    async verifyEmailAddressLabel() {
        await expect(this.emailaddress_label).toHaveText("Email Address");
    }

    async clickOnEmailAddressInputField() {
        await this.emailaddress_input.click();
    }

    async clearEmailAddressInInputField() {
        await this.emailaddress_input.clear();
    }

    async enterEmailAddress(emailAdress) {
        await this.emailaddress_input.fill(emailAdress);
    }

    async verifyPasswordLabel() {
        await expect(this.password_label).toHaveText("Password");
    }

    async clickOnPasswordInputField() {
        await this.password_input.click();
    }

    async clearPasswordInInputField() {
        await this.password_input.clear();
    }

    async enterPassword(password) {
        await this.password_input.fill(password);
    }

    async selectRememberMeCheckbox() {
        await this.remember_me_checkbox.click();
    }

    async verifyForgotPassword() {
        await expect(this.forgot_password_button).toHaveText("Forgot Password");
    }

    async verifyNeedHelpLink() {
        await expect(this.need_help_link).toHaveText("Need Help?");
    }

    async clickOnSubmitButton() {
        await this.submit_button.click();
    }

    async validLogin() {
        await this.enterEmailAddress(testdata.user.emailAddress);
        await this.enterPassword(testdata.user.password);
        await this.clickOnSubmitButton();
        console.log('Successfully login into the application');
    }
}

module.exports = { loginPage };
