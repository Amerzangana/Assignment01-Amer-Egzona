import { expect, type Locator, type Page } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class ReservationEdit {

readonly page: Page;
readonly reservationAltButton: Locator;
readonly reservationEditButton: Locator;
readonly reservationDeleteButton: Locator;
readonly reservationStartTextfield: Locator;
readonly reservationEndTextfield: Locator;
readonly reservationClientButton: Locator;
readonly reservationRoomButton: Locator;
readonly reservationBillButton: Locator;
readonly reservationSaveButton: Locator;
readonly lastelement: Locator;

constructor(page: Page) {
    this.page = page;
    this.reservationAltButton = page.locator('#app > div > div.reservations > div:nth-child(1) > div.action > img');
    this.reservationEditButton = page.locator('#app > div > div.reservations > div > div.menu > a:nth-child(1)');
    this.reservationDeleteButton = page.locator('#app > div > div.reservations > div:nth-child(1) > div.menu > a:nth-child(2)');
    this.reservationStartTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(1) > input[type=text]');
    this.reservationEndTextfield = page.locator('#app > div > div:nth-child(2) > div:nth-child(2) > input[type=text]');
    this.reservationClientButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(3) > select');
    this.reservationRoomButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(4) > select');
    this.reservationBillButton = page.locator('#app > div > div:nth-child(2) > div:nth-child(5) > select');
    this.reservationSaveButton = page.locator('#app > div > div.actions > a.btn.blue');
    this.lastelement = page.locator('#app > div > div.reservations > div:nth-last-child(1)');
}

async EditReservation() {

    await this.reservationAltButton.click();
    await this.reservationEditButton.click();
    await this.reservationStartTextfield.fill("2024-10-10");
    await this.reservationEndTextfield.fill("2024-10-15");
    await this.reservationClientButton.fill("2");
    await this.reservationRoomButton.fill('3');   
    await this.reservationBillButton.fill('1');
    await this.reservationSaveButton.click();
    await this.page.waitForTimeout(3000);

}

async DeliteReservation() {

    await this.reservationAltButton.click();
    await this.reservationDeleteButton.click();
    

}

}
