import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';
import { faker } from '@faker-js/faker';
import { BillsPage } from './pages/Createbills-page';
import { CreateClientsPage } from './pages/createclients-page';
import { ClientsView } from './pages/clientsview-page';
import { ClientsEdit } from './pages/clientsedit-page';
import { BillsEdit } from './pages/billsEdit-page';
import { BillsView } from './pages/billsView-page';
import { RoomsViewPage } from './pages/roomsViewPage';
import { CreateRoomsPage } from './pages/createrooms-page';
import { RoomEdit } from './pages/Roomedit';
import { CreateReservationPage } from './pages/CreateReservation-page';
import { ReservationViewPage } from './pages/ReservationView-page';
import { ReservationEdit } from './pages/ReservationEdit-page';


test.beforeEach(async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.performLogin(`${process.env.TEST_USERNAME}`,`${process.env.TEST_PASSWORD}`)
  await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  await page.waitForTimeout(5000);   
});

test.afterEach(async ({ page }) => {
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.performLogout();
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});

test.describe('Login', () => {
  test('Login', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Tester Hotel Overview' })).toBeVisible();
  });
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

test('Bill Dashboard Alt', async ({ page }) => {
  const billsPage = new BillsPage(page);
  const billsEdit = new BillsEdit(page);
  const billView = new BillsView(page);

  await billView.ViewBills();
  await billView.verifyfirstelement();

  const price = faker.commerce.price({ min: 999, max: 5000, dec: 0 });
  await billsPage.CreateBills(price);
  await billView.verifylastelement(price);
  await page.waitForTimeout(1000);

  await billsPage.CreateBills(price);
  await billView.verifylastelement(price);
  await billsEdit.EditBills();
  await billsEdit.DeleteBills();
  await billsPage.CreateBillsNotPaid(price);
  await billsPage.verifylastelementNotpaid(price);
  await page.waitForTimeout(1000);
});

test('Room dasbord alt ', async ({ page }) => {
  const roomsViewPage = new RoomsViewPage(page); 
  const createRoomsPage = new CreateRoomsPage(page);
  const roomEdit = new RoomEdit(page);

  await roomsViewPage.RoomsView(); 
  await expect(page.getByRole('heading', { name: 'Rooms' })).toBeVisible();

  const roomNumber = faker.number.float({ min: 20, max: 30 }).toFixed(0);
  const roomFloor = faker.number.int({ min: 1, max: 10 }).toString();
  const roomPrice = faker.commerce.price({ min: 999, max: 5000, dec: 0 });

  await createRoomsPage.CreateRoom(roomNumber, roomFloor, roomPrice);
  await roomsViewPage.verifylastelement(roomNumber, roomFloor, roomPrice);

  await roomEdit.EditRoom();
  await roomEdit.DeleteRoom();
  await roomEdit.filloutroomInformationManually();
  await roomEdit.veryifrylastroom();


});


test('Reservation Dashboard alt ', async ({ page }) => {
  const createReservationPage = new CreateReservationPage(page);
  const reservationViewPage = new ReservationViewPage(page);
  const reservationEdit = new ReservationEdit(page);
  
  await reservationViewPage.ReservationView();
  await reservationViewPage.verifyfirstelement();  

  const reservationStart = faker.date.future();
  const reservationEnd = faker.date.future();
  const reservationStartString = reservationStart.toISOString().split('T')[0];
  const reservationEndString = reservationEnd.toISOString().split('T')[0];
  
  await createReservationPage.createReservation(reservationStartString, reservationEndString);
  await reservationViewPage.verifylastelement(reservationStartString, reservationEndString);

  await reservationEdit.DeliteReservation();
  await createReservationPage.fillOutReservationInformationManually();
  await createReservationPage.veryifryManuellyREservation();
});
  