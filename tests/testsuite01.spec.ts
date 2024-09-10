import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';
import { BillsPage } from './pages/bills-page';
import { CreateClientsPage } from './pages/createclients-page';
import { ClientsView } from './pages/clientsview-page';
import { ClientsEdit } from './pages/clientsedit-page';

test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  await page.waitForTimeout(5000);   
});

test.describe('Test suite 01', () => {
  test('Login', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });
});

test('Logout', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.performLogout();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 

  
});

test('Clients Dashboard Alt', async ({ page }) => {
  const clientsView = new ClientsView(page);
  const createclientsPage = new CreateClientsPage(page);
  const clientsEdit = new ClientsEdit(page);

  await clientsView.ClientsView();
  await clientsView.verifyfirstelement();

  const fullName = faker.person.fullName();
  const userEmail = faker.internet.email();
  const userPhoneNo = faker.phone.number();

  await createclientsPage.CreateClients(fullName, userEmail, userPhoneNo);
  await clientsView.verifylastelement(fullName, userEmail, userPhoneNo);
  await clientsEdit.EditClients();
  await clientsEdit.DeliteClients();
  await createclientsPage.filloutClientInformationManually();
  await createclientsPage.veryifrylastclient();
});

test('Create Bills Paid', async ({ page }) => {
  const billsPage = new BillsPage(page);

  const price = faker.commerce.price({ min: 999, max: 5000, dec: 0 });

  await billsPage.CreateBills(price);


  const element = page.locator('#app > div > div.bills > div:nth-last-child(1)');
  await expect(element).toContainText(price);
  await expect(element).toContainText("Yes");
});

test('Create Bills Not Paid', async ({ page }) => {
  const billsPage = new BillsPage(page);

  const price = faker.commerce.price({ min: 999, max: 5000, dec: 0 });

  await page.locator('#app > div > div > div:nth-child(3) > a').click();
  await expect(page.getByRole('heading', { name: 'Bills' })).toBeVisible();
  await page.getByRole('link', { name: 'Create Bill' }).click();
  await page.getByRole('spinbutton').fill(price);
  await page.getByText('Save').click();
  await page.waitForTimeout(1000);

  const element = page.locator('#app > div > div.bills > div:nth-last-child(1)');
  await expect(element).toContainText(price);
  await expect(element).toContainText("No");

});

test('Create Room', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

// navigate to Room view
    await page.locator('#app > div > div > div:nth-child(1) > a').click();
    await page.getByRole('link', { name: 'Create Room' }).click();
    await expect(page.getByText('New Room')).toBeVisible();


// create new Room

const roomNumber = faker.number.float({ min: 103, max: 299 }).toFixed(0);
const roomFloor = faker.number.int({ min: 1, max: 10 }).toString();
const roomPrice = faker.finance.accountNumber();


  await page.getByRole('combobox').click();
  await page.locator('div').filter({ hasText: /^Number$/ }).getByRole('spinbutton').fill(roomNumber)
  await page.locator('div').filter({ hasText: /^Floor$/ }).getByRole('spinbutton').fill(roomFloor)
  await page.locator('.checkbox').click();
  await page.locator('div').filter({ hasText: /^Price$/ }).getByRole('spinbutton').fill(roomPrice)
  await page.locator('#app > div > div:nth-child(2) > div:nth-child(6) > select > option:nth-child(3)').click();
  await page.getByText('Save').click();

    // implicit wait
    await page.waitForTimeout(2000);

    const element = page.locator('#app > div > div.rooms > div:nth-last-child(1)');
    await expect(element).toContainText(roomNumber);
    await expect(element).toContainText(roomFloor);
    await expect(element).toContainText(roomPrice);
    const featureElement = page.locator('#app > div > div.rooms > div:nth-last-child(1) > div:nth-last-child(1) > div.features > div');
    await expect(featureElement.nth(3)).toHaveText('sea view');


  
});