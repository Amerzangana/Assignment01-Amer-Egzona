import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class BillsEdit {
    
readonly page: Page;
readonly billsViewButton: Locator;
readonly createBillsButton: Locator; 
readonly billsValueTextfield: Locator;
readonly billsPaidCheckbox: Locator;
readonly billsSaveButton: Locator;
readonly billsBackButton: Locator;
readonly lastelement: Locator;
readonly billsAltButton: Locator;
readonly billsEditButton: Locator;
readonly billsDeleteButton: Locator;
readonly billsAltButton2: Locator;
readonly billsDeleteButton2: Locator;

constructor(page: Page) {

    this.page = page;
    this.billsViewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.createBillsButton = page.getByRole('link', { name: 'Create Bill' });
    this.billsValueTextfield = page.getByRole('spinbutton');
    this.billsPaidCheckbox = page.locator('.checkbox');
    this.billsSaveButton = page.getByText('Save');
    this.billsBackButton = page.getByRole('link', { name: 'Back' });
    this.billsAltButton = page.locator('div').filter({ hasText: /^ID: 1Value: 4500krPaid: No$/ }).locator('div').nth(2);
    this.billsEditButton = page.locator('#app > div > div.bills > div:nth-child(1) > div.menu > a:nth-child(1)');
    this.billsDeleteButton = page.locator('#app > div > div.bills > div:nth-child(1) > div.menu > a:nth-child(2)');
    this.billsDeleteButton2 = page.locator('#app > div > div.bills > div:nth-child(2) > div.menu > a:nth-child(2)');
    this.lastelement = page.locator('#app > div > div.bills > div:nth-last-child(1)');
    this.billsAltButton2 = page.locator('#app > div > div.bills > div:nth-child(2) > div.action > img');
}

async EditBills() {
    await this.billsAltButton.click();
    await this.billsEditButton.click();
    await this.billsValueTextfield.fill("5999");
    await this.billsPaidCheckbox.click();
    await this.billsSaveButton.click();
    await this.page.waitForTimeout(1000);
}

async DeleteBills() {
    await this.billsAltButton2.click();
    await this.billsDeleteButton2.click();
}
}