import { test, expect } from '@playwright/test';
import { buyerLoginPage } from '../pageObjects/buyerLoginPage';
import { inviteSupplierPage } from '../pageObjects/inviteSupplierPage';
import { supplierRegistrationPage } from '../pageObjects/supplierRegistrationPage';
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
            // Optionally, skip the test or handle accordingly
        }
    });

    // Release the credential after each test
    test.afterEach(() => {
        if (currentCredential) {
            releaseCredential(currentCredential.username);
            console.log(`Released credential: ${currentCredential.username}`);
        }
    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Country/Region of Registration field on Company details screen', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyField('Country/Region of Registration');
        //await mailPage.verifyTooltipFor('Country/Region of Registration','The country/region in which the Supplier company is registered.')

        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Business Name field on Company details screen', async ({ page }) => {



        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyField('Business Name');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Legal Business Name field on Company details screen', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyField('Legal Business Name');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Website field on Company details screen', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyField('Website');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Country/Region of Registration field is non editable', async ({ page }) => {


        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyCountryFieldDisabled();
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Country/Region of Registration field as mandatory with mandatory icon', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldMandatory('Country/Region of Registration');
        await lPage.closePage();


    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Business Name field as mandatory with mandatory icon', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldMandatory('Business Name');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Legal Business Name field as mandatory with mandatory icon', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldMandatory('Legal Business Name');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Business Name Editable', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldEditable('companyName');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify if Supplier able to see Legal Business Name Editable', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldEditable('legalBusinessName');
        await lPage.closePage();

    });
    //TN-244
    test('@Regression @TN-244 Verify the fields are displyed, enabled, mandatory on Compnay details page', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        //Verify Field Label
        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyField('Country/Region of Registration');
        await mailPage.verifyField('Business Name');
        await mailPage.verifyField('Legal Business Name');
        await mailPage.verifyField('Website');
        await mailPage.verifyField('Trust Your Supplier Terms & Conditions');
        await mailPage.verifyPTextField('Need Help?');
        await mailPage.verifyPTextField('Company Details');

        //Verify Input field
        await mailPage.verifyCountryFieldDisabled();
        await mailPage.verifyFieldEditable('companyName');
        await mailPage.verifyFieldEditable('legalBusinessName');
        await mailPage.verifyFieldEditable('website');

        //Verify Mandatory Field
        await mailPage.verifyFieldMandatory('Business Name');
        await mailPage.verifyFieldMandatory('Legal Business Name');
        await mailPage.verifyFieldMandatory('Country/Region of Registration');

        await lPage.closePage();

    });
    //TN-242
    test('@Regression @TN-242 Verify Country/Region of Registration field Non editable, prepopulated, mandatory, tooltip on Company details', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);


        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyField('Country/Region of Registration');
        await mailPage.verifyCountryFieldDisabled();
        await mailPage.verifyPTextField('United States of America');
        await mailPage.verifyFieldMandatory('Country/Region of Registration');
        await lPage.closePage();


    });

    //TN-242 // not yet implemented in new QA UI
    test.skip('@Regression @TN-242 Verify Business Name filed is editable, allow all characters, mandatory, tootltip on Compnay details', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);


        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldMandate('companyName');
        await mailPage.verifyInputFieldWith('companyName', 'TEST COMPANY');
        await mailPage.verifyInputFieldWith('companyName', 'test company');
        await mailPage.verifyInputFieldWith('companyName', '12345678');
        await mailPage.verifyInputFieldWith('companyName', '&Test');
        await mailPage.verifyInputFieldWith('companyName', '@Test');
        await mailPage.verifyInputFieldWith('companyName', '£Test');
        await mailPage.verifyInputFieldWith('companyName', '$Test');
        await mailPage.verifyInputFieldWith('companyName', '€Test');
        await mailPage.verifyInputFieldWith('companyName', '¥Test');
        await mailPage.verifyInputFieldWith('companyName', '#Test');
        await mailPage.verifyInputFieldWith('companyName', '.Test');
        await mailPage.verifyInputFieldWith('companyName', ',Test');
        await mailPage.verifyInputFieldWith('companyName', ':Test');
        await mailPage.verifyInputFieldWith('companyName', ';Test');
        await mailPage.verifyInputFieldWith('companyName', '-Test');
        await mailPage.verifyInputFieldWith('companyName', 'äTest');
        await mailPage.verifyInputFieldWith('companyName', 'a/Test');
        await mailPage.verifyInputFieldWith('companyName', 'ÓTest');
        await mailPage.verifyInputFieldWith('companyName', 'a^Test');
        await mailPage.verifyInputFieldWith('companyName', '&Test');
        await mailPage.verifyInputFieldWith('companyName', 'ŽTest');
        await mailPage.verifyInputFieldWith('companyName', 'ØTest');
        await mailPage.verifyInputFieldWith('companyName', 'îTest');
        await mailPage.verifyInputFieldWith('companyName', '(Test');
        await mailPage.verifyInputFieldWith('companyName', ')Test');
        await mailPage.verifyInputFieldWith('companyName', '[Test');
        await mailPage.verifyInputFieldWith('companyName', ']Test');
        await mailPage.verifyInputFieldWith('companyName', '{Test');
        await mailPage.verifyInputFieldWith('companyName', '}Test');
        await mailPage.verifyInputFieldWith('companyName', '<Test');
        await mailPage.verifyInputFieldWith('companyName', '>Test');
        await mailPage.verifyInputFieldWith('companyName', '!Test');
        await mailPage.verifyInputFieldWith('companyName', '«Test');
        await mailPage.verifyInputFieldWith('companyName', '»Test');
        await mailPage.verifyInputFieldWith('companyName', '?Test');
        await mailPage.verifyInputFieldWith('companyName', '\Test');
        await mailPage.verifyInputFieldWith('companyName', '/Test');
        await mailPage.verifyInputFieldWith('companyName', '%Test');
        await mailPage.verifyInputFieldWith('companyName', '*Test');
        await mailPage.verifyInputFieldWith('companyName', '+Test');
        await mailPage.verifyInputFieldWith('companyName', '_Test');
        await mailPage.verifyInputFieldWith('companyName', '=Test');
        await mailPage.verifyInputFieldWith('companyName', '¥Test');
        await mailPage.verifyInputFieldWith('companyName', 'î#@%Test@#&');
        await mailPage.verifyInputFieldWith('companyName', '><!^îTest');
        await lPage.closePage();



    });

    //TN-242 // not yet implemented in new QA UI
    test.skip('@Regression @TN-242 Verify Legal Business Name filed is editable, allow all characters, mandatory, tootltip on Compnay details', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);
        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyFieldMandate('legalBusinessName');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'TEST COMPANY');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'test company');
        await mailPage.verifyInputFieldWith('legalBusinessName', '12345678');
        await mailPage.verifyInputFieldWith('legalBusinessName', '&Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '@Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '£Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '$Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '€Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '¥Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '#Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '.Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', ',Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', ':Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', ';Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '-Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'äTest');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'a/Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'ÓTest');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'a^Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '&Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'ŽTest');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'ØTest');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'îTest');
        await mailPage.verifyInputFieldWith('legalBusinessName', '(Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', ')Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '[Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', ']Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '{Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '}Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '<Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '>Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '!Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '«Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '»Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '?Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '\Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '/Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '%Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '*Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '+Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '_Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '=Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', '¥Test');
        await mailPage.verifyInputFieldWith('legalBusinessName', 'î#@%Test@#&');
        await mailPage.verifyInputFieldWith('legalBusinessName', '><!^îTest');
        await lPage.closePage();

    });

    //TN-242 //Bug need to raise. 
    test.skip('@Regression @TN-242 Verify Website filed is editable,Optional, tootltip, allow only valid URL on Compnay details', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyInvalidWebsiteURL('website', 'www.test.c');
        await mailPage.verifyInvalidWebsiteURL('website', 'www.test');
        await mailPage.verifyInvalidWebsiteURL('website', 'http//www.test.com');
        await mailPage.verifyInvalidWebsiteURL('website', 'http//www.test.');
        await mailPage.verifyValidWebsiteURL('website', 'http://www.test.com');


    });

    //TN-242
    test('@Regression @TN-242 Verify I have read and I accept check box with hyperlinked and pop up and Continue button', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.verifyTYSTerms('Trust Your Supplier Terms & Conditions');
        await mailPage.verifyPTextFieldOnTYS('English (US)');
        await mailPage.verifyButtonVisible('Print');
        await mailPage.clickOnSecondButtonOf('Close');
        await lPage.closePage();
    });

    //TN-242
    test('@Regression @TN-242 Verify upon click on Continue button will redirect to next page that is Your details', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName', inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website', 'http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        await mailPage.verifyField('First Name');
        await lPage.closePage();
    });

    //TN-242
    test('@Regression @TN-242 Verify upon click on Decline button will open right drawer with decline reason', async ({ page }) => {

        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName', inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website', 'http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('I Decline');
        await mailPage.clickOnButton('Decline');
        await mailPage.enterTextAreaInputField('declineReason', 'Test Decline');
        await mailPage.clickOnSecondButton('Decline');
        await mailPage.verifyPTextField('Invitation Declined');
        await lPage.closePage();

    });

    //TN-250
    test('@Regression @TN-250 Verify First Name field is mandatory,Allow only upper and lower case letters,allow max 35 charaters and tooltip', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify First Name
        await mailPage.verifyField('First Name');
        await mailPage.verifyFieldMandate('firstName');
        await mailPage.verifyInputFieldWith('firstName','TEST COMPANY');
        await mailPage.verifyInputFieldWith('firstName','test company');
        await mailPage.verifyInputFieldWith('firstName','ertertertetetretwrtwtewtwterteryryw');
        await mailPage.verifyInputFieldWithSpecial('firstName','@#$');
        await mailPage.verifyInputFieldWithSpecial('firstName','(>?');
        await mailPage.verifyInputFieldWithSpecial('firstName','+_.');
        await lPage.closePage();

    });

    //TN-250
    test('@Regression @TN-250 Verify Last Name field is mandatory,Allow only upper and lower case letters,allow max 35 charaters and tooltip', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify Last Name
        await mailPage.verifyField('Last Name');
        await mailPage.verifyFieldMandate('lastName');
        await mailPage.verifyInputFieldWith('lastName','TEST COMPANY');
        await mailPage.verifyInputFieldWith('lastName','test company');
        await mailPage.verifyInputFieldWith('lastName','ertertertetetretwrtwtewtwterteryryw');
        await mailPage.verifyInputFieldWithSpecial('lastName','@#$');
        await mailPage.verifyInputFieldWithSpecial('lastName','(>?');
        await mailPage.verifyInputFieldWithSpecial('lastName','+_.');
        await lPage.closePage();

    });

    //TN-250
    test('@Regression @TN-250 Verify Email filed is mandatory,accept only email formats and tooltip', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify Email Address
        await mailPage.verifyField('Email Address');
        await mailPage.verifyFieldMandatory('Email Address');
        await mailPage.verifyInputFieldPrePopulated('email',inviteSupplierPage.email);
        await lPage.closePage();

    });

    //TN-250
    test('@Regression @TN-250 Verify Job title field is optional,allow max 35 characters and tooltip', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify Job Title
        await mailPage.verifyField('Job Title');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('title','ceo');
        await mailPage.verifyInputFieldWithSpecial('title','@#$');
        await mailPage.verifyInputFieldWithSpecial('title','+_}');
        await mailPage.verifyInputFieldWith('title','ertertertetetretwrtwtewtwterteryryw');
        await lPage.closePage();

    });

    //TN-250 //Flag is not showing need to raise a bug
    test.skip('@Regression @TN-250 Verify Phone Number field is optional,country code prepopulate and tooltip', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify Phone Number
        await mailPage.verifyFieldWithlabel('Phone Number');
        await mailPage.verifyFlagFor('United States');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await lPage.closePage();

    });

    //TN-250
    test('@Regression @TN-250 Verify Password field is mandatory,accept only between 8-15 and tooltip', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify Password
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await mailPage.verifyPasswordFieldWith('password','tes');
        await mailPage.verifyPasswordFieldWithInvalidMatch('password','testtesttest');
        await mailPage.verifyPasswordFieldWithInvalidMatch('password','TESTTESTTEST');
        await mailPage.verifyPasswordFieldWithInvalidMatch('password','TEST@test');
        await mailPage.verifyPasswordFieldWithInvalidMatch('password','TEST@1234');
        await mailPage.verifyPasswordFieldWithInvalidMatch('password','test@1234');
        await lPage.closePage();
    });

     //TN-250
     test('@Regression @TN-250 Verify signup button enabeld,check box is optional with text like Subscribe to receive communications about product updates, tutorials, tips and more', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await lPage.closePage();
    });

     //TN-250 // need to check
     test.skip('@Regression @TN-250 Verify back button will navigate to previous page and all the data entered will be prefilled', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.clickOnButton('Back');
        await mailPage.verifyInputValuePrifill('firstName','First Name');
        await mailPage.verifyInputValuePrifill('lastName','Last Name');
        await mailPage.verifyInputValuePrifill('title','CEO');
        await lPage.closePage();

    });

    test('@Regression @Sanity Verify registration with all mandatory fields', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Skip alternate admin
        await mailPage.clickOnButton('Skip & Submit');
        //Click on checkbox
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Submit');
        await lPage.closePage();
    });

    test('@Regression @Sanity Verify registration with all mandatory and optional fields', async ({ page }) => {
       
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.verifyInputFieldWith('poBox','43534-5344');
        await mailPage.verifyInputFieldWith('poBoxPostalCode','43534-5344');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Select NAICS
        await mailPage.ClickOnPtext('NAICS');
        await mailPage.clickOnButton('Select Codes');
        await mailPage.ClickOnSelectFor('11 - Agriculture, Forestry, Fishing and Hunting T','Select');
        await mailPage.clickOnSecondButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Fill alternate admin
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('email','testautomation@maildrop.cc');
        await mailPage.verifyInputFieldWith('confirmEmail','testautomation@maildrop.cc');
        await mailPage.verifyInputFieldWith('jobTitle','CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await mailPage.clickOnButton('Submit');
        //Click on checkbox
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Submit');
        await lPage.closePage();
    });
     //TN-249
     test('@Regression @TN-249 Verify the text under Verification code ,with Valid code, Verify button enabled', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);
        const suppRegistPage = new supplierRegistrationPage(page);
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('We sent a 6 digit one-time verification code to your Email Address to verify your account');
        await mailPage.VerifyVerificationCodeBlocks();
        await mailPage.copyPasteOTP();
        await mailPage.verifySignUpFieldEnable();
        await lPage.closePage();
    });
    //TN-249
    test('@Regression @TN-249 Verify the Verification code with Invalid code and error message', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('We sent a 6 digit one-time verification code to your Email Address to verify your account');
        await mailPage.VerifyVerificationCodeBlocks();
        await mailPage.enterInvalidOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPTextField('The Verification Code you entered is invalid. Please click on the "Resend Verification Code" link to get a new verification code.');
        await lPage.closePage();
    });
    //TN-249
    test('@Regression @TN-249 Verify re-send button will receive the new verification code to respective mail', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnSpanButton('Resend Verification Code');
        await mailPage.verifyResendOTP();
        await lPage.closePage();
    });
    //TN-249
    test('@Regression @TN-249 Verify user navigates to next page when enters valid OTP', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await lPage.closePage();
    });
    //TN-229 //Open bug - TN-423
    test.skip('@Regression @TN-229 Verify Add Domestic Headquarters Details with Country filed prepopulated, Address Line1 field mandatory,tooltip, allow upto 100 characters', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyCountryFieldDisabled();
        await mailPage.verifyFieldMandatory('Address Line 1');
        await mailPage.verifyFieldMandate('addressLine1');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET');
        await mailPage.verifyInputFieldWith('addressLine1', 'teststreettetestststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreet');
        await mailPage.verifyPTextField('Characters limit reached');
        await lPage.closePage();
    });
    //TN-229 // need to raise a bug. it is taking more than 100 characters but showing the error message
    test.skip('@Regression @TN-229 Verify Add Domestic Headquarters Details with Address Line2 field optional,tooltip, allow upto 100 characters', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.verifyFieldWithlabel('Subscribe to receive communications about product updates, tutorials, tips and more');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyInputFieldWith('addressLine2', 'TEST STREET');
        await mailPage.verifyInputFieldWith('addressLine2', 'teststreettetestesttsrtrttstreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreetteststreet');
        await mailPage.verifyPTextField('Characters limit reached');
        await lPage.closePage();
    });
     //TN-229 //Need to raise a bug
     test.skip('@Regression @TN-229 Verify Add Domestic Headquarters Details with all other fields are country specific format', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyFieldMandatory('Address Line 1');
        await mailPage.verifyFieldMandate('addressLine1');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET');
        //Verify City
        await mailPage.verifyFieldMandate('city');
        await mailPage.verifyInputFieldWith('city', 'TEST City');
        //Verify Postal code
        await mailPage.verifyInputFieldWithSpecial('postalCode','test');
        await mailPage.verifyInputFieldWithInvalidData('postalCode','45678-9')
        await mailPage.verifyFieldMandate('postalCode');
        await mailPage.verifyInputFieldWith('postalCode','34343-4343');
        //verify po box
        await mailPage.verifyInputFieldWithInvalidData('poBox','4455');
        await mailPage.verifyInputFieldWithInvalidData('poBox','44555645');
        //verify PO BOX ZIP CODE
        await mailPage.verifyInputFieldWithInvalidData('poBoxPostalCode','455');
        await mailPage.verifyInputFieldWithInvalidData('poBoxPostalCode','54445-343');
        await lPage.closePage();
    });
    //TN-229
    test('@Regression @TN-229 Verify continue button will enable and navigate after filling all mandatory fields in Add Domestic Headquarters Details', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET1');
        await mailPage.verifyInputFieldWith('addressLine2', 'TEST STREET2');
        await mailPage.verifyInputFieldWith('city', 'TEST City');
        await mailPage.verifyInputFieldWith('postalCode','34343-4343');
        await mailPage.verifyInputFieldWith('poBox','44555');
        await mailPage.verifyInputFieldWith('poBoxPostalCode','54445-3434');
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Continue');
        await mailPage.verifyPTextField('Address has been saved successfully');
        await mailPage.verifyPageHeader('Select Products/Services using UNSPSC or NAICS');
        await lPage.closePage();
    });

    //TN-234
    test('@Regression @TN-234 Verify UNSPSC is mandatory ,select the appropriate Segments, Family, Class and Commodity on popup', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET1');
        await mailPage.verifyInputFieldWith('addressLine2', 'TEST STREET2');
        await mailPage.verifyInputFieldWith('city', 'TEST City');
        await mailPage.verifyInputFieldWith('postalCode','34343-4343');
        await mailPage.verifyInputFieldWith('poBox','44555');
        await mailPage.verifyInputFieldWith('poBoxPostalCode','54445-3434');
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Continue');
        await mailPage.verifyPTextField('Address has been saved successfully');
        //Verify Header
        await mailPage.verifyPageHeader('Select Products/Services using UNSPSC or NAICS');
        //Verify UNSPSC
        await mailPage.verifyPFieldMandatory('Select UNSPSC Codes');
        await mailPage.verifyPTextField('Select UNSPSC Codes');
        await mailPage.verifyPTextField('Please select the UNSPSC codes relevant to your business (minimum 1 code).');
        await mailPage.verifyPTextField('Select NAICS Codes');
        await mailPage.verifyPTextField('Please select the NAICS code. The system allows you to select multiple NAICS codes.');
        await mailPage.verifyButtonVisible('Back');
        await mailPage.clickOnText('Select UNSPSC Codes');
        //Verify Products page
        await mailPage.verifyPTextField('Select Products/Services using');
        await mailPage.verifyPTextField('Segment');
        await mailPage.verifyPTextField('Family');
        await mailPage.verifyPTextField('Class');
        await mailPage.verifyPTextField('Commodity');
        //Select Products
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        //Verify Selected codes
        await mailPage.verifyPTextField('1');
        await mailPage.clickOnButton('Continue');
        await lPage.closePage();
    });

    //TN-234
    test('@Regression @TN-234 Verify the selected UNSPSC codes will be seen when click on View selected codes', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET1');
        await mailPage.verifyInputFieldWith('addressLine2', 'TEST STREET2');
        await mailPage.verifyInputFieldWith('city', 'TEST City');
        await mailPage.verifyInputFieldWith('postalCode','34343-4343');
        await mailPage.verifyInputFieldWith('poBox','44555');
        await mailPage.verifyInputFieldWith('poBoxPostalCode','54445-3434');
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Continue');
        await mailPage.verifyPTextField('Address has been saved successfully');
        //Verify Header
        await mailPage.verifyPageHeader('Select Products/Services using UNSPSC or NAICS');
        //Verify UNSPSC
        await mailPage.verifyPFieldMandatory('Select UNSPSC Codes');
        await mailPage.verifyPTextField('Select UNSPSC Codes');
        await mailPage.verifyPTextField('Please select the UNSPSC codes relevant to your business (minimum 1 code).');
        await mailPage.verifyPTextField('Select NAICS Codes');
        await mailPage.verifyPTextField('Please select the NAICS code. The system allows you to select multiple NAICS codes.');
        await mailPage.verifyButtonVisible('Back');
        await mailPage.clickOnText('Select UNSPSC Codes');
        //Verify Products page
        await mailPage.verifyPTextField('Select Products/Services using');
        await mailPage.verifyPTextField('Segment');
        await mailPage.verifyPTextField('Family');
        await mailPage.verifyPTextField('Class');
        await mailPage.verifyPTextField('Commodity');
        //Select Products
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        //Verify Selected codes
        await mailPage.verifyPTextField('1');
        //Verify Selected codes on View Selected Codes
        await mailPage.clickOnText('View Selected codes');
        await mailPage.verifyPTextField('Select All');
        await mailPage.verifyPTextField('Boys slacks or trousers or shorts');
        await lPage.closePage();
    });

    //TN-234
    test('@Regression @TN-234 Verify user can select individual option in UNSPSC , can select all, can deselect all, can delete', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET1');
        await mailPage.verifyInputFieldWith('addressLine2', 'TEST STREET2');
        await mailPage.verifyInputFieldWith('city', 'TEST City');
        await mailPage.verifyInputFieldWith('postalCode','34343-4343');
        await mailPage.verifyInputFieldWith('poBox','44555');
        await mailPage.verifyInputFieldWith('poBoxPostalCode','54445-3434');
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Continue');
        await mailPage.verifyPTextField('Address has been saved successfully');
        //Verify Header
        await mailPage.verifyPageHeader('Select Products/Services using UNSPSC or NAICS');
        //Verify UNSPSC
        await mailPage.verifyPFieldMandatory('Select UNSPSC Codes');
        await mailPage.verifyPTextField('Select UNSPSC Codes');
        await mailPage.verifyPTextField('Please select the UNSPSC codes relevant to your business (minimum 1 code).');
        await mailPage.verifyPTextField('Select NAICS Codes');
        await mailPage.verifyPTextField('Please select the NAICS code. The system allows you to select multiple NAICS codes.');
        await mailPage.verifyButtonVisible('Back');
        await mailPage.clickOnText('Select UNSPSC Codes');
        //Verify Products page
        await mailPage.verifyPTextField('Select Products/Services using');
        await mailPage.verifyPTextField('Segment');
        await mailPage.verifyPTextField('Family');
        await mailPage.verifyPTextField('Class');
        await mailPage.verifyPTextField('Commodity');
        //Select Products
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        //Select another products
        await mailPage.clickOnText('Building and Construction Machinery and Accessories');
        await mailPage.clickOnText('Heavy construction machinery and equipment');
        await mailPage.ClickOnSelectFor('Earth moving machinery','Select');
        await mailPage.ClickOnSelectFor('Front end loaders','Select');
        //Verify Selected codes
        await mailPage.verifyPTextField('2');
        //Verify Selected codes on View Selected Codes
        await mailPage.clickOnText('View Selected codes');
        await mailPage.verifyPTextField('Select All');
        await mailPage.verifyPTextField('Boys slacks or trousers or shorts');
        await mailPage.verifyPTextField('Front end loaders');
        await mailPage.clickOnInputCheckbox('checkbox');
        await mailPage.clickOnSelectAllCheckbox();
        await mailPage.clickOnButton('Delete');
        await mailPage.verifyPTextField('You have not selected any codes yet.');
        await lPage.closePage();
    });

    //TN-234
    test('@Regression @TN-234 Verify the NAICS is optional, can select using code, can deselect, can delete', async ({ page }) => {
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
        await mailPage.verifyInputFieldWith('firstName', 'First Name');
        await mailPage.verifyInputFieldWith('lastName', 'Last Name');
        await mailPage.verifyInputFieldWith('password', 'Password@123');
        await mailPage.verifyInputFieldWith('title', 'CEO');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number', '+14545645745', '+1 (454) 564-5745');
        await mailPage.clickOnCheckBox();
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Sign up');
        await mailPage.verifyPTextField('Code has been successfully sent to your registered mail');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        await mailPage.verifyPageHeader('Add Domestic Headquarters Details.');
        await mailPage.verifyInputFieldWith('addressLine1', 'TEST STREET1');
        await mailPage.verifyInputFieldWith('addressLine2', 'TEST STREET2');
        await mailPage.verifyInputFieldWith('city', 'TEST City');
        await mailPage.verifyInputFieldWith('postalCode','34343-4343');
        await mailPage.verifyInputFieldWith('poBox','44555');
        await mailPage.verifyInputFieldWith('poBoxPostalCode','54445-3434');
        await mailPage.verifySignUpFieldEnable();
        await mailPage.clickOnButton('Continue');
        await mailPage.verifyPTextField('Address has been saved successfully');
        //Verify Header
        await mailPage.verifyPageHeader('Select Products/Services using UNSPSC or NAICS');
        //Click on NAICS
        await mailPage.clickOnText('Select NAICS Codes');
        //Verify Products page
        await mailPage.verifyPTextField('NAICS');
        await mailPage.ClickOnSelectFor('11 - Agriculture, Forestry, Fishing and Hunting T','Select');
        //Verify Selected codes
        await mailPage.verifyPTextField('1');
        //Verify multiple selections
        await mailPage.ClickOnSelectFor('111 - Crop Production','Select');
        //Verify Selected codes
        await mailPage.verifyPTextField('2');
        //Verify manage Codes
        await mailPage.clickOnText('View Selected codes');
        await mailPage.verifyPTextField('Select All');
        await mailPage.verifyPTextField('11 - Agriculture, Forestry, Fishing and Hunting T');
        await mailPage.verifyPTextField('111 - Crop Production');
        //Verify delete codes
        await mailPage.clickOnInputCheckbox('checkbox');
        await mailPage.clickOnSelectAllCheckbox();
        await mailPage.clickOnButton('Delete');
        await mailPage.verifyPTextField('You have not selected any codes yet.');
        await lPage.closePage();
    });

    //TN-234
    test('@Regression @TN-234 Verify continue button is enabled atleast any one UNSPSC is selected.', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Verify header on next page
        await mailPage.verifyPageHeader('Add Alternate Admin Details');
        await lPage.closePage();
    });

    //TN-232 //Have open bug TN-811
    test.skip('@Regression @TN-232 Verify page headers and texts on Alternative admin page', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Verify header on next page
        await mailPage.verifyPageHeader('Add Alternate Admin Details');
        await mailPage.verifyPTextField('Adding an alternate admin is optional, you can skip & submit your onboarding details.');
        await mailPage.verifyPTextField(' Adding the user here will sent an invitation to the user');
        await mailPage.verifySpanTextLabel('First Name');
        await mailPage.verifySpanTextLabel('Last Name');
        await mailPage.verifySpanTextLabel('Email Address');
        await mailPage.verifySpanTextLabel('Confirm Email Address');
        await mailPage.verifySpanTextLabel('Job Title');
        await lPage.closePage();
    });

    //TN-232
    test('@Regression @TN-232 Verify mandatory fields, tooltips, allow only alphabets for First name, Last name', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Verify field mandatory
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyFieldMandate('lastName');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyFieldMandate('firstName');
        await mailPage.verifyFieldMandate('email');
        await mailPage.verifyFieldMandate('confirmEmail');
        await lPage.closePage();
    });

    //TN-232
    test('@Regression @TN-232 Verify email address and confirm email address in Alternative admin page', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Verify field mandatory
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInvalidEmail('email','testautomation');
        await mailPage.verifyInputFieldWith('email','testautomation@maildrop.cc');
        await mailPage.verifyInvalidEmail('confirmEmail','testautomation@');
        await mailPage.verifyInputFieldWith('confirmEmail','testautomation@maild');
        await mailPage.verifyInputFieldWith('email','testautomation@maildrop.cc');
        await mailPage.verifyEmailMissmatch('confirmEmail','testauation@maildrop.cc');
        await lPage.closePage();
    });

     //TN-232 // Flag is not showing,Need to raise a bug
     test.skip('@Regression @TN-232 Verify Job title , phone number, contacts prefered fields are optional, tooltips', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Verify field optional
        await mailPage.verifyInputFieldWith('firstName','First Name');
        //Verify phone number
        await mailPage.verifyFieldWithlabel('Phone Number');
        await mailPage.verifyFlagFor('United States');
        await mailPage.verifyPhoneNumberWith('Enter Phone Number','+14545645745','+1 (454) 564-5745');
        await mailPage.verifyPTextField('English (US)');
        await lPage.closePage();
    });

    //TN-232
    test('@Regression @TN-232 Verify Back, Submit, Skip&Submit buttons in Alterative admin page', async ({ page }) => {
        const lPage = new buyerLoginPage(page);
        const inviteSuppPage = new inviteSupplierPage(page);
        const mailPage = new maildropPage(page);

        await lPage.goTologinPage(testdata.testURL.buyerURL);
        await lPage.loginInto(currentCredential.username, currentCredential.password);

        await inviteSuppPage.inviteSupplierWithoutQuestionniare();
        await mailPage.clickOnRegisterTYSFrommaildrop();
        await mailPage.enterInputFieldWith('legalBusinessName',inviteSupplierPage.supplierName);
        await mailPage.enterInputFieldWith('website','http://www.test.com');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Continue');
        //Verify SignUp button
        await mailPage.verifyFieldMandatory('Choose a Password');
        await mailPage.verifyInputFieldWith('firstName','First Name');
        await mailPage.verifyInputFieldWith('lastName','Last Name');
        await mailPage.verifyInputFieldWith('title','CEO');
        await mailPage.verifyInputFieldWith('password','Password@123');
        await mailPage.clickOnCheckBox();
        await mailPage.clickOnButton('Sign up');
        await mailPage.copyPasteOTP();
        await mailPage.clickOnButton('Verify');
        //Fill Domestic Head Quarters
        await mailPage.verifyInputFieldWith('addressLine1','Address1');
        await mailPage.verifyInputFieldWith('addressLine2','Address2');
        await mailPage.verifyInputFieldWith('city','City');
        await mailPage.clickOnStateDropdown();
        await mailPage.clickOnText('Alabama');
        await mailPage.verifyInputFieldWith('postalCode','45343-5345');
        await mailPage.clickOnButton('Continue');
        //Select Prodcuts and Services
        await mailPage.clickOnText('Select UNSPSC Codes');
        await mailPage.clickOnText('Apparel and Luggage and Personal Care Products');
        await mailPage.clickOnText('Clothing');
        await mailPage.ClickOnSelectFor('Slacks and trousers and shorts','Select');
        await mailPage.ClickOnSelectFor('Boys slacks or trousers or shorts','Select');
        await mailPage.clickOnButton('Continue');
        //Services
        await mailPage.clickOnButton('Continue');
        //Fill mandatory alternate admin
         await mailPage.verifyInputFieldWith('firstName','First Name');
         await mailPage.verifyInputFieldWith('lastName','Last Name');
         await mailPage.verifyInputFieldWith('email','testautomation@maildrop.cc');
         await mailPage.verifyInputFieldWith('confirmEmail','testautomation@maildrop.cc');
         await mailPage.clickOnButton('Submit');
        //Verify pop up message
        await mailPage.verifyPTextField('To proceed, please review and accept the Buyer Terms of Use to finalize your onboarding.');
        await mailPage.clickOnCheckBox();
        await mailPage.verifyButtonVisible('Cancel');
        //Click on checkbox
        await mailPage.clickOnSecondButton('Submit');
        await lPage.closePage();
    });
});