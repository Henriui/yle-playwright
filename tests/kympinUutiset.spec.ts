import { test, expect } from '@playwright/test';
test('kympinNews', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv/opas');

    // Check the checkbox
    await page.getByLabel('Näytä menneet ohjelmat').check();

    // Assert the checked state
    expect(await page.getByLabel('Näytä menneet ohjelmat').isChecked()).toBeTruthy()


	expect(await page.locator('li.guide-channels__channel:nth-child(5) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(31) > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)')
        .innerText()).toContain("Kymmenen uutiset");

	expect(await page.locator('li.guide-channels__channel:nth-child(5) > div:nth-child(2) > ul:nth-child(1) > li:nth-child(31) > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > time:nth-child(1)')
        .innerText()).toContain("22.00");
        
});
