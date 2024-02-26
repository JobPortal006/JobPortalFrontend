const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({ headless: false, devtools: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
        // Navigate to your React app
        await page.goto('http://localhost:3000/CreateAccount'); // Replace with your app's URL

        console.log('Waiting for AccordionWrapper to be visible...');
        // Wait for the AccordionWrapper to be visible
        const accordionWrapperSelector = 'your-accordion-selector'; // Replace with the actual selector
        await page.waitForSelector(accordionWrapperSelector, { state: 'attached', timeout: 90000 });

        console.log('AccordionWrapper is visible. Expanding the Address accordion...');
        // Find and expand the Address accordion
        const addressAccordion = await page.waitForSelector(accordionWrapperSelector);
        await addressAccordion.click();

        console.log('Filling Permanent Address...');
        // Fill in Permanent Address with default values
        await fillAddressFields('permanent', page);

        console.log('Filling Current Address...');
        // Fill in Current Address with default values
        await fillAddressFields('current', page);

        console.log('Submitting the form...');
        // Submit the form (replace 'submit-selector' with your actual submit button selector)
        await page.click('button[type="submit"]');

        console.log('Waiting for some time to visually inspect the form...');
        // Wait for some time to visually inspect the form (adjust the timeout accordingly)
        await page.waitForTimeout(10000);

        console.log('Displaying the results in the console...');
        // Display the results in the console
        const result = await page.$eval('your-result-selector', (resultElement) => {
            return resultElement.textContent;
        });

        console.log('Form submission result:', result);

    } catch (error) {
        console.error('Error during test:', error);
    } finally {
        console.log('Closing the browser...');
        await browser.close();
    }
})();

async function fillAddressFields(type, page) {
    try {
        console.log(`Filling ${type} address...`);

        const prefix = type === 'permanent' ? 'Permanent ' : 'Current ';
        await page.type(`input[name="${prefix.toLowerCase()}street"]`, 'Default Street');
        await page.type(`input[name="${prefix.toLowerCase()}city"]`, 'Default City');
        await page.type(`input[name="${prefix.toLowerCase()}pincode"]`, '12345');
        await page.type(`input[name="${prefix.toLowerCase()}country"]`, 'Default Country');
        await page.type(`input[name="${prefix.toLowerCase()}state"]`, 'Default State');
    } catch (error) {
        console.error(`Error filling ${type} address:`, error);
    }
}
