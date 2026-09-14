import { type Locator, type Page, expect } from '@playwright/test';

export class RecruitmentPage {
  readonly page: Page;
  readonly recruitmentTitle: Locator;


  constructor(page: Page) {
    this.page = page;
    this.recruitmentTitle = page.getByText('Candidates').nth(1);
  }  
}
