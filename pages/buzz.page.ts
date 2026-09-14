import { type Locator, type Page, expect } from '@playwright/test';

export class BuzzPage {
  readonly page: Page;
  readonly buzzTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.buzzTitle = page.getByText('Buzz Newsfeed');
  }  
}
