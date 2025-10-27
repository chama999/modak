import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/main.page';
import { ProductPage } from '../pages/product.page';
import { ALIEXPRESS_CONSTANTS } from '../constants/aliexpress.constants';

const { LANGUAGE } = process.env;
const CONSTANTS = LANGUAGE === 'ES' ? ALIEXPRESS_CONSTANTS.ES : ALIEXPRESS_CONSTANTS.EN;

test('Verify second item on second page has at least 1 product stock for instax mini search', async ({ page }) => {
    // Initialize page objects
    const mainPage = new MainPage(page);
    const productPage = new ProductPage(page);

    // Navigate to AliExpress
    await mainPage.goto();

    // Search for the product
    await mainPage.searchProduct(CONSTANTS.SEARCH.PRODUCT_NAME);
    // Scroll to bottom to load pagination
    await mainPage.scrollToBottomUntilPaginationIsVisible(CONSTANTS.SEARCH.TARGET_PAGE);
    // Navigate to the 2nd page
    await mainPage.goToPage(CONSTANTS.SEARCH.TARGET_PAGE);

    // Get the 2nd product and click on it
    const targetProduct = await mainPage.getProductByIndex(CONSTANTS.SEARCH.TARGET_ITEM_INDEX);
    await targetProduct.click();

    // Wait for the product page to load and verify stock availability
    const hasStock = await productPage.hasAvailableItems();
    await expect(hasStock, 'Product should have available stock').toBe(true);

    // Validate Buy button is clickable
    await expect(productPage.buyButton, 'Buy Now button should be visible and enabled').toBeEnabled();
});
