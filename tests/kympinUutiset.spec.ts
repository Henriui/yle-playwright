import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('kympin uutiset time check', async ({ page }, testInfo) => {
	await page.goto('https://areena.yle.fi/tv/opas');

	const popup = page.getByRole('button', {name:'Hyväksy kaikki'});
	if(popup && await popup.isVisible())
		await page.click('text=Hyväksy kaikki');

    const accessibilityScanResults = await new AxeBuilder({page}).analyze();

    // Check the checkbox
    await page.getByLabel('Näytä menneet ohjelmat').check();

    // Assert the checked state
    expect(await page.getByLabel('Näytä menneet ohjelmat').isChecked()).toBeTruthy()

    const mtv3Scedule = await page.locator('li.guide-channels__channel:nth-child(5) > div:nth-child(2) > ul:nth-child(1)')

    const amountOfShows = await mtv3Scedule.locator('li').count();
    let kympinUutiset;

    let foundName:boolean = false;
    for (let i = 1 ; i <= amountOfShows ; i++) {
        let currentShow = await mtv3Scedule.locator('li:nth-child(' + i +')')
        let showName = await currentShow.locator('div > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)').innerText();
        if(showName == "Kymmenen uutiset") {
            console.log(showName);
            kympinUutiset = currentShow;
            foundName = true;
            break;
        }
    }
    
    expect(foundName).toBeTruthy();

    let foundTime:boolean = false;
    let showTime = await kympinUutiset.locator('div > span:nth-child(1) > span:nth-child(1) > time:nth-child(1)').innerText();
    if (showTime == "22.00") {
        console.log(showTime);
        foundTime = true;
    }
    await expect(foundTime).toBeTruthy();

    const screenshot = await page.screenshot({
		path: `validateNews.png`,
		fullPage: true,
		type: 'png',
		timeout: 50000,
	});

    // Changes daily so can't be tested
	//await expect(page).toHaveScreenshot();

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
    });
    
	await testInfo.attach('screenshot', { body: screenshot, contentType: 'image/png' });
    
});
