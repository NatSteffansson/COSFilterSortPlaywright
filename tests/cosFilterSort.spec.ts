import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://www.cos.com/en_sek/index.html');
    await page.getByRole('button', { name: "Close" }).click();
    await page.getByRole('button', { name: 'Only required cookies' }).click();
    await page.getByRole('menuitem', { name: 'Women' }).click()
});
test.describe('Filter & Sort', () => {
    test('filtering by color and validating that all items are in the chosen color', async ({ page }) => {
        //Navigate to Knitwear and apply color filter
        await page.getByRole('link', { name: 'Knitwear', exact: true }).click();
        await page.locator('.filter-and-sort-icon').click();
        await page.locator('#toggle-colorWithNames').click();
        const colorCheckBox = page.locator('[color="#ff0000"]');
        await colorCheckBox.click();
        const viewProductsButton = page.getByRole('button', { name: /View \d+ products/ });
        await viewProductsButton.click();
        //Get all items and validate their colors
        await expect(page).toHaveURL(/.*colorWithNames=ff0000_red/);
    });
    test('filtering by price and asserting that prices are in descending order', async ({ page }) => {
        //Navigate to Dresses and apply price filter
        await page.getByRole('link', { name: 'Dresses', exact: true }).click();
        await page.locator('.filter-and-sort-icon').click();
        await page.getByRole('button', { name: "Sort by" }).click();
        await page.locator('label').filter({ hasText: 'HIGHEST PRICE' }).getByRole('img').locator('path').click(); //Codegen
        const viewProductsButton = page.getByRole('button', { name: /View \d+ products/ });
        await viewProductsButton.click();
        //Get all items and validate the price is in descending order
        const itemPriceList = await page.locator('div.m-product-price').allInnerTexts();
        const priceNumbers = itemPriceList.map(price => parseFloat(price.replace(/[^\d,]/g, '')));
        console.log(itemPriceList, priceNumbers);
        for (let i = 0; i < priceNumbers.length - 1; i++) {
            expect(priceNumbers[i]).toBeGreaterThanOrEqual(priceNumbers[i + 1]);
        }
    });
});
test.afterEach(async ({ page }) => {
    await page.close()
    await page.context().clearCookies();
});