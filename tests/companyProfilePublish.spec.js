import { test, expect } from '@playwright/test';
import {companyProfilePage} from '../pageObjects/companyProfilePage';
import { acquireCredential, resetCredentials, releaseCredential } from '../credentialPool'; // Adjust the path as necessary

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
    
    test('@Regression @Sanity Company profile publish', async ({ page }) => {
        const cpp = new companyProfilePage(page, expect);
        // Login
        await cpp.login('ramaautobuyersupplierpublish@maildrop.cc', 'Password1');
        //await cpp.login('ramaahmttool@maildrop.cc', 'Password1');
        //await cpp.login('ramaautobuyetestr@maildrop.cc', 'Password1');
        // Fill the form sections
        await cpp.fillCompanyProfile();
        await cpp.fillProductsServices();
        await cpp.fillExternalIdentifiers();
        await cpp.fillManagement();
        await cpp.navigateToQuestionnaires();
        await cpp.saveAndContinue();
    });

    });
