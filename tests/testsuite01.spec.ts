import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';



test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  await page.waitForTimeout(3000);   
});

test.describe('Test suite 01', () => {
  test('Login', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();  
  });
});

test('Logout', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

  await dashboardPage.performLogout();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible(); 

  
});

test('Create Clients', async ({ page }) => {
  const dashboardPage = new DashboardPage(page);

// navigate to clients view
await page.locator('#app > div > div > div:nth-child(2) > a').click();
await page.getByRole('link', { name: 'Create Client' }).click();

await expect(page.getByText('New Client')).toBeVisible();

// create new client.
 const fullName = faker.person.fullName();      
 const userEmail = faker.internet.email();     
 const userPhoneNo = faker.phone.number(); 

 await page.locator('div').filter({ hasText: /^Name$/ }).getByRole('textbox').fill(fullName);
 await page.locator('input[type="email"]').fill(userEmail);
 await page.locator('div').filter({ hasText: /^Telephone$/ }).getByRole('textbox').fill(userPhoneNo);
 await page.getByText('Save').click();

 const element = page.locator('#app > div > div.clients > div:nth-last-child(1)');
 await expect(element).toContainText(fullName);
 await expect(element).toContainText(userEmail);
 await expect(element).toContainText(userPhoneNo);
    

// implicit wait
await page.waitForTimeout(2000);
});