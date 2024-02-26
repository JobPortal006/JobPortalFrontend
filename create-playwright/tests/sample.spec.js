const { test, expect } = require('@playwright/test');

// test('Sample',async({page})=>{
//     await page.goto('http://localhost:3000/login');
//     const pageUrl = page.url();
//     console.log(pageUrl,"this is the page url");
//     await expect(page).toHaveURL('http://localhost:3000/login');
//     page.close();
// });

test('get started link', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
   const pageurl = await page.url();
   console.log(pageurl,"thissss");
   await expect(page).toHaveURL('http://localhost:3000/login');
   page.close();
  });