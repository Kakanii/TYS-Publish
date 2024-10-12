import { faker } from "@faker-js/faker";
const path = require('path');
import { Base } from "../utility/Base";

export class companyProfilePage extends Base {
    constructor(page, expect) {
        super();
        this.page = page;
        this.expect = expect;

        // Locators as constants
        this.locators = {
            // Locators for login
            emailaddress_input: page.locator("//input[@placeholder='Enter Email Address']"),
            password_input: page.locator("//input[@placeholder='Enter Your Password']"),
            sign_in_button: page.locator("//button[@type='submit']"),

            // Locators for company profile sections
            companyInfoSection: page.locator("//p[text()='Company Information']").first(),
            dateSelector: page.locator("//input[@placeholder='Select Date']"),
            dateToSelect: page.getByLabel('Choose Tuesday, October 1st,'),
            selectMonthButton: page.locator("//button[contains(.,'Select Month')]"),
            monthOption: page.getByRole('menuitemradio', { name: 'January' }),
            companyDescriptionInput: page.getByPlaceholder('Write few words about the'),

            // Locators for Contact Details profile sections
            contactDetailsSection: page.locator("//p[text()='Contact Details']").first(),
            phoneNumberInput: page.getByPlaceholder('Enter Phone Number'),
            companyEmailInput: page.getByPlaceholder('Enter Company Email Address'),
            companyUrlInput: page.getByPlaceholder('https://'),

            // Locators for Contact Details profile sections
            taxDetailsSection: page.locator("//p[text()='Tax Details']").first(),
            businessTypeButton: page.locator("(//button[@id='menu-button-:rcb:']//span)[2]"),
            taxRegistrationDocument: page.locator("(//p[text()='Tax Registration Document'])[1]"),
            upload: page.locator("//button[normalize-space(text())='Upload']"),
            einInput: page.locator("(//label[contains(.,'Employer Identification Number (EIN)')]/following::input)[1]"),
            browse: page.locator("(//div[contains(@class, 'css-k008qs')]//span[text()='Browse'])[2]"),

            additionalInformation: page.locator("//p[text()='Additional Information']").first(),
            stockExchange: page.locator("(//input[@name='additionalInfo.isTradedOnStockExchange']/following-sibling::span)[3]"),
            fullTimeEmployeesInput: page.locator("(//label[contains(.,'Number of Full Time Employees')]/following::input)[1]"),
            temporaryEmployeesInput: page.locator("//span[text()='Number of Temporary and Contracted Employees']/following::input"),

            saveAndContinue: page.locator("//button[text()='Save and Continue']"),

            managementSection: page.locator("//p[text()='Your Executives and Management team']"),
            assignContact: this.page.getByRole('button', { name: 'Assign Contact' }),
            assignContactManagement: page.getByText('Assign Contact to Management'),
            existingContact: page.locator('label').filter({ hasText: 'Choose an Existing Contact' }),
            selectExistingContact: page.getByRole('button', { name: 'Choose an Existing Contact' }),

            firstName: page.getByPlaceholder('Enter First Name'),
            lastName: page.getByPlaceholder('Enter Last Name'),
            jobTitle: page.getByPlaceholder('Enter Job Title'),
            emailAddress: page.getByLabel('Email Address', { exact: true }),
            country: page.locator("//button[contains(.,'Select From Existing locations')]"),

            indexvalueZero: page.locator("(//button[@data-index='0']//span)[2]"),
            addContact: page.getByRole('button', { name: 'Add Contact' }),

            // Questionnaire
            assignQuestionnaire: page.locator("//p[text()='Assigned Questionnaires by the Buyers to be visible and be compliant']").first(),
            notStarted: page.locator("//span[text()='Not Started']"),
            inProgress: page.locator("//span[text()='In Progress']"),
            readyToPublish: page.locator("//span[text()='Ready to Publish']"),
            published: page.locator("//span[text()='Published']"),

            beginQuestionnaire: page.locator("//p[text()='Begin Questionnaire']"),
            continueQuestionnaire: page.locator("//p[text()='Continue Questionnaire']"),
            updateQuestionnaire: page.locator("//p[text()='Update Questionnaire']"),

            // Save as Draft button locator
            saveAsDraftButton: page.locator("//button[text()='Save as Draft']/following-sibling::button"),
            // Publish Questionnaire section locator
            publishQuestionnaireSection: page.locator("//p[text()='Publish Questionnaire']"),
            saveAndContinueButton: page.locator("//button[text()='Save & Continue']"),
            // Menu button locator
            menuButton: page.locator("(//button[@class='chakra-menu__menu-button css-y1y2s'])[1]"),

            publishButton: page.locator("(//button[text()='Publish'])[2]"),

            management: page.locator("//p[text()='Management']").first(),

        }

    }

