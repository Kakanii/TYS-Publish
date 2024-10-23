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


    test('@Sanity @AllTests @ProfilePublish Company profile publish', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare('United States of America');
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
        await mailPage.clickOnText('Alabama');


        await mailPage.verifyInputFieldWith('postalCode', '45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts', 'Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts', 'Select');
        await mailPage.clickOnSecondButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Skip alternate admin
        await mailPage.clickOnButton('Skip & Submit');
        //Click on checkbox
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Submit');

        await mailPage.verifyFieldIsVisible('Company Information');

        await mailPage.verifySelecteDate();
        await mailPage.verifyMonthSelected();

        await mailPage.fillFieldByPlaceholder('Write few words about the', 'We are a leading provider of innovative solutions.');

        // Enter Contact Details
        await mailPage.verifyFieldIsVisible('Contact Details');
        await mailPage.fillFieldByPlaceholder('Enter Phone Number', '+1 (123) 456-789');
        await mailPage.fillFieldByPlaceholder('Enter Company Email Address', 'sample@yopmail.com');

        // Tax Details
        await mailPage.verifyFieldIsVisible('Tax Details');
        // await mailPage.clickOnBusinessType();
        await mailPage.verifyBusinessType('Corporation');
        // await mailPage.selectByRole('menuitemradio', 'Corporation');

        // Upload Tax Registration
        await mailPage.clickByRole('button', 'Upload');
        // await mailPage.uploadDoc();
        const ein = faker.number.int({ min: 100000000, max: 999999999 }).toString();
        await mailPage.fillFieldByLabel('Employer Identification', ein);
        await mailPage.uploadByLabel('Upload Tax Registration', 'Browse');
        await mailPage.clickByRole('button', 'Upload');

        // Additional Information
        await mailPage.verifyFieldIsVisible('Additional Information');
        await mailPage.selectOption('No', 4);
        await mailPage.fillFieldByLabel('Number of Full Time Employees', '5');
        await mailPage.fillFieldByLabel('Number of Temporary and', '5');
        await mailPage.clickByRole('button', 'Save and Continue');

        // Select All UNSPSC Codes
        await mailPage.SelectAllUNSPSCCodes();
        await mailPage.clickByRole('button', 'Save and Continue');
        await mailPage.clickByRole('button', 'Save and Continue');


        await mailPage.clickByRole('button', 'Assign Contact');
        await mailPage.clickByRole('button', 'Choose an Existing Contact');
        await mailPage.selectByRole('menuitemradio', 'First Name Last Name - CEO');
        await mailPage.clickByRole('button', 'Add Contact');

        await mailPage.clickByRole('button', 'Assign Contact');
        await mailPage.clickByRole('button', 'Choose an Existing Contact');
        await mailPage.selectByRole('menuitemradio', 'First Name Last Name - CEO');
        await mailPage.clickByRole('button', 'Add Contact');

        await mailPage.clickByRole('button', 'Assign Contact');
        await mailPage.clickByRole('button', 'Choose an Existing Contact');
        await mailPage.selectByRole('menuitemradio', 'First Name Last Name - CEO');
        await mailPage.clickByRole('button', 'Add Contact');

        // await mailPage.clickByRole('button', 'Assign Contact');
        // await mailPage.fillFieldByPlaceholder('Enter First Name', 'sample');
        // await mailPage.fillFieldByPlaceholder('Enter Last Name', 'sample');
        // await mailPage.clickByRole('button', 'Select Year of Birth');
        // await mailPage.selectByRole('menuitemradio', '2006');
        // await mailPage.fillFieldByPlaceholder('Enter Job Title', 'dfo');
        // await mailPage.fillFieldByPlaceholder('Enter Phone Number', '+1 (123) 456-789');
        // await mailPage.clickByRole('button', 'Select From Existing locations');
        // await mailPage.selectByRole('menuitemradio', 'Headquarters Address1 Address2');
        // await mailPage.fillFieldByLabel('Email Address', 'sample@yopmail.com')

        // await mailPage.clickByRole('button', 'Add Contact');



        await mailPage.clickByRole('button', 'Continue');
        await mailPage.clickByRole('button', 'Save and Continue');


        await mailPage.redirectToExternalIdentifier();

        await mailPage.clickByRole('button', 'Save and Continue');

        // await mailPage.redirectToExternalIdentifier();
        // await mailPage.clickByRole('button', 'Save and Continue');
        // await mailPage.redirectToExternalIdentifier();

        // await mailPage.clickByRole('button', 'Continue');
        // await mailPage.clickByRole('button', 'Save and Continue');

        //await mailPage.redirectTo("https://qa2.recnyls.com/dashboard/onboarding/review");
        // Verify Profile Readiness and Publish
        await mailPage.clickByRole('button', 'Save and Continue');

        await mailPage.verifyText('Profile Readiness')
        await mailPage.verifyText('%Completed')
        await mailPage.clickByRole('button', 'Publish');
        await mailPage.verifyText('Publish Profile')
        await mailPage.clickByRole('button', 'Publish');
        // await page.waitForTimeout(7000);
        await mailPage.verifyText('Insights At a glance');
        await mailPage.verifyelement('Insights At a glance');
    });


});
