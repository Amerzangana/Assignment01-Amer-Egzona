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

  //Const
  constructor(page: Page) {
    this.page = page;
    this.billsViewButton = page.locator('#app > div > div > div:nth-child(3) > a');
    this.createBillsButton = page.getByRole('button', { name: 'Create Bill' }); 
    this.billsValueTextfield = page.locator('input[type="text"]');
    this.billsPaidCheckbox = page.locator('.checkbox');
    this.billsSaveButton = page.getByRole('button', { name: 'Save' });    
    this.billsBackButton = page.getByRole('button', { name: 'Back' });  
  }

  async CreateBills(price: string) {
    //fill out the room form and select Save button.
    await this.billsViewButton.click();
    await this.billsValueTextfield.fill(price);
    await this.billsPaidCheckbox.click();
    await this.billsSaveButton.click();    
    await this.billsBackButton.click();    

    faker.commerce.price({ min: 999, max: 5000, dec: 0 });

  }



  async filloutbillsInformationManually(price: string){
    await this.billsValueTextfield.fill(price);

}