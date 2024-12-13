import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.cos.com/en_sek/index.html');
  await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Only required cookies' }).click();
  await page.getByLabel('Women', { exact: true }).click();
  await page.getByRole('link', { name: 'Knitwear' }).click();
  await page.getByRole('button', { name: 'Filter & Sort' }).click();
  await page.getByRole('button', { name: 'Colour' }).click();
  await page.getByRole('checkbox', { name: 'RED' }).click();
  await page.getByRole('button', { name: 'View 16 products' }).click();
  await expect(page.locator('#resolve_27')).toBeVisible();
});