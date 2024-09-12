import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ReservationViewPage {

    readonly page: Page;
    readonly reservationViewButton: Locator;
    readonly lastelement: Locator;

constructor(page: Page) {
    this.page = page;
    this.reservationViewButton = page.locator('#app > div > div > div:nth-child(4) > a');
    this.lastelement = page.locator('#app > div > div.reservations > div:nth-last-child(1)');
}

async ReservationView() {

    await this.reservationViewButton.click();

}

async verifyfirstelement() {

    await expect(this.page.getByRole('heading', { name: 'Reservations' })).toBeVisible();

}

async verifylastelement(reservationStart: string, reservationEnd: string, ){

    await expect(this.lastelement).toContainText(reservationStart);
    await expect(this.lastelement).toContainText(reservationEnd);
   
}
}