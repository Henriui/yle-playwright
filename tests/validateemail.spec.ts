import { test, expect } from '@playwright/test';
test('check email validation', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv');

	page.locator('xpath=/html/body/div[1]/div/aside/div[2]/div/button[2]')
		.click()
		.catch((e) => console.log(e));
	// const cookieBanner = await page.waitForSelector(
	//  'div[class="cookie-banner"]',
	// );
	// await cookieBanner.click();
	// await page.waitForTimeout(1000);
	// await page.screenshot({
	//   path: `cookiebanner.png`,
	//   fullPage: true,
	//   type: 'png',
	// });

	await page.getByRole('button', { name: 'Kirjaudu', exact: true }).click();
	await page
		.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
		.getByLabel('Sähköposti')
		.click();
	await page
		.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
		.getByLabel('Sähköposti')
		.fill('test');
	await page
		.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
		.getByLabel('Salasana', { exact: true })
		.click();
	await page
		.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
		.getByLabel('Salasana', { exact: true })
		.fill('test');

	const errorLabel = page
		.frameLocator('internal:role=dialog[name="kirjaudu sisään"i] >> iframe')
		.getByText('Tarkista sähköpostiosoitteen muoto.', { exact: true });

	expect(errorLabel).toBeTruthy();

	await page.screenshot({
		path: `validate.png`,
		fullPage: true,
		type: 'png',
		timeout: 50000,
	});

	await expect(page).toHaveScreenshot();
});
