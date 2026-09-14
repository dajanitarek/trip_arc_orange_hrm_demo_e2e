import { type Locator, type Page, expect } from '@playwright/test';

export class TimePage {
  readonly page: Page;
  readonly timeTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.timeTitle = page.getByText('Select Employee');
  }  
}
