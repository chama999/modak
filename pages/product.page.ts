import { Page, Locator } from '@playwright/test';

export class ProductPage {
    page: Page;
    availabilityInfo: Locator;
    buyButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.availabilityInfo = page.locator('div[class*="quantity--info"] span');
        this.buyButton = page.locator('button[class*="buy-now"]')
    }

    async getAvailabilityText() {
        await this.availabilityInfo.waitFor({ state: 'visible', timeout: 10000 });
        return (await this.availabilityInfo.textContent()) || 'ERROR';
    }

    async hasAvailableItems() {
        const text = await this.getAvailabilityText();
        // Check for both English and Spanish versions
        return text.includes('available') || text.includes('disponible');
    }
}
