import { type Locator, type Page, expect } from '@playwright/test';

export class SystemUsersPage {
  readonly page: Page;
  readonly systemUserTitle: Locator;
  readonly addButton: Locator;
  readonly userRole: Locator;
  readonly employeeName: Locator;
  readonly status: Locator;
  readonly username: Locator;
  readonly password: Locator;
  readonly confirmPassword: Locator;
  readonly saveButton: Locator;
  readonly searchButton: Locator;
  readonly recordsFound: Locator;

  constructor(page: Page) {
    this.page = page;
    this.systemUserTitle = page.getByText('System User')
    this.addButton = page.getByRole('button', { name: 'Add' });
    this.userRole = page.locator('[class="oxd-select-wrapper"]').nth(0);
    this.employeeName = page.locator('input[placeholder*="Type for hints"]');
    this.status = page.locator('[class="oxd-select-wrapper"]').nth(1);
    this.username = page.locator('input[class*="oxd-input"]').nth(1);
    this.password = page.locator('input[class*="oxd-input"]').nth(2);
    this.confirmPassword = page.locator('input[class*="oxd-input"]').nth(3);
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.searchButton = page.getByRole('button', { name: 'Search' });
    this.recordsFound = page.locator('span:has-text("Record")');
  }  
  async clickAddButton() {
    await this.addButton.click();
  }
  async selectRole(role: string): Promise<void> { 
    await this.userRole.click();
    await this.page.getByRole('option', {name: role} ).click();
  }
  async selectStatus(status: string): Promise<void> { 
    await this.status.click();
    await this.page.getByRole('option', {name: status} ).click();
  }
  async selectEmployee(employee: string): Promise<void> { 
    await this.employeeName.fill(employee);
    await this.page.getByRole('option', {name: employee} ).click();
  }
  async addUser(role: string, employeeN: string, status: string, username: string, password: string) {
    await this.selectRole(role);
    await this.selectEmployee(employeeN);
    await this.selectStatus(status);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.confirmPassword.fill(password);
    await this.saveButton.click(); 
  }
  async searchForUser(username: string) {
    await expect(this.systemUserTitle).toBeVisible({ timeout: 10000 });
    await this.username.fill(username);
    await this.searchButton.click();
    await expect(this.recordsFound).toHaveText('(1) Record Found', {timeout: 10000});
    await expect(this.page.locator('div:has-text("${username}")'))
  }
}
