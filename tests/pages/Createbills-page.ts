import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class BillsPage {
  //Attributes
  readonly page: Page;
  readonly billsViewButton: Locator;
  readonly createBillsButton: Locator; 
  readonly billsValueTextfield: Locator;
  readonly billsPaidCheckbox: Locator;
  readonly billsSaveButton: Locator;
  readonly billsBackButton: Locator;
  readonly lastelement: Locator;

  //Const
  constructor(page: Page) {
    this.page = page;
    this.billsViewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.createBillsButton = page.getByRole('link', { name: 'Create Bill' }); 
    this.billsValueTextfield = page.getByRole('spinbutton');
    this.billsPaidCheckbox = page.locator('.checkbox');
    this.billsSaveButton = page.getByText('Save');    
    this.billsBackButton = page.getByRole('link', { name: 'Back' })  
    this.lastelement = page.locator('#app > div > div.bills > div:nth-last-child(1)');
  }

  async CreateBills(price: string) {
    faker.commerce.price({ min: 999, max: 5000, dec: 0 });
    //fill out the room form with faker and select paid and select Save button.
    await this.createBillsButton.click();
    await this.billsValueTextfield.fill(price);
    await this.billsPaidCheckbox.click();
    await this.billsSaveButton.click();    
  }

  async CreateBillsNotPaid(price: string) {
    faker.commerce.price({ min: 999, max: 5000, dec: 0 });
    //fill out the room form with faker and not paid and select Save button.
    await this.createBillsButton.click();
    await this.billsValueTextfield.fill(price);
    await this.billsSaveButton.click();   
  }

  async filloutbillsInformationManually(){
    // fill out the room form manually
    await this.createBillsButton.click();
    await this.billsValueTextfield.fill("1000000");
    await this.billsSaveButton.click();    
  }

  async verifythelastelememnt(price) {
    //verify that the last element has price from faker in it
    await expect(this.lastelement).toContainText(price);
  }

  async verifymanuallyelement() {
    //verify the last element has the right manually price in it
    await expect(this.lastelement).toContainText("1000000");
  }
  async verifylastelementNotpaid(price) {
    //verify that the last element is not paid
    await expect(this.lastelement).toContainText(price);
    await expect(this.lastelement).toContainText("No");
  }
}