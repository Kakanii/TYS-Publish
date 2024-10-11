import { Base } from "../utility/Base";
import { expect } from '@playwright/test';


export class buyerLoginPage extends Base {

    constructor(page) {
        super();
        this.page = page;
        this.emailInput = "//input[@name='email']";
        this.continueBtn = "//button[text()='Continue']";
        this.passwordInput = "//input[@name='password']";
        this.signInBtn = "//button[text()='Sign In']";
    }
    async goTologinPage(url) {

        await this.page.goto(url);
        console.log("Opened URL: " + url)
    }

    async loginInto(username, password) {
        await this.page.locator(this.emailInput).fill(username);
        await this.page.locator(this.continueBtn).click();
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.signInBtn).click();
        console.log("Login Successfull using - "+username)
        const title = await this.page.title();
        expect(title).toBe('Trust Your Supplier');
        console.log("page title is : " + title);
        console.log("Login Successfull... ");
    }
    async closePage(){
        await this.page.close();
        console.log("Page is Closed... ");
    }

}
