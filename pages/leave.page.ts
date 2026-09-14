import { type Locator, type Page, expect } from '@playwright/test';

export class LeavePage {
  readonly page: Page;
  readonly leaveTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.leaveTitle = page.getByText('Leave List').nth(1);
  }  
}
