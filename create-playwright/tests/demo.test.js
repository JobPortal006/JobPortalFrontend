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
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Madurai' }).click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Madurai' }).click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Madurai' }).click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Madurai' }).click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByLabel('Preferred Locations').click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('option', { name: 'Chennai', exact: true }).click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Chennai' }).click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Chennai' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByRole('button', { name: 'Update' }).click();
  await page.locator('.icon-container').first().click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByText('User DashBoard').click();
  // eslint-disable-next-line testing-library/prefer-screen-queries
  await page.getByText('Role: Engineering').click();
});