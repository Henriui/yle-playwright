import { test, expect } from '@playwright/test';

test('check name and date of episode', async ({ page }) => {
	await page.goto('https://areena.yle.fi/1-3339547');

	await expect(page).toHaveTitle(/Kummeli/);

	const jaksot = await page.getByRole('list', {
		name: 'Tuotantokaudet',
		exact: true,
	});

	const season = await jaksot.getByRole('listitem').nth(2);

	await season.click();

	const viidesJaksoNimi = page.getByRole('link', {
		name: '5.',
	});

	console.log(await viidesJaksoNimi.textContent());

	const viidesJaksoDate = page.getByLabel('CardLabels_genericLabel__eAJwW');

	console.log(await viidesJaksoDate.textContent());

	expect(await viidesJaksoNimi.textContent()).toBe('Kausi 3. 5/6');
	expect(await viidesJaksoDate.textContent()).toBe('ti 8.3.2016');
});

/* 	await page.screenshot({
		path: `kummeli.png`,
		fullPage: true,
		type: 'png',
		timeout: 50000,
	});

	await expect(page).toHaveScreenshot(); */

/* 	const pageHandle = (await page.$('.VerticalList_list_NUYLj')) ? page : null;
	if (pageHandle) {
		console.log('pageHandle exists');
		expect(
			await pageHandle
				.$eval(
					'.Card_description__QXSRA',
					(node) => node.textContent as string,
				)
				.catch((e) => console.log(e)),
		).toBe('Kausi 3. 5/6');
		expect(
			await pageHandle
				.$eval(
					'.CardLabels_genericLabel__eAJwW',
					(node) => node.textContent as string,
				)
				.catch((e) => console.log(e)),
		).toBe('ti 8.3.2016');
	} */
