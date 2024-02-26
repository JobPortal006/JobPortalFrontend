const {test, expect} = require("@playwright/test");

test("Login to ForgetPassword", async ({page})=>{

    await page.goto("http://localhost:3000/");

    // clicking the Login button in Navigation bar
    await page.waitForSelector("#Nav_log_btn");
    await page.locator("#Nav_log_btn").click();
    expect(page.url()).toBe("http://localhost:3000/login");

    // Selecting the forget Password
    await page.waitForSelector(':text("Forget password?")');
    await page.locator(':text("Forget password?")').click();
    expect(page.url()).toBe("http://localhost:3000/ForgetPassword");

    // Entering the mail for verification
    await page.waitForSelector("#email");
    await page.waitForSelector(':text("Submit")');

    // Submiting
    await page.locator("#email").fill("jeevaelango2020@gmail.com");
    await page.locator(':text("Submit")').click();
    await page.waitForTimeout(5000);

    // E-mail is not registered, so selecting the signup button in toast
    await page.waitForSelector("#toast_signUp")
    await page.locator("#toast_signUp").click();
    expect(page.url()).toBe("http://localhost:3000/SignUp");

    // Clicking the login button 
    await page.waitForSelector("#Nav_log_btn");
    await page.locator("#Nav_log_btn").click();
    expect(page.url()).toBe("http://localhost:3000/login");

   // Again clicking the forget password
    await page.waitForSelector(':text("Forget password?")');
    await page.locator(':text("Forget password?")').click();
    expect(page.url()).toBe("http://localhost:3000/ForgetPassword");

    // Entering the correct E-mail
    await page.waitForSelector("#email");
    await page.waitForSelector(':text("Submit")');

    // Submiting and the toast will be success
    await page.locator("#email").fill("jeevaelango886@gmail.com");
    await page.locator(':text("Submit")').click();
    await page.waitForTimeout(10000);

})