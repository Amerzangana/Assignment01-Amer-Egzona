import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class RoomsViewPage {

    readonly page: Page;
    readonly roomViewButton: Locator;
    readonly lastelement: Locator;


constructor(page: Page) {
    this.page = page;
    this.roomViewButton = page.locator('#app > div > div > div:nth-child(1) > a');
    this.lastelement = page.locator('#app > div > div.rooms > div:nth-last-child(1)');
}

async RoomsView() {
       
    await this.roomViewButton.click();




}

async verifylastelement(roomNumber: string, roomFloor: string, roomPrice: string){
    

    await expect(this.lastelement).toContainText(roomNumber);
    await expect(this.lastelement).toContainText(roomFloor);
    await expect(this.lastelement).toContainText(roomPrice);

}
}