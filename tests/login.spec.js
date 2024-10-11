import { test, expect } from '@playwright/test';
import testdata from '../data/testdata';
const { loginPage } = require("../pageObjects/loginPage");

test.describe('Verify login page', () => {

    test('@Regression @Login Verify Labels on Login Page', async ({ page }) => {
       
        const login = new loginPage(page);
        await login.gotoLoginPage();
        console.log(await page.title());
        await expect(page).toHaveTitle("Trust Your Supplier");

        await login.verifyWelcomeTitle();
        await login.verifyEmailAddressLabel();
        await login.verifyPasswordLabel();
        await login.verifyForgotPassword();
        await login.verifyNeedHelpLink();

    });

    test('@Smoke @Login Verify Login with Valid Credentials', async ({ page }) => {
        const login = new loginPage(page);
        await login.gotoLoginPage();
        await login.validLogin();

       
    });
});    
