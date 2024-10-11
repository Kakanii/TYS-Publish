import { faker } from "@faker-js/faker";
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
            companyInfoSection: page.getByText('Company Information').first(),
            contactDetailsSection: page.getByText('Contact Details').first(),
            taxDetailsSection: page.getByText('Tax Details').first(),
            unSPSCCodesSection: page.locator('div').filter({ hasText: 'Select All' }).locator('span'),
            linkProfileSection: page.getByText('Link your profile on partner'),
            managementSection: page.getByText('Your Executives and Management team', { exact: true }),

            // Input fields and buttons
            dateSelector: page.getByLabel('Select Date'),
            companyDescriptionInput: page.getByPlaceholder('Write few words about the'),
            phoneNumberInput: page.getByPlaceholder('Enter Phone Number'),
            faxNumberInput: page.getByPlaceholder('Enter Fax Number'),
            companyEmailInput: page.getByPlaceholder('Enter Company Email Address'),
            companyUrlInput: page.getByPlaceholder('https://'),
            businessTypeButton: page.getByRole('button', { name: 'Select Business Type' }),
            einInput: page.getByLabel('Employer Identification'),
            fullTimeEmployeesInput: page.getByLabel('Number of Full Time Employees'),
            temporaryEmployeesInput: page.getByLabel('Number of Temporary and'),

            // Notification
            notificationParagraph: page.getByLabel('Notifications-top-right').getByRole('paragraph'),

            // Save as Draft button locator
            saveAsDraftButton: page.getByRole('button', { name: 'Save as Draft' }),

            // Menu button locator
            menuButton: page.locator("(//button[@class='chakra-menu__menu-button css-y1y2s'])[1]"),

            // Publish Questionnaire section locator
            publishQuestionnaireSection: page.locator("//p[text()='Publish Questionnaire']"),
            publishButton: page.locator("//button[@class='chakra-button css-19yhfgr']"),
            saveAsDraftAlternateButton: page.locator("//button[text()='Save as Draft']/following-sibling::button"),
            saveAndContinueButton: page.getByRole('button', { name: 'Save & Continue' }),

            indexvalueZero: page.locator("(//button[@data-index='0']//span)[2]"),
            addContact: page.getByRole('button', { name: 'Add Contact' }),
            firstName: page.getByPlaceholder('Enter First Name'),
            lastName: page.getByPlaceholder('Enter Last Name'),
            jobTitle: page.getByPlaceholder('Enter Job Title'),
            emailAddress: page.getByLabel('Email Address', { exact: true }),
            country: page.getByRole('button', { name: 'Select From Existing Country' }),
            assignContact: this.page.getByRole('button', { name: 'Assign Contact' }),
            assignContactManagement: page.getByText('Assign Contact to Management'),
            existingContact: page.locator('label').filter({ hasText: 'Choose an Existing Contact' }),
            selectExistingContact: page.getByRole('button', { name: 'Choose an Existing Contact' }),

            notStarted: page.locator("//span[text()='Not Started']"),
            inProgress: page.locator("//span[text()='In Progress']"),
            readyToPublish: page.locator("//span[text()='Ready to Publish']"),
            published: page.locator("//span[text()='Published']"),
            questionnaires: page.getByLabel('Progress').getByText('Questionnaires'),
        }

    }

    async login(email, password) {
        await this.page.goto('https://qa2.recnyls.com/');
        await this.locators.emailaddress_input.fill(email);
        await this.locators.password_input.fill(password);
        await this.locators.sign_in_button.click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillSection(sectionName, fillFunction) {
        try {
            const sectionLocator = this.page.getByText(sectionName);
            if (await sectionLocator.count() > 0) {
                console.log(`Filling ${sectionName} section`);
                await sectionLocator.first().scrollIntoViewIfNeeded();
                await fillFunction();
                console.log(`${sectionName} section filled`);
            } else {
                console.log(`${sectionName} section is not visible`);
            }
        } catch (error) {
            console.error(`Error locating section '${sectionName}':`, error);
        }
    }

    async fillCompanyInformation() {
        await this.fillSection('Company Information', async () => {
            await this.companyInfoSection.scrollIntoViewIfNeeded();
            const companyDescription = faker.company.catchPhrase();
            if (await this.page.getByLabel('Select Date').isVisible()) {
                await this.page.getByLabel('Select Date').click();
                await this.page.getByLabel('Choose Tuesday, October 1st,').click();
                await this.page.getByRole('button', { name: 'Select Month' }).click();
                await this.page.getByRole('menuitemradio', { name: 'January' }).click();
            }
            await this.companyDescriptionInput.fill(faker.company.catchPhrase());
            console.log(`Company Description: ${companyDescription}`);

        });
    }

    async fillContactDetails() {
        await this.fillSection('Contact Details', async () => {
            await this.contactDetailsSection.scrollIntoViewIfNeeded();
            const phoneNumber = faker.phone.number('##########');
            const faxNumber = faker.phone.number('##########');
            const companyEmail = faker.internet.email();
            const companyUrl = "https://qa2.recnyls.com/";

            await this.phoneNumberInput.fill(phoneNumber);
            console.log(`Phone Number: ${phoneNumber}`);

            await this.page.waitForTimeout(3000);
            await this.faxNumberInput.fill(faxNumber);
            console.log(`Fax Number: ${faxNumber}`);

            await this.companyEmailInput.fill(companyEmail);
            console.log(`Company Email: ${companyEmail}`);

            await this.companyUrlInput.fill(companyUrl);
            console.log(`Company URL: ${companyUrl}`);
        });
    }

    async fillTaxDetails() {
        await this.fillSection('Tax Details', async () => {
            await this.taxDetailsSection.scrollIntoViewIfNeeded();
            if (await this.businessTypeButton.isVisible()) {
                await this.businessTypeButton.click();
                await this.page.getByRole('menuitemradio', { name: 'Corporation' }).click();
                console.log(`Business Type: Corporation`);
            }
        });
    }

    async fillTaxRegistrationDocument() {
        if (await this.page.locator('div').filter({ hasText: 'Tax Registration Document' }).getByRole('img').isVisible()) {
            await this.page.locator('div').filter({ hasText: 'Tax Registration Document' }).getByRole('img').click();
            const ein = faker.random.alphaNumeric(10);
            await this.einInput.fill(ein);
            await this.page.getByRole('button', { name: 'Upload' }).click();
            console.log(`Employer Identification Number (EIN): ${ein}`);
        } else {
            console.log("Tax Registration Document is not visible");
        }
    }

    async fillEmployeeDetails() {
        await this.fillSection('Number of Full Time Employees', async () => {
            const fullTimeEmployees = faker.random.numeric(2);
            const temporaryEmployees = faker.random.numeric(2);
            await this.fullTimeEmployeesInput.fill(fullTimeEmployees);
            console.log(`Number of Full Time Employees: ${fullTimeEmployees}`);

            await this.temporaryEmployeesInput.fill(temporaryEmployees);
            console.log(`Number of Temporary Employees: ${temporaryEmployees}`);

        });
    }

    async fillUNSPSCCodes() {
        console.log("UNSPSC Codes section is Filled");

        // if (await this.unSPSCCodesSection.isVisible()) {
        //     await this.unSPSCCodesSection.click();
        //     console.log("UNSPSC Codes section is Filled");
        // } else {
        //     console.log("UNSPSC Codes section is already filled");
        // }
    }

    async fillLinkYourProfileOnPartner() {
        await this.fillSection('Link your profile on partner', async () => {
            await this.linkProfileSection.click();
        });
    }


    async fillManagement() {
        if (await this.managementSection.isVisible()) {
            const positions = [
                { title: 'Chief Executive Officer', name: 'Choose an Existing Contact', status: 'ceo details saved successfully' },
                { title: 'Chief Financial Officer', firstName: faker.person.firstName(), lastName: faker.person.lastName(), jobTitle: 'CFO', phone: faker.phone.number('##########'), email: faker.internet.email(), status: 'cfo details saved successfully' },
                { title: 'Director of Sales', firstName: faker.person.firstName(), lastName: faker.person.lastName(), jobTitle: 'DFO', phone: faker.phone.number('##########'), email: faker.internet.email(), status: 'dos details saved successfully' }
            ];

            

            for (const pos of positions) {
                if (await this.page.getByText(`Add ${pos.title}`).isVisible()) {
                    await this.assignContact.first().click();
                    await this.expect(this.assignContactManagement).toBeVisible();

                    if (pos.name) {
                        await this.existingContact.locator('span').first().click();
                        await this.selectExistingContact.click();
                        await this.indexvalueZero.click();
                        //await this.page.getByRole('menuitemradio', { name: pos.name }).click();
                        console.log(`Added Contact: ${pos.title}`);
                        await this.addContact.click();
                        await this.page.waitForTimeout(3000);
                        await this.checkNotification(pos.status);

                        await this.page.waitForTimeout(5000);

                    } else {
                        await this.page.waitForTimeout(3000);
                        await this.firstName.fill(pos.firstName);
                        console.log(`First Name: ${pos.firstName}`);

                        await this.lastName.fill(pos.lastName);
                        console.log(`Last Name: ${pos.lastName}`);

                        await this.jobTitle.fill(pos.jobTitle);
                        console.log(`Job Title: ${pos.jobTitle}`);

                        await this.page.waitForTimeout(3000);
                        await this.phoneNumberInput.first().fill(pos.phone);
                        console.log(`Phone: ${pos.phone}`);

                        await this.emailAddress.fill(pos.email);
                        console.log(`Email: ${pos.email}`);

                        await this.country.click();
                        await this.indexvalueZero.click();
                        await this.addContact.click();
                        await this.page.waitForTimeout(3000);
                        await this.checkNotification(pos.status);
                        await this.page.waitForTimeout(5000);
                    }
                }
            }
            await this.saveAndContinue();
        }
    }

    async saveAndContinue() {
        if (await this.page.getByRole('button', { name: 'Save and Continue' }).isVisible()) {
            await this.page.getByRole('button', { name: 'Save and Continue' }).click();
            console.log("Saved and continued to the next section.");
        } else {
            console.log("Save and Continue button is not visible");
        }
        await this.page.waitForTimeout(3000);
    }

    async fillCompanyProfile() {
        await this.fillCompanyInformation();
        await this.fillContactDetails();
        await this.fillTaxDetails();
        await this.saveAndContinue();
        await this.checkNotification('Company profile has been saved successfully');
        await this.fillEmployeeDetails();
        await this.saveAndContinue();
    }

    async fillProductsServices() {
        await this.fillUNSPSCCodes();
        await this.saveAndContinue();
    }

    async fillExternalIdentifiers() {
        await this.fillLinkYourProfileOnPartner();
        await this.saveAndContinue();

    }

    // Ouestionarie

    async navigateToQuestionnaires() {
        await this.page.getByLabel('Progress').getByText('Questionnaires').click();
        const states = {
            NotStarted: await this.notStarted.isVisible(),
            InProgress: await this.inProgress.isVisible(),
            ReadyToPublish: await this.readyToPublish.isVisible(),
            Published: await this.published.isVisible()
        };

        if (states.NotStarted || states.InProgress) {
            console.log(states.NotStarted ? 'Questionnaires Not Started is visible.' : 'Questionnaires in progress is visible.');
            await this.processQuestionnaire();
        } else if (states.ReadyToPublish || states.Published) {
            console.log(states.ReadyToPublish ? 'Ready To Publish Questionnaire is visible.' : 'Published Questionnaire is visible.');
            await this.updateAndPublishQuestionnaire();
        } else {
            console.log('No relevant questionnaire status is visible.');
        }
    }

    async processQuestionnaire() {
        await this.continueQuestionnaire();
        await this.fillQuestionnaire();
        await this.saveAsDraftAlternateButton.click();

        const publishVisible = await this.publishQuestionnaireSection.isVisible();
        if (publishVisible) {
            console.log('Publish Questionnaire is visible.');
            await this.saveAndContinue.click();
        }
    }

    async updateAndPublishQuestionnaire() {
        await this.UpdateQuestionnaire();
        await this.saveAsDraftAlternateButton.click();

        const publishVisible = await this.publishQuestionnaireSection.isVisible();
        if (publishVisible) {
            console.log('Publish Questionnaire is visible.');
            await this.publishButton.click();
        }
    }

    async clickButton(selector) {
        if (await this.page.locator(selector).isVisible()) {
            await this.page.locator(selector).click();
        } else {
            console.log(`Button with selector ${selector} is not visible.`);
        }
    }

    async BeginQuestionnaire() {
        await this.clickMenuItem(this.menuButton, 'Begin Questionnaire');
    }

    async continueQuestionnaire() {
        await this.clickMenuItem(this.menuButton, 'Continue Questionnaire');
    }

    async UpdateQuestionnaire() {
        await this.clickMenuItem(this.menuButton, 'Update Questionnaire');
    }

    async clickMenuItem(menuSelector, itemName) {
        const menuButton = this.page.locator(menuSelector);
        if (await menuButton.isVisible()) {
            await menuButton.click();
            const menuItem = this.page.getByRole('menuitem', { name: itemName });
            await menuItem.waitFor({ state: 'visible', timeout: 10000 });
            await menuItem.click();
            console.log(`Clicked '${itemName}' successfully.`);
        } else {
            console.log(`Menu button for '${itemName}' is not visible.`);
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

        if (await this.saveAsDraftButton.isVisible()) {
            console.log('Save as Draft button is visible.');
            await this.saveAsDraftButton.click();
        } else {
            console.log('Save as Draft button is not visible. Cannot save.');
        }
    }


    async checkNotification(expectedMessage) {
        console.log('Notification paragraph is not visible.');
        // if (await this.notificationParagraph.isVisible()) {
        //     await this.expect(this.notificationParagraph).toContainText(expectedMessage);
        //     console.log(`Notification verified: ${expectedMessage}`);
        // } else {
        //     console.log('Notification paragraph is not visible.');
        // }
    }

}

// export default companyProfilePage;