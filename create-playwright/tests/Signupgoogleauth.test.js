const { test, expect } = require('@playwright/test');

test('Sign up on the website and navigate to login, then open a new tab with Google OAuth link', async ({ page, browser }) => {
    // Navigate to the signup page
    await page.goto('http://localhost:3000');
    await page.click('#Nav_log_btn');
  
    // Click the "Sign Up" link or button
    await page.locator(':text("Sign Up")').click();
    
    // Wait for navigation to the login page
    // await page.waitForNavigation();

    // Optionally, assert that the current URL is the login page
    // expect(page.url()).toBe('http://localhost:3000/login');

    // Click the "CONTINUE WITH GOOGLE" button
    await page.click('button:has-text("CONTINUE WITH GOOGLE")');

    // Open a new tab and navigate to the Google OAuth link
    const newContext = await browser.newContext();  // Create a new context
    const newPage = await newContext.newPage();      // Create a new page within the new context
    await newPage.goto('https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=745831201499-qus2fqp1019dc4h58e37m2nq29eropfq.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fotp-otp-4a574.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDmLKLGH5OKoB_0UCB6qhvCgN5jmDteL_Kb-qad8VMuip9IfMRaFFdhDJu0dQTWrRcnKwOP_iJl4o8OGpCApMIOxrDuIk2ElLGspBOIQEbBGgak1kTwj--ulqpnS9e30bEViTXoygJyF80USyOeWZQ9ifGTqniJmGezVHkhJGctMschazqZpvq1X5mpNu5hEChJKPBFeCeYbFRuYVrYjXY3qQoRghnfbD87p-uSwJhwibx8CnXy1-qc86guVv9eKBvVkhJ63GmVu7K16b7QkhDkVIWVIoNfWfj1cg5D7C1M1LS3Fk4Z9t1CHz2v_P_rABz4E1oo&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=http%3A%2F%2Flocalhost%3A3000&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow');

    await newPage.fill('input[type="email"]', 'ragul.1803059@gmail.com');
    await newPage.click('button:has-text("Next")');
    // Wait for navigation to the password page
await newPage.waitForNavigation();
// await newPage.waitForSelector('.loading-spinner', { state: 'hidden' });
// const newContext1 = await browser.newContext();  // Create a new context
// const newPage1 = await newContext1.newPage(); 

// await newPage1.waitForSelector('input[type="password"]');
//     await newPage1.fill('input[type="password"]', '9942479398');
});

