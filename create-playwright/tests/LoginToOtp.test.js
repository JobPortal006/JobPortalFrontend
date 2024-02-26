const {test,expect} = require("@playwright/test");

test("Login To OTP", async ({page})=>{

    await page.goto("http://localhost:3000/");

    // Clicking the login btn in Nav bar
    await page.waitForSelector("#Nav_log_btn");
    await page.locator("#Nav_log_btn").click();
    expect(page.url()).toBe("http://localhost:3000/login");

    // Clicking the OTP button
    await page.waitForSelector("#otp_btn");
    await page.locator("#otp_btn").click();
    expect(page.url()).toBe("http://localhost:3000/OTPlogin");

    // Locating the inputs
    await page.waitForSelector("input[placeholder='1 (702) 123-4567']");
    await page.waitForSelector(':text("Send OTP")')

    // Entering the Phone number in the input box  
    await page.locator("input[placeholder='1 (702) 123-4567']").fill("9952469144");
    await page.locator(':text("Send OTP")').click();
    await page.waitForTimeout(10000);

    // clicking Re-captcha
    await page.waitForSelector("#recaptcha")
    await page.locator("#recaptcha").click();
    await page.waitForTimeout(10000);



})