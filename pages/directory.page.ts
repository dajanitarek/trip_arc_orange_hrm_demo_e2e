import { type Locator, type Page, expect } from '@playwright/test';

export class DirectoryPage {
  readonly page: Page;
  readonly directoryTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.directoryTitle = page.getByText('Directory').nth(2);
  }  
}
