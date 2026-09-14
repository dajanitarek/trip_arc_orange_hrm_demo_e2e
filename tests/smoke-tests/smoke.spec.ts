import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login.page.ts';
import { NavigationPage } from '../../pages/navigation.page.ts';
import { SystemUsersPage } from '../../pages/system-users.page.ts';
import { EmployeePage } from '../../pages/employee.page.ts';
import { LeavePage } from '../../pages/leave.page.ts';
import { TimePage } from '../../pages/time.page.ts';
import { RecruitmentPage } from '../../pages/recruitment.page.ts';
import { BuzzPage } from '../../pages/buzz.page.ts';
import { ClaimPage } from '../../pages/claim.page.ts';
import { MaintenancePage } from '../../pages/maintenance.page.ts';
import { DashboardPage } from '../../pages/dashboard.page.ts';
import { DirectoryPage } from '../../pages/directory.page.ts';
import { MyInfoPage } from '../../pages/myInfo.page.ts';
import { PerformancePage } from '../../pages/performance.page.ts';


const adminUsername = process.env.ADMIN_USERNAME!;
const adminPassword = process.env.ADMIN_PASSWORD!;

test('login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    await  page.goto('/');
    await loginPage.login(adminUsername, adminPassword);
    await expect(navigationPage.navigationBar).toBeVisible();
});

//The following test creates a new system user and search for the created user.
//Ideally I would separate these two scenarios into two test cases
//The Test case for search for user, I would create the user via the API to minimize UI execution
test('manage users', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const systemUsersPage = new SystemUsersPage(page);
    const employeePage = new EmployeePage(page);
    await page.goto('/');
    await loginPage.login(adminUsername, adminPassword);
    await navigationPage.clickOnNavigationItem('Pim');
    await employeePage.clickAddButton();
    const employeeID = Math.random().toString(36).substring(2, 10);
    const employeeFName = Math.random().toString(36).substring(2, 10);
    const employeeLName = Math.random().toString(36).substring(2, 10);
    const employeeName = employeeFName + ' ' + employeeLName;
    const username = Math.random().toString(36).substring(2, 10);
    await employeePage.addEmployee(employeeFName, employeeLName, employeeID, {});
    await navigationPage.clickOnNavigationItem('Admin');
    await systemUsersPage.clickAddButton();
    await systemUsersPage.addUser('ESS', employeeName, 'Enabled', username, 't1234567');
    await systemUsersPage.searchForUser(username);
});

//The following test creates a new employee and search for the created employee.
//Ideally I would separate these two scenarios into two test cases
//The Test case for search for employee, I would create the employee via the API to minimize UI execution
test('manage employees', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const employeePage = new EmployeePage(page);
    await page.goto('/');
    await loginPage.login(adminUsername, adminPassword);
    await navigationPage.clickOnNavigationItem('Pim');
    await employeePage.clickAddButton();
    const employeeID = Math.random().toString(36).substring(2, 10);
    const employeeFName = Math.random().toString(36).substring(2, 10);
    const employeeLName = Math.random().toString(36).substring(2, 10);
    const username = Math.random().toString(36).substring(2, 10);
    await employeePage.addEmployee(employeeFName, employeeLName, employeeID, {username: username, password: 't1234567'});
    await navigationPage.clickOnNavigationItem('Pim');
    await employeePage.searchForEmployee(employeeID);
});

//The following test creates a new employee user and login with the credentials
//Ideally for this test I would create the user via the API call - then use the credentials to login
test('login with newly created employee credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const employeePage = new EmployeePage(page);
    await page.goto('/');
    await loginPage.login(adminUsername, adminPassword);
    await navigationPage.clickOnNavigationItem('Pim');
    await employeePage.clickAddButton();
    const employeeID = Math.random().toString(36).substring(2, 10);
    const employeeFName = Math.random().toString(36).substring(2, 10);
    const employeeLName = Math.random().toString(36).substring(2, 10);
    const username = Math.random().toString(36).substring(2, 10);
    await employeePage.addEmployee(employeeFName, employeeLName, employeeID, {username: username, password: 't1234567'});
    await navigationPage.clickOnNavigationItem('Pim');
    await navigationPage.logout();
    await loginPage.login(username, 't1234567');
    await expect(navigationPage.navigationBar).toBeVisible();
    });

    test('site navigation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const navigationPage = new NavigationPage(page);
    const systemUsersPage = new SystemUsersPage(page);
    const employeePage = new EmployeePage(page);
    const leavePage = new LeavePage(page);
    const myInfoPage = new MyInfoPage(page);
    const recruitmentPage = new RecruitmentPage(page);
    const timePage = new TimePage(page);
    const performancePage = new PerformancePage(page);
    const dashboardPage = new DashboardPage(page);
    const directoryPage = new DirectoryPage(page);
    const maintenancePage = new MaintenancePage(page);
    const claimPage = new ClaimPage(page);
    const buzzPage = new BuzzPage(page);

    await  page.goto('/');
    await loginPage.login(adminUsername, adminPassword);
    await navigationPage.clickOnNavigationItem('Admin');
    await expect(systemUsersPage.systemUserTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('Pim');
    await expect(employeePage.employeeInformationTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('leave');
    await expect(leavePage.leaveTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('time');
    await expect(timePage.timeTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('recruitment');
    await expect(recruitmentPage.recruitmentTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('pim/viewMyDetails');
    await expect(myInfoPage.myInfoTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('performance');
    await expect(performancePage.performanceTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('dashboard');
    await expect(dashboardPage.dashboardTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('directory');
    await expect(directoryPage.directoryTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('maintenance');
    await maintenancePage.maintenancePassword.fill(adminPassword);
    await maintenancePage.maintenanceConfirmButton.click();
    await expect(maintenancePage.maintenanceTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('claim');
    await expect(claimPage.claimeTitle).toBeVisible({ timeout: 10000 });
    await navigationPage.clickOnNavigationItem('buzz');
    await expect(buzzPage.buzzTitle).toBeVisible({ timeout: 10000 });
});