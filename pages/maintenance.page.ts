import { type Locator, type Page, expect } from '@playwright/test';

export class MaintenancePage {
  readonly page: Page;
  readonly maintenanceTitle: Locator;
  readonly maintenancePassword: Locator;
  readonly maintenanceConfirmButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.maintenanceTitle = page.getByText('Purge Employee Records');
    this.maintenancePassword = page.locator('input[type*="password"]');
    this.maintenanceConfirmButton = page.locator('button[type*="submit"]');

  }  
}
