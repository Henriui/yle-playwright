import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Areena/);

	//  await page.fill('input[name="email"]', 'test');
	//   await page.getByRole('link', { name: 'Get started' }).click();
	// Expects the URL to contain intro.
	//  await expect(page).toHaveURL(/.*intro/);
});
