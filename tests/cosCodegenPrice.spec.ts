import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.cos.com/en_sek/index.html');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Only required cookies' }).click();
  await page.getByLabel('Women', { exact: true }).click();
  await page.getByRole('link', { name: 'Dresses' }).click();
  await page.getByRole('button', { name: 'Filter & Sort' }).click();
  await page.getByRole('button', { name: 'Sort by' }).click();
  await page.locator('label').filter({ hasText: 'HIGHEST PRICE' }).getByRole('img').locator('path').click();
  await page.getByRole('button', { name: 'View 269 products' }).click();
  await expect(page.locator('[id="\\31 242185001"]')).toContainText('5050,00 SEK');
  await expect(page.locator('[id="\\31 256138001"]')).toContainText('3950,00 SEK');
});