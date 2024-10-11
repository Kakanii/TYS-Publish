import { expect } from '@playwright/test';
const { Base } = require("../utility/Base");


exports.inviteSupplierPage = class inviteSupplierPage extends Base {

    constructor(page) {
        super();
        this.page = page;
        this.connectedSupplier = "//p[text()='Connected Suppliers']";
        this.inviteSupplier = "//button[text()='Invite Supplier']";
        this.supplierName = "Type supplier name and hit enter";
        this.searchbtn = "//button[text()='Search']";
        this.ingoreAndProceed = "//button[text()='Ignore and Proceed']";
        this.taxCountry = "//select[@name='taxCountry']";
        this.fName = "First Name";
        this.lname = "Last Name";
        this.email = "//input[@name='email']";
        this.confirmEmail = "//input[@name='confirmEmail']";
        this.nextBtn = "//button[text()='Next']";
        this.skipBtn = "//button[text()='Skip']";
        this.clickHereBtn = "//span[text()='Click here']";
        this.clrAll = "//span[text()='Clear All']";
        this.assignBtn = "//button[text()='Assign']";
        this.confirmBtn = "//button[text()='Confirm']";
        this.sendInviteBtn = "//button[text()='Send Invite']";
        this.dropDowngrp = "//div[@class='dropdown btn-group']//button//small";
        this.logOutBtn = "(//button[@class='dropdown-item'])[2]";
        this.suppName = "//p[text()='";
        this.endSuppname = "']//ancestor::tr";
        this.supStatus = "//span[text()='Pending Invites']";

    }
    static email = '';
    async inviteSupplierWithoutQuestionniare() {
        inviteSupplierPage.email = this.getRandomEmail(10);
        inviteSupplierPage.supplierName = this.getRandomName(15);
        //Fille Invite details
        await this.page.locator(this.connectedSupplier).click();
        await this.page.locator(this.inviteSupplier).click();
        await this.page.getByPlaceholder(this.supplierName).fill(inviteSupplierPage.supplierName);
        await this.page.locator(this.searchbtn).click();
        await this.page.waitForTimeout(5000);
        await this.page.waitForSelector(this.ingoreAndProceed);
        await this.page.locator(this.ingoreAndProceed).click();
        await this.page.locator(this.taxCountry).selectOption("United States of America");
        await this.page.getByPlaceholder(this.fName).fill("Fisrtname");
        await this.page.getByPlaceholder(this.lname).fill("Lastname");
        await this.page.locator(this.email).fill(inviteSupplierPage.email);
        console.log("Email Address:" + inviteSupplierPage.email);
        await this.page.locator(this.confirmEmail).fill(inviteSupplierPage.email);
        console.log("Filled Invite Details.")
        await this.page.locator(this.nextBtn).click();

        //Supplier Segmentation page
        await this.page.locator(this.skipBtn).click();
        console.log("Clicked Skip on Supplier Segmentation page")

        //Relationship contacts page
        await this.page.locator(this.skipBtn).click();
        console.log("Clicked Skip on Relationship contacts page")

        //Pre-Invite Assement page

        await this.page.locator(this.skipBtn).click();
        console.log("Pre-Invite Assement page")

        //Assign Questionnare
        await this.page.locator(this.clickHereBtn).click();
        await this.page.locator(this.clrAll).click();
        await this.page.locator(this.assignBtn).click();
        await this.page.locator(this.confirmBtn).click();
        await this.page.locator(this.nextBtn).click();
        console.log("Cleared Questionnare")

        //Review Page
        await this.page.locator(this.sendInviteBtn).click();
        await this.page.waitForTimeout(15000);
        console.log("Clicked on Send Invite")
        //Verify supplier state
        //await this.page.locator(this.suppName+inviteSupplierPage.supplierName+this.endSuppname).click();
        //await this.page.waitForTimeout(15000);
        //await expect(this.page.locator(this.supStatus)).toBeVisible();
        //console.log("Supplier status changed to Pending Invites")



        //logout buyer

        await this.page.locator(this.dropDowngrp).click();
        await this.page.locator(this.logOutBtn).click();
        console.log("Logout success.");



    }

}