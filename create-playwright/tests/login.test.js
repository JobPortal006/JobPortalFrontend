const { test, expect } = require("@playwright/test");
// import LogIn from "./../../src/components/UserManagement/Login";

test("Login Page", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  // Clicking the login button in Navigation Bar
  await page.waitForSelector("#Nav_log_btn");
  await page.locator("#Nav_log_btn").click();
  expect(page.url()).toBe("http://localhost:3000/login");

  // Waiting for the email and password fields to appear
  await page.waitForSelector("#email");
  await page.waitForSelector("#password");
  await page.waitForSelector('input[type="checkbox"]');
  await page.waitForSelector("button[type='submit']");

  // Locating the Field using ClassName
  const emailField = page.locator("#email");
  const passwordField = page.locator("#password");
  const rememberMeCheckBox = page.locator('input[type="checkbox"]');
  const submitButton = page.locator("button[type='submit']");

  // Fill the form with some data
  await emailField.fill("jeevaelango886@gmail.com");
  await passwordField.fill("@Jeeva2002");
  await rememberMeCheckBox.click();

  // Submit the form by clicking a button
  await submitButton.click();

  //   Clicking the Logout Button
  await page.waitForSelector("#Nav_btn");
  await page.locator("#Nav_btn").click();

  // Clicking SignUp in LoginPage
  await page.waitForSelector("#signup_btn");
  await page.locator("#signup_btn").click();

  //   Clicking SignIn in SignUpPage
  await page.waitForSelector(':text("Sign In")');
  await page.locator(':text("Sign In")').click();

  // Clicking Google Button in LoginPage
  await page.waitForSelector(':text("Continue with Google")');
  await page.locator(':text("Continue with Google")').click();

 


// Wait for the element to appear on the page and then check its content.

  await page.goto(
    "https://accounts.google.com/o/oauth2/auth/oauthchooseaccount?response_type=code&client_id=745831201499-qus2fqp1019dc4h58e37m2nq29eropfq.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fotp-otp-4a574.firebaseapp.com%2F__%2Fauth%2Fhandler&state=AMbdmDn3HAOnoOsJq0b8RhE8mJYnjJoVa8AjshhsAqjZIB1QuHmuMOeJtxacJO1uLNLzfHFL_RLO8rHou3j6exRVHTDpijqSeX3hiqxuzp35wkSUlPHzkWhjIcuvmMOPZFYLKwYjS3u4Y1hYHqBLGBq4xU49Cs6jvXzQBeAJM3-_uuHi3nGnCsqELgDT0GwM7YWN4wnU8FAYIWVknTlizZGO4ESGVKAVXLANLpFJlMUteVNT6tszyNR16eETg8GQcChY5hO2YOsk7rZV8e-Ip8p5ypzGvYbN_Cg0h5UG9T_hsq8cNYCntiHYdhWp9M4mpoVaD_jXQ1I&scope=openid%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20profile&context_uri=http%3A%2F%2Flocalhost%3A3000&service=lso&o2v=1&theme=glif&flowName=GeneralOAuthFlow"
  );
  await page.fill('input[type="email"]', "jeevaelango886@gmail.com");
  await page.click(':text("Next")');
await page.waitForTimeout(50000)
 
});
