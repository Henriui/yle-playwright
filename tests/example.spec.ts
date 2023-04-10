import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Areena/);
});

test('check email validation', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv');

	await page
		.getByRole('button', {
			name: '.yle-header-action-login .yle-header-action-ready .yle-header-tunnus-login', // 'Kirjaudu sisään'
		})
		.click();

	await page.screenshot({
		path: `example.png`,
		fullPage: true,
		type: 'png',
		quality: 100,
	});

	await expect(page).toHaveTitle('Yle Tunnus | Yle.fi');

	//  await page.fill('input[name="email"]', 'test');

	/*   await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/); */
});
