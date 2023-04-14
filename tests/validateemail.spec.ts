import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('check email validation', async ({ page }, testInfo) => {
	await page.goto('https://areena.yle.fi/tv');

	/* Was for firefox but is not working
	page.locator('xpath=/html/body/div[1]/div/aside/div[2]/div/button[2]')
		.click()
		.catch((e) => console.log(e));*/

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

	const accessibilityScanResultsIndex = await new AxeBuilder({page}).analyze();

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

	const accessibilityScanResultsLogin = await new AxeBuilder({page}).analyze();

	const screenshot = await page.screenshot({
		path: `validateLogin.png`,
		type: 'png',
		timeout: 50000,
	});

	await expect(page).toHaveScreenshot();

	await testInfo.attach('accessibility-scan-results-index', {
        body: JSON.stringify(accessibilityScanResultsIndex, null, 2),
        contentType: 'application/json'
    });

	await testInfo.attach('accessibility-scan-results-login', {
        body: JSON.stringify(accessibilityScanResultsLogin, null, 2),
        contentType: 'application/json'
    });
	
	await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
});
