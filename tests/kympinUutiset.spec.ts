import { test, expect } from '@playwright/test';
test('kympinNews', async ({ page }) => {
	await page.goto('https://areena.yle.fi/tv/opas');

    // Check the checkbox
    await page.getByLabel('Näytä menneet ohjelmat').check();

    // Assert the checked state
    expect(await page.getByLabel('Näytä menneet ohjelmat').isChecked()).toBeTruthy()

    const mtv3Scedule = await page.locator('li.guide-channels__channel:nth-child(5) > div:nth-child(2) > ul:nth-child(1)')

    const amountOfShows = await mtv3Scedule.locator('li').count();

    let foundName:boolean = false;
    for (let i = 1 ; i <= amountOfShows ; i++) {
        let showName = await mtv3Scedule.locator('li:nth-child(' + i +') > div:nth-child(1) > span:nth-child(1) > span:nth-child(2) > span:nth-child(1)').innerText();
        if(showName == "Kymmenen uutiset") {
            foundName = true;
            break;
        }
    }
    await expect(foundName).toBeTruthy();

    let foundTime:boolean = false;
    for (let i = 1 ; i <= amountOfShows ; i++) {
        let showName = await mtv3Scedule.locator('li:nth-child(' + i +') > div:nth-child(1) > span:nth-child(1) > span:nth-child(1) > time:nth-child(1)').innerText();
        if(showName == "22.00") {
            foundTime = true;
            break;
        }
    }
    await expect(foundTime).toBeTruthy();
    
});
