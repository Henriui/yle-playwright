import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
test('kympinNews', async ({ page }, testInfo) => {
	await page.goto('https://areena.yle.fi/tv/opas');

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
    await expect(foundName).toBeTruthy();

    let foundTime:boolean = false;
    let showTime = await kympinUutiset.locator('div > span:nth-child(1) > span:nth-child(1) > time:nth-child(1)').innerText();
    if (showTime == "22.00") {
        console.log(showTime);
        foundTime = true;
    }
    await expect(foundTime).toBeTruthy();

    await testInfo.attach('accessibility-scan-results', {
        body: JSON.stringify(accessibilityScanResults, null, 2),
        contentType: 'application/json'
      });
    
});
