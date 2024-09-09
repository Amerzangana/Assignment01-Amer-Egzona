import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';


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