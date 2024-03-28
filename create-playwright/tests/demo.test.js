import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:3000/home');
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('example4@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('Raghul12@');
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'LogIn', exact: true }).click();
  await page.locator('div').filter({ hasText: /^LogoutCreate an account$/ }).getByRole('img').first().click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByTestId('KeyboardArrowRightIcon').first().click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByText('- 4 LPA').nth(1).click();
});