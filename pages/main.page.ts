import { Page, Locator } from '@playwright/test';
import { ALIEXPRESS_CONSTANTS } from '../constants/aliexpress.constants';

const { LANGUAGE } = process.env;
const CONSTANTS = LANGUAGE === 'ES' ? ALIEXPRESS_CONSTANTS.ES : ALIEXPRESS_CONSTANTS.EN;

export class MainPage {
    page: Page;
    searchBox: Locator;
    searchButton: Locator;
    productList: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchBox = this.getById('search-words');
        this.searchButton = page.locator('input[type="button"][class*="search--submit"]');
        this.productList = this.getById('card-list').locator('div.search-item-card-wrapper-gallery');
    }

    private getPageLinkLocator(pageNumber: number): Locator {
        return this.page.locator(`li.comet-pagination-item-${pageNumber} a`);
    }

    async goto() {
        await this.page.goto(CONSTANTS.BASE_URL);
    }

    async searchProduct(productName: string) {
        await this.searchBox.fill(productName);
        await this.searchButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    // navigate to a specific page number
    async goToPage(pageNumber: number) {
        await this.getPageLinkLocator(pageNumber).click();
        await this.page.waitForLoadState('networkidle');
    }

    // get product by its index in the list
    async getProductByIndex(index: number): Promise<Locator> {
        return this.productList.nth(index);
    }

    // get the locator by id
    getById(id: string): Locator {
        return this.page.locator(`[id="${id}"]`);
    }

    // method to scroll to bottom of the page
    async scrollToBottomUntilPaginationIsVisible(pageNumber: number) {
        // do while link to 2nd page is visible
        let attemps = 0;
        while (!await this.getPageLinkLocator(pageNumber).isVisible() && attemps <= 99) {
            await this.page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
            });
            attemps++;
        }
    }
}
