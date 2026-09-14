import { type Locator, type Page, expect } from '@playwright/test';

export class MyInfoPage {
  readonly page: Page;
  readonly myInfoTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.myInfoTitle = page.getByText('Personal Details').nth(1);
  }  
}