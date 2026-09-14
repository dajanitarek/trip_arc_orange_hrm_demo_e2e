import { type Locator, type Page, expect } from '@playwright/test';

export class ClaimPage {
  readonly page: Page;
  readonly claimeTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.claimeTitle = page.getByText('Employee Claims').nth(1);
  }  
}
