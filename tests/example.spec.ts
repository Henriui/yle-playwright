import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Areena/);
});

test('check email validation', async ({ page }) => {
	headless: false;

	await page.goto('https://areena.yle.fi/tv');

	const button = await page.$('button.yle-header-tunnus-login:has-text("Kirjaudu")');

	if (button !== null) {
		await button.click();
	}

	await page.waitForTimeout(1000);

	await page.screenshot({
		path: `example.png`,
		type: 'png',
	});

	await expect(page).toHaveTitle('Yle Areena – Enemmän kuin ehdit katsoa ja kuunnella | TV | Areena | yle.fi');

	const emailInput = await page.$('input#emailAddress.TextInputstyles__StyledTextInput-sc-1muz39w-2.bwmGhU');

	await emailInput?.fill('test@test.com');

	await page.screenshot({
		path: `example2.png`,
		type: 'png',
	});
	//  await page.fill('input[name="email"]', 'test');

	/*   await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/); */
});
