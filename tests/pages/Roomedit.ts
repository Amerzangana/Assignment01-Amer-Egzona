import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RoomEdit {
  // Attributes
  readonly page: Page;
  readonly createRoomButton:Locator;
  readonly roomAltButton: Locator;
  readonly rooomEditButton: Locator;
  readonly roomDeleteButton: Locator;
  readonly roomNumberTextfield: Locator;
  readonly roomFloorTextfield: Locator;
  readonly roomAvailableButton: Locator;
  readonly roomPriceTextfield: Locator;
  readonly roomFeaturesButton: Locator;
  readonly roomSaveButton: Locator;
  readonly roomBackButton: Locator;
  readonly lastelement: Locator;
  

  constructor(page: Page) {
    this.page = page;
    this.createRoomButton = page.getByRole('link', { name: 'Create Room' });
    this.roomAltButton = page.locator('img').first();
    this.rooomEditButton = page.getByText('Edit');
    this.roomDeleteButton = page.getByText('Delete');
    this.roomNumberTextfield = page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton')
    this.roomFloorTextfield = page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton')
    this.roomAvailableButton = page.locator('.checkbox');
    this.roomPriceTextfield = page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton')
    this.roomFeaturesButton = page.getByRole('listbox')
    this.roomSaveButton = page.locator('#app > div > div.actions > a.btn.blue');
    this.roomBackButton = page.locator('#app > div > div:nth-child(3) > a')
    this.lastelement = page.locator('#app > div > div.rooms > div:nth-last-child(1)');
  }
    
    
    


  async EditRoom() {

    await this.roomAltButton.click();
    await this.rooomEditButton.click();
    await this.roomNumberTextfield.fill("1");
    await this.roomFloorTextfield.fill(" 6");
    await this.roomAvailableButton.click();
    await this.roomPriceTextfield.fill('3545');
    await this.roomFeaturesButton.click();
    await this.roomSaveButton.click();

    


    
  }
  async DeleteRoom() {

    await this.roomAltButton.click();
    await this.roomDeleteButton.click();


}
  async filloutroomInformationManually() {
    
      await this.createRoomButton.click();
      await this.roomNumberTextfield.fill("1");
      await this.roomFloorTextfield.fill("6");
      await this.roomAvailableButton.click();
      await this.roomPriceTextfield.fill("3545");
      await this.roomFeaturesButton.click();
      await this.roomSaveButton.click();


}
async veryifrylastroom() {

  await expect(this.lastelement).toContainText("1");
  await expect(this.lastelement).toContainText("6");
  await expect(this.lastelement).toContainText("3545");

}
}