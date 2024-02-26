const { test, expect } = require('@playwright/test');
const { TIMEOUT } = require('dns');


test('Test Address Component', async ({ page }) => {
    // Open your application or navigate to the page where the Address component is rendered
    await page.goto('http://localhost:3000/CreateAccount');

    // Expand the address accordion if not already expanded
    const addressAccordionToggle = await page.$('.address_accordion .MuiAccordionSummary-root');
    if (addressAccordionToggle) {
        await addressAccordionToggle.click();
        // Wait for the accordion to expand
        await page.waitForSelector('.address_accordion .MuiAccordionDetails-root');
    }

    // Fill in permanent address
    await page.fill('.address_accordion input[name=street]', 'Permanent Street');
    await page.fill('.address_accordion input[name=city]', 'Permanent City');
    await page.fill('.address_accordion input[name=pincode]', '123456');
   
    await page.fill('.address_accordion input[name=country]', 'Permanent Country');
    await page.fill('.address_accordion input[name=state]', 'Permanent State');

});
