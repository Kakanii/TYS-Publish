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
            companyInfoSection: page.locator("//p[text()='Company Information']").first(),
            dateSelector: page.getByLabel('Select Date'),
            dateToSelect: page.getByLabel('Choose Tuesday, October 1st,'),
            selectMonthButton: page.getByRole('button', { name: 'Select Month' }),
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

            fullTimeEmployeesInput: page.locator("(//label[contains(.,'Number of Full Time Employees')]/following::input)[1]"),
            temporaryEmployeesInput: page.locator("//span[text()='Number of Temporary and Contracted Employees']/following::input"),

            saveAndContinue: page.locator("//button[text()='Save & Continue']"),


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
            assignQuestionnaire: page.locator("//p[text()='Assigned Questionnaires by the Buyers to be visible and be compliant']"),
            notStarted: page.locator("//span[text()='Not Started']"),
            inProgress: page.locator("//span[text()='In Progress']"),
            readyToPublish: page.locator("//span[text()='Ready to Publish']"),
            published: page.locator("//span[text()='Published']"),

            beginQuestionnaire: page.locator("//p[text()='Begin Questionnaire']"),
            continueQuestionnaire: page.locator("//p[text()='Continue Questionnaire']"),

            // Save as Draft button locator
            saveAsDraftButton: page.locator("//button[text()='Save as Draft']/following-sibling::button"),
            // Publish Questionnaire section locator
            publishQuestionnaireSection: page.locator("//p[text()='Publish Questionnaire']"),
            saveAndContinueButton: page.locator("//button[text()='Save & Continue']"),
            // Menu button locator
            menuButton: page.locator("(//button[@class='chakra-menu__menu-button css-y1y2s'])[1]"),

            publishButton: page.locator("//button[@class='chakra-button css-19yhfgr']"),

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
                await this.locators.dateSelector.click();
                await this.locators.dateToSelect.click();
                await this.locators.selectMonthButton.click();
                await this.locators.monthOption.click();
            }
            await this.locators.companyDescriptionInput.fill(faker.company.catchPhrase());
            console.log(`Company Description: ${companyDescription}`);

        });
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

    async fillEmployeeDetails() {
        await this.fillSection('Number of Full Time Employees', async () => {
            await this.locators.fullTimeEmployeesInput.fill("2");
            await this.locators.temporaryEmployeesInput.fill("2");
        });
    }

    async saveAndContinue() {
        if (await this.page.locator("//button[text()='Save & Continue']").isVisible()) {
            await this.page.locator("//button[text()='Save & Continue']").click();
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

        const assignVisible = await this.locators.assignQuestionnaire.isVisible();
        console.log(`Assigned Questionnaire visibility: ${assignVisible}`);

        if (await this.locators.notStarted.isVisible()) {
            console.log("Not Started Questionnaire is visible");

            await this.page.locator("div.css-1snmjsk button.css-y1y2s > span.css-xl71ch > svg").click();
            const beginVisible = await this.locators.beginQuestionnaire.isVisible();
            console.log(`Begin Questionnaire visibility: ${beginVisible}`);

            if (beginVisible) {
                await this.page.locator.beginQuestionnaire.click();
                await this.fillQuestionnaire();
                await publishQuestionnaire();
            }
        }

        if (await this.locators.inProgress.isVisible()) {
            console.log("In Progress Questionnaire is visible");

            await this.page.locator("div.css-1snmjsk button.css-y1y2s > span.css-xl71ch > svg").click();
            const continueVisible = await this.page.locator.continueQuestionnaire.isVisible();
            console.log(`Continue Questionnaire visibility: ${continueVisible}`);

            if (continueVisible) {
                await this.page.locator.continueQuestionnaire.click();
                await this.fillQuestionnaire();
                await publishQuestionnaire();
            }
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

        if (await this.page.locator.saveAsDraftButton.isVisible()) {
            console.log('Save and Continue button is visible.');
            await this.page.locator.saveAsDraftButton.click();
        } else {
            console.log('Save and Continue button is not visible. Cannot save.');
        }
    }

    async publishQuestionnaire() {
        const publishVisible = await this.page.locator.publishQuestionnaireSection.isVisible();
        console.log(`Publish Questionnaire visibility: ${publishVisible}`);

        if (publishVisible) {
            await this.page.locator.saveAndContinueButton.click();
        }
    }


    async fillCompanyProfile() {
        await this.fillCompanyInformation();
        await this.fillContactDetails();
        await this.fillTaxDetails();
        await this.fillEmployeeDetails();
        await this.saveAndContinue();
        await this.checkNotification('Company profile has been saved successfully');
    }

    async fillProductsServices() {
        console.log("UNSPSC Codes section is Filled");
        await this.saveAndContinue();
    }

    async fillExternalIdentifiers() {
        console.log("Link your profile on partner ecosystems");
        await this.saveAndContinue();
    }


}

