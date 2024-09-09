import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';


export class ClientsPage {
  //Attributes
  readonly page: Page;
  readonly clientViewButton: Locator;
  readonly createClientButton: Locator; 
  readonly clientNameTextfield: Locator;
  readonly clientEmailTextfield: Locator;
  readonly clientPhoneTextfield: Locator;
  readonly clientSaveButton: Locator;
  readonly clientBackButton: Locator;

  //Const
  constructor(page: Page) {
    this.page = page;
    this.clientViewButton = page.locator('#app > div > div > div:nth-child(2) > a');
    this.createClientButton = page.getByRole('button', { name: 'Create Bill' }); 
    this.clientNameTextfield = page.locator('input[type="text"]');
    this.clientEmailTextfield = page.locator('input[type="text"]');
    this.clientPhoneTextfield = page.locator('input[type="text"]');
    this.clientSaveButton = page.getByRole('button', { name: 'Save' });    
    this.clientBackButton = page.getByRole('button', { name: 'Back' });    

  
}

  // Methods / functions

  async CreateRoom(name: string, email:string, phoneNo:string) {
    //fill out the room form and select Save button.
    await this.clientViewButton.click();
    await this.clientNameTextfield.fill(name);
    await this.clientEmailTextfield.fill(email);
    await this.clientPhoneTextfield.fill(phoneNo);

    await this.clientSaveButton.click();    
  }

  async filloutClientInformationManually(name: string, email:string, phoneNo:string){
      await this.clientNameTextfield.fill(name);
    await this.clientEmailTextfield.fill(email);
    await this.clientPhoneTextfield.fill(phoneNo);

  }

  }