    async login(email, password) {
        await this.page.goto('https://qa2.recnyls.com/');
        await this.locators.emailaddress_input.fill(email);
        await this.locators.password_input.fill(password);
        await this.locators.sign_in_button.click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillCompanyInformation() {
        await this.fillSection('Company Information', async () => {
            await this.locators.companyInfoSection.scrollIntoViewIfNeeded();
            const companyDescription = faker.company.catchPhrase();
            if (await this.locators.dateSelector.isVisible()) {
                await this.selectDate('Choose Saturday, January 13th,');
                await this.page.locator("(//button[contains(@class,'chakra-button chakra-menu__menu-button')])[2]").click();
                //await this.locators.selectMonthButton.click();
                await this.locators.monthOption.click();
            }
            await this.locators.companyDescriptionInput.fill(faker.company.catchPhrase());
            console.log(`Company Description: ${companyDescription}`);

        });
    }

    async selectDate(dateLabel) {
        await this.page.getByPlaceholder('Select Date').click();
        await this.page.getByRole('combobox').nth(1).selectOption('2024');
        await this.page.locator("//div[contains(@class, 'react-datepicker__month-dropdown-container')]//select[contains(@class, 'react-datepicker__month-select')]").selectOption('0');
        console.log("Attempting to select date:", dateLabel);
        const dateLabelElement = await this.page.getByLabel(dateLabel);
        if (await dateLabelElement.count() > 0) {
            await dateLabelElement.click(); 
        } else {
            console.error(`Date label '${dateLabel}' not found.`);
        }
    }

    async fillContactDetails() {
        await this.fillSection('Contact Details', async () => {
            await this.locators.contactDetailsSection.scrollIntoViewIfNeeded();
            const phoneNumber = faker.phone.number('##########');
            const companyEmail = faker.internet.email();
            const companyUrl = "https://qa2.recnyls.com/";

            console.log(`Filled Contact Details - Phone Number: ${phoneNumber}, Company Email: ${companyEmail}, Company URL: ${companyUrl}`);
            await this.page.waitForTimeout(3000);
            await this.locators.phoneNumberInput.fill(phoneNumber);
            await this.locators.companyEmailInput.fill(companyEmail);
            await this.locators.companyUrlInput.fill(companyUrl);
        });
    }

    async fillTaxDetails() {
        await this.fillSection('Tax Details', async () => {
            await this.locators.taxDetailsSection.scrollIntoViewIfNeeded();
            if (await this.locators.businessTypeButton.isVisible()) {
                await this.locators.businessTypeButton.click();
                await this.page.getByRole('menuitemradio', { name: 'Corporation' }).click();
                console.log(`Business Type: Corporation`);
            }
        });
    }

    async fillTaxRegistrationDocument() {
        // Check if the tax registration document section is visible
        if (!await this.locators.taxRegistrationDocument.isVisible()) {
            console.log("Tax Registration Document is not visible");
            return; // Exit if not visible
        }
        // Check if the upload button is visible
        if (await this.locators.upload.isVisible()) {
            await this.locators.upload.click();
            // Fill EIN input with a random number
            await this.locators.einInput.fill(faker.number.int({ min: 100000000, max: 999999999 }).toString());
            // Set the input file for upload
            const filePath = path.join(__dirname, '../uploads/pngtree.jpg');
            console.log('__dirname:', __dirname);
            console.log('filePath:', filePath);
            await this.locators.browse.setInputFiles(filePath);
            // Click the Upload button
            await this.page.locator("//button[normalize-space(text())='Upload']").click();
            await this.page.waitForTimeout(3000);
        } else {
            console.log("Upload button is not visible");
        }
    }

    async fillEmployeeDetails() {
        await this.fillSection('Additional Information', async () => {
            await this.locators.additionalInformation.scrollIntoViewIfNeeded();
            if (!await this.locators.stockExchange.isVisible()) {
                await this.locators.stockExchange.click();
                await this.locators.fullTimeEmployeesInput.fill("2");
                await this.locators.temporaryEmployeesInput.fill("2");
            }

        });
    }

    async saveAndContinue() {
        this.page.waitForTimeout(3000);
        if (await this.locators.saveAndContinue.isVisible()) {
            await this.locators.saveAndContinue.click();
            console.log("Saved and continued to the next section.");
        } else {
            console.log("Save and Continue button is not visible");
        }
        await this.page.waitForTimeout(3000);
    }

    async checkNotification(expectedMessage) {
        console.log('Notification paragraph is visible.');
    }

    async fillSection(sectionName, fillFunction) {
        // Ensure the section is visible before executing fillFunction
        if (await this.locators.companyInfoSection.isVisible()) {
            console.log(`Filling ${sectionName} section`);
            await fillFunction();
            console.log(`${sectionName} section filled`);
            await this.page.waitForTimeout(3000);
        } else {
            throw new Error(`Error locating section '${sectionName}': Section is not visible.`);
        }
    }

    async fillManagement() {
        try {
            if (!this.locators.managementSection) {
                console.error("Management section locator is not initialized.");
                return;
            }

            if (await this.locators.managementSection.isVisible()) {
                const positions = [
                    { title: 'Chief Executive Officer', name: 'Choose an Existing Contact', status: 'ceo details saved successfully' },
                    { title: 'Chief Financial Officer', firstName: faker.person.firstName(), lastName: faker.person.lastName(), jobTitle: 'CFO', phone: faker.phone.number('##########'), email: faker.internet.email(), status: 'cfo details saved successfully' },
                    { title: 'Director of Sales', firstName: faker.person.firstName(), lastName: faker.person.lastName(), jobTitle: 'DFO', phone: faker.phone.number('##########'), email: faker.internet.email(), status: 'dos details saved successfully' }
                ];
                await this.locators.managementSection.scrollIntoViewIfNeeded();
                for (const pos of positions) {
                    if (await this.page.getByText(`Add ${pos.title}`).isVisible()) {
                        await this.locators.assignContact.first().click();
                        await this.expect(this.locators.assignContactManagement).toBeVisible();

                        if (pos.name) {
                            await this.locators.existingContact.locator('span').first().click();
                            await this.locators.selectExistingContact.click();
                            console.log(`Added Contact: ${pos.title}`);
                        } else {
                            console.log(`Filled Contact Details - First Name: ${pos.firstName}, Last Name: ${pos.lastName}, Job Title: ${pos.jobTitle}, Phone: ${pos.phone}, Email: ${pos.email}`);
                            await this.locators.firstName.fill(pos.firstName);
                            await this.locators.lastName.fill(pos.lastName);
                            await this.locators.jobTitle.fill(pos.jobTitle);
                            await this.page.waitForTimeout(5000);
                            await this.locators.phoneNumberInput.first().fill(pos.phone);
                            await this.locators.emailAddress.fill(pos.email);
                            await this.locators.country.click();
                        }
                        await this.locators.indexvalueZero.click();
                        await this.locators.addContact.click();
                        await this.page.waitForTimeout(3000);
                        await this.checkNotification(pos.status);
                        await this.page.waitForTimeout(5000);
                    }
                }
                await this.saveAndContinue();
            }
        } catch (error) {
            console.error("Error in fillManagement:", error);
        }
    }

    async navigateToQuestionnaires() {
        console.log("Assigned Questionnaires by the Buyers to be visible and be compliant");
        await this.page.waitForTimeout(5000);
        // const assignVisible = await this.locators.assignQuestionnaire.isVisible();
        // console.log(`Assigned Questionnaire visibility: ${assignVisible}`);

        if (await this.locators.notStarted.isVisible()) {
            console.log("Not Started Questionnaire is visible");
            await this.handleNotStarted();
        }

        if (await this.locators.inProgress.isVisible()) {
            console.log("In Progress Questionnaire is visible");
            await this.handleInProgress();
        }
        if (await this.locators.readyToPublish.isVisible()) {
            console.log("Ready to Publish Questionnaire is visible");
            await this.handleReadyToPublish();
        }
        if (await this.locators.published.isVisible()) {
            console.log("Ready to Publish Questionnaire is visible");
        }
    }

    async handleNotStarted() {
        await this.page.locator("div.css-1snmjsk button.css-y1y2s > span.css-xl71ch > svg").click();
        const beginVisible = await this.locators.beginQuestionnaire.isVisible();
        console.log(`Begin Questionnaire visibility: ${beginVisible}`);

        if (beginVisible) {
            await this.locators.beginQuestionnaire.click();
            await this.fillQuestionnaire();
            await this.saveQuestionnaire();
        }
    }

    async handleInProgress() {
        await this.page.locator("div.css-1snmjsk button.css-y1y2s > span.css-xl71ch > svg").click();
        const continueVisible = await this.locators.continueQuestionnaire.isVisible();
        console.log(`Continue Questionnaire visibility: ${continueVisible}`);

        if (continueVisible) {
            await this.locators.continueQuestionnaire.click();
            await this.fillQuestionnaire();
            await this.saveQuestionnaire();
        }
    }

    async handleReadyToPublish() {
        await this.page.locator("div.css-1snmjsk button.css-y1y2s > span.css-xl71ch > svg").click();
        const updateVisible = await this.locators.updateQuestionnaire.isVisible();
        console.log(`Update Questionnaire visibility: ${updateVisible}`);

        if (updateVisible) {
            await this.locators.updateQuestionnaire.click();
            await this.fillQuestionnaire();
            await this.publishQuestionnaire();
        }
    }

    async fillQuestionnaire() {
        const radioControls = [
            "(//input[@type='radio']/following-sibling::span)[1]",
            "(//input[@type='radio']/following-sibling::span)[5]",
            "(//input[@type='radio']/following-sibling::span)[9]",
            "(//input[@type='radio']/following-sibling::span)[13]",
            "(//input[@type='radio']/following-sibling::span)[17]",
            "(//input[@type='radio']/following-sibling::span)[21]",
            "(//input[@type='radio']/following-sibling::span)[25]",
        ];

        for (const control of radioControls) {
            await this.page.locator(control).click();
        }

        if (await this.locators.saveAsDraftButton.isVisible()) {
            console.log('Save and Continue button is visible.');
            await this.locators.saveAsDraftButton.click();
        } else {
            console.log('Save and Continue button is not visible. Cannot save.');
        }
    }

    async saveQuestionnaire() {
        const publishVisible = await this.locators.publishQuestionnaireSection.isVisible();
        console.log(`Publish Questionnaire visibility: ${publishVisible}`);

        if (publishVisible) {
            await this.locators.saveAndContinueButton.click();
            await this.page.waitForTimeout(5000);
        }

    }

    async publishQuestionnaire() {
        const publishVisible = await this.locators.publishQuestionnaireSection.isVisible();
        console.log(`Publish Questionnaire visibility: ${publishVisible}`);

        if (publishVisible) {
            await this.locators.publishButton.click();
            await this.page.waitForTimeout(10000);
        }
    }

    async fillCompanyProfile() {
        await this.fillCompanyInformation();
        await this.fillContactDetails();
        await this.fillTaxDetails();
        await this.fillTaxRegistrationDocument()
        await this.fillEmployeeDetails();
        await this.saveAndContinue();
        await this.checkNotification('Company profile has been saved successfully');
    }

    async fillProductsServices() {
        console.log("UNSPSC Codes section is Filled");
        await this.saveAndContinue();
    }

    async fillExternalIdentifiers() {
        console.log("Attempting to link your profile on partner ecosystems.");

        if (await this.page.locator("//div[h3[contains(@class, 'chakra-step__title')]/p[text()='External Identifiers'] and p[contains(@class, 'chakra-step__description')]/p[text()='Verification pending']]").isVisible()) {
            await this.page.waitForTimeout(5000);
            await this.locators.management.click();
        }
        if (await this.page.locator("//div[h3[contains(@class, 'chakra-step__title')]/p[text()='External Identifiers'] and p[contains(@class, 'chakra-step__description')]/p[text()='completed']]").isVisible()) {
            await this.saveAndContinue();
        }
        console.log("Successfully linked your profile.");
    }

    async checkCurrentUrl() {
        const expectedUrl = 'https://qa2.recnyls.com/dashboard/onboarding/external-identifiers';
        const currentUrl = this.page.url(); // Get the current URL

        if (currentUrl === expectedUrl) {
            console.log("You are on the correct page:", currentUrl);
        } else {
            console.warn("You are NOT on the correct page. Current URL:", currentUrl);
        }
    }


}

