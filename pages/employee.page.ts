import { type Locator, type Page, expect } from '@playwright/test';

export class EmployeePage {
  readonly page: Page;
  readonly employeeInformationTitle: Locator;
  readonly addButton: Locator;
  readonly employeeFirstName: Locator;
  readonly employeeLastName: Locator;
  readonly employeeID: Locator;
  readonly createLoginToggle: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly saveButton: Locator;
  readonly searchButton: Locator;
  readonly recordsFound: Locator;
  readonly employeeIDSearch: Locator;
  readonly personalDetailsTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.employeeInformationTitle = page.getByText('Employee Information');
    this.personalDetailsTitle = page.getByRole('heading', { name: 'Personal Details' });
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.employeeFirstName = page.locator('input[class*="orangehrm-firstname"]');
    this.employeeLastName = page.locator('input[class*="orangehrm-lastname"]');
    this.employeeID = page.locator('input[class*="oxd-input oxd-input--active"]').nth(3);
    this.username = page.locator('input[class*="oxd-input"]').nth(5);
    this.password = page.locator('input[class*="oxd-input"]').nth(6);
    this.confirmPassword = page.locator('input[class*="oxd-input"]').nth(7);
    this.createLoginToggle = page.locator('span[class*="switch"]');
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.employeeIDSearch = page.locator('input[class*="oxd-input oxd-input--active"]').nth(1);
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.recordsFound = page.locator('span:has-text("Record")');
  }  
  async clickAddButton() {
    await this.addButton.click();
  }

  async addEmployee(firstName: string, lastName: string, employeeID: string, options: { username?: string, password?: string }) {
    const {username = 'NA', password = 'NA'} = options;
    await this.employeeFirstName.fill(firstName);
    await this.employeeLastName.fill(lastName);
    await this.employeeID.fill(employeeID);
   if (username != 'NA' && password != 'NA') {
      await this.createLoginToggle.click();
      await this.username.fill(username);
      await this.password.fill(password);
      await this.confirmPassword.fill(password);
   }
    await this.saveButton.click(); 
    await expect(this.personalDetailsTitle).toBeVisible({timeout: 10000});

  }
  async searchForEmployee(employeeID: string) {
    await expect(this.employeeInformationTitle).toBeVisible({ timeout: 10000 });
    await this.employeeIDSearch.fill(employeeID);
    await this.searchButton.click();
    await expect(this.recordsFound).toHaveText('(1) Record Found', {timeout: 10000});
    await expect(this.page.locator('div:has-text("${employeeID}")'));
  }
}
