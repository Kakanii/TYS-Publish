import { expect } from '@playwright/test';
import { faker } from "@faker-js/faker";

const { Base } = require("../utility/Base");
const { inviteSupplierPage } = require("./inviteSupplierPage");

let [newPage] = '';

exports.maildropPage = class maildropPage extends Base {
    constructor(page) {
        super();
        this.page = page;
        this.inputmailBox = "view-this-mailbox";
        this.companyInfoSection = "//p[text()='Company Information']";

        this.dateSelector = "//input[@placeholder='Select Date']";
        // Define locators directly as class properties

        this.dateYear = page.getByRole('combobox');
        this.dateMonth = page.locator("//div[contains(@class, 'react-datepicker__month-dropdown-container')]//select[contains(@class, 'react-datepicker__month-select')]");
        this.dateToSelect = page.getByLabel('Choose Tuesday, October 1st,');
        this.selectMonthButton = page.locator("(//button[contains(@class,'chakra-button chakra-menu__menu-button')])[2]");
        this.monthOption = page.getByRole('menuitemradio', { name: 'January' });
        this.companyDescriptionInput = page.getByPlaceholder('Write few words about the');


        this.viewmailboxBtn = "//span[text()='View Mailbox']//ancestor::button";
        this.inviteEmail = "(//div[@class='truncate font-bold'])[1]";
        this.framePresent = "//iframe";
        this.registerTYS = "(//tbody)[18]//tr//td//a | (//tbody)[5]//tr//td//a";
        this.tysLOGO = "//*[@alt='Trust Your Supplier']//parent::div";
        this.langBtn = "//button[@id='menu-button-:ru:']";
        this.engLang = "(//p[text()='English (US)'])[1]";
        this.allLang = "//div[@id='menu-list-:ru:']//p//parent::button";
        this.selectedlang = "//button[@id='menu-button-:ru:']//p";
        this.countryLabel = "//label[@for='country']//span";
        this.countryinput = "//span[text()='Country/Region of Registration']//parent::label//parent::div//parent::div//following-sibling::button";
        this.spanText = "(//span[text()='";
        this.mandate = "']//parent::label//parent::div//span)[2]";
        this.spanTxt2 = "//span[text()='";
        this.endTxt = "']";
        this.inputId = "//input[@id='";
        this.pText = "//p[text()='";
        this.btnText = "//button[text()='";
        this.termsPopUp = "//div[@class='bx--tnc-con']";
        this.checkBox = "//label[@type='checkbox']//span";
        this.textAreaId = "//textarea[@id='";
        this.textBtn = "(//button[text()='";
        this.btnEnd = "'])[1]";
        this.TYSENG = "(//p[text()='English (US)'])[3]";
        this.endTooltip = "']/parent::label/parent::div/*";
        this.tootltip = "(//span[text()='Country/Region of Registration']/parent::label/parent::div/*)[3]";
        this.flag = "//div[contains(@title,'";
        this.flagEnd = "')]";
        this.btnDisable = "//button[@class='chakra-button css-afbtqh']";
        this.optInput = "//input[@type='tel']";
        this.refreshBtn = "//span[text()='Refresh']";
        this.selectState = "//div[@class=' css-1wy0on6']";
        this.selectClass = "']//parent::div//following-sibling::p[text()='";
        this.otpMail = "(//div[@class='truncate'])";
        this.h2Text = "//h2[text()='";
        this.mandateEnd = "']//span";
        this.inputChkBox = "//input[@type='";
        this.parentlabel = "']//parent::label";
        this.selectAllChkBx = "((//p[text()='Select All']//parent::div//parent::div//parent::div)[5]//*)[8]";
        this.btnEndTwo = "'])[2]";
        this.refreshMailbox = "//span[contains(text(),'Refresh Mailbox')]";
        this.pTextSecond = "(//p[text()='";
    }

    async clickOnRegisterTYSFrommaildrop() {

        await this.page.goto("https://maildrop.cc/inbox/?mailbox");
        console.log("Opened maildrop...");
        await this.page.waitForTimeout(10000);
        for (let i = 0; i < 10; i++) {
            await this.page.getByPlaceholder(this.inputmailBox).clear();
            await this.page.getByPlaceholder(this.inputmailBox).type(inviteSupplierPage.email);
            await this.page.waitForTimeout(1000);
            await this.page.locator(this.viewmailboxBtn).click();
            await this.page.waitForTimeout(10000);
            console.log("Searching for - " + i + " time");
            if (await this.page.locator(this.refreshMailbox).count() == 1) {
                await this.page.locator(this.refreshMailbox).click();
                console.log("Clicked on Refresh Mailbox");
                if (await this.page.locator(this.inviteEmail).count() != 0) {
                    await this.page.locator(this.inviteEmail).click();
                    console.log("Clicked on invite email..");
                    break;
                }
            }
            else{
                await this.page.locator(this.inviteEmail).click();
                console.log("Clicked on invite email..");
                break;
            }

        }
        //await this.page.locator(this.inviteEmail).click();

        //switch to new window
        const locator = this.page.locator('//iframe');
        const frameLocator = locator.contentFrame();
        [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            await frameLocator.locator(this.registerTYS).click()

        ])

        console.log("Clicked on RegisterTYS....")
        await newPage.waitForLoadState();
        const newPageURL = await newPage.url();
        console.log("new page URL is : " + newPageURL);
        console.log("Switched to new window");
    }

    async verifyTYSLogoDisplayed() {
        await newPage.waitForLoadState();
        const newPageURL = await newPage.url();
        console.log("new page URL is : " + newPageURL);
        console.log("Switched to new window");
        await newPage.waitForTimeout(30000);
        await newPage.waitForSelector(this.tysLOGO);
        await expect.soft(newPage.locator(this.tysLOGO)).toBeVisible();
        console.log("Trust Your Supplier LOGO is displyed");

    }

    async fillCompanyInformation() {
        console.log("in the publish profile page");

        await this.fillSection('Company Information', async () => {
            console.log("in the fill section profile page");

            const companyInfoVisible = await newPage.locator(this.companyInfoSection).first().isVisible();
            console.log("after the publish profile page");

            if (companyInfoVisible) {
                const companyDescription = faker.company.catchPhrase();
                if (await newPage.locator(this.dateSelector).isVisible()) {
                    await this.selectDate('Choose Saturday, January 13th,');
                    await newPage.locator(this.selectMonthButton).click();
                    await newPage.locator(this.monthOption).click();
                }
                await newPage.locator(this.companyDescriptionInput).fill(faker.company.catchPhrase());
                console.log(`Company Description: ${companyDescription}`);
            } else {
                throw new Error("Company Information section is not visible");
            }
        });
    }
    async selectDate(dateLabel) {
    // Use newPage instead of this.page for all interactions in this function
    await newPage.locator(this.dateSelector).click();
    console.log(`Successfully selected date:`);

    await newPage.locator(this.dateYear).nth(1).selectOption('2024');  // Updated to use newPage
    await newPage.locator(this.dateMonth).selectOption('0');  // '0' here represents January
    console.log("Attempting to select date:", dateLabel);
    
    // Ensure the correct frame or page context is used
    const dateLabelElement = await newPage.getByLabel(dateLabel);  // Use newPage instead of this.page
    if (await dateLabelElement.count() > 0) {
        await dateLabelElement.click();
        console.log(`Successfully selected date: ${dateLabel}`);
    } else {
        console.error(`Date label '${dateLabel}' not found.`);
    }
}


    async fillSection(sectionName, fillFunction) {
    // Use the class properties for locators
    await newPage.waitForTimeout(9000);

    // Instead of using just the text locator, use .first() to avoid strict mode violation
    const companyInfoSectionLocator = newPage.locator(this.companyInfoSection).first();

    if (await companyInfoSectionLocator.isVisible()) {
        console.log(`Filling ${sectionName} section`);
        await fillFunction();
        console.log(`${sectionName} section filled`);
    } else {
        throw new Error(`${sectionName} section is not visible`);
    }
}

    
    // async fillSection(sectionName, fillFunction) {
    //     // Use the class properties for locators
    //     await newPage.waitForTimeout(9000);
    //     const companyInfoSectionLocator = newPage.locator(this.companyInfoSection).first();

    //     if (await newPage.locator(this.companyInfoSectionLocator).isVisible()) {
    //         console.log(`Filling ${sectionName} section`);
    //         await fillFunction();
    //         console.log(`${sectionName} section filled`);
    //     } else {
    //         throw new Error(`${sectionName} section is not visible`);
    //     }
    // }

    async verifyLanguageIsSelected() {
        await newPage.waitForLoadState();
        const newPageURL = await newPage.url();
        console.log("new page URL is : " + newPageURL);
        console.log("Switched to new window");
        await newPage.waitForSelector(this.engLang);
        await expect.soft(newPage.locator(this.engLang)).toBeVisible();
        console.log("Language Selector Present on new supplier login");

    }
    async verifyAllLanguages() {
        const ExpLang = [
            'English (US)',
            'French Canadian',
            'French',
            'German',
            'Brazilian Portuguese',
            'Arabic',
            'Italian',
            'Spanish',
            'Simplified Chinese'
        ]
        await newPage.waitForLoadState();
        const newPageURL = await newPage.url();
        console.log("new page URL is : " + newPageURL);
        console.log("Switched to new window");
        await newPage.waitForTimeout(30000);
        await newPage.waitForSelector(this.langBtn);
        await newPage.locator(this.langBtn).click();
        const elements = await newPage.locator(this.allLang).all();
        //console.log("All languages are: " + elements.allInnerText());
        for (const element of elements) {
            const i = 0;
            await element.click();
            const actualText = element.innerText();
            console.log("Actual language is: " + actualText);
            await expect.soft(actualText).toBe(ExpLang[i]);
            console.log("Expected language is: " + ExpLang[i]);
            i++;

            console.log("Selected language is: " + actualText);
        }

    }
    async verifyField(fieldName) {
        await newPage.waitForSelector(this.spanTxt2 + fieldName + this.endTxt, { timeout: 30000 });
        await expect.soft(newPage.locator(this.spanTxt2 + fieldName + this.endTxt)).toHaveText(fieldName);
        console.log("Field - " + await newPage.locator(this.spanTxt2 + fieldName + this.endTxt).innerText() + " is visible on Company Details");
    }
    async verifyCountryFieldDisabled() {
        await expect.soft(newPage.locator(this.countryinput)).toBeDisabled();
        console.log("Country field - " + await newPage.locator(this.countryLabel).innerText() + " is disabled on Company details");
    }
    async verifyFieldMandatory(fieldName) {
        await newPage.waitForSelector(this.spanText + fieldName + this.mandate, { timeout: 10000 });
        await expect.soft(newPage.locator(this.spanText + fieldName + this.mandate)).toBeVisible();
        console.log("Field - " + await newPage.locator(this.spanTxt2 + fieldName + this.endTxt).innerText() + " is mandatory on Company details");
    }
    async verifyFieldEditable(fieldName) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 30000 });
        await expect.soft(newPage.locator(this.inputId + fieldName + this.endTxt)).toBeEditable();

        console.log("Field - " + fieldName + " is editable on Company details");
    }
    async verifyPTextField(fieldName) {
        await newPage.waitForSelector(this.pText + fieldName + this.endTxt, { timeout: 30000 });
        const element = newPage.locator(this.pText + fieldName + this.endTxt).first();
        await expect.soft(element).toBeVisible();
        console.log("Field - " + fieldName + " is visible on Company Details");
    }

    async verifyPTextFieldOnTYS(fieldName) {


        await expect.soft(newPage.locator(this.TYSENG)).toHaveText(fieldName);

        await newPage.waitForSelector(this.TYSENG, { timeout: 10000 });
        await expect.soft(newPage.locator(this.TYSENG)).toHaveText(fieldName);

        console.log("Field - " + fieldName + " is visible on TYS Details");
    }
    async verifyInputFieldWith(fieldName, inputVal) {

        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 50000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        await expect.soft(newPage.locator('text="Invalid format"')).toBeHidden();
        await element.inputValue(inputVal);
        console.log("Entered input data - " + inputVal + " into " + fieldName);

    }
    async verifyFieldMandate(fieldName) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 10000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.type('test');
        await element.clear();
        const mandateText = newPage.locator('text="This field is required"').first();
        await expect.soft(mandateText).toBeVisible();
        console.log(fieldName + " - is mandatory field ");
    }

    async verifyInvalidWebsiteURL(fieldName, urlValue) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 10000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(urlValue);

        await expect.soft(newPage.locator('text="Invalid website URL"')).toBeVisible();
        console.log(fieldName + " - is giving an error - Invalid website URL when " + urlValue + " is entered");
    }

    async verifyValidWebsiteURL(fieldName, urlValue) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 10000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(urlValue);

        await expect.soft(newPage.locator('text="Invalid website URL"')).toBeHidden();
        console.log(fieldName + " - is not giving an error for valid URL " + urlValue);
    }

    async verifyTYSTerms(fieldName) {
        await newPage.waitForSelector(this.spanTxt2 + fieldName + this.endTxt, { timeout: 10000 });
        await newPage.locator(this.spanTxt2 + fieldName + this.endTxt).click();
        const terms = await newPage.locator(this.termsPopUp).innerText();
        console.log("Terms and conditions are:-  " + terms);
    }

    async verifyButtonVisible(fieldName) {


        await expect.soft(newPage.locator(this.btnText + fieldName + this.endTxt)).toBeVisible();

        await newPage.waitForSelector(this.btnText + fieldName + this.endTxt, { timeout: 10000 });
        await expect.soft(newPage.locator(this.btnText + fieldName + this.endTxt)).toBeVisible();


        console.log(fieldName + " - button is visible");
    }

    async clickOnButton(fieldName) {
        const btn = await newPage.getByRole('button', { name: fieldName }).first();
        btn.click();
        console.log("Clicked on - " + fieldName);
    }

    async enterInputFieldWith(fieldName, inputVal) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 50000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        console.log("Entered input data - " + inputVal + " into " + fieldName);

    }

    async enterTextAreaInputField(fieldName, inputVal) {
        await newPage.waitForSelector(this.textAreaId + fieldName + this.endTxt, { timeout: 30000 });
        const element = newPage.locator(this.textAreaId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        console.log("Entered input data - " + inputVal + " into " + fieldName);

    }

    async clickOnCheckBox() {
        await newPage.waitForSelector(this.checkBox, { timeout: 30000 });
        await newPage.locator(this.checkBox).click();

        console.log("Clicked on Check box ");
    }

    async clickOnSecondButtonOf(fieldName) {
        await newPage.waitForSelector(this.textBtn + fieldName + this.btnEnd, { timeout: 30000 });
        await newPage.locator(this.textBtn + fieldName + this.btnEnd).click();

        console.log("Clicked on - " + fieldName);
    }
    async verifyInputFieldWithSpecial(fieldName, inputVal) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 30000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        const enteredValue = await element.inputValue();
        await expect.soft(enteredValue).not.toContain(inputVal);
        console.log("This field did not allow - " + inputVal + " as " + fieldName);

    }

    async verifyInputFieldPrePopulated(fieldName, inputVal) {
        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 30000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        const prePopulateValue = await element.inputValue();
        await expect.soft(prePopulateValue).toContain(inputVal.toLowerCase());
        console.log("This field is pre populated with value - " + inputVal + " as " + fieldName);

    }

    async verifyTooltipFor(fieldName, expectedTooltip) {

        //const element = await newPage.locator(this.spanTxt2 + fieldName + this.endTooltip).nth(2);
        //const element = await newPage.locator("(//*[name()='svg'][@class='chakra-icon css-15y48ks'])[1]").textContent()
        //element.hover();
        //const actualTooltip = element.getAttribute('aria-describedby').textContent();
        let actualTooltip = await newPage.locator("(//*[name()='svg'][@class='chakra-icon css-15y48ks'])[1]").textContent();
        console.log("Actual tootltip : " + actualTooltip);
        expect.soft(expectedTooltip).toContain(actualTooltip);
        console.log(fieldName + " is showing tooltip as - " + actualTooltip);
    }

    async verifyFlagFor(fieldName) {

        const element = await newPage.waitForSelector(this.flag + fieldName + this.flagEnd, { timeout: 30000 });

        expect.soft(element).toBeVisible();
        console.log(fieldName + " is showing under phone number");
    }

    async verifyPhoneNumberWith(fieldName, inputVal, expecValue) {

        const element = await newPage.getByPlaceholder(fieldName);
        element.type(inputVal);
        const enteredValue = await element.inputValue();
        console.log(fieldName + " is showing under phone number as country specific - " + expecValue);
    }

    async verifyFieldWithlabel(fieldName) {
        await expect.soft(newPage.getByText(fieldName)).toBeVisible();
        console.log("Field - " + fieldName + " is visible on Your Details");
    }

    async verifyPasswordFieldWith(fieldName, inputVal) {

        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.clear();
        await element.type(inputVal);
        await expect.soft(newPage.locator('text="Password must be at least 8 characters"')).toBeVisible();
        await element.inputValue(inputVal);
        console.log("Showing message - Password must be at least 8 characters when enters" + inputVal + " into " + fieldName);

    }

    async verifyPasswordFieldWithInvalidMatch(fieldName, inputVal) {

        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        await expect.soft(newPage.locator('text="Password must be between 8 and 15 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit"')).toBeVisible();
        await expect.soft(newPage.locator(this.btnDisable)).toHaveCount(0);
        console.log("Password field did not take - " + inputVal + " as valid password");
        console.log("Showing message - Password must be between 8 and 15 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit - when enters" + inputVal + " into " + fieldName);

    }

    async verifySignUpFieldEnable() {
        await newPage.waitForSelector(this.btnDisable, { timeout: 10000 });
        await expect.soft(newPage.locator(this.btnDisable)).toHaveCount(1);
        console.log("Button is enabled ");

    }

    async copyPasteOTP() {

        console.log("Switched to maildrop...")
        await this.page.waitForTimeout(10000);
        //await this.page.bringToFront();
        await this.page.waitForSelector(this.refreshBtn);
        await this.page.locator(this.refreshBtn).click();
        //await this.page.locator(this.viewmailboxBtn).click();
        await this.page.waitForTimeout(10000);
        await expect.soft(this.page.locator(this.inviteEmail)).toBeVisible();
        await this.page.locator(this.inviteEmail).click();
        //switch to new window
        const locator = this.page.locator('//iframe');
        const frameLocator = locator.contentFrame();
        let VCode = await frameLocator.locator('//h3').textContent();
        console.log(VCode);
        let lOtp = VCode.substr(21, 27);
        console.log("OTP From Maildrop email - " + lOtp);
        let opt1 = lOtp.charAt(0);
        let opt2 = lOtp.charAt(1);
        let opt3 = lOtp.charAt(2);
        let opt4 = lOtp.charAt(3);
        let opt5 = lOtp.charAt(4);
        let opt6 = lOtp.charAt(5);
        await newPage.waitForLoadState();
        await newPage.locator(this.optInput).nth(0).type(opt1);
        await newPage.locator(this.optInput).nth(1).type(opt2);
        await newPage.locator(this.optInput).nth(2).type(opt3);
        await newPage.locator(this.optInput).nth(3).type(opt4);
        await newPage.locator(this.optInput).nth(4).type(opt5);
        await newPage.locator(this.optInput).nth(5).type(opt6);
        console.log("Entered OTP - " + lOtp);
    }
    async clickOnStateDropdown() {

        await newPage.locator(this.selectState).click();
        console.log("Clicked on State dropdown ");

    }
    async clickOnText(value) {

        const element = await newPage.locator(`text=${value}`);
        await element.waitFor({ state: 'visible' });
        await element.click();
        console.log("Clicked on - " + value);

    }

    async ClickOnSelectFor(textValue, value) {

        const element = await newPage.locator(this.pText + textValue + this.selectClass + value + this.endTxt);
        await element.waitFor({ state: 'visible' });
        await element.click();
        console.log("Clicked on - " + value);

    }

    async verifyInputValuePrifill(fieldName, inputVal) {

        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt);
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await expect.soft(element.getAttribute('value')).toContain(inputVal);
        console.log(inputVal + " - Pre filled - " + " into " + fieldName);

    }

    async VerifyVerificationCodeBlocks() {
        await newPage.waitForLoadState();
        await expect.soft(newPage.locator(this.optInput).nth(0)).toBeVisible();
        await expect.soft(newPage.locator(this.optInput).nth(1)).toBeVisible();
        await expect.soft(newPage.locator(this.optInput).nth(2)).toBeVisible();
        await expect.soft(newPage.locator(this.optInput).nth(3)).toBeVisible();
        await expect.soft(newPage.locator(this.optInput).nth(4)).toBeVisible();
        await expect.soft(newPage.locator(this.optInput).nth(5)).toBeVisible();
        console.log("Verification code blocks are visible on the page");
    }
    
    async enterInvalidOTP() {
        await newPage.waitForLoadState();
        await newPage.locator(this.optInput).nth(0).type('1');
        await newPage.locator(this.optInput).nth(1).type('2');
        await newPage.locator(this.optInput).nth(2).type('2');
        await newPage.locator(this.optInput).nth(3).type('4');
        await newPage.locator(this.optInput).nth(4).type('5');
        await newPage.locator(this.optInput).nth(5).type('6');
        console.log("Entered Invalid OTP");
    }
    async clickOnSpanButton(fieldName) {
        await newPage.waitForSelector(this.spanTxt2 + fieldName + this.endTxt, { timeout: 30000 });
        await newPage.locator(this.spanTxt2 + fieldName + this.endTxt).click();
        console.log("Clicked on - " + fieldName + " Button");
    }

    async verifyResendOTP() {

        console.log("Switched to maildrop...")
        await this.page.waitForTimeout(10000);
        //await this.page.bringToFront();
        await this.page.waitForSelector(this.refreshBtn);
        await this.page.locator(this.refreshBtn).click();
        await this.page.waitForTimeout(10000);
        await expect.soft(this.page.locator(this.otpMail)).toHaveCount(3);
        console.log("Email received resend OTP ");
        await this.page.locator(this.inviteEmail).click();
        //switch to new window
        const locator = this.page.locator('//iframe');
        const frameLocator = locator.contentFrame();
        let VCode = await frameLocator.locator('//h3').textContent();
        console.log(VCode);
        let lOtp = VCode.substr(21, 27);
        console.log("Resend OTP From Maildrop email - " + lOtp);
        let opt1 = lOtp.charAt(0);
        let opt2 = lOtp.charAt(1);
        let opt3 = lOtp.charAt(2);
        let opt4 = lOtp.charAt(3);
        let opt5 = lOtp.charAt(4);
        let opt6 = lOtp.charAt(5);
        await newPage.waitForLoadState();
        await newPage.locator(this.optInput).nth(0).type(opt1);
        await newPage.locator(this.optInput).nth(1).type(opt2);
        await newPage.locator(this.optInput).nth(2).type(opt3);
        await newPage.locator(this.optInput).nth(3).type(opt4);
        await newPage.locator(this.optInput).nth(4).type(opt5);
        await newPage.locator(this.optInput).nth(5).type(opt6);
        console.log("Entered Resend OTP - " + lOtp);
    }
    async verifyPageHeader(fieldName) {
        await newPage.waitForSelector(this.h2Text + fieldName + this.endTxt, { timeout: 50000 });
        await expect.soft(newPage.locator(this.h2Text + fieldName + this.endTxt)).toBeVisible();
        console.log(fieldName + " is visible");
    }

    async verifyInputFieldWithInvalidData(fieldName, inputVal) {

        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt, { timeout: 30000 });
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        await expect.soft(newPage.locator('text="Invalid format"')).toBeVisible();
        await element.inputValue(inputVal);
        console.log("Showing input data - " + inputVal + " as Invalid format");

    }

    async verifyPFieldMandatory(fieldName) {

        await newPage.waitForSelector(this.pText + fieldName + this.mandateEnd, { timeout: 30000 });
        const element = newPage.locator(this.pText + fieldName + this.mandateEnd);
        await expect.soft(element).toBeVisible();
        console.log("Showing - " + fieldName + " is Mandatory");

    }

    async clickOnInputCheckbox(fieldName) {

        await newPage.waitForSelector(this.inputChkBox + fieldName + this.parentlabel, { timeout: 30000 });
        const element = newPage.locator(this.inputChkBox + fieldName + this.parentlabel);
        await element.nth(0).click();
        console.log("Clicked on - " + fieldName);

    }

    async clickOnSelectAllCheckbox() {
        await newPage.waitForSelector(this.selectAllChkBx, { timeout: 10000 });
        await newPage.locator(this.selectAllChkBx).click();
        console.log("Clicked on Select All");

    }

    async verifySpanTextLabel(fieldName) {

        await expect.soft(newPage.locator(this.spanTxt2 + fieldName + this.endTxt)).toBeVisible();
        console.log(fieldName + " - Field is visible on the page");

    }

    async verifyInvalidEmail(fieldName, inputVal) {

        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt);
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        await expect.soft(newPage.locator('text="Invalid email address"')).toBeVisible();
        console.log("Showing error message - " + inputVal + " for invalid email " + fieldName);

    }

    async verifyEmailMissmatch(fieldName, inputVal) {

        await newPage.waitForSelector(this.inputId + fieldName + this.endTxt);
        const element = newPage.locator(this.inputId + fieldName + this.endTxt);
        await element.clear();
        await element.type(inputVal);
        await expect.soft(newPage.locator('text="Email addresses do not match."')).toBeVisible();
        console.log("Showing error message - " + inputVal + " for mismatch email " + fieldName);

    }

    async ClickOnPtext(textValue, value) {

        const element = await newPage.locator(this.pText + textValue + this.endTxt);
        await element.waitFor({ state: 'visible' });
        await element.click();
        console.log("Clicked on - " + value);

    }

    async clickOnSecondButton(fieldName) {
        await newPage.waitForSelector(this.textBtn + fieldName + this.btnEndTwo, { timeout: 10000 });
        await newPage.locator(this.textBtn + fieldName + this.btnEndTwo).click();

        console.log("Clicked on - " + fieldName);
    }
    async waitUntilRegister(text) {

        await expect.soft(newPage.locator(this.pText+text+this.endTxt)).toBeDisabled(); 
        console.log("Waited until - " + text+ "is completed");

    }

    async clickOnOnlyFirstButton(fieldName) {
        const btn = await newPage.getByRole('button', { name: fieldName });
        btn.click();
        console.log("Clicked on - " + fieldName);
    }
    async verifySecondPTextField(fieldName) {
        await newPage.waitForSelector(this.pTextSecond + fieldName + this.btnEndTwo, { timeout: 10000 });
        const element = newPage.locator(this.pTextSecond + fieldName + this.btnEndTwo);
        await expect.soft(element).toBeVisible();
        console.log("Field - " + fieldName + " is visible on Company Details");
    }

}

