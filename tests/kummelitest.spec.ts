import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('check name and date of kummeli episode', async ({ page }, testInfo) => {
    await page.goto('https://areena.yle.fi/1-3339547');

	const popup = page.getByRole('button', {name:'Hyväksy kaikki'});
	if(popup && await popup.isVisible())
		await page.click('text=Hyväksy kaikki');

    await expect(page).toHaveTitle(/Kummeli/);
    const jaksot = page.getByRole('list', {
        name: 'Tuotantokaudet',
        exact: true,
    });

    const season = jaksot.getByRole('listitem').nth(2);

    await season.click();

	const accessibilityScanResults = await new AxeBuilder({page}).analyze();

    expect(await season.getAttribute('aria-current')).toBeTruthy();

    const viidesJaksoNimi = page.getByRole('link', {
        name: '5.',
    });

    expect(await viidesJaksoNimi.innerText()).toContain('5. Kummeli');
        
    expect(await page.locator('li.CardPage_listItem__JRVg1:nth-child(5) > div:nth-child(1) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > span:nth-child(2)').innerText()).toContain('ti 8.3.2016');

	const screenshot = await page.screenshot({
		path: `validateKummeli.png`,
		fullPage: true,
		type: 'png',
		timeout: 50000,
	});

	await expect(page).toHaveScreenshot();

	await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
    });

	await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });

});
