import { test, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { buyerLoginPage } from '../pageObjects/buyerLoginPage';
import { inviteSupplierPage } from '../pageObjects/inviteSupplierPage';
import { maildropPage } from '../pageObjects/maildropPage';
import { acquireCredential, resetCredentials, releaseCredential } from '../credentialPool'; // Adjust the path as necessary
const testdata = require('../data/testdata');
let currentCredential;
let releaseMutex;


test.describe('Verify Supplier Registration Page', () => {
    test.beforeAll(() => {
        resetCredentials();
    });
    // Acquire a credential before each test using `testInfo.parallelIndex`
    test.beforeEach(async ({ page }, testInfo) => {
        try {
            const workerIndex = testInfo.parallelIndex; // Get the index of the current worker
            currentCredential = await acquireCredential(workerIndex);
            console.log(`Worker ${workerIndex} using credential for test: ${currentCredential.username}`);
        } catch (error) {
            console.error(error.message);
        }
    });

    // Release the credential after each test
    test.afterEach(() => {
        if (currentCredential) {
            releaseCredential(currentCredential.username);
            console.log(`Released credential: ${currentCredential.username}`);
        }
    });


    test('@Regressions @Sanity Company profile publish', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName', inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website', 'http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1', 'Address1');
        await mailPage.verifyInputFieldWith('addressLine2', 'Address2');
        await mailPage.verifyInputFieldWith('city', 'City');
        await mailPage.clickOnStateDropdown();
        //await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode', '45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts', 'Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts', 'Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Skip alternate admin
        await mailPage.clickOnButton('Skip & Submit');
        //Click on checkbox
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Submit');


        await mailPage.verifyFieldIsVisible('Company Information');
      
        await mailPage.clickByRole('button', 'Select Month');
        await mailPage.selectByRole('menuitemradio', 'April');
        await mailPage.fillFieldByPlaceholder('Write few words about the', 'We are a leading provider of innovative solutions.');

        await mailPage.verifyFieldIsVisible('Contact Details');
        await mailPage.fillFieldByPlaceholder('Enter Phone Number', '+1 (123) 456-789');
        await mailPage.fillFieldByPlaceholder('Enter Company Email Address', 'sample@yopmail.com');

        await mailPage.verifyFieldIsVisible('Tax Details');
        await mailPage.clickByRole('button', 'Select Business Type');
        await mailPage.selectByRole('menuitemradio', 'Corporation');

       
        await mailPage.verifyFieldIsVisible('Additional Information');
        await mailPage.selectOption('No', 4);
        await mailPage.fillFieldByLabel('Number of Full Time Employees', '5');
        await mailPage.fillFieldByLabel('Number of Temporary and', '5');

    //     await mailPage.clickByRole('button', 'Upload');
    //     await mailPage.fillFieldByLabel('Employer Identification', faker.number.int({ min: 100000000, max: 999999999 }).toString());
    //    try {
    //     //await mailPage.fillFieldByLabel('Employer Identification', '123456789');
    //     await mailPage.uploadByLabel('Upload Tax Registration', 'Browse');
    //     await mailPage.clickByRole('button', 'Upload');
    //    } catch (error) {
        
    //    }

       //await mailPage.fillFieldByPlaceholder('Select Date', '0');
        await mailPage.selectDate('Select Date','2024','0','Choose Saturday, January 13th,');
        await mailPage.clickByRole('button', 'Save and Continue');

    });


});