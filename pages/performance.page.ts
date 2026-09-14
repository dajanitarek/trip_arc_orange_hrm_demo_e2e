import { type Locator, type Page, expect } from '@playwright/test';

export class PerformancePage {
  readonly page: Page;
  readonly performanceTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.performanceTitle = page.getByText('Employee Reviews');
  }  
}
