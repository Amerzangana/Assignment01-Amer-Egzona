import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ClientsEdit {

readonly page: Page;
readonly clientAltButton2: Locator;
readonly clientAltButton1: Locator;
readonly clientEditButton: Locator;
readonly clientDeleteButton: Locator;
readonly clientNameTextfield: Locator;
readonly clientEmailTextfield: Locator;
readonly clientPhoneTextfield: Locator;
readonly clientSaveButton: Locator;
readonly clientBackButton: Locator;

constructor(page: Page) {
    
    this.page = page;
    this.clientAltButton2 = page.locator('div:nth-child(2) > .action');
    this.clientAltButton1 = page.locator('div:nth-child(1) > .action');
    this.clientEditButton = page.locator('#app > div > div.clients > div:nth-child(2) > div.menu > a:nth-child(1)');
    this.clientDeleteButton = page.getByText('Delete');
    this.clientNameTextfield = page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox');
    this.clientEmailTextfield = page.locator('input[type="email"]');
    this.clientPhoneTextfield = page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox');
    this.clientSaveButton = page.getByText('Save');    
    this.clientBackButton = page.getByRole('link', { name: 'Back' });
}

async EditClients() {

    await this.clientAltButton2.click();
    await this.clientEditButton.click();
    await this.clientNameTextfield.fill("Aimer Gang");
    await this.clientEmailTextfield.fill("Gangster@Ganggangcrew.se");
    await this.clientPhoneTextfield.fill("003")
    await this.clientSaveButton.click();   
    await this.page.waitForTimeout(1000);
}

async DeliteClients() {

    await this.clientAltButton1.click();
    await this.clientDeleteButton.click();
    await this.page.waitForTimeout(1000);

}
}
