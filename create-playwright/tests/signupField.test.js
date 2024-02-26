
const { test, expect } = require('@playwright/test');

test('Sign up on the website and navigate to login', async ({ page }) => {
  // Navigate to the signup page
  await page.goto('http://localhost:3000');
  await page.click('#Nav_log_btn');

  // Click the "Sign Up" link or button
  await page.locator(':text("Sign Up")').click();

  // Fill in the signup form
  await page.check('input[name="signup_by"][value="User"]');
  await page.fill('input[name="email"]', 'rdgtarrs666@gmail.com');
  await page.fill('input[name="mobile_number"]', '9867372859');
  await page.fill('input[name="password"]', 'Rourpasswo007@');
  await page.fill('input[name="confirm_password"]', 'Rourpasswo007@');
  await page.check('input[name="agreeTerms"]');

  // Click the "SIGN UP" button
  console.log('Before signup click:', page.url());
  await page.click('button:has-text("SIGN UP")');

  // Wait for navigation to the login page
  await page.waitForNavigation();

  console.log('After signup click:', page.url());

  await page.fill('input[name="email"]', 'rdgtarrs666@gmail.com');
  await page.fill('input[name="password"]', 'Rourpasswo007@');

  // Click the "LOGIN" button
  await page.click('button[type="submit"]');

  await page.click('button:has-text("Search")');
});
