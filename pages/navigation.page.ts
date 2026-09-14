import { type Locator, type Page } from '@playwright/test';
import { tracingChannel } from 'diagnostics_channel';

export class NavigationPage {
  readonly page: Page;
  readonly navigationBar: Locator;
  readonly userDropdown: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navigationBar = page.getByRole('navigation', { name: 'Sidepanel' });
    this.userDropdown = page.locator('span[class*="oxd-userdropdown-tab"]');
    this.logoutButton = page.locator('a[href*="logout"]');
  }

  getNavigationItem(itemName: string): Locator {
    return this.page.locator(`a[href*="${itemName}"]`);
  }

  async clickOnNavigationItem(item: string): Promise<void> {
    await this.getNavigationItem(item).click();
  }

  async logout() {
    await this.userDropdown.click();
    await this.logoutButton.click();
  }
}
