import { type Locator, type Page, expect } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.dashboardTitle = page.getByText('Time at Work');
  }  
}
