import { test, expect } from '@playwright/test';
import {companyProfilePage} from '../pageObjects/companyProfilePage';
import { acquireCredential, resetCredentials, releaseCredential } from '../credentialPool'; // Adjust the path as necessary
import { buyerLoginPage } from '../pageObjects/buyerLoginPage';
import { inviteSupplierPage } from '../pageObjects/inviteSupplierPage';
import { maildropPage } from '../pageObjects/maildropPage';
const testdata = require('../data/testdata');

let currentCredential;



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
            console.log("=============================================================================================");
            console.log(`Running ${test.info().title}`);
            console.log("=============================================================================================");
        } catch (error) {
            console.error(error.message);
        }
    });

    // Release the credential after each test
    test.afterEach(() => {
        if (currentCredential) {
            releaseCredential(currentCredential.username);
            console.log(`Released credential: ${currentCredential.username}`);
            console.log("=============================================================================================");
            console.log(`Finished ${test.info().title} with status ${test.info().status}`);
            console.log("=============================================================================================");
        }
    });
    
    test('@Regressions2 @Sanity Company profile publish', async ({ page }) => {
        
        // Login
        // Fill the form sections
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const cpp = new companyProfilePage(page, expect);

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
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
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
        await mailPage.verifyInputFieldWith('poBox', '43534-5344');
        await mailPage.verifyInputFieldWith('poBoxPostalCode', '43534-5344');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts', 'Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts', 'Select');
        await mailPage.clickOnButton('Continue');
        //Select NAICS
        await mailPage.ClickOnPtext('NAICS');
        await mailPage.clickOnButton('Select Codes');
        await mailPage.ClickOnSelectFor('Agriculture, Forestry, Fishing and Hunting T (11)', 'Select');
        await mailPage.clickOnSecondButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Fill alternate admin
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('email', 'testautomation@maildrop.cc');
        await mailPage.verifyInputFieldWith('confirmEmail', 'testautomation@maildrop.cc');
        await mailPage.verifyInputFieldWith('jobTitle', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnButton('Submit');
        //Click on checkbox
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Submit');

        //publish profle 
        // await cpp.login(inviteSupplierPage.email, 'Password@123');
        await mailPage.fillCompanyInformation();
        await cpp.fillProductsServices();
        await cpp.fillExternalIdentifiers();
        await cpp.fillManagement();
        // await cpp.navigateToQuestionnaires();
        await cpp.saveAndContinue();
    });

    